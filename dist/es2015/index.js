export { AuthorizeStep } from './authorize-step';
export { AuthorizeInterceptor } from './authorize-interceptor';
export { AuthService } from './auth-service';
import { AdalInitializer } from './adal-initializer';

export function configure(aurelia, config) {
  aurelia.globalResources('./auth-filter');

  let adalInitializer = aurelia.container.get(AdalInitializer);

  adalInitializer.initialize(config);
}