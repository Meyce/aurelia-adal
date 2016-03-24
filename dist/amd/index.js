define(['exports', './authorize-step', './authorize-interceptor', 'adal-config', './auth-filter'], function (exports, _authorizeStep, _authorizeInterceptor, _adalConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AuthorizeInterceptor = exports.AuthorizeStep = undefined;
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
  exports.configure = configure;
  function configure(aurelia, settings) {
    aurelia.globalResources('./auth-filter');

    var adalConfig = aurelia.container.get(_adalConfig.AdalConfig);

    adalConfig.configure(settings);
  }
});