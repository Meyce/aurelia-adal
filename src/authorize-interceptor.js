import inject from 'aurelia-dependency-injection';
import {AdalManager} from './adal-manager';

@inject(AdalManager)
export class AuthorizeInterceptor {

  constructor(adalManager) {
    this.adalManager = adalManager;
  }

  async request(request) {
    await this.adalManager.loadTokenForRequest(
      request.url, 
      token => request.headers.append('Authorization', 'Bearer ' + token),
      token => request.headers.set('Authorization', 'Bearer ' + token)
    );

    return request;
  }

  responseError(rejection) {
    let notAuthorized = rejection && rejection.status === 401;
    this.adalManager.handleRequestFailed(rejection.config.url, notAuthorized);
    
    return rejection;
  }
}