import inject from 'aurelia-dependency-injection';
import {AdalManager} from './adal-manager';

@inject(AdalManager)
export class AuthorizeInterceptor {

  constructor(adalManager) {
    this.adalManager = adalManager;
  }

  request(request) {
    return this.adalManager.loadTokenForRequest(request.url)
      .then(tokenResult => {
        if (tokenResult.fromCache) {
          request.headers.append('Authorization', 'Bearer ' + tokenResult.token);
        } else {
          request.headers.set('Authorization', 'Bearer ' + tokenResult.token);
        }
      })
      .then(request);
  }

  responseError(rejection) {
    let notAuthorized = rejection && rejection.status === 401;
    this.adalManager.handleRequestFailed(rejection.config.url, notAuthorized);
    
    return rejection;
  }
}