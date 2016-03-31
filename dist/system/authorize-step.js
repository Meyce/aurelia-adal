'use strict';

System.register(['aurelia-dependency-injection', 'aurelia-router', './adal-manager'], function (_export, _context) {
  var inject, Redirect, AdalManager, _dec, _class, AuthorizeStep;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.default;
    }, function (_aureliaRouter) {
      Redirect = _aureliaRouter.Redirect;
    }, function (_adalManager) {
      AdalManager = _adalManager.AdalManager;
    }],
    execute: function () {
      _export('AuthorizeStep', AuthorizeStep = (_dec = inject(AdalManager), _dec(_class = function () {
        function AuthorizeStep(adalManager) {
          _classCallCheck(this, AuthorizeStep);

          this.adalManager = adalManager;
        }

        AuthorizeStep.prototype.run = function run(routingContext, next) {
          var _this = this;

          var hash = window.location.hash;

          return this.adalManager.hashHandler(hash, function (url) {
            return next.cancel(new Redirect(url));
          }, function () {
            var loginRoute = '';
            var routes = routingContext.getAllInstructions();
            var isAuthenticated = _this.adalManager.user.isAuthenticated;

            if (routes.some(function (i) {
              return !!i.config.auth;
            }) && !isAuthenticated) {
              return _this.adalManager.loginHandler(routingContext.fragment, function (url) {
                return next.cancel(new Redirect(url));
              }, function () {
                return next.cancel('login redirect');
              });
            } else if (routes.some(function (i) {
              return i.fragment == loginRoute;
            }) && isAuthenticated) {
              return next.cancel(new Redirect(''));
            }

            return next();
          }, function () {
            return next();
          });
        };

        return AuthorizeStep;
      }()) || _class));

      _export('AuthorizeStep', AuthorizeStep);
    }
  };
});