'use strict';

System.register(['./authorize-step', './authorize-interceptor', './auth-service', './adal-initializer'], function (_export, _context) {
  var AdalInitializer;
  return {
    setters: [function (_authorizeStep) {
      var _exportObj = {};
      _exportObj.AuthorizeStep = _authorizeStep.AuthorizeStep;

      _export(_exportObj);
    }, function (_authorizeInterceptor) {
      var _exportObj2 = {};
      _exportObj2.AuthorizeInterceptor = _authorizeInterceptor.AuthorizeInterceptor;

      _export(_exportObj2);
    }, function (_authService) {
      var _exportObj3 = {};
      _exportObj3.AuthService = _authService.AuthService;

      _export(_exportObj3);
    }, function (_adalInitializer) {
      AdalInitializer = _adalInitializer.AdalInitializer;
    }],
    execute: function () {
      function configure(aurelia, config) {
        aurelia.globalResources('./auth-filter');

        var adalInitializer = aurelia.container.get(AdalInitializer);

        adalInitializer.initialize(config);
      }

      _export('configure', configure);
    }
  };
});