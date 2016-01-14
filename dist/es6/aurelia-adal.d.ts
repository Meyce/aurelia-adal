declare module 'aurelia-adal' {
  import * as Adal from 'adal';
  import { inject }  from 'aurelia-framework';
  import { Redirect }  from 'aurelia-router';
  import { HttpClient }  from 'aurelia-fetch-client';
  export let AureliaAdalManager: any;
  export let AureliaAdalAuthorizeStep: any;
  export let AureliaAdalFetchConfig: any;
  export var AureliaAdal: any;
  class AureliaAdalManager2 extends AureliaAdalManager {
  }
}