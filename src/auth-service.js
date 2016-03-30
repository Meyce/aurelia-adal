import inject from 'aurelia-dependency-injection';
import {AdalManager} from './adal-manager';

@inject(AdalManager)
export class AuthService {

  constructor(adalManager) {
    this.adalManager = adalManager;
  }

  logout() {
    this.adal.logOut();
  }

  getUserAsync() {
    return new Promise((resolve, reject) => {
      this.adal.getUser((error, user) => {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      });
    });
  }
}