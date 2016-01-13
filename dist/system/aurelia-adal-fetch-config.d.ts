import { HttpClient } from 'aurelia-fetch-client';
import { AureliaAdalManager } from './aurelia-adal-manager';
export declare class AureliaAdalFetchConfig {
    private httpClient;
    private aureliaAdal;
    constructor(httpClient: HttpClient, aureliaAdal: AureliaAdalManager);
    configure(): void;
}
