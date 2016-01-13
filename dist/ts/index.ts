import { FrameworkConfiguration } from 'aurelia-framework';
import { AureliaAdalConfig } from './aurelia-adal-config';
import { AureliaAdal } from './aurelia-adal';

export function configure(frameworkConfig: FrameworkConfiguration, config: AureliaAdalConfig) {
  let aureliaAdal: AureliaAdal = frameworkConfig.container.get(AureliaAdal);
  
  aureliaAdal.configure(config);
}
