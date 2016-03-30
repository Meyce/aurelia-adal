'use strict';

System.register(['./adal-config', './auth-filter', './authorize-step', './authorize-interceptor', './auth-service'], function (_export, _context) {
  var AdalConfig;
  return {
    setters: [function (_adalConfig) {
      AdalConfig = _adalConfig.AdalConfig;
    }, function (_authFilter) {}, function (_authorizeStep) {
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
    }],
    execute: function () {
      function configure(aurelia, settings) {
        aurelia.globalResources('./auth-filter');

        var adalConfig = aurelia.container.get(AdalConfig);

        adalConfig.configure(settings);
      }

      _export('configure', configure);
    }
  };
});