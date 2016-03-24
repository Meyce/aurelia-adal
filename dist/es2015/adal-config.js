var _dec, _class;

import inject from 'aurelia-dependency-injection';
import Platform from 'aurelia-pal';
import * as Adal from 'adaljs';
import AdalAdapter from './adal-adapter';
import AdalManager from './adal-manager';

export let AdalConfig = (_dec = inject(Adal, AdalAdapter, AdalManager, Platform), _dec(_class = class AdalConfig {

  constructor(adal, adalAdapter, adalManager, platform) {
    this.adal = adal;
    this.platform = platform;
    this.adalAdapter = adalAdapter;
    this.adalManager = adalManager;
  }

  configure(settings) {
    try {
      let configOptions = {};

      let existingHash = this.platform.location.hash;
      let pathDefault = this.platform.location.href;
      if (existingHash) {
        pathDefault = pathDefault.replace(existingHash, '');
      }

      settings = settings || {};

      configOptions.tenant = settings.tenant;
      configOptions.clientId = settings.clientId;
      configOptions.endpoints = settings.endpoints;
      configOptions.redirectUri = settings.redirectUri || pathDefault;
      configOptions.postLogoutRedirectUri = settings.postLogoutRedirectUri || pathDefault;


      let authContext = this.adal.inject(configOptions);

      this.platform.global.AuthenticationContext = () => {
        return authContext;
      };

      this.adalManager.initialize(authContext);
    } catch (e) {
      console.log(e);
    }
  }

}) || _class);