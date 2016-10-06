'use strict';

System.register(['aurelia-dependency-injection', './auth-context'], function (_export, _context) {
  "use strict";

  var inject, AuthContext, _dec, _class, AuthService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_authContext) {
      AuthContext = _authContext.AuthContext;
    }],
    execute: function () {
      _export('AuthService', AuthService = (_dec = inject(AuthContext), _dec(_class = function () {
        function AuthService(authContext) {
          _classCallCheck(this, AuthService);

          this.authContext = authContext;
        }

        AuthService.prototype.logout = function logout() {
          this.authContext.adal.logOut();
        };

        AuthService.prototype.getUserAsync = function getUserAsync() {
          var _this = this;

          return new Promise(function (resolve, reject) {
            _this.authContext.adal.getUser(function (error, user) {
              if (error) {
                reject(error);
              } else {
                resolve(user);
              }
            });
          });
        };

        return AuthService;
      }()) || _class));

      _export('AuthService', AuthService);
    }
  };
});