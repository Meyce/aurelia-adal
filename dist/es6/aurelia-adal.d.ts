import { AureliaAdalConfig } from './aurelia-adal-config';
export declare class AureliaAdal {
    private adalConstructor;
    private adal;
    private oauthData;
    constructor(adalConstructor: Adal);
    configure(config: AureliaAdalConfig): void;
    updateDataFromCache(resource: string): void;
    hashHandler(hash: string, redirectHandler: Function, isNotCallbackHandler: Function, nextHandler: Function): void;
    loginHandler(path: string, redirectHandler: Function, handler: Function): any;
    config(): AdalConfig;
    login(): void;
    loginInProgress(): boolean;
    logOut(): void;
    getCachedToken(resource: string): string;
    getUserInfo(): any;
    acquireToken(resource: string): Promise<string>;
    getUser(): Promise<User>;
    getResourceForEndpoint(endpoint: string): string;
    clearCache(): void;
    clearCacheForResource(resource: string): void;
    info(message: string): void;
    verbose(message: string): void;
    isAuthenticated(): boolean;
}
