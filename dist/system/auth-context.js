'use strict';

System.register(['aurelia-logging'], function (_export, _context) {
  "use strict";

  var Logging, AuthContext;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaLogging) {
      Logging = _aureliaLogging;
    }],
    execute: function () {
      _export('AuthContext', AuthContext = function () {
        function AuthContext() {
          _classCallCheck(this, AuthContext);

          this.logger = Logging.getLogger('adal');
          this.user = {
            isAuthenticated: false,
            userName: '',
            loginError: '',
            profile: null
          };
        }

        AuthContext.prototype.initialize = function initialize(adalContext) {
          this.adal = adalContext;
          this.updateUserFromCache();
        };

        AuthContext.prototype.updateUserFromCache = function updateUserFromCache() {
          var resource = this.adal.config.loginResource;
          var token = this.adal.getCachedToken(resource);
          this.logger.debug('requested token from cache for "' + resource + '":');
          this.logger.debug(token);

          var user = this.adal.getCachedUser() || {};
          this.logger.debug('requested user from cache:');
          this.logger.debug(user);

          this.user.isAuthenticated = token !== null && token.length > 0;
          this.user.userName = user.userName || '';
          this.user.profile = user.profile || null;
          this.user.loginError = this.adal.getLoginError();

          this.logger.info('updated user from cache');
          this.logger.debug(this.user);
        };

        return AuthContext;
      }());

      _export('AuthContext', AuthContext);
    }
  };
});