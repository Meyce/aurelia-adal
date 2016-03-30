'use strict';

System.register(['aurelia-dependency-injection', './adal-manager'], function (_export, _context) {
  var inject, AdalManager, _dec, _class, AuthService;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              return step("next", value);
            }, function (err) {
              return step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

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
          this.adal.logOut();
        };

        AuthService.prototype.getUser = function () {
          var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
            var _this = this;

            return regeneratorRuntime.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return new Promise(function (resolve, reject) {
                      _this.adal.getUser(function (error, user) {
                        if (error) {
                          reject(error);
                        } else {
                          resolve(user);
                        }
                      });
                    });

                  case 2:
                    return _context2.abrupt('return', _context2.sent);

                  case 3:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee, this);
          }));

          function getUser() {
            return ref.apply(this, arguments);
          }

          return getUser;
        }();

        return AuthService;
      }()) || _class));

      _export('AuthService', AuthService);
    }
  };
});