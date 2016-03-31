var _dec, _class;

import inject from 'aurelia-dependency-injection';
import { AuthContext } from './auth-context';

export let AuthService = (_dec = inject(AuthContext), _dec(_class = class AuthService {

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
}) || _class);