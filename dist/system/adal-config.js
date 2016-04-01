'use strict';

System.register(['aurelia-dependency-injection', 'aurelia-pal', 'aurelia-logging', 'adaljs', './auth-context'], function (_export, _context) {
  var inject, PLATFORM, Logging, Adal, AuthContext, _dec, _class, AdalConfig;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaPal) {
      PLATFORM = _aureliaPal.PLATFORM;
    }, function (_aureliaLogging) {
      Logging = _aureliaLogging;
    }, function (_adaljs) {
      Adal = _adaljs;
    }, function (_authContext) {
      AuthContext = _authContext.AuthContext;
    }],
    execute: function () {
      _export('AdalConfig', AdalConfig = (_dec = inject(Adal, AuthContext), _dec(_class = function () {
        function AdalConfig(adal, authContext) {
          _classCallCheck(this, AdalConfig);

          this.logger = Logging.getLogger('adal');

          this.adal = adal;
          this.authContext = authContext;
        }

        AdalConfig.prototype.configure = function configure(config) {
          var _this = this;

          try {
            var settings = {};

            var existingHash = PLATFORM.location.hash;
            var pathDefault = PLATFORM.location.href;
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


            var adalContext = this.adal.inject(settings);
            this.logger.info('AdalContext created');
            this.logger.debug(adalContext);

            this.authContext.initialize(adalContext);

            window.AuthenticationContext = function () {
              return _this.authContext.adal;
            };

            this.logger.info('aurelia-adal configured');
          } catch (e) {
            this.logger.error('aurelia-adal configuration failed:');
            this.logger.error(e);
            console.log(e);
          }
        };

        return AdalConfig;
      }()) || _class));

      _export('AdalConfig', AdalConfig);
    }
  };
});