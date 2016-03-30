export class AdalManager {

  user = {
    isAuthenticated: false,
    userName: '',
    loginError: '',
    profile: null
  }

  // TODO: move to constructor and rethink injection strategy (? factory)
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

      // Return to callback if it is sent from iframe
      if (requestInfo.stateMatch) {
        if (typeof this.adal.callback === 'function') {
          // Call within the same context without full page redirect keeps the callback
          if (requestInfo.requestType === this.adal.REQUEST_TYPE.RENEW_TOKEN) {
            // Idtoken or Accestoken can be renewed
            if (requestInfo.parameters['access_token']) {
              this.adal.callback(this.adal._getItem(this.adal.CONSTANTS.STORAGE.ERROR_DESCRIPTION), requestInfo.parameters['access_token']);
              return nextHandler();
            } else if (requestInfo.parameters['id_token']) {
              this.adal.callback(this.adal._getItem(this.adal.CONSTANTS.STORAGE.ERROR_DESCRIPTION), requestInfo.parameters['id_token']);
              return nextHandler();
            }
          }
        } else {
          // normal full login redirect happened on the page
          this.updateUserFromCache();

          if (this.user.userName) {
            //IDtoken is added as token for the app

            // redirect to login requested page
            let loginStartPage = this.adal._getItem(this.adal.CONSTANTS.STORAGE.START_PAGE);
            if (loginStartPage) {
              return redirectHandler(loginStartPage);
            }
            // TODO: broadcast login success?
          } else {
            // TODO: broadcast login failure? (reason: this.adal._getItem(this.adal.CONSTANTS.STORAGE.ERROR_DESCRIPTION))
          }
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
      // directly start login flow
      this.adal._saveItem(this.adal.CONSTANTS.STORAGE.START_PAGE, path);
      this.adal.info('Start login at:' + window.location.href);
      // TODO: broadcast login redirect?
      this.adal.login();
      return handler();
    }
  }

  loadTokenForRequest(requestUrl) {
    return new Promise((resolve, reject) => {

      let resource = this.adal.getResourceForEndpoint(requestUrl);
      if (resource == null) {
        reject({ warning: 'no resource for endpoint'});
        return;
      }

      let tokenStored = this.adal.getCachedToken(resource);
      if (tokenStored) {
        this.adal.info('Token is avaliable for this url ' + requestUrl);

        // check endpoint mapping if provided
        resolve({ token: tokenStored, fromCache: true });
        return;
      } 

      // Cancel request if login is starting
      if (this.adal.loginInProgress()) {
        this.adal.info('login already started.');
        
        reject({ warning: 'login already started'});
        return;
      } 
      
      let isEndpoint = this.adal.config && this.adal.config.endpoints.some(url => requestUrl.indexOf(url) > -1);
      if (isEndpoint) {
        // external endpoints
        // delayed request to return after iframe completes
        this.acquireToken(resource)
          .then(token => {
            this.adal.verbose('Token is avaliable');
            resolve({ token: token, fromCache: false });
          })
          .catch(err => reject(err));
      }

    });
  }

  handleRequestFailed(requestUrl, requestNotAuthorized) {
    this.adal.info('Getting error in the response');

    if (requestNotAuthorized) {
      let resource = this.adal.getResourceForEndpoint(requestUrl);
      this.adal.clearCacheForResource(resource);
      // TODO: broadcast notAuthorized?
    }
  }

  acquireToken(resource) {
    // automated token request call
    return new Promise((resolve, reject) => {
      this.adal.acquireToken(resource, (error, tokenOut) => {
        if (error) {
          reject(error);
        } else {
          resolve(tokenOut);
        }
      });
    });
  }

  

}