'use strict';

System.register(['aurelia-dependency-injection', './adal-manager'], function (_export, _context) {
  var inject, AdalManager, _dec, _class, AuthorizeInterceptor;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.default;
    }, function (_adalManager) {
      AdalManager = _adalManager.AdalManager;
    }],
    execute: function () {
      _export('AuthorizeInterceptor', AuthorizeInterceptor = (_dec = inject(AdalManager), _dec(_class = function () {
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
      }()) || _class));

      _export('AuthorizeInterceptor', AuthorizeInterceptor);
    }
  };
});