'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthorizeStep = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaPal = require('aurelia-pal');

var _aureliaRouter = require('aurelia-router');

var _aureliaLogging = require('aurelia-logging');

var Logging = _interopRequireWildcard(_aureliaLogging);

var _authContext = require('./auth-context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthorizeStep = exports.AuthorizeStep = (_dec = (0, _aureliaDependencyInjection.inject)(_authContext.AuthContext), _dec(_class = function () {
  function AuthorizeStep(authContext) {
    _classCallCheck(this, AuthorizeStep);

    this.logger = Logging.getLogger('adal');

    this.authContext = authContext;
  }

  AuthorizeStep.prototype.run = function run(routingContext, next) {
    var hash = _aureliaPal.PLATFORM.location.hash;

    var isCallback = this.authContext.adal.isCallback(hash);

    if (isCallback) {
      var requestInfo = this.authContext.adal.getRequestInfo(hash);

      this.authContext.adal.saveTokenFromHash(requestInfo);

      if (requestInfo.requestType !== this.authContext.adal.REQUEST_TYPE.LOGIN) {
        this.authContext.adal.callback = window.parent.AuthenticationContext().callback;
        if (requestInfo.requestType === this.authContext.adal.REQUEST_TYPE.RENEW_TOKEN) {
          this.authContext.adal.callback = window.parent.callBackMappedToRenewStates[requestInfo.stateResponse];
        }
      }

      if (requestInfo.stateMatch) {
        if (typeof this.authContext.adal.callback === 'function') {
          if (requestInfo.requestType === this.authContext.adal.REQUEST_TYPE.RENEW_TOKEN) {
            if (requestInfo.parameters['access_token']) {
              this.authContext.adal.callback(this.authContext.adal._getItem(this.authContext.adal.CONSTANTS.STORAGE.ERROR_DESCRIPTION), requestInfo.parameters['access_token']);
              return next();
            } else if (requestInfo.parameters['id_token']) {
              this.authContext.adal.callback(this.authContext.adal._getItem(this.authContext.adal.CONSTANTS.STORAGE.ERROR_DESCRIPTION), requestInfo.parameters['id_token']);
              return next();
            }
          }
        } else {
          this.authContext.updateUserFromCache();

          if (this.authContext.user.userName) {
            var startPage = this.authContext.adal._getItem(this.authContext.adal.CONSTANTS.STORAGE.START_PAGE);
            if (startPage) {
              return next.cancel(new _aureliaRouter.Redirect(startPage));
            }
            this.logger.info('user successfully logged in');
          } else {
            this.logger.warn('user not logged in, reason: ' + this.authContext.user.loginError);
            this.logger.warn('user not logged in, reason: ' + this.authContext.adal._getItem(this.authContext.adal.CONSTANTS.STORAGE.ERROR_DESCRIPTION));
          }
        }
      }
    } else {

      if (!this.authContext.user.isAuthenticated) {
        if (!!routingContext.config.auth) {

          if (this.authContext.adal.config && this.authContext.adal.config.localLoginUrl) {
            return next.cancel(new _aureliaRouter.Redirect(this.authContext.adal.config.localLoginUrl));
          } else {
            this.authContext.adal._saveItem(this.authContext.adal.CONSTANTS.STORAGE.START_PAGE, routingContext.fragment);

            this.logger.info('login started; redirecting to Azure.');
            this.authContext.adal.login();
            this.logger.info('login finished');

            return next.cancel('login redirect');
          }
        }
      } else {
          if (!!routingContext.config.login) {
            this.logger.warn('user already logged in. redirecting...');
            var _startPage = this.authContext.adal._getItem(this.authContext.adal.CONSTANTS.STORAGE.START_PAGE);

            return next.cancel(new _aureliaRouter.Redirect(_startPage));
          }
        }

      return next();
    }
  };

  return AuthorizeStep;
}()) || _class);