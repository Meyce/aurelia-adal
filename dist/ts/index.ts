import { FrameworkConfiguration } from 'aurelia-framework';
import { AureliaAdalConfig } from './aurelia-adal-config';
import { AureliaAdalManager } from './aurelia-adal-manager';

export function configure(frameworkConfig: FrameworkConfiguration, config: AureliaAdalConfig) {
  let aureliaAdal: AureliaAdalManager = frameworkConfig.container.get(AureliaAdalManager);

  aureliaAdal.configure(config);
}