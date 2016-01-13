import { FrameworkConfiguration } from 'aurelia-framework';
import { AureliaAdalConfig } from './aurelia-adal-config';
import { AureliaAdal } from './aurelia-adal';
import { AureliaAdalFetchConfig } from './aurelia-adal-fetch-config';
import { AureliaAdalAuthorizeStep } from './aurelia-adal-authorize-step';

export function configure(frameworkConfig: FrameworkConfiguration, config: AureliaAdalConfig) {
  let aureliaAdal: AureliaAdal = frameworkConfig.container.get(AureliaAdal);
  
  aureliaAdal.configure(config);
}

export {
    AureliaAdal,
    AureliaAdalConfig,
    AureliaAdalFetchConfig,
    AureliaAdalAuthorizeStep
}