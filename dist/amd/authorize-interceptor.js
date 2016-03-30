define(['exports', 'aurelia-dependency-injection', './adal-manager'], function (exports, _aureliaDependencyInjection, _adalManager) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AuthorizeInterceptor = undefined;

  var _aureliaDependencyInjection2 = _interopRequireDefault(_aureliaDependencyInjection);

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

  var AuthorizeInterceptor = (_dec = (0, _aureliaDependencyInjection2.default)(_adalManager.AdalManager), _dec(_class = function () {
    function AuthorizeInterceptor(adalManager) {
      _classCallCheck(this, AuthorizeInterceptor);

      this.adalManager = adalManager;
    }

    AuthorizeInterceptor.prototype.request = function request(_request) {
      return this.adalManager.loadTokenForRequest(_request.url).then(function (tokenResult) {
        if (tokenResult.fromCache) {
          _request.headers.append('Authorization', 'Bearer ' + tokenResult.token);
        } else {
          _request.headers.set('Authorization', 'Bearer ' + tokenResult.token);
        }
      }).then(_request);
    };

    AuthorizeInterceptor.prototype.responseError = function responseError(rejection) {
      var notAuthorized = rejection && rejection.status === 401;
      this.adalManager.handleRequestFailed(rejection.config.url, notAuthorized);

      return rejection;
    };

    return AuthorizeInterceptor;
  }()) || _class);
  exports.AuthorizeInterceptor = AuthorizeInterceptor;
});