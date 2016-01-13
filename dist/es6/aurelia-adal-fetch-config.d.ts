import { HttpClient } from 'aurelia-fetch-client';
import { AureliaAdal } from './aurelia-adal';
export declare class AureliaAdalFetchConfig {
    private httpClient;
    private aureliaAdal;
    constructor(httpClient: HttpClient, aureliaAdal: AureliaAdal);
    configure(): void;
}
