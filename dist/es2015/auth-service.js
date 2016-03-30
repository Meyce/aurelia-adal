var _dec, _class;

import inject from 'aurelia-dependency-injection';
import { AdalManager } from './adal-manager';

export let AuthService = (_dec = inject(AdalManager), _dec(_class = class AuthService {

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
}) || _class);