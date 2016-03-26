import inject from 'aurelia-dependency-injection';
import * as Adal from 'adaljs';
import AdalAdapter from './adal-adapter';
import AdalManager from './adal-manager';

@inject(Adal, AdalAdapter, AdalManager)
export class AdalConfig {

  constructor(adal, adalAdapter, adalManager) {
    this.adal = adal;
    this.adalAdapter = adalAdapter;
    this.adalManager = adalManager;
  }

  configure(settings) {
    try {
      let configOptions = {};

      // redirect and logout_redirect are set to current location by default
      let existingHash = window.location.hash;
      let pathDefault = window.location.href;
      if (existingHash) {
        pathDefault = pathDefault.replace(existingHash, '');
      }

      settings = settings || {};

      configOptions.tenant = settings.tenant;
      configOptions.clientId = settings.clientId;
      configOptions.endpoints = settings.endpoints;
      configOptions.redirectUri = settings.redirectUri || pathDefault;
      configOptions.postLogoutRedirectUri = settings.postLogoutRedirectUri || pathDefault;
      // TODO: add options

      let authContext = this.adal.inject(configOptions);

      window.AuthenticationContext = () => {
        return authContext; // this.adalAdapter.authContext
      };

      this.adalManager.initialize(authContext);
    } catch (e) {
      console.log(e);
    }
  }
}
