'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthorizeStep = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaDependencyInjection2 = _interopRequireDefault(_aureliaDependencyInjection);

var _aureliaRouter = require('aurelia-router');

var _adalManager = require('./adal-manager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthorizeStep = exports.AuthorizeStep = (_dec = (0, _aureliaDependencyInjection2.default)(_adalManager.AdalManager), _dec(_class = function () {
  function AuthorizeStep(adalManager) {
    _classCallCheck(this, AuthorizeStep);

    this.adalManager = adalManager;
  }

  AuthorizeStep.prototype.run = function run(routingContext, next) {
    var _this = this;

    var hash = window.location.hash;

    return this.adalManager.hashHandler(hash, function (url) {
      return next.cancel(new _aureliaRouter.Redirect(url));
    }, function () {
      var loginRoute = '';
      var routes = routingContext.getAllInstructions();
      var isAuthenticated = _this.adalManager.user.isAuthenticated;

      if (routes.some(function (i) {
        return !!i.config.auth;
      }) && !isAuthenticated) {
        return _this.adalManager.loginHandler(routingContext.fragment, function (url) {
          return next.cancel(new _aureliaRouter.Redirect(url));
        }, function () {
          return next.cancel(new _aureliaRouter.Redirect('login redirect'));
        });
      } else if (routes.some(function (i) {
        return i.fragment == loginRoute;
      }) && isAuthenticated) {
        return next.cancel(new _aureliaRouter.Redirect(''));
      }

      return next();
    }, function () {
      return next();
    });
  };

  return AuthorizeStep;
}()) || _class);