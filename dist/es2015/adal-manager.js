function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

import inject from 'aurelia-dependency-injection';

export let AdalManager = class AdalManager {
  constructor() {
    this.user = {
      isAuthenticated: false,
      userName: '',
      loginError: '',
      profile: null
    };
  }

  initialize(authContext) {
    this.adal = authContext;
    this.updateUserFromCache();
  }

  updateUserFromCache() {
    let resource = this.adal.config.loginResource;
    let token = this.adal.getCachedToken(resource);
    let user = this.adal.getCachedUser() || {};

    this.user.isAuthenticated = token !== null && token.length > 0;
    this.user.userName = user.userName || '';
    this.user.profile = user.profile || null;
    this.user.loginError = this.adal.getLoginError();
  }

  hashHandler(hash, redirectHandler, isNotCallbackHandler, nextHandler) {
    if (this.adal.isCallback(hash)) {
      let requestInfo = this.adal.getRequestInfo(hash);

      this.adal.saveTokenFromHash(requestInfo);

      if (requestInfo.requestType !== this.adal.REQUEST_TYPE.LOGIN) {
        this.adal.callback = window.parent.AuthenticationContext().callback;
        if (requestInfo.requestType === this.adal.REQUEST_TYPE.RENEW_TOKEN) {
          this.adal.callback = window.parent.callBackMappedToRenewStates[requestInfo.stateResponse];
        }
      }

      if (requestInfo.stateMatch) {
        if (typeof this.adal.callback === 'function') {
          if (requestInfo.requestType === this.adal.REQUEST_TYPE.RENEW_TOKEN) {
            if (requestInfo.parameters['access_token']) {
              this.adal.callback(this.adal._getItem(this.adal.CONSTANTS.STORAGE.ERROR_DESCRIPTION), requestInfo.parameters['access_token']);
              return nextHandler();
            } else if (requestInfo.parameters['id_token']) {
              this.adal.callback(this.adal._getItem(this.adal.CONSTANTS.STORAGE.ERROR_DESCRIPTION), requestInfo.parameters['id_token']);
              return nextHandler();
            }
          }
        } else {
          this.updateUserFromCache();

          if (this.user.userName) {
            var loginStartPage = this.adal._getItem(this.adal.CONSTANTS.STORAGE.START_PAGE);
            if (loginStartPage) {
              return redirectHandler(loginStartPage);
            }
          } else {}
        }
      }
    } else {
        return isNotCallbackHandler();
      }
  }

  loginHandler(path, redirectHandler, handler) {
    this.adal.info('Login event for:' + path);

    if (this.adal.config && this.adal.config.localLoginUrl) {
      return redirectHandler(this.adal.config.localLoginUrl);
    } else {
      this.adal._saveItem(this.adal.CONSTANTS.STORAGE.START_PAGE, path);
      this.adal.info('Start login at:' + window.location.href);

      this.adal.login();
      return handler();
    }
  }

  loadTokenForRequest(requestUrl, onExistingTokenFound, onNewTokenAcquired) {
    var _this = this;

    return _asyncToGenerator(function* () {
      let resource = _this.adal.getResourceForEndpoint(requestUrl);
      if (resource == null) {
        return;
      }

      let tokenStored = _this.adal.getCachedToken(resource);
      let isEndpoint = false;

      if (tokenStored) {
        _this.adal.info('Token is avaliable for this url ' + requestUrl);

        onExistingTokenFound(tokenStored);
      } else {
          if (_this.adal.config) {
            isEndpoint = _this.adal.config.endpoints.some(function (url) {
              return requestUrl.indexOf(url) > -1;
            });
          }

          if (_this.adal.loginInProgress()) {
            _this.adal.info('login already started.');

            throw new Error('login already started');
          } else if (_this.adal.config && isEndpoint) {
            let token = yield _this.adal.acquireToken(resource);

            _this.adal.verbose('Token is avaliable');
            onNewTokenAcquired(token);
          }
        }
    })();
  }

  handleRequestFailed(requestUrl, requestNotAuthorized) {
    this.adal.info('Getting error in the response');

    if (requestNotAuthorized) {
      var resource = this.adal.getResourceForEndpoint(requestUrl);
      this.adal.clearCacheForResource(resource);
    }
  }

  logout() {
    this.adal.logOut();
  }

};