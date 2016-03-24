define(['exports', 'aurelia-dependency-injection', 'aurelia-router', './adal-manager'], function (exports, _aureliaDependencyInjection, _aureliaRouter, _adalManager) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AureliaAdalAuthorizeStep = undefined;

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

  var AureliaAdalAuthorizeStep = exports.AureliaAdalAuthorizeStep = (_dec = (0, _aureliaDependencyInjection2.default)(_adalManager.AdalManager), _dec(_class = function () {
    function AureliaAdalAuthorizeStep(adalManager) {
      _classCallCheck(this, AureliaAdalAuthorizeStep);

      this.adalManager = adalManager;
    }

    AureliaAdalAuthorizeStep.prototype.run = function run(routingContext, next) {
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

    return AureliaAdalAuthorizeStep;
  }()) || _class);
});