import { AdalConfig } from './adal-config';
import './auth-filter';
export { AuthorizeStep } from './authorize-step';
export { AuthorizeInterceptor } from './authorize-interceptor';
export { AuthService } from './auth-service';

export function configure(aurelia, settings) {
  aurelia.globalResources('./auth-filter');

  let adalConfig = aurelia.container.get(AdalConfig);

  adalConfig.configure(settings);
}