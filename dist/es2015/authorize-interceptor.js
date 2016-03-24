var _dec, _class;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

import inject from 'aurelia-dependency-injection';
import { AdalManager } from './adal-manager';

export let AuthorizeInterceptor = (_dec = inject(AdalManager), _dec(_class = class AuthorizeInterceptor {

  constructor(adalManager) {
    this.adalManager = adalManager;
  }

  request(request) {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _this.adalManager.loadTokenForRequest(request.url, function (token) {
        return request.headers.append('Authorization', 'Bearer ' + token);
      }, function (token) {
        return request.headers.set('Authorization', 'Bearer ' + token);
      });

      return request;
    })();
  }

  responseError(rejection) {
    let notAuthorized = rejection && rejection.status === 401;
    this.adalManager.handleRequestFailed(rejection.config.url, notAuthorized);

    return rejection;
  }
}) || _class);