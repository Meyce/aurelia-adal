import { FrameworkConfiguration } from 'aurelia-framework';
import { AureliaAdalConfig } from './aurelia-adal-config';
import { AureliaAdal } from './aurelia-adal';
import { AureliaAdalFetchConfig } from './aurelia-adal-fetch-config';
import { AureliaAdalAuthorizeStep } from './aurelia-adal-authorize-step';
export declare function configure(frameworkConfig: FrameworkConfiguration, config: AureliaAdalConfig): void;
export { AureliaAdal, AureliaAdalConfig, AureliaAdalFetchConfig, AureliaAdalAuthorizeStep };
