import {inject} from 'aurelia-dependency-injection';
import {AuthContext} from './auth-context';

@inject(AuthContext)
export class AuthService {

  constructor(authContext) {
    this.authContext = authContext;
  }

  logout() {
    this.authContext.adal.logOut();
  }

  getUserAsync() {
    return new Promise((resolve, reject) => {
      this.authContext.adal.getUser((error, user) => {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      });
    });
  }
}