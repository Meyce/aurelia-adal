import inject from 'aurelia-dependency-injection';
import {Redirect} from 'aurelia-router';
import {AdalManager} from './adal-manager';

@inject(AdalManager)
export class AureliaAdalAuthorizeStep {
  
  constructor(adalManager) {
    this.adalManager = adalManager;
  }

  run(routingContext, next) {
    let hash = window.location.hash; // TODO: PAL

    return this.adalManager.hashHandler(hash, 
      url => next.cancel(new Redirect(url)), // Was callback
      () => {
        // Was not callback
        let loginRoute = ''; // TODO: get login url from aureliaAdal
        let routes = routingContext.getAllInstructions();
        let isAuthenticated = this.adalManager.user.isAuthenticated; // TODO: user lostrekken (dep)

        if (routes.some(i => !!i.config.auth) && !isAuthenticated) {
          // Not logged in, redirect to login route
          return this.adalManager.loginHandler(
            routingContext.fragment, 
            url => next.cancel(new Redirect(url)), 
            () => next.cancel(new Redirect('login redirect'))
          );
        } else if (routes.some(i => i.fragment == loginRoute) && isAuthenticated) {
          // Logged in, current route is the login route
          return next.cancel(new Redirect(''));
        }

        return next();
      }, 
      () => next());
  }
}