define(['exports', 'aurelia-dependency-injection', 'adaljs', './adal-manager'], function (exports, _aureliaDependencyInjection, _adaljs, _adalManager) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AdalConfig = undefined;

  var _aureliaDependencyInjection2 = _interopRequireDefault(_aureliaDependencyInjection);

  var Adal = _interopRequireWildcard(_adaljs);

  var _adalManager2 = _interopRequireDefault(_adalManager);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AdalConfig = exports.AdalConfig = (_dec = (0, _aureliaDependencyInjection2.default)(Adal, _adalManager2.default), _dec(_class = function () {
    function AdalConfig(adal, adalManager) {
      _classCallCheck(this, AdalConfig);

      this.adal = adal;
      this.adalManager = adalManager;
    }

    AdalConfig.prototype.configure = function configure(settings) {
      var _this = this;

      try {
        (function () {
          var configOptions = {};

          var existingHash = window.location.hash;
          var pathDefault = window.location.href;
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

          window.AuthenticationContext = function () {
            return authContext;
          };

          _this.adalManager.initialize(authContext);
        })();
      } catch (e) {
        console.log(e);
      }
    };

    return AdalConfig;
  }()) || _class);
});