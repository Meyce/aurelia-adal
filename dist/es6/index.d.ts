import { FrameworkConfiguration } from 'aurelia-framework';
import { AureliaAdalConfig } from './aurelia-adal-config';
import { AureliaAdalManager } from './aurelia-adal-manager';
export declare module AureliaAdal {
    function configure(frameworkConfig: FrameworkConfiguration, config: AureliaAdalConfig): void;
    class AureliaAdalManager2 extends AureliaAdalManager {
    }
}
