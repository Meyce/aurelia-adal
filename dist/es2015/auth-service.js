var _dec, _class;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

import inject from 'aurelia-dependency-injection';
import { AdalManager } from './adal-manager';

export let AuthService = (_dec = inject(AdalManager), _dec(_class = class AuthService {

  constructor(adalManager) {
    this.adalManager = adalManager;
  }

  logout() {
    this.adal.logOut();
  }

  getUser() {
    var _this = this;

    return _asyncToGenerator(function* () {
      return yield new Promise(function (resolve, reject) {
        _this.adal.getUser(function (error, user) {
          if (error) {
            reject(error);
          } else {
            resolve(user);
          }
        });
      });
    })();
  }
}) || _class);