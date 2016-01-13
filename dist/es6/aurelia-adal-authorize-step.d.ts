import { NavigationInstruction } from 'aurelia-router';
import { AureliaAdalManager } from './aurelia-adal-manager';
export declare class AureliaAdalAuthorizeStep {
    private aureliaAdal;
    constructor(aureliaAdal: AureliaAdalManager);
    run(routingContext: NavigationInstruction, next: any): void;
}
