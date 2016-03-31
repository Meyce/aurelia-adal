'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthContext = undefined;

var _aureliaLogging = require('aurelia-logging');

var Logging = _interopRequireWildcard(_aureliaLogging);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthContext = exports.AuthContext = function () {
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
}();