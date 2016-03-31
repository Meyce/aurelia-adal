var _dec, _class;

import inject from 'aurelia-dependency-injection';
import { AuthContext } from './auth-context';

export let AuthorizeInterceptor = (_dec = inject(AuthContext), _dec(_class = class AuthorizeInterceptor {

  constructor(authContext) {
    this.authContext = authContext;
  }

  request(request) {
    let resource = this.authContext.adal.getResourceForEndpoint(request.url);
    if (resource == null) {
      return Promise.resolve(request);
    }
    this.logger.debug('retrieved resource for endpoint "' + request.url + '":');
    this.logger.debug(resource);

    let tokenStored = this.authContext.adal.getCachedToken(resource);
    if (tokenStored) {
      this.logger.debug('retrieved token for resource:');
      this.logger.debug(tokenStored);

      request.headers.append('Authorization', 'Bearer ' + tokenStored);

      return Promise.resolve(request);
    }

    if (this.authContext.adal.loginInProgress()) {
      this.logger.warn('login already started.');

      return Promise.reject('login already started');
    }

    let isEndpoint = this.authContext.adal.config && Object.keys(this.authContext.adal.config.endpoints).some(endpointUrl => request.url.indexOf(endpointUrl) > -1);
    if (isEndpoint) {
      return new Promise((resolve, reject) => {
        this.logger.info('acquiring token...');
        this.authContext.adal.acquireToken(resource, (error, token) => {
          if (error) {
            this.logger.error('acquiring token failed');
            reject(error);
          } else {
            this.logger.info('token acquired');
            this.logger.debug(token);
            request.headers.set('Authorization', 'Bearer ' + token);
            resolve(request);
          }
        });
      });
    } else {
      return Promise.resolve(request);
    }
  }

  responseError(rejection) {
    let notAuthorized = rejection && rejection.status === 401;

    if (notAuthorized) {
      this.logger.warn('Not authorized');

      let resource = this.authContext.adal.getResourceForEndpoint(rejection.config.url);
      this.authContext.adal.clearCacheForResource(resource);
    }

    return rejection;
  }
}) || _class);