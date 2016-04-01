'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthService = exports.AuthorizeInterceptor = exports.AuthorizeStep = undefined;

var _authorizeStep = require('./authorize-step');

Object.defineProperty(exports, 'AuthorizeStep', {
  enumerable: true,
  get: function get() {
    return _authorizeStep.AuthorizeStep;
  }
});

var _authorizeInterceptor = require('./authorize-interceptor');

Object.defineProperty(exports, 'AuthorizeInterceptor', {
  enumerable: true,
  get: function get() {
    return _authorizeInterceptor.AuthorizeInterceptor;
  }
});

var _authService = require('./auth-service');

Object.defineProperty(exports, 'AuthService', {
  enumerable: true,
  get: function get() {
    return _authService.AuthService;
  }
});
exports.configure = configure;

var _adalInitializer = require('./adal-initializer');

function configure(aurelia, config) {
  aurelia.globalResources('./auth-filter');

  var adalInitializer = aurelia.container.get(_adalInitializer.AdalInitializer);

  adalInitializer.initialize(config);
}