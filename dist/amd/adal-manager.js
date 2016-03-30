define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AdalManager = exports.AdalManager = function () {
    function AdalManager() {
      _classCallCheck(this, AdalManager);

      this.user = {
        isAuthenticated: false,
        userName: '',
        loginError: '',
        profile: null
      };
    }

    AdalManager.prototype.initialize = function initialize(authContext) {
      this.adal = authContext;
      this.updateUserFromCache();
    };

    AdalManager.prototype.updateUserFromCache = function updateUserFromCache() {
      var resource = this.adal.config.loginResource;
      var token = this.adal.getCachedToken(resource);
      var user = this.adal.getCachedUser() || {};

      this.user.isAuthenticated = token !== null && token.length > 0;
      this.user.userName = user.userName || '';
      this.user.profile = user.profile || null;
      this.user.loginError = this.adal.getLoginError();
    };

    AdalManager.prototype.hashHandler = function hashHandler(hash, redirectHandler, isNotCallbackHandler, nextHandler) {
      if (this.adal.isCallback(hash)) {
        var requestInfo = this.adal.getRequestInfo(hash);

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
    };

    AdalManager.prototype.loginHandler = function loginHandler(path, redirectHandler, handler) {
      this.adal.info('Login event for:' + path);

      if (this.adal.config && this.adal.config.localLoginUrl) {
        return redirectHandler(this.adal.config.localLoginUrl);
      } else {
        this.adal._saveItem(this.adal.CONSTANTS.STORAGE.START_PAGE, path);
        this.adal.info('Start login at:' + window.location.href);

        this.adal.login();
        return handler();
      }
    };

    AdalManager.prototype.loadTokenForRequest = function loadTokenForRequest(requestUrl) {
      var _this = this;

      return new Promise(function (resolve, reject) {

        var resource = _this.adal.getResourceForEndpoint(requestUrl);
        if (resource == null) {
          reject({ warning: 'no resource for endpoint' });
          return;
        }

        var tokenStored = _this.adal.getCachedToken(resource);
        if (tokenStored) {
          _this.adal.info('Token is avaliable for this url ' + requestUrl);

          resolve({ token: tokenStored, fromCache: true });
          return;
        }

        if (_this.adal.loginInProgress()) {
          _this.adal.info('login already started.');

          reject({ warning: 'login already started' });
          return;
        }

        var isEndpoint = _this.adal.config && _this.adal.config.endpoints.some(function (url) {
          return requestUrl.indexOf(url) > -1;
        });
        if (isEndpoint) {
          _this.acquireToken(resource).then(function (token) {
            _this.adal.verbose('Token is avaliable');
            resolve({ token: token, fromCache: false });
          }).catch(function (err) {
            return reject(err);
          });
        }
      });
    };

    AdalManager.prototype.handleRequestFailed = function handleRequestFailed(requestUrl, requestNotAuthorized) {
      this.adal.info('Getting error in the response');

      if (requestNotAuthorized) {
        var resource = this.adal.getResourceForEndpoint(requestUrl);
        this.adal.clearCacheForResource(resource);
      }
    };

    AdalManager.prototype.acquireToken = function acquireToken(resource) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.adal.acquireToken(resource, function (error, tokenOut) {
          if (error) {
            reject(error);
          } else {
            resolve(tokenOut);
          }
        });
      });
    };

    return AdalManager;
  }();
});