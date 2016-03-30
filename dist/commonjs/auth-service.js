'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthService = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaDependencyInjection2 = _interopRequireDefault(_aureliaDependencyInjection);

var _adalManager = require('./adal-manager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthService = exports.AuthService = (_dec = (0, _aureliaDependencyInjection2.default)(_adalManager.AdalManager), _dec(_class = function () {
  function AuthService(adalManager) {
    _classCallCheck(this, AuthService);

    this.adalManager = adalManager;
  }

  AuthService.prototype.logout = function logout() {
    this.adal.logOut();
  };

  AuthService.prototype.getUserAsync = function getUserAsync() {
    var _this = this;

    return new Promise(function (resolve, reject) {
      _this.adal.getUser(function (error, user) {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      });
    });
  };

  return AuthService;
}()) || _class);