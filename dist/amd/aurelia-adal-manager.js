"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) {
            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
                resolve(value);
            });
        }
        function onfulfill(value) {
            try {
                step("next", value);
            } catch (e) {
                reject(e);
            }
        }
        function onreject(value) {
            try {
                step("throw", value);
            } catch (e) {
                reject(e);
            }
        }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
define(["require", "exports", 'aurelia-framework', 'adal'], function (require, exports, aurelia_framework_1, Adal) {
    var AureliaAdalManager = (function () {
        function AureliaAdalManager(adalConstructor) {
            _classCallCheck(this, AureliaAdalManager);

            this.adalConstructor = adalConstructor;
            this.oauthData = {
                isAuthenticated: false,
                userName: '',
                loginError: '',
                profile: null
            };
        }

        _createClass(AureliaAdalManager, [{
            key: "configure",
            value: function configure(config) {
                var _this = this;

                try {
                    var configOptions = {};
                    configOptions.tenant = config.tenant;
                    configOptions.clientId = config.clientId;
                    configOptions.endpoints = config.endpoints;
                    // redirect and logout_redirect are set to current location by default
                    var existingHash = window.location.hash;
                    var pathDefault = window.location.href;
                    if (existingHash) {
                        pathDefault = pathDefault.replace(existingHash, '');
                    }
                    configOptions.redirectUri = configOptions.redirectUri || pathDefault;
                    configOptions.postLogoutRedirectUri = configOptions.postLogoutRedirectUri || pathDefault;
                    this.adal = this.adalConstructor.inject(configOptions);
                    window.AuthenticationContext = function () {
                        return _this.adal;
                    };
                    this.updateDataFromCache(this.adal.config.loginResource);
                } catch (e) {
                    console.log(e);
                }
            }
        }, {
            key: "updateDataFromCache",
            value: function updateDataFromCache(resource) {
                var token = this.adal.getCachedToken(resource);
                this.oauthData.isAuthenticated = token !== null && token.length > 0;
                var user = this.adal.getCachedUser() || { userName: '', profile: null };
                this.oauthData.userName = user.userName;
                this.oauthData.profile = user.profile;
                this.oauthData.loginError = this.adal.getLoginError();
            }
        }, {
            key: "hashHandler",
            value: function hashHandler(hash, redirectHandler, isNotCallbackHandler, nextHandler) {
                if (this.adal.isCallback(hash)) {
                    var requestInfo = this.adal.getRequestInfo(hash);
                    this.adal.saveTokenFromHash(requestInfo);
                    if (requestInfo.requestType !== this.adal.REQUEST_TYPE.LOGIN) {
                        this.adal.callback = window.parent.AuthenticationContext().callback;
                        if (requestInfo.requestType === this.adal.REQUEST_TYPE.RENEW_TOKEN) {
                            this.adal.callback = window.parent.callBackMappedToRenewStates[requestInfo.stateResponse];
                        }
                    }
                    // Return to callback if it is sent from iframe
                    if (requestInfo.stateMatch) {
                        if (typeof this.adal.callback === 'function') {
                            // Call within the same context without full page redirect keeps the callback
                            if (requestInfo.requestType === this.adal.REQUEST_TYPE.RENEW_TOKEN) {
                                // Idtoken or Accestoken can be renewed
                                if (requestInfo.parameters['access_token']) {
                                    this.adal.callback(this.adal._getItem(this.adal.CONSTANTS.STORAGE.ERROR_DESCRIPTION), requestInfo.parameters['access_token']);
                                    return nextHandler();
                                } else if (requestInfo.parameters['id_token']) {
                                    this.adal.callback(this.adal._getItem(this.adal.CONSTANTS.STORAGE.ERROR_DESCRIPTION), requestInfo.parameters['id_token']);
                                    return nextHandler();
                                }
                            }
                        } else {
                            // normal full login redirect happened on the page
                            this.updateDataFromCache(this.adal.config.loginResource);
                            if (this.oauthData.userName) {
                                //IDtoken is added as token for the app
                                var _self = this;
                                _self.updateDataFromCache(_self.adal.config.loginResource);
                                // redirect to login requested page
                                var loginStartPage = _self.adal._getItem(_self.adal.CONSTANTS.STORAGE.START_PAGE);
                                if (loginStartPage) {
                                    return redirectHandler(loginStartPage);
                                }
                            } else {}
                        }
                    }
                } else {
                    return isNotCallbackHandler();
                }
            }
        }, {
            key: "loginHandler",
            value: function loginHandler(path, redirectHandler, handler) {
                this.adal.info('Login event for:' + path);
                if (this.adal.config && this.adal.config.localLoginUrl) {
                    return redirectHandler(this.adal.config.localLoginUrl);
                } else {
                    // directly start login flow
                    this.adal._saveItem(this.adal.CONSTANTS.STORAGE.START_PAGE, path);
                    this.adal.info('Start login at:' + window.location.href);
                    // TODO: broadcast login redirect?
                    this.adal.login();
                    return handler();
                }
            }
        }, {
            key: "config",
            value: function config() {
                return this.adal.config;
            }
        }, {
            key: "login",
            value: function login() {
                this.adal.login();
            }
        }, {
            key: "loginInProgress",
            value: function loginInProgress() {
                return this.adal.loginInProgress();
            }
        }, {
            key: "logOut",
            value: function logOut() {
                this.adal.logOut();
            }
        }, {
            key: "getCachedToken",
            value: function getCachedToken(resource) {
                return this.adal.getCachedToken(resource);
            }
        }, {
            key: "getUserInfo",
            value: function getUserInfo() {
                return this.oauthData;
            }
        }, {
            key: "acquireToken",
            value: function acquireToken(resource) {
                var _this2 = this;

                // automated token request call
                return new Promise(function (resolve, reject) {
                    _this2.adal.acquireToken(resource, function (error, tokenOut) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(tokenOut);
                        }
                    });
                });
            }
        }, {
            key: "getUser",
            value: function getUser() {
                return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function callee$3$0() {
                    return regeneratorRuntime.wrap(function callee$3$0$(context$4$0) {
                        var _this3 = this;

                        while (1) switch (context$4$0.prev = context$4$0.next) {
                            case 0:
                                context$4$0.next = 2;
                                return new Promise(function (resolve, reject) {
                                    _this3.adal.getUser(function (error, user) {
                                        if (error) {
                                            reject(error);
                                        } else {
                                            resolve(user);
                                        }
                                    });
                                });

                            case 2:
                                return context$4$0.abrupt("return", context$4$0.sent);

                            case 3:
                            case "end":
                                return context$4$0.stop();
                        }
                    }, callee$3$0, this);
                }));
            }
        }, {
            key: "getResourceForEndpoint",
            value: function getResourceForEndpoint(endpoint) {
                return this.adal.getResourceForEndpoint(endpoint);
            }
        }, {
            key: "clearCache",
            value: function clearCache() {
                this.adal.clearCache();
            }
        }, {
            key: "clearCacheForResource",
            value: function clearCacheForResource(resource) {
                this.adal.clearCacheForResource(resource);
            }
        }, {
            key: "info",
            value: function info(message) {
                this.adal.info(message);
            }
        }, {
            key: "verbose",
            value: function verbose(message) {
                this.adal.verbose(message);
            }
        }, {
            key: "isAuthenticated",
            value: function isAuthenticated() {
                return this.oauthData.isAuthenticated;
            }
        }]);

        return AureliaAdalManager;
    })();
    AureliaAdalManager = __decorate([aurelia_framework_1.inject(Adal), __metadata('design:paramtypes', [Object])], AureliaAdalManager);
    exports.AureliaAdalManager = AureliaAdalManager;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtYWRhbC1tYW5hZ2VyLmpzIiwiYXVyZWxpYS1hZGFsLW1hbmFnZXIudHMiXSwibmFtZXMiOlsiQXVyZWxpYUFkYWxNYW5hZ2VyIiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmNvbnN0cnVjdG9yIiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmNvbmZpZ3VyZSIsIkF1cmVsaWFBZGFsTWFuYWdlci51cGRhdGVEYXRhRnJvbUNhY2hlIiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmhhc2hIYW5kbGVyIiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmxvZ2luSGFuZGxlciIsIkF1cmVsaWFBZGFsTWFuYWdlci5jb25maWciLCJBdXJlbGlhQWRhbE1hbmFnZXIubG9naW4iLCJBdXJlbGlhQWRhbE1hbmFnZXIubG9naW5JblByb2dyZXNzIiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmxvZ091dCIsIkF1cmVsaWFBZGFsTWFuYWdlci5nZXRDYWNoZWRUb2tlbiIsIkF1cmVsaWFBZGFsTWFuYWdlci5nZXRVc2VySW5mbyIsIkF1cmVsaWFBZGFsTWFuYWdlci5hY3F1aXJlVG9rZW4iLCJBdXJlbGlhQWRhbE1hbmFnZXIuZ2V0VXNlciIsIkF1cmVsaWFBZGFsTWFuYWdlci5nZXRSZXNvdXJjZUZvckVuZHBvaW50IiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmNsZWFyQ2FjaGUiLCJBdXJlbGlhQWRhbE1hbmFnZXIuY2xlYXJDYWNoZUZvclJlc291cmNlIiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmluZm8iLCJBdXJlbGlhQWRhbE1hbmFnZXIudmVyYm9zZSIsIkF1cmVsaWFBZGFsTWFuYWdlci5pc0F1dGhlbnRpY2F0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUksVUFBVSxHQUFHLEFBQUMsYUFBUSxVQUFLLFVBQVUsSUFBSyxVQUFVLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUNuRixRQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTTtRQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUk7UUFBRSxDQUFDLENBQUM7QUFDN0gsUUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxLQUMxSCxLQUFLLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQSxJQUFLLENBQUMsQ0FBQztBQUNsSixXQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDakUsQ0FBQztBQUNGLElBQUksVUFBVSxHQUFHLEFBQUMsYUFBUSxVQUFLLFVBQVUsSUFBSyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDMUQsUUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRSxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0NBQzVHLENBQUM7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QSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTthQUM1QkE7OzttQkFHY2xCLDJCQUFBQTtBQUNibUIsdUJBQU9BLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLGVBQWVBLENBQUNBO2FBQ3ZDQTs7OztRQUNGbkIsQ0FBQUE7QUFsTUQsc0JBQUEsR0FBQSxVQUFBLENBQUEsQ0FBQyxtQkFBQSxDQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUQ2TEwsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FDNUMsRUFBRSxrQkFBa0IsQ0FBQyxDQ0l6QjtBQWpNWSxXQUFBLENBQUEsa0JBQWtCLEdBQUEsa0JBaU05QixDQUFBO0NERkEsQ0FBQyxDQUFDIiwiZmlsZSI6ImF1cmVsaWEtYWRhbC1tYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fbWV0YWRhdGEgPSAodGhpcyAmJiB0aGlzLl9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFByb21pc2UsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGdlbmVyYXRvciA9IGdlbmVyYXRvci5jYWxsKHRoaXNBcmcsIF9hcmd1bWVudHMpO1xuICAgICAgICBmdW5jdGlvbiBjYXN0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IFByb21pc2UgPyB2YWx1ZSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgICAgICBmdW5jdGlvbiBvbmZ1bGZpbGwodmFsdWUpIHsgdHJ5IHsgc3RlcChcIm5leHRcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIG9ucmVqZWN0KHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJ0aHJvd1wiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcCh2ZXJiLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGdlbmVyYXRvclt2ZXJiXSh2YWx1ZSk7XG4gICAgICAgICAgICByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGNhc3QocmVzdWx0LnZhbHVlKS50aGVuKG9uZnVsZmlsbCwgb25yZWplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHN0ZXAoXCJuZXh0XCIsIHZvaWQgMCk7XG4gICAgfSk7XG59O1xuZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICdhdXJlbGlhLWZyYW1ld29yaycsICdhZGFsJ10sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBhdXJlbGlhX2ZyYW1ld29ya18xLCBBZGFsKSB7XG4gICAgbGV0IEF1cmVsaWFBZGFsTWFuYWdlciA9IGNsYXNzIHtcbiAgICAgICAgY29uc3RydWN0b3IoYWRhbENvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmFkYWxDb25zdHJ1Y3RvciA9IGFkYWxDb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgIHRoaXMub2F1dGhEYXRhID0ge1xuICAgICAgICAgICAgICAgIGlzQXV0aGVudGljYXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdXNlck5hbWU6ICcnLFxuICAgICAgICAgICAgICAgIGxvZ2luRXJyb3I6ICcnLFxuICAgICAgICAgICAgICAgIHByb2ZpbGU6IG51bGxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uZmlndXJlKGNvbmZpZykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnT3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgICAgIGNvbmZpZ09wdGlvbnMudGVuYW50ID0gY29uZmlnLnRlbmFudDtcbiAgICAgICAgICAgICAgICBjb25maWdPcHRpb25zLmNsaWVudElkID0gY29uZmlnLmNsaWVudElkO1xuICAgICAgICAgICAgICAgIGNvbmZpZ09wdGlvbnMuZW5kcG9pbnRzID0gY29uZmlnLmVuZHBvaW50cztcbiAgICAgICAgICAgICAgICAvLyByZWRpcmVjdCBhbmQgbG9nb3V0X3JlZGlyZWN0IGFyZSBzZXQgdG8gY3VycmVudCBsb2NhdGlvbiBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgbGV0IGV4aXN0aW5nSGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgICAgICAgICAgICAgIGxldCBwYXRoRGVmYXVsdCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ0hhc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aERlZmF1bHQgPSBwYXRoRGVmYXVsdC5yZXBsYWNlKGV4aXN0aW5nSGFzaCwgJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25maWdPcHRpb25zLnJlZGlyZWN0VXJpID0gY29uZmlnT3B0aW9ucy5yZWRpcmVjdFVyaSB8fCBwYXRoRGVmYXVsdDtcbiAgICAgICAgICAgICAgICBjb25maWdPcHRpb25zLnBvc3RMb2dvdXRSZWRpcmVjdFVyaSA9IGNvbmZpZ09wdGlvbnMucG9zdExvZ291dFJlZGlyZWN0VXJpIHx8IHBhdGhEZWZhdWx0O1xuICAgICAgICAgICAgICAgIHRoaXMuYWRhbCA9IHRoaXMuYWRhbENvbnN0cnVjdG9yLmluamVjdChjb25maWdPcHRpb25zKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuQXV0aGVudGljYXRpb25Db250ZXh0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hZGFsO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhRnJvbUNhY2hlKHRoaXMuYWRhbC5jb25maWcubG9naW5SZXNvdXJjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZURhdGFGcm9tQ2FjaGUocmVzb3VyY2UpIHtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IHRoaXMuYWRhbC5nZXRDYWNoZWRUb2tlbihyZXNvdXJjZSk7XG4gICAgICAgICAgICB0aGlzLm9hdXRoRGF0YS5pc0F1dGhlbnRpY2F0ZWQgPSB0b2tlbiAhPT0gbnVsbCAmJiB0b2tlbi5sZW5ndGggPiAwO1xuICAgICAgICAgICAgdmFyIHVzZXIgPSB0aGlzLmFkYWwuZ2V0Q2FjaGVkVXNlcigpIHx8IHsgdXNlck5hbWU6ICcnLCBwcm9maWxlOiBudWxsIH07XG4gICAgICAgICAgICB0aGlzLm9hdXRoRGF0YS51c2VyTmFtZSA9IHVzZXIudXNlck5hbWU7XG4gICAgICAgICAgICB0aGlzLm9hdXRoRGF0YS5wcm9maWxlID0gdXNlci5wcm9maWxlO1xuICAgICAgICAgICAgdGhpcy5vYXV0aERhdGEubG9naW5FcnJvciA9IHRoaXMuYWRhbC5nZXRMb2dpbkVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgICAgaGFzaEhhbmRsZXIoaGFzaCwgcmVkaXJlY3RIYW5kbGVyLCBpc05vdENhbGxiYWNrSGFuZGxlciwgbmV4dEhhbmRsZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFkYWwuaXNDYWxsYmFjayhoYXNoKSkge1xuICAgICAgICAgICAgICAgIGxldCByZXF1ZXN0SW5mbyA9IHRoaXMuYWRhbC5nZXRSZXF1ZXN0SW5mbyhoYXNoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkYWwuc2F2ZVRva2VuRnJvbUhhc2gocmVxdWVzdEluZm8pO1xuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0SW5mby5yZXF1ZXN0VHlwZSAhPT0gdGhpcy5hZGFsLlJFUVVFU1RfVFlQRS5MT0dJTikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWwuY2FsbGJhY2sgPSB3aW5kb3cucGFyZW50LkF1dGhlbnRpY2F0aW9uQ29udGV4dCgpLmNhbGxiYWNrO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdEluZm8ucmVxdWVzdFR5cGUgPT09IHRoaXMuYWRhbC5SRVFVRVNUX1RZUEUuUkVORVdfVE9LRU4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5jYWxsYmFjayA9IHdpbmRvdy5wYXJlbnQuY2FsbEJhY2tNYXBwZWRUb1JlbmV3U3RhdGVzW3JlcXVlc3RJbmZvLnN0YXRlUmVzcG9uc2VdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0byBjYWxsYmFjayBpZiBpdCBpcyBzZW50IGZyb20gaWZyYW1lXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RJbmZvLnN0YXRlTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmFkYWwuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENhbGwgd2l0aGluIHRoZSBzYW1lIGNvbnRleHQgd2l0aG91dCBmdWxsIHBhZ2UgcmVkaXJlY3Qga2VlcHMgdGhlIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdEluZm8ucmVxdWVzdFR5cGUgPT09IHRoaXMuYWRhbC5SRVFVRVNUX1RZUEUuUkVORVdfVE9LRU4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZHRva2VuIG9yIEFjY2VzdG9rZW4gY2FuIGJlIHJlbmV3ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdEluZm8ucGFyYW1ldGVyc1snYWNjZXNzX3Rva2VuJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsLmNhbGxiYWNrKHRoaXMuYWRhbC5fZ2V0SXRlbSh0aGlzLmFkYWwuQ09OU1RBTlRTLlNUT1JBR0UuRVJST1JfREVTQ1JJUFRJT04pLCByZXF1ZXN0SW5mby5wYXJhbWV0ZXJzWydhY2Nlc3NfdG9rZW4nXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0SGFuZGxlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXF1ZXN0SW5mby5wYXJhbWV0ZXJzWydpZF90b2tlbiddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5jYWxsYmFjayh0aGlzLmFkYWwuX2dldEl0ZW0odGhpcy5hZGFsLkNPTlNUQU5UUy5TVE9SQUdFLkVSUk9SX0RFU0NSSVBUSU9OKSwgcmVxdWVzdEluZm8ucGFyYW1ldGVyc1snaWRfdG9rZW4nXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0SGFuZGxlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vcm1hbCBmdWxsIGxvZ2luIHJlZGlyZWN0IGhhcHBlbmVkIG9uIHRoZSBwYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURhdGFGcm9tQ2FjaGUodGhpcy5hZGFsLmNvbmZpZy5sb2dpblJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9hdXRoRGF0YS51c2VyTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSUR0b2tlbiBpcyBhZGRlZCBhcyB0b2tlbiBmb3IgdGhlIGFwcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZURhdGFGcm9tQ2FjaGUoc2VsZi5hZGFsLmNvbmZpZy5sb2dpblJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZWRpcmVjdCB0byBsb2dpbiByZXF1ZXN0ZWQgcGFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsb2dpblN0YXJ0UGFnZSA9IHNlbGYuYWRhbC5fZ2V0SXRlbShzZWxmLmFkYWwuQ09OU1RBTlRTLlNUT1JBR0UuU1RBUlRfUEFHRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvZ2luU3RhcnRQYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWRpcmVjdEhhbmRsZXIobG9naW5TdGFydFBhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzTm90Q2FsbGJhY2tIYW5kbGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbG9naW5IYW5kbGVyKHBhdGgsIHJlZGlyZWN0SGFuZGxlciwgaGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5hZGFsLmluZm8oJ0xvZ2luIGV2ZW50IGZvcjonICsgcGF0aCk7XG4gICAgICAgICAgICBpZiAodGhpcy5hZGFsLmNvbmZpZyAmJiB0aGlzLmFkYWwuY29uZmlnLmxvY2FsTG9naW5VcmwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVkaXJlY3RIYW5kbGVyKHRoaXMuYWRhbC5jb25maWcubG9jYWxMb2dpblVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBkaXJlY3RseSBzdGFydCBsb2dpbiBmbG93XG4gICAgICAgICAgICAgICAgdGhpcy5hZGFsLl9zYXZlSXRlbSh0aGlzLmFkYWwuQ09OU1RBTlRTLlNUT1JBR0UuU1RBUlRfUEFHRSwgcGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGFsLmluZm8oJ1N0YXJ0IGxvZ2luIGF0OicgKyB3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogYnJvYWRjYXN0IGxvZ2luIHJlZGlyZWN0P1xuICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5sb2dpbigpO1xuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uZmlnKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRhbC5jb25maWc7XG4gICAgICAgIH1cbiAgICAgICAgbG9naW4oKSB7XG4gICAgICAgICAgICB0aGlzLmFkYWwubG9naW4oKTtcbiAgICAgICAgfVxuICAgICAgICBsb2dpbkluUHJvZ3Jlc3MoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hZGFsLmxvZ2luSW5Qcm9ncmVzcygpO1xuICAgICAgICB9XG4gICAgICAgIGxvZ091dCgpIHtcbiAgICAgICAgICAgIHRoaXMuYWRhbC5sb2dPdXQoKTtcbiAgICAgICAgfVxuICAgICAgICBnZXRDYWNoZWRUb2tlbihyZXNvdXJjZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRhbC5nZXRDYWNoZWRUb2tlbihyZXNvdXJjZSk7XG4gICAgICAgIH1cbiAgICAgICAgZ2V0VXNlckluZm8oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vYXV0aERhdGE7XG4gICAgICAgIH1cbiAgICAgICAgYWNxdWlyZVRva2VuKHJlc291cmNlKSB7XG4gICAgICAgICAgICAvLyBhdXRvbWF0ZWQgdG9rZW4gcmVxdWVzdCBjYWxsXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5hY3F1aXJlVG9rZW4ocmVzb3VyY2UsIChlcnJvciwgdG9rZW5PdXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0b2tlbk91dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGdldFVzZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWwuZ2V0VXNlcigoZXJyb3IsIHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHVzZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGdldFJlc291cmNlRm9yRW5kcG9pbnQoZW5kcG9pbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChlbmRwb2ludCk7XG4gICAgICAgIH1cbiAgICAgICAgY2xlYXJDYWNoZSgpIHtcbiAgICAgICAgICAgIHRoaXMuYWRhbC5jbGVhckNhY2hlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2xlYXJDYWNoZUZvclJlc291cmNlKHJlc291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLmFkYWwuY2xlYXJDYWNoZUZvclJlc291cmNlKHJlc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgICBpbmZvKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuYWRhbC5pbmZvKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHZlcmJvc2UobWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5hZGFsLnZlcmJvc2UobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgaXNBdXRoZW50aWNhdGVkKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMub2F1dGhEYXRhLmlzQXV0aGVudGljYXRlZDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQXVyZWxpYUFkYWxNYW5hZ2VyID0gX19kZWNvcmF0ZShbXG4gICAgICAgIGF1cmVsaWFfZnJhbWV3b3JrXzEuaW5qZWN0KEFkYWwpLCBcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbT2JqZWN0XSlcbiAgICBdLCBBdXJlbGlhQWRhbE1hbmFnZXIpO1xuICAgIGV4cG9ydHMuQXVyZWxpYUFkYWxNYW5hZ2VyID0gQXVyZWxpYUFkYWxNYW5hZ2VyO1xufSk7XG4iLCJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5pbXBvcnQge0F1cmVsaWFBZGFsQ29uZmlnfSBmcm9tICcuL2F1cmVsaWEtYWRhbC1jb25maWcnO1xyXG5pbXBvcnQgKiBhcyBBZGFsIGZyb20gJ2FkYWwnO1xyXG5cclxuQGluamVjdChBZGFsKVxyXG5leHBvcnQgY2xhc3MgQXVyZWxpYUFkYWxNYW5hZ2VyIHtcclxuXHJcbiAgcHJpdmF0ZSBhZGFsOiBBZGFsO1xyXG4gIHByaXZhdGUgb2F1dGhEYXRhID0ge1xyXG4gICAgaXNBdXRoZW50aWNhdGVkOiBmYWxzZSxcclxuICAgIHVzZXJOYW1lOiAnJyxcclxuICAgIGxvZ2luRXJyb3I6ICcnLFxyXG4gICAgcHJvZmlsZTogbnVsbFxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhZGFsQ29uc3RydWN0b3I6IEFkYWwpIHtcclxuICAgIFxyXG4gIH1cclxuICBcclxuICBjb25maWd1cmUoY29uZmlnOiBBdXJlbGlhQWRhbENvbmZpZykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IGNvbmZpZ09wdGlvbnM6IEFkYWxDb25maWcgPSB7fTtcclxuICAgICAgXHJcbiAgICAgIGNvbmZpZ09wdGlvbnMudGVuYW50ID0gY29uZmlnLnRlbmFudDtcclxuICAgICAgY29uZmlnT3B0aW9ucy5jbGllbnRJZCA9IGNvbmZpZy5jbGllbnRJZDtcclxuICAgICAgY29uZmlnT3B0aW9ucy5lbmRwb2ludHMgPSBjb25maWcuZW5kcG9pbnRzO1xyXG5cclxuICAgICAgLy8gcmVkaXJlY3QgYW5kIGxvZ291dF9yZWRpcmVjdCBhcmUgc2V0IHRvIGN1cnJlbnQgbG9jYXRpb24gYnkgZGVmYXVsdFxyXG4gICAgICBsZXQgZXhpc3RpbmdIYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XHJcbiAgICAgIGxldCBwYXRoRGVmYXVsdCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG4gICAgICBpZiAoZXhpc3RpbmdIYXNoKSB7XHJcbiAgICAgICAgcGF0aERlZmF1bHQgPSBwYXRoRGVmYXVsdC5yZXBsYWNlKGV4aXN0aW5nSGFzaCwgJycpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25maWdPcHRpb25zLnJlZGlyZWN0VXJpID0gY29uZmlnT3B0aW9ucy5yZWRpcmVjdFVyaSB8fCBwYXRoRGVmYXVsdDtcclxuICAgICAgY29uZmlnT3B0aW9ucy5wb3N0TG9nb3V0UmVkaXJlY3RVcmkgPSBjb25maWdPcHRpb25zLnBvc3RMb2dvdXRSZWRpcmVjdFVyaSB8fCBwYXRoRGVmYXVsdDtcclxuXHJcbiAgICAgIHRoaXMuYWRhbCA9IHRoaXMuYWRhbENvbnN0cnVjdG9yLmluamVjdChjb25maWdPcHRpb25zKTtcclxuICAgICAgXHJcbiAgICAgIHdpbmRvdy5BdXRoZW50aWNhdGlvbkNvbnRleHQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRhbDtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgdGhpcy51cGRhdGVEYXRhRnJvbUNhY2hlKHRoaXMuYWRhbC5jb25maWcubG9naW5SZXNvdXJjZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZURhdGFGcm9tQ2FjaGUocmVzb3VyY2U6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdmFyIHRva2VuID0gdGhpcy5hZGFsLmdldENhY2hlZFRva2VuKHJlc291cmNlKTtcclxuICAgIHRoaXMub2F1dGhEYXRhLmlzQXV0aGVudGljYXRlZCA9IHRva2VuICE9PSBudWxsICYmIHRva2VuLmxlbmd0aCA+IDA7XHJcbiAgICB2YXIgdXNlciA9IHRoaXMuYWRhbC5nZXRDYWNoZWRVc2VyKCkgfHwgeyB1c2VyTmFtZTogJycsIHByb2ZpbGU6IG51bGwgfTtcclxuICAgIHRoaXMub2F1dGhEYXRhLnVzZXJOYW1lID0gdXNlci51c2VyTmFtZTtcclxuICAgIHRoaXMub2F1dGhEYXRhLnByb2ZpbGUgPSB1c2VyLnByb2ZpbGU7XHJcbiAgICB0aGlzLm9hdXRoRGF0YS5sb2dpbkVycm9yID0gdGhpcy5hZGFsLmdldExvZ2luRXJyb3IoKTtcclxuICB9XHJcblxyXG4gIGhhc2hIYW5kbGVyKGhhc2g6IHN0cmluZywgcmVkaXJlY3RIYW5kbGVyOiBGdW5jdGlvbiwgaXNOb3RDYWxsYmFja0hhbmRsZXI6IEZ1bmN0aW9uLCBuZXh0SGFuZGxlcjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmFkYWwuaXNDYWxsYmFjayhoYXNoKSkge1xyXG4gICAgICBsZXQgcmVxdWVzdEluZm8gPSB0aGlzLmFkYWwuZ2V0UmVxdWVzdEluZm8oaGFzaCk7XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLmFkYWwuc2F2ZVRva2VuRnJvbUhhc2gocmVxdWVzdEluZm8pO1xyXG5cclxuICAgICAgaWYgKHJlcXVlc3RJbmZvLnJlcXVlc3RUeXBlICE9PSB0aGlzLmFkYWwuUkVRVUVTVF9UWVBFLkxPR0lOKSB7XHJcbiAgICAgICAgdGhpcy5hZGFsLmNhbGxiYWNrID0gd2luZG93LnBhcmVudC5BdXRoZW50aWNhdGlvbkNvbnRleHQoKS5jYWxsYmFjaztcclxuICAgICAgICBpZiAocmVxdWVzdEluZm8ucmVxdWVzdFR5cGUgPT09IHRoaXMuYWRhbC5SRVFVRVNUX1RZUEUuUkVORVdfVE9LRU4pIHtcclxuICAgICAgICAgIHRoaXMuYWRhbC5jYWxsYmFjayA9IHdpbmRvdy5wYXJlbnQuY2FsbEJhY2tNYXBwZWRUb1JlbmV3U3RhdGVzW3JlcXVlc3RJbmZvLnN0YXRlUmVzcG9uc2VdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmV0dXJuIHRvIGNhbGxiYWNrIGlmIGl0IGlzIHNlbnQgZnJvbSBpZnJhbWVcclxuICAgICAgaWYgKHJlcXVlc3RJbmZvLnN0YXRlTWF0Y2gpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYWRhbC5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgLy8gQ2FsbCB3aXRoaW4gdGhlIHNhbWUgY29udGV4dCB3aXRob3V0IGZ1bGwgcGFnZSByZWRpcmVjdCBrZWVwcyB0aGUgY2FsbGJhY2tcclxuICAgICAgICAgIGlmIChyZXF1ZXN0SW5mby5yZXF1ZXN0VHlwZSA9PT0gdGhpcy5hZGFsLlJFUVVFU1RfVFlQRS5SRU5FV19UT0tFTikge1xyXG4gICAgICAgICAgICAvLyBJZHRva2VuIG9yIEFjY2VzdG9rZW4gY2FuIGJlIHJlbmV3ZWRcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3RJbmZvLnBhcmFtZXRlcnNbJ2FjY2Vzc190b2tlbiddKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5hZGFsLmNhbGxiYWNrKHRoaXMuYWRhbC5fZ2V0SXRlbSh0aGlzLmFkYWwuQ09OU1RBTlRTLlNUT1JBR0UuRVJST1JfREVTQ1JJUFRJT04pLCByZXF1ZXN0SW5mby5wYXJhbWV0ZXJzWydhY2Nlc3NfdG9rZW4nXSk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHRIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVxdWVzdEluZm8ucGFyYW1ldGVyc1snaWRfdG9rZW4nXSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuYWRhbC5jYWxsYmFjayh0aGlzLmFkYWwuX2dldEl0ZW0odGhpcy5hZGFsLkNPTlNUQU5UUy5TVE9SQUdFLkVSUk9SX0RFU0NSSVBUSU9OKSwgcmVxdWVzdEluZm8ucGFyYW1ldGVyc1snaWRfdG9rZW4nXSk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHRIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gbm9ybWFsIGZ1bGwgbG9naW4gcmVkaXJlY3QgaGFwcGVuZWQgb24gdGhlIHBhZ2VcclxuICAgICAgICAgIHRoaXMudXBkYXRlRGF0YUZyb21DYWNoZSh0aGlzLmFkYWwuY29uZmlnLmxvZ2luUmVzb3VyY2UpO1xyXG4gICAgICAgICAgaWYgKHRoaXMub2F1dGhEYXRhLnVzZXJOYW1lKSB7XHJcbiAgICAgICAgICAgIC8vSUR0b2tlbiBpcyBhZGRlZCBhcyB0b2tlbiBmb3IgdGhlIGFwcFxyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBzZWxmLnVwZGF0ZURhdGFGcm9tQ2FjaGUoc2VsZi5hZGFsLmNvbmZpZy5sb2dpblJlc291cmNlKTtcclxuICAgICAgICAgICAgLy8gcmVkaXJlY3QgdG8gbG9naW4gcmVxdWVzdGVkIHBhZ2VcclxuICAgICAgICAgICAgdmFyIGxvZ2luU3RhcnRQYWdlID0gc2VsZi5hZGFsLl9nZXRJdGVtKHNlbGYuYWRhbC5DT05TVEFOVFMuU1RPUkFHRS5TVEFSVF9QQUdFKTtcclxuICAgICAgICAgICAgaWYgKGxvZ2luU3RhcnRQYWdlKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlZGlyZWN0SGFuZGxlcihsb2dpblN0YXJ0UGFnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gVE9ETzogYnJvYWRjYXN0IGxvZ2luIHN1Y2Nlc3M/XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBicm9hZGNhc3QgbG9naW4gZmFpbHVyZT8gKHJlYXNvbjogdGhpcy5hZGFsLl9nZXRJdGVtKHRoaXMuYWRhbC5DT05TVEFOVFMuU1RPUkFHRS5FUlJPUl9ERVNDUklQVElPTikpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gaXNOb3RDYWxsYmFja0hhbmRsZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvZ2luSGFuZGxlcihwYXRoOiBzdHJpbmcsIHJlZGlyZWN0SGFuZGxlcjogRnVuY3Rpb24sIGhhbmRsZXI6IEZ1bmN0aW9uKSB7XHJcbiAgICB0aGlzLmFkYWwuaW5mbygnTG9naW4gZXZlbnQgZm9yOicgKyBwYXRoKTtcclxuXHJcbiAgICBpZiAodGhpcy5hZGFsLmNvbmZpZyAmJiB0aGlzLmFkYWwuY29uZmlnLmxvY2FsTG9naW5VcmwpIHtcclxuICAgICAgcmV0dXJuIHJlZGlyZWN0SGFuZGxlcih0aGlzLmFkYWwuY29uZmlnLmxvY2FsTG9naW5VcmwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gZGlyZWN0bHkgc3RhcnQgbG9naW4gZmxvd1xyXG4gICAgICB0aGlzLmFkYWwuX3NhdmVJdGVtKHRoaXMuYWRhbC5DT05TVEFOVFMuU1RPUkFHRS5TVEFSVF9QQUdFLCBwYXRoKTtcclxuICAgICAgdGhpcy5hZGFsLmluZm8oJ1N0YXJ0IGxvZ2luIGF0OicgKyB3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgICAgIC8vIFRPRE86IGJyb2FkY2FzdCBsb2dpbiByZWRpcmVjdD9cclxuICAgICAgdGhpcy5hZGFsLmxvZ2luKCk7XHJcbiAgICAgIHJldHVybiBoYW5kbGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25maWcoKTogQWRhbENvbmZpZyB7XHJcbiAgICByZXR1cm4gdGhpcy5hZGFsLmNvbmZpZztcclxuICB9XHJcblxyXG4gIGxvZ2luKCkge1xyXG4gICAgdGhpcy5hZGFsLmxvZ2luKCk7XHJcbiAgfVxyXG5cclxuICBsb2dpbkluUHJvZ3Jlc3MoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5hZGFsLmxvZ2luSW5Qcm9ncmVzcygpO1xyXG4gIH1cclxuXHJcbiAgbG9nT3V0KCkge1xyXG4gICAgdGhpcy5hZGFsLmxvZ091dCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2FjaGVkVG9rZW4ocmVzb3VyY2U6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5hZGFsLmdldENhY2hlZFRva2VuKHJlc291cmNlKTtcclxuICB9XHJcblxyXG4gIGdldFVzZXJJbmZvKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5vYXV0aERhdGE7XHJcbiAgfVxyXG5cclxuICBhY3F1aXJlVG9rZW4ocmVzb3VyY2U6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAvLyBhdXRvbWF0ZWQgdG9rZW4gcmVxdWVzdCBjYWxsXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuYWRhbC5hY3F1aXJlVG9rZW4ocmVzb3VyY2UsIChlcnJvcjogc3RyaW5nLCB0b2tlbk91dDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXNvbHZlKHRva2VuT3V0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRVc2VyKCk6IFByb21pc2U8VXNlcj4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlPFVzZXI+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5hZGFsLmdldFVzZXIoKGVycm9yOiBzdHJpbmcsIHVzZXI6IFVzZXIpID0+IHtcclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc29sdmUodXNlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChlbmRwb2ludDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChlbmRwb2ludCk7XHJcbiAgfVxyXG5cclxuICBjbGVhckNhY2hlKCkge1xyXG4gICAgdGhpcy5hZGFsLmNsZWFyQ2FjaGUoKTtcclxuICB9XHJcblxyXG4gIGNsZWFyQ2FjaGVGb3JSZXNvdXJjZShyZXNvdXJjZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmFkYWwuY2xlYXJDYWNoZUZvclJlc291cmNlKHJlc291cmNlKTtcclxuICB9XHJcblxyXG4gIGluZm8obWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmFkYWwuaW5mbyhtZXNzYWdlKTtcclxuICB9XHJcblxyXG4gIHZlcmJvc2UobWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmFkYWwudmVyYm9zZShtZXNzYWdlKTtcclxuICB9XHJcblxyXG5cclxuICBpc0F1dGhlbnRpY2F0ZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5vYXV0aERhdGEuaXNBdXRoZW50aWNhdGVkO1xyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
