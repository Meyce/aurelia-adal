import * as Logging from 'aurelia-logging';

export class AuthContext {

  logger = Logging.getLogger('adal');

  user = {
    isAuthenticated: false,
    userName: '',
    loginError: '',
    profile: null
  }

  // TODO: move to constructor and rethink injection strategy (? factory)
  initialize(adalContext) {
    this.adal = adalContext;
    this.updateUserFromCache();
  }

  updateUserFromCache() {
    let resource = this.adal.config.loginResource;
    let token = this.adal.getCachedToken(resource);
    this.logger.debug('requested token from cache for "' + resource + '":')
    this.logger.debug(token)

    let user = this.adal.getCachedUser() || {};
    this.logger.debug('requested user from cache:')
    this.logger.debug(user)

    this.user.isAuthenticated = token !== null && token.length > 0;
    this.user.userName = user.userName || '';
    this.user.profile = user.profile || null;
    this.user.loginError = this.adal.getLoginError();

    this.logger.info('updated user from cache')
    this.logger.debug(this.user)
  }

}