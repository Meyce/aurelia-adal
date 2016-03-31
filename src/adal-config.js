import inject from 'aurelia-dependency-injection';
import PLATFORM from 'aurelia-pal';
import * as Logging from 'aurelia-logging';
import * as Adal from 'adaljs';
import AuthContext from './auth-context';

@inject(Adal, AuthContext)
export class AdalConfig {

  logger = Logging.getLogger('adal');

  constructor(adal, authContext) {
    this.adal = adal;
    this.authContext = authContext;
  }

  configure(config) {
    try {
      let settings = {};

      // redirect and logout_redirect are set to current location by default
      let existingHash = PLATFORM.location.hash;
      let pathDefault = PLATFORM.location.href;
      if (existingHash) {
        pathDefault = pathDefault.replace(existingHash, '');
      }

      config = config || {};

      settings.tenant = config.tenant;
      settings.clientId = config.clientId;
      settings.endpoints = config.endpoints;
      settings.localLoginUrl = config.localLoginUrl;
      settings.redirectUri = config.redirectUri || pathDefault;
      settings.postLogoutRedirectUri = config.postLogoutRedirectUri || pathDefault;
      // TODO: additional options?
      // settings.loginResource
      // settings.cacheLocation: 'localStorage' | 'sessionStorage'

      let adalContext = this.adal.inject(settings);
      this.logger.info('AdalContext created')
      this.logger.debug(adalContext)
      
      this.authContext.initialize(adalContext);
      
      // TODO: use PAL
      window.AuthenticationContext = () => {
        return this.authContext.adal; 
      };

      this.logger.info('aurelia-adal configured')
    } catch (e) {
      this.logger.error('aurelia-adal configuration failed:')
      this.logger.error(e)
      console.log(e);
    }
  }
}
