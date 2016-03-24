'use strict';

System.register(['aurelia-dependency-injection', 'aurelia-pal', 'adaljs', './adal-adapter', './adal-manager'], function (_export, _context) {
  var inject, Platform, Adal, AdalAdapter, AdalManager, _dec, _class, AdalConfig;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.default;
    }, function (_aureliaPal) {
      Platform = _aureliaPal.default;
    }, function (_adaljs) {
      Adal = _adaljs;
    }, function (_adalAdapter) {
      AdalAdapter = _adalAdapter.default;
    }, function (_adalManager) {
      AdalManager = _adalManager.default;
    }],
    execute: function () {
      _export('AdalConfig', AdalConfig = (_dec = inject(Adal, AdalAdapter, AdalManager, Platform), _dec(_class = function () {
        function AdalConfig(adal, adalAdapter, adalManager, platform) {
          _classCallCheck(this, AdalConfig);

          this.adal = adal;
          this.platform = platform;
          this.adalAdapter = adalAdapter;
          this.adalManager = adalManager;
        }

        AdalConfig.prototype.configure = function configure(settings) {
          var _this = this;

          try {
            (function () {
              var configOptions = {};

              var existingHash = _this.platform.location.hash;
              var pathDefault = _this.platform.location.href;
              if (existingHash) {
                pathDefault = pathDefault.replace(existingHash, '');
              }

              settings = settings || {};

              configOptions.tenant = settings.tenant;
              configOptions.clientId = settings.clientId;
              configOptions.endpoints = settings.endpoints;
              configOptions.redirectUri = settings.redirectUri || pathDefault;
              configOptions.postLogoutRedirectUri = settings.postLogoutRedirectUri || pathDefault;


              var authContext = _this.adal.inject(configOptions);

              _this.platform.global.AuthenticationContext = function () {
                return authContext;
              };

              _this.adalManager.initialize(authContext);
            })();
          } catch (e) {
            console.log(e);
          }
        };

        return AdalConfig;
      }()) || _class));

      _export('AdalConfig', AdalConfig);
    }
  };
});