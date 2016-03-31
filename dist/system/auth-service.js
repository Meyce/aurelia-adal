'use strict';

System.register(['aurelia-dependency-injection', './adal-manager'], function (_export, _context) {
  var inject, AdalManager, _dec, _class, AuthService;

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
      _export('AuthService', AuthService = (_dec = inject(AdalManager), _dec(_class = function () {
        function AuthService(adalManager) {
          _classCallCheck(this, AuthService);

          this.adalManager = adalManager;
        }

        AuthService.prototype.logout = function logout() {
          this.adalManager.adal.logOut();
        };

        AuthService.prototype.getUserAsync = function getUserAsync() {
          var _this = this;

          return new Promise(function (resolve, reject) {
            _this.adalManager.adal.getUser(function (error, user) {
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