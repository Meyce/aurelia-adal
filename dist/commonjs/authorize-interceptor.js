'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthorizeInterceptor = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaDependencyInjection2 = _interopRequireDefault(_aureliaDependencyInjection);

var _adalManager = require('./adal-manager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthorizeInterceptor = (_dec = (0, _aureliaDependencyInjection2.default)(_adalManager.AdalManager), _dec(_class = function () {
  function AuthorizeInterceptor(adalManager) {
    _classCallCheck(this, AuthorizeInterceptor);

    this.adalManager = adalManager;
  }

  AuthorizeInterceptor.prototype.request = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_request) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.adalManager.loadTokenForRequest(_request.url, function (token) {
                return _request.headers.append('Authorization', 'Bearer ' + token);
              }, function (token) {
                return _request.headers.set('Authorization', 'Bearer ' + token);
              });

            case 2:
              return _context.abrupt('return', _request);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function request(_x) {
      return ref.apply(this, arguments);
    }

    return request;
  }();

  AuthorizeInterceptor.prototype.responseError = function responseError(rejection) {
    var notAuthorized = rejection && rejection.status === 401;
    this.adalManager.handleRequestFailed(rejection.config.url, notAuthorized);

    return rejection;
  };

  return AuthorizeInterceptor;
}()) || _class);
exports.AuthorizeInterceptor = AuthorizeInterceptor;