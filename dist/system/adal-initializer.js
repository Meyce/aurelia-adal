'use strict';

System.register(['aurelia-dependency-injection', 'aurelia-pal', 'aurelia-logging', 'adaljs', './auth-context'], function (_export, _context) {
  "use strict";

  var inject, PLATFORM, Logging, Adal, AuthContext, _dec, _class, AdalInitializer;

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
      _export('AdalInitializer', AdalInitializer = (_dec = inject(Adal, AuthContext), _dec(_class = function () {
        function AdalInitializer(adal, authContext) {
          _classCallCheck(this, AdalInitializer);

          this.logger = Logging.getLogger('adal');

          this.adal = adal;
          this.authContext = authContext;
        }

        AdalInitializer.prototype.initialize = function initialize(config) {
          var _this = this;

          try {
            var existingHash = PLATFORM.location.hash;
            var pathDefault = PLATFORM.location.href;
            if (existingHash) {
              pathDefault = pathDefault.replace(existingHash, '');
            }

            var _config = {};

            _config.redirectUri = pathDefault;
            _config.postLogoutRedirectUri = pathDefault;

            Object.assign(_config, config);

            var adalContext = this.adal.inject(_config);
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

        return AdalInitializer;
      }()) || _class));

      _export('AdalInitializer', AdalInitializer);
    }
  };
});