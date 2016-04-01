var _dec, _class;

import { inject } from 'aurelia-dependency-injection';
import { PLATFORM } from 'aurelia-pal';
import * as Logging from 'aurelia-logging';
import * as Adal from 'adaljs';
import { AuthContext } from './auth-context';

export let AdalInitializer = (_dec = inject(Adal, AuthContext), _dec(_class = class AdalInitializer {

  constructor(adal, authContext) {
    this.logger = Logging.getLogger('adal');

    this.adal = adal;
    this.authContext = authContext;
  }

  initialize(config) {
    try {
      let existingHash = PLATFORM.location.hash;
      let pathDefault = PLATFORM.location.href;
      if (existingHash) {
        pathDefault = pathDefault.replace(existingHash, '');
      }

      let _config = {};

      _config.redirectUri = pathDefault;
      _config.postLogoutRedirectUri = pathDefault;

      Object.assign(_config, config);

      let adalContext = this.adal.inject(_config);
      this.logger.info('AdalContext created');
      this.logger.debug(adalContext);

      this.authContext.initialize(adalContext);

      window.AuthenticationContext = () => {
        return this.authContext.adal;
      };

      this.logger.info('aurelia-adal configured');
    } catch (e) {
      this.logger.error('aurelia-adal configuration failed:');
      this.logger.error(e);
      console.log(e);
    }
  }
}) || _class);