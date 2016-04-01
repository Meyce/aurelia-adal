import {inject} from 'aurelia-dependency-injection';
import {PLATFORM} from 'aurelia-pal';
import * as Logging from 'aurelia-logging';
import * as Adal from 'adaljs';
import {AuthContext} from './auth-context';

@inject(Adal, AuthContext)
export class AdalInitializer {

  logger = Logging.getLogger('adal');

  constructor(adal, authContext) {
    this.adal = adal;
    this.authContext = authContext;
  }

  initialize(config) {
    try {
      // redirect and logout_redirect are set to current location by default
      let existingHash = PLATFORM.location.hash;
      let pathDefault = PLATFORM.location.href;
      if (existingHash) {
        pathDefault = pathDefault.replace(existingHash, '');
      }

      let _config = {};

      // defaults
      _config.redirectUri = pathDefault;
      _config.postLogoutRedirectUri = pathDefault;

      Object.assign(_config, config);

      let adalContext = this.adal.inject(_config);
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
