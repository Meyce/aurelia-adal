define(['exports', './authorize-step', './authorize-interceptor', './auth-service', './adal-initializer'], function (exports, _authorizeStep, _authorizeInterceptor, _authService, _adalInitializer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AuthService = exports.AuthorizeInterceptor = exports.AuthorizeStep = undefined;
  Object.defineProperty(exports, 'AuthorizeStep', {
    enumerable: true,
    get: function () {
      return _authorizeStep.AuthorizeStep;
    }
  });
  Object.defineProperty(exports, 'AuthorizeInterceptor', {
    enumerable: true,
    get: function () {
      return _authorizeInterceptor.AuthorizeInterceptor;
    }
  });
  Object.defineProperty(exports, 'AuthService', {
    enumerable: true,
    get: function () {
      return _authService.AuthService;
    }
  });
  exports.configure = configure;
  function configure(aurelia, config) {
    aurelia.globalResources('./auth-filter');

    var adalInitializer = aurelia.container.get(_adalInitializer.AdalInitializer);

    adalInitializer.initialize(config);
  }
});