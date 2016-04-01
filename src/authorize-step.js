import {inject} from 'aurelia-dependency-injection';
import {PLATFORM} from 'aurelia-pal';
import {Redirect} from 'aurelia-router';
import * as Logging from 'aurelia-logging';
import {AuthContext} from './auth-context';

@inject(AuthContext)
export class AuthorizeStep {
  
  logger = Logging.getLogger('adal');
  
  constructor(authContext) {
    this.authContext = authContext;
  }

  run(routingContext, next) {
    let hash = PLATFORM.location.hash;

    //////////////////////////// hashhandler

    let isCallback = this.authContext.adal.isCallback(hash);

    if (isCallback) {
      let requestInfo = this.authContext.adal.getRequestInfo(hash);
      
      this.authContext.adal.saveTokenFromHash(requestInfo);

      if (requestInfo.requestType !== this.authContext.adal.REQUEST_TYPE.LOGIN) {
        this.authContext.adal.callback = window.parent.AuthenticationContext().callback;
        if (requestInfo.requestType === this.authContext.adal.REQUEST_TYPE.RENEW_TOKEN) {
          this.authContext.adal.callback = window.parent.callBackMappedToRenewStates[requestInfo.stateResponse];
        }
      }

      // Return to callback if it is sent from iframe
      if (requestInfo.stateMatch) {
        if (typeof this.authContext.adal.callback === 'function') {
          // Call within the same context without full page redirect keeps the callback
          if (requestInfo.requestType === this.authContext.adal.REQUEST_TYPE.RENEW_TOKEN) {
            // Idtoken or Accestoken can be renewed
            if (requestInfo.parameters['access_token']) {
              this.authContext.adal.callback(this.authContext.adal._getItem(this.authContext.adal.CONSTANTS.STORAGE.ERROR_DESCRIPTION), requestInfo.parameters['access_token']);
              return next();
            } else if (requestInfo.parameters['id_token']) {
              this.authContext.adal.callback(this.authContext.adal._getItem(this.authContext.adal.CONSTANTS.STORAGE.ERROR_DESCRIPTION), requestInfo.parameters['id_token']);
              return next();
            }
          }
        } else {
          // normal full login redirect happened on the page
          this.authContext.updateUserFromCache();

          if (this.authContext.user.userName) {
            //IDtoken is added as token for the app

            // redirect to login requested page
            let startPage = this.authContext.adal._getItem(this.authContext.adal.CONSTANTS.STORAGE.START_PAGE);
            if (startPage) {
              return next.cancel(new Redirect(startPage));
            }
            this.logger.info('user successfully logged in');
          } else {
            this.logger.warn('user not logged in, reason: ' + this.authContext.user.loginError); 
            this.logger.warn('user not logged in, reason: ' + this.authContext.adal._getItem(this.authContext.adal.CONSTANTS.STORAGE.ERROR_DESCRIPTION)); 
          }
        }
      }
    } else {
      // Was not callback

      //////////////////////////// redirecthandler

      if (!this.authContext.user.isAuthenticated) {
        //if (routingContext.getAllInstructions().some(i => !!i.config.auth)) {
        if (!!routingContext.config.auth) {
          // Not logged in, redirect to login route



          //////////////////////////// loginHandler

          // TODO: this.logger.warn('authentication required')

          if (this.authContext.adal.config && this.authContext.adal.config.localLoginUrl) {
            return next.cancel(new Redirect(this.authContext.adal.config.localLoginUrl));
          } else {
            // directly start login flow
            this.authContext.adal._saveItem(this.authContext.adal.CONSTANTS.STORAGE.START_PAGE, routingContext.fragment);
            
            this.logger.info('login started; redirecting to Azure.');
            this.authContext.adal.login();
            this.logger.info('login finished');
            
            return next.cancel('login redirect');
          }

          //////////////////////////// end of loginHandler

        }
      } else {
        // TODO: rethink login instruction matching?
        if (!!routingContext.config.login) {
          // Logged in, current route is the login route
          this.logger.warn('user already logged in. redirecting...')
          let startPage = this.authContext.adal._getItem(this.authContext.adal.CONSTANTS.STORAGE.START_PAGE);

          return next.cancel(new Redirect(startPage));
        }
      }

      return next();

      //////////////////////////// end of redirecthandler
    }

    //////////////////////////// end of hash handler
  }
}