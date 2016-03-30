define(['exports', 'aurelia-dependency-injection', './adal-manager'], function (exports, _aureliaDependencyInjection, _adalManager) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AuthService = undefined;

  var _aureliaDependencyInjection2 = _interopRequireDefault(_aureliaDependencyInjection);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var _dec, _class;

  var AuthService = exports.AuthService = (_dec = (0, _aureliaDependencyInjection2.default)(_adalManager.AdalManager), _dec(_class = function () {
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

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
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
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
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
  }()) || _class);
});