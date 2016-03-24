'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdalConfig = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaDependencyInjection2 = _interopRequireDefault(_aureliaDependencyInjection);

var _aureliaPal = require('aurelia-pal');

var _aureliaPal2 = _interopRequireDefault(_aureliaPal);

var _adaljs = require('adaljs');

var Adal = _interopRequireWildcard(_adaljs);

var _adalAdapter = require('./adal-adapter');

var _adalAdapter2 = _interopRequireDefault(_adalAdapter);

var _adalManager = require('./adal-manager');

var _adalManager2 = _interopRequireDefault(_adalManager);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdalConfig = exports.AdalConfig = (_dec = (0, _aureliaDependencyInjection2.default)(Adal, _adalAdapter2.default, _adalManager2.default, _aureliaPal2.default), _dec(_class = function () {
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
}()) || _class);