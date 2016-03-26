var _dec, _class;

import inject from 'aurelia-dependency-injection';
import { Redirect } from 'aurelia-router';
import { AdalManager } from './adal-manager';

export let AuthorizeStep = (_dec = inject(AdalManager), _dec(_class = class AuthorizeStep {

  constructor(adalManager) {
    this.adalManager = adalManager;
  }

  run(routingContext, next) {
    let hash = window.location.hash;

    return this.adalManager.hashHandler(hash, url => next.cancel(new Redirect(url)), () => {
      let loginRoute = '';
      let routes = routingContext.getAllInstructions();
      let isAuthenticated = this.adalManager.user.isAuthenticated;

      if (routes.some(i => !!i.config.auth) && !isAuthenticated) {
        return this.adalManager.loginHandler(routingContext.fragment, url => next.cancel(new Redirect(url)), () => next.cancel(new Redirect('login redirect')));
      } else if (routes.some(i => i.fragment == loginRoute) && isAuthenticated) {
        return next.cancel(new Redirect(''));
      }

      return next();
    }, () => next());
  }
}) || _class);