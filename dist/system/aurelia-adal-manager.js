'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

System.register(['aurelia-framework', 'adal'], function (exports_1) {
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __awaiter = this && this.__awaiter || function (thisArg, _arguments, Promise, generator) {
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
    var aurelia_framework_1, Adal;
    var AureliaAdalManager;
    return {
        setters: [function (aurelia_framework_1_1) {
            aurelia_framework_1 = aurelia_framework_1_1;
        }, function (Adal_1) {
            Adal = Adal_1;
        }],
        execute: function execute() {
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
                    key: 'configure',
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
                    key: 'updateDataFromCache',
                    value: function updateDataFromCache(resource) {
                        var token = this.adal.getCachedToken(resource);
                        this.oauthData.isAuthenticated = token !== null && token.length > 0;
                        var user = this.adal.getCachedUser() || { userName: '', profile: null };
                        this.oauthData.userName = user.userName;
                        this.oauthData.profile = user.profile;
                        this.oauthData.loginError = this.adal.getLoginError();
                    }
                }, {
                    key: 'hashHandler',
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
                    key: 'loginHandler',
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
                    key: 'config',
                    value: function config() {
                        return this.adal.config;
                    }
                }, {
                    key: 'login',
                    value: function login() {
                        this.adal.login();
                    }
                }, {
                    key: 'loginInProgress',
                    value: function loginInProgress() {
                        return this.adal.loginInProgress();
                    }
                }, {
                    key: 'logOut',
                    value: function logOut() {
                        this.adal.logOut();
                    }
                }, {
                    key: 'getCachedToken',
                    value: function getCachedToken(resource) {
                        return this.adal.getCachedToken(resource);
                    }
                }, {
                    key: 'getUserInfo',
                    value: function getUserInfo() {
                        return this.oauthData;
                    }
                }, {
                    key: 'acquireToken',
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
                    key: 'getUser',
                    value: function getUser() {
                        return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function callee$4$0() {
                            return regeneratorRuntime.wrap(function callee$4$0$(context$5$0) {
                                var _this3 = this;

                                while (1) switch (context$5$0.prev = context$5$0.next) {
                                    case 0:
                                        context$5$0.next = 2;
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
                                        return context$5$0.abrupt('return', context$5$0.sent);

                                    case 3:
                                    case 'end':
                                        return context$5$0.stop();
                                }
                            }, callee$4$0, this);
                        }));
                    }
                }, {
                    key: 'getResourceForEndpoint',
                    value: function getResourceForEndpoint(endpoint) {
                        return this.adal.getResourceForEndpoint(endpoint);
                    }
                }, {
                    key: 'clearCache',
                    value: function clearCache() {
                        this.adal.clearCache();
                    }
                }, {
                    key: 'clearCacheForResource',
                    value: function clearCacheForResource(resource) {
                        this.adal.clearCacheForResource(resource);
                    }
                }, {
                    key: 'info',
                    value: function info(message) {
                        this.adal.info(message);
                    }
                }, {
                    key: 'verbose',
                    value: function verbose(message) {
                        this.adal.verbose(message);
                    }
                }, {
                    key: 'isAuthenticated',
                    value: function isAuthenticated() {
                        return this.oauthData.isAuthenticated;
                    }
                }]);

                return AureliaAdalManager;
            })();
            AureliaAdalManager = __decorate([aurelia_framework_1.inject(Adal), __metadata('design:paramtypes', [Object])], AureliaAdalManager);
            AureliaAdalManager = AureliaAdalManager;
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtYWRhbC1tYW5hZ2VyLmpzIiwiYXVyZWxpYS1hZGFsLW1hbmFnZXIudHMiXSwibmFtZXMiOlsiQXVyZWxpYUFkYWxNYW5hZ2VyIiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmNvbnN0cnVjdG9yIiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmNvbmZpZ3VyZSIsIkF1cmVsaWFBZGFsTWFuYWdlci51cGRhdGVEYXRhRnJvbUNhY2hlIiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmhhc2hIYW5kbGVyIiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmxvZ2luSGFuZGxlciIsIkF1cmVsaWFBZGFsTWFuYWdlci5jb25maWciLCJBdXJlbGlhQWRhbE1hbmFnZXIubG9naW4iLCJBdXJlbGlhQWRhbE1hbmFnZXIubG9naW5JblByb2dyZXNzIiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmxvZ091dCIsIkF1cmVsaWFBZGFsTWFuYWdlci5nZXRDYWNoZWRUb2tlbiIsIkF1cmVsaWFBZGFsTWFuYWdlci5nZXRVc2VySW5mbyIsIkF1cmVsaWFBZGFsTWFuYWdlci5hY3F1aXJlVG9rZW4iLCJBdXJlbGlhQWRhbE1hbmFnZXIuZ2V0VXNlciIsIkF1cmVsaWFBZGFsTWFuYWdlci5nZXRSZXNvdXJjZUZvckVuZHBvaW50IiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmNsZWFyQ2FjaGUiLCJBdXJlbGlhQWRhbE1hbmFnZXIuY2xlYXJDYWNoZUZvclJlc291cmNlIiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmluZm8iLCJBdXJlbGlhQWRhbE1hbmFnZXIudmVyYm9zZSIsIkF1cmVsaWFBZGFsTWFuYWdlci5pc0F1dGhlbnRpY2F0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsRUFBRSxVQUFTLFNBQVMsRUFBRTtBQUMvRCxRQUFJLFVBQVUsR0FBRyxBQUFDLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFLLFVBQVUsVUFBVSxF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QWdCQSxFQUFBQTtBQUNwQ2dCLDRCQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxxQkFBcUJBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO3FCQUMzQ0E7OzsyQkFFR2hCLGNBQUNBLE9BQWVBLEVBQUFBO0FBQ2xCaUIsNEJBQUlBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO3FCQUN6QkE7OzsyQkFFTWpCLGlCQUFDQSxPQUFlQSxFQUFBQTtBQUNyQmtCLDRCQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtxQkFDNUJBOzs7MkJBR2NsQiwyQkFBQUE7QUFDYm1CLCtCQUFPQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxlQUFlQSxDQUFDQTtxQkFDdkNBOzs7O2dCQUNGbkIsQ0FBQUE7QUFsTUQsOEJBQUEsR0FBQSxVQUFBLENBQUEsQ0FBQyxtQkFBQSxDQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUR3TUcsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FDNUMsRUFBRSxrQkFBa0IsQ0FBQyxDQ1BqQztBQWpNWSw4QkFBa0IsR0FBQSxrQkFpTTlCLENBQUE7U0RTUTtLQUNKLENBQUE7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoiYXVyZWxpYS1hZGFsLW1hbmFnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoWydhdXJlbGlhLWZyYW1ld29yaycsICdhZGFsJ10sIGZ1bmN0aW9uKGV4cG9ydHNfMSkge1xuICAgIHZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICAgICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICAgICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICAgICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbiAgICB9O1xuICAgIHZhciBfX21ldGFkYXRhID0gKHRoaXMgJiYgdGhpcy5fX21ldGFkYXRhKSB8fCBmdW5jdGlvbiAoaywgdikge1xuICAgICAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEoaywgdik7XG4gICAgfTtcbiAgICB2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQcm9taXNlLCBnZW5lcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGdlbmVyYXRvciA9IGdlbmVyYXRvci5jYWxsKHRoaXNBcmcsIF9hcmd1bWVudHMpO1xuICAgICAgICAgICAgZnVuY3Rpb24gY2FzdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlID8gdmFsdWUgOiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uZnVsZmlsbCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwibmV4dFwiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9ucmVqZWN0KHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJ0aHJvd1wiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIHN0ZXAodmVyYiwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gZ2VuZXJhdG9yW3ZlcmJdKHZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGNhc3QocmVzdWx0LnZhbHVlKS50aGVuKG9uZnVsZmlsbCwgb25yZWplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RlcChcIm5leHRcIiwgdm9pZCAwKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgYXVyZWxpYV9mcmFtZXdvcmtfMSwgQWRhbDtcbiAgICB2YXIgQXVyZWxpYUFkYWxNYW5hZ2VyO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6W1xuICAgICAgICAgICAgZnVuY3Rpb24gKGF1cmVsaWFfZnJhbWV3b3JrXzFfMSkge1xuICAgICAgICAgICAgICAgIGF1cmVsaWFfZnJhbWV3b3JrXzEgPSBhdXJlbGlhX2ZyYW1ld29ya18xXzE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKEFkYWxfMSkge1xuICAgICAgICAgICAgICAgIEFkYWwgPSBBZGFsXzE7XG4gICAgICAgICAgICB9XSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgQXVyZWxpYUFkYWxNYW5hZ2VyID0gY2xhc3Mge1xuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKGFkYWxDb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWxDb25zdHJ1Y3RvciA9IGFkYWxDb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYXV0aERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlck5hbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9naW5FcnJvcjogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlOiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyZShjb25maWcpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb25maWdPcHRpb25zID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWdPcHRpb25zLnRlbmFudCA9IGNvbmZpZy50ZW5hbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWdPcHRpb25zLmNsaWVudElkID0gY29uZmlnLmNsaWVudElkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnT3B0aW9ucy5lbmRwb2ludHMgPSBjb25maWcuZW5kcG9pbnRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVkaXJlY3QgYW5kIGxvZ291dF9yZWRpcmVjdCBhcmUgc2V0IHRvIGN1cnJlbnQgbG9jYXRpb24gYnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGV4aXN0aW5nSGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGhEZWZhdWx0ID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdIYXNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aERlZmF1bHQgPSBwYXRoRGVmYXVsdC5yZXBsYWNlKGV4aXN0aW5nSGFzaCwgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnT3B0aW9ucy5yZWRpcmVjdFVyaSA9IGNvbmZpZ09wdGlvbnMucmVkaXJlY3RVcmkgfHwgcGF0aERlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWdPcHRpb25zLnBvc3RMb2dvdXRSZWRpcmVjdFVyaSA9IGNvbmZpZ09wdGlvbnMucG9zdExvZ291dFJlZGlyZWN0VXJpIHx8IHBhdGhEZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsID0gdGhpcy5hZGFsQ29uc3RydWN0b3IuaW5qZWN0KGNvbmZpZ09wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LkF1dGhlbnRpY2F0aW9uQ29udGV4dCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hZGFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRGF0YUZyb21DYWNoZSh0aGlzLmFkYWwuY29uZmlnLmxvZ2luUmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1cGRhdGVEYXRhRnJvbUNhY2hlKHJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IHRoaXMuYWRhbC5nZXRDYWNoZWRUb2tlbihyZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2F1dGhEYXRhLmlzQXV0aGVudGljYXRlZCA9IHRva2VuICE9PSBudWxsICYmIHRva2VuLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAgICAgICAgIHZhciB1c2VyID0gdGhpcy5hZGFsLmdldENhY2hlZFVzZXIoKSB8fCB7IHVzZXJOYW1lOiAnJywgcHJvZmlsZTogbnVsbCB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9hdXRoRGF0YS51c2VyTmFtZSA9IHVzZXIudXNlck5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2F1dGhEYXRhLnByb2ZpbGUgPSB1c2VyLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2F1dGhEYXRhLmxvZ2luRXJyb3IgPSB0aGlzLmFkYWwuZ2V0TG9naW5FcnJvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBoYXNoSGFuZGxlcihoYXNoLCByZWRpcmVjdEhhbmRsZXIsIGlzTm90Q2FsbGJhY2tIYW5kbGVyLCBuZXh0SGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZGFsLmlzQ2FsbGJhY2soaGFzaCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXF1ZXN0SW5mbyA9IHRoaXMuYWRhbC5nZXRSZXF1ZXN0SW5mbyhoYXNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5zYXZlVG9rZW5Gcm9tSGFzaChyZXF1ZXN0SW5mbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdEluZm8ucmVxdWVzdFR5cGUgIT09IHRoaXMuYWRhbC5SRVFVRVNUX1RZUEUuTE9HSU4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWwuY2FsbGJhY2sgPSB3aW5kb3cucGFyZW50LkF1dGhlbnRpY2F0aW9uQ29udGV4dCgpLmNhbGxiYWNrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0SW5mby5yZXF1ZXN0VHlwZSA9PT0gdGhpcy5hZGFsLlJFUVVFU1RfVFlQRS5SRU5FV19UT0tFTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWwuY2FsbGJhY2sgPSB3aW5kb3cucGFyZW50LmNhbGxCYWNrTWFwcGVkVG9SZW5ld1N0YXRlc1tyZXF1ZXN0SW5mby5zdGF0ZVJlc3BvbnNlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdG8gY2FsbGJhY2sgaWYgaXQgaXMgc2VudCBmcm9tIGlmcmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RJbmZvLnN0YXRlTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuYWRhbC5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDYWxsIHdpdGhpbiB0aGUgc2FtZSBjb250ZXh0IHdpdGhvdXQgZnVsbCBwYWdlIHJlZGlyZWN0IGtlZXBzIHRoZSBjYWxsYmFja1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdEluZm8ucmVxdWVzdFR5cGUgPT09IHRoaXMuYWRhbC5SRVFVRVNUX1RZUEUuUkVORVdfVE9LRU4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElkdG9rZW4gb3IgQWNjZXN0b2tlbiBjYW4gYmUgcmVuZXdlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RJbmZvLnBhcmFtZXRlcnNbJ2FjY2Vzc190b2tlbiddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsLmNhbGxiYWNrKHRoaXMuYWRhbC5fZ2V0SXRlbSh0aGlzLmFkYWwuQ09OU1RBTlRTLlNUT1JBR0UuRVJST1JfREVTQ1JJUFRJT04pLCByZXF1ZXN0SW5mby5wYXJhbWV0ZXJzWydhY2Nlc3NfdG9rZW4nXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHRIYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXF1ZXN0SW5mby5wYXJhbWV0ZXJzWydpZF90b2tlbiddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsLmNhbGxiYWNrKHRoaXMuYWRhbC5fZ2V0SXRlbSh0aGlzLmFkYWwuQ09OU1RBTlRTLlNUT1JBR0UuRVJST1JfREVTQ1JJUFRJT04pLCByZXF1ZXN0SW5mby5wYXJhbWV0ZXJzWydpZF90b2tlbiddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dEhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm9ybWFsIGZ1bGwgbG9naW4gcmVkaXJlY3QgaGFwcGVuZWQgb24gdGhlIHBhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhRnJvbUNhY2hlKHRoaXMuYWRhbC5jb25maWcubG9naW5SZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9hdXRoRGF0YS51c2VyTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JRHRva2VuIGlzIGFkZGVkIGFzIHRva2VuIGZvciB0aGUgYXBwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZURhdGFGcm9tQ2FjaGUoc2VsZi5hZGFsLmNvbmZpZy5sb2dpblJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlZGlyZWN0IHRvIGxvZ2luIHJlcXVlc3RlZCBwYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbG9naW5TdGFydFBhZ2UgPSBzZWxmLmFkYWwuX2dldEl0ZW0oc2VsZi5hZGFsLkNPTlNUQU5UUy5TVE9SQUdFLlNUQVJUX1BBR0UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvZ2luU3RhcnRQYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZGlyZWN0SGFuZGxlcihsb2dpblN0YXJ0UGFnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNOb3RDYWxsYmFja0hhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb2dpbkhhbmRsZXIocGF0aCwgcmVkaXJlY3RIYW5kbGVyLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5pbmZvKCdMb2dpbiBldmVudCBmb3I6JyArIHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZGFsLmNvbmZpZyAmJiB0aGlzLmFkYWwuY29uZmlnLmxvY2FsTG9naW5VcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWRpcmVjdEhhbmRsZXIodGhpcy5hZGFsLmNvbmZpZy5sb2NhbExvZ2luVXJsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRpcmVjdGx5IHN0YXJ0IGxvZ2luIGZsb3dcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5fc2F2ZUl0ZW0odGhpcy5hZGFsLkNPTlNUQU5UUy5TVE9SQUdFLlNUQVJUX1BBR0UsIHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsLmluZm8oJ1N0YXJ0IGxvZ2luIGF0OicgKyB3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBicm9hZGNhc3QgbG9naW4gcmVkaXJlY3Q/XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWwubG9naW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uZmlnKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hZGFsLmNvbmZpZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbG9naW4oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5sb2dpbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb2dpbkluUHJvZ3Jlc3MoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFkYWwubG9naW5JblByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvZ091dCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsLmxvZ091dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBnZXRDYWNoZWRUb2tlbihyZXNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hZGFsLmdldENhY2hlZFRva2VuKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZ2V0VXNlckluZm8oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9hdXRoRGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWNxdWlyZVRva2VuKHJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGF1dG9tYXRlZCB0b2tlbiByZXF1ZXN0IGNhbGxcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5hY3F1aXJlVG9rZW4ocmVzb3VyY2UsIChlcnJvciwgdG9rZW5PdXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodG9rZW5PdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZ2V0VXNlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5nZXRVc2VyKChlcnJvciwgdXNlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHVzZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGdldFJlc291cmNlRm9yRW5kcG9pbnQoZW5kcG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRhbC5nZXRSZXNvdXJjZUZvckVuZHBvaW50KGVuZHBvaW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xlYXJDYWNoZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsLmNsZWFyQ2FjaGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xlYXJDYWNoZUZvclJlc291cmNlKHJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5jbGVhckNhY2hlRm9yUmVzb3VyY2UocmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbmZvKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsLmluZm8obWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZlcmJvc2UobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWwudmVyYm9zZShtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaXNBdXRoZW50aWNhdGVkKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vYXV0aERhdGEuaXNBdXRoZW50aWNhdGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBBdXJlbGlhQWRhbE1hbmFnZXIgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgICAgICAgICBhdXJlbGlhX2ZyYW1ld29ya18xLmluamVjdChBZGFsKSwgXG4gICAgICAgICAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbT2JqZWN0XSlcbiAgICAgICAgICAgIF0sIEF1cmVsaWFBZGFsTWFuYWdlcik7XG4gICAgICAgICAgICBBdXJlbGlhQWRhbE1hbmFnZXIgPSBBdXJlbGlhQWRhbE1hbmFnZXI7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7QXVyZWxpYUFkYWxDb25maWd9IGZyb20gJy4vYXVyZWxpYS1hZGFsLWNvbmZpZyc7XHJcbmltcG9ydCAqIGFzIEFkYWwgZnJvbSAnYWRhbCc7XHJcblxyXG5AaW5qZWN0KEFkYWwpXHJcbmV4cG9ydCBjbGFzcyBBdXJlbGlhQWRhbE1hbmFnZXIge1xyXG5cclxuICBwcml2YXRlIGFkYWw6IEFkYWw7XHJcbiAgcHJpdmF0ZSBvYXV0aERhdGEgPSB7XHJcbiAgICBpc0F1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxyXG4gICAgdXNlck5hbWU6ICcnLFxyXG4gICAgbG9naW5FcnJvcjogJycsXHJcbiAgICBwcm9maWxlOiBudWxsXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFkYWxDb25zdHJ1Y3RvcjogQWRhbCkge1xyXG4gICAgXHJcbiAgfVxyXG4gIFxyXG4gIGNvbmZpZ3VyZShjb25maWc6IEF1cmVsaWFBZGFsQ29uZmlnKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgY29uZmlnT3B0aW9uczogQWRhbENvbmZpZyA9IHt9O1xyXG4gICAgICBcclxuICAgICAgY29uZmlnT3B0aW9ucy50ZW5hbnQgPSBjb25maWcudGVuYW50O1xyXG4gICAgICBjb25maWdPcHRpb25zLmNsaWVudElkID0gY29uZmlnLmNsaWVudElkO1xyXG4gICAgICBjb25maWdPcHRpb25zLmVuZHBvaW50cyA9IGNvbmZpZy5lbmRwb2ludHM7XHJcblxyXG4gICAgICAvLyByZWRpcmVjdCBhbmQgbG9nb3V0X3JlZGlyZWN0IGFyZSBzZXQgdG8gY3VycmVudCBsb2NhdGlvbiBieSBkZWZhdWx0XHJcbiAgICAgIGxldCBleGlzdGluZ0hhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuICAgICAgbGV0IHBhdGhEZWZhdWx0ID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgIGlmIChleGlzdGluZ0hhc2gpIHtcclxuICAgICAgICBwYXRoRGVmYXVsdCA9IHBhdGhEZWZhdWx0LnJlcGxhY2UoZXhpc3RpbmdIYXNoLCAnJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbmZpZ09wdGlvbnMucmVkaXJlY3RVcmkgPSBjb25maWdPcHRpb25zLnJlZGlyZWN0VXJpIHx8IHBhdGhEZWZhdWx0O1xyXG4gICAgICBjb25maWdPcHRpb25zLnBvc3RMb2dvdXRSZWRpcmVjdFVyaSA9IGNvbmZpZ09wdGlvbnMucG9zdExvZ291dFJlZGlyZWN0VXJpIHx8IHBhdGhEZWZhdWx0O1xyXG5cclxuICAgICAgdGhpcy5hZGFsID0gdGhpcy5hZGFsQ29uc3RydWN0b3IuaW5qZWN0KGNvbmZpZ09wdGlvbnMpO1xyXG4gICAgICBcclxuICAgICAgd2luZG93LkF1dGhlbnRpY2F0aW9uQ29udGV4dCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hZGFsO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLnVwZGF0ZURhdGFGcm9tQ2FjaGUodGhpcy5hZGFsLmNvbmZpZy5sb2dpblJlc291cmNlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlRGF0YUZyb21DYWNoZShyZXNvdXJjZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB2YXIgdG9rZW4gPSB0aGlzLmFkYWwuZ2V0Q2FjaGVkVG9rZW4ocmVzb3VyY2UpO1xyXG4gICAgdGhpcy5vYXV0aERhdGEuaXNBdXRoZW50aWNhdGVkID0gdG9rZW4gIT09IG51bGwgJiYgdG9rZW4ubGVuZ3RoID4gMDtcclxuICAgIHZhciB1c2VyID0gdGhpcy5hZGFsLmdldENhY2hlZFVzZXIoKSB8fCB7IHVzZXJOYW1lOiAnJywgcHJvZmlsZTogbnVsbCB9O1xyXG4gICAgdGhpcy5vYXV0aERhdGEudXNlck5hbWUgPSB1c2VyLnVzZXJOYW1lO1xyXG4gICAgdGhpcy5vYXV0aERhdGEucHJvZmlsZSA9IHVzZXIucHJvZmlsZTtcclxuICAgIHRoaXMub2F1dGhEYXRhLmxvZ2luRXJyb3IgPSB0aGlzLmFkYWwuZ2V0TG9naW5FcnJvcigpO1xyXG4gIH1cclxuXHJcbiAgaGFzaEhhbmRsZXIoaGFzaDogc3RyaW5nLCByZWRpcmVjdEhhbmRsZXI6IEZ1bmN0aW9uLCBpc05vdENhbGxiYWNrSGFuZGxlcjogRnVuY3Rpb24sIG5leHRIYW5kbGVyOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuYWRhbC5pc0NhbGxiYWNrKGhhc2gpKSB7XHJcbiAgICAgIGxldCByZXF1ZXN0SW5mbyA9IHRoaXMuYWRhbC5nZXRSZXF1ZXN0SW5mbyhoYXNoKTtcclxuICAgICAgXHJcbiAgICAgIHRoaXMuYWRhbC5zYXZlVG9rZW5Gcm9tSGFzaChyZXF1ZXN0SW5mbyk7XHJcblxyXG4gICAgICBpZiAocmVxdWVzdEluZm8ucmVxdWVzdFR5cGUgIT09IHRoaXMuYWRhbC5SRVFVRVNUX1RZUEUuTE9HSU4pIHtcclxuICAgICAgICB0aGlzLmFkYWwuY2FsbGJhY2sgPSB3aW5kb3cucGFyZW50LkF1dGhlbnRpY2F0aW9uQ29udGV4dCgpLmNhbGxiYWNrO1xyXG4gICAgICAgIGlmIChyZXF1ZXN0SW5mby5yZXF1ZXN0VHlwZSA9PT0gdGhpcy5hZGFsLlJFUVVFU1RfVFlQRS5SRU5FV19UT0tFTikge1xyXG4gICAgICAgICAgdGhpcy5hZGFsLmNhbGxiYWNrID0gd2luZG93LnBhcmVudC5jYWxsQmFja01hcHBlZFRvUmVuZXdTdGF0ZXNbcmVxdWVzdEluZm8uc3RhdGVSZXNwb25zZV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZXR1cm4gdG8gY2FsbGJhY2sgaWYgaXQgaXMgc2VudCBmcm9tIGlmcmFtZVxyXG4gICAgICBpZiAocmVxdWVzdEluZm8uc3RhdGVNYXRjaCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5hZGFsLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAvLyBDYWxsIHdpdGhpbiB0aGUgc2FtZSBjb250ZXh0IHdpdGhvdXQgZnVsbCBwYWdlIHJlZGlyZWN0IGtlZXBzIHRoZSBjYWxsYmFja1xyXG4gICAgICAgICAgaWYgKHJlcXVlc3RJbmZvLnJlcXVlc3RUeXBlID09PSB0aGlzLmFkYWwuUkVRVUVTVF9UWVBFLlJFTkVXX1RPS0VOKSB7XHJcbiAgICAgICAgICAgIC8vIElkdG9rZW4gb3IgQWNjZXN0b2tlbiBjYW4gYmUgcmVuZXdlZFxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdEluZm8ucGFyYW1ldGVyc1snYWNjZXNzX3Rva2VuJ10pIHtcclxuICAgICAgICAgICAgICB0aGlzLmFkYWwuY2FsbGJhY2sodGhpcy5hZGFsLl9nZXRJdGVtKHRoaXMuYWRhbC5DT05TVEFOVFMuU1RPUkFHRS5FUlJPUl9ERVNDUklQVElPTiksIHJlcXVlc3RJbmZvLnBhcmFtZXRlcnNbJ2FjY2Vzc190b2tlbiddKTtcclxuICAgICAgICAgICAgICByZXR1cm4gbmV4dEhhbmRsZXIoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXF1ZXN0SW5mby5wYXJhbWV0ZXJzWydpZF90b2tlbiddKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5hZGFsLmNhbGxiYWNrKHRoaXMuYWRhbC5fZ2V0SXRlbSh0aGlzLmFkYWwuQ09OU1RBTlRTLlNUT1JBR0UuRVJST1JfREVTQ1JJUFRJT04pLCByZXF1ZXN0SW5mby5wYXJhbWV0ZXJzWydpZF90b2tlbiddKTtcclxuICAgICAgICAgICAgICByZXR1cm4gbmV4dEhhbmRsZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBub3JtYWwgZnVsbCBsb2dpbiByZWRpcmVjdCBoYXBwZW5lZCBvbiB0aGUgcGFnZVxyXG4gICAgICAgICAgdGhpcy51cGRhdGVEYXRhRnJvbUNhY2hlKHRoaXMuYWRhbC5jb25maWcubG9naW5SZXNvdXJjZSk7XHJcbiAgICAgICAgICBpZiAodGhpcy5vYXV0aERhdGEudXNlck5hbWUpIHtcclxuICAgICAgICAgICAgLy9JRHRva2VuIGlzIGFkZGVkIGFzIHRva2VuIGZvciB0aGUgYXBwXHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHNlbGYudXBkYXRlRGF0YUZyb21DYWNoZShzZWxmLmFkYWwuY29uZmlnLmxvZ2luUmVzb3VyY2UpO1xyXG4gICAgICAgICAgICAvLyByZWRpcmVjdCB0byBsb2dpbiByZXF1ZXN0ZWQgcGFnZVxyXG4gICAgICAgICAgICB2YXIgbG9naW5TdGFydFBhZ2UgPSBzZWxmLmFkYWwuX2dldEl0ZW0oc2VsZi5hZGFsLkNPTlNUQU5UUy5TVE9SQUdFLlNUQVJUX1BBR0UpO1xyXG4gICAgICAgICAgICBpZiAobG9naW5TdGFydFBhZ2UpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVkaXJlY3RIYW5kbGVyKGxvZ2luU3RhcnRQYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBicm9hZGNhc3QgbG9naW4gc3VjY2Vzcz9cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IGJyb2FkY2FzdCBsb2dpbiBmYWlsdXJlPyAocmVhc29uOiB0aGlzLmFkYWwuX2dldEl0ZW0odGhpcy5hZGFsLkNPTlNUQU5UUy5TVE9SQUdFLkVSUk9SX0RFU0NSSVBUSU9OKSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBpc05vdENhbGxiYWNrSGFuZGxlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9naW5IYW5kbGVyKHBhdGg6IHN0cmluZywgcmVkaXJlY3RIYW5kbGVyOiBGdW5jdGlvbiwgaGFuZGxlcjogRnVuY3Rpb24pIHtcclxuICAgIHRoaXMuYWRhbC5pbmZvKCdMb2dpbiBldmVudCBmb3I6JyArIHBhdGgpO1xyXG5cclxuICAgIGlmICh0aGlzLmFkYWwuY29uZmlnICYmIHRoaXMuYWRhbC5jb25maWcubG9jYWxMb2dpblVybCkge1xyXG4gICAgICByZXR1cm4gcmVkaXJlY3RIYW5kbGVyKHRoaXMuYWRhbC5jb25maWcubG9jYWxMb2dpblVybCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBkaXJlY3RseSBzdGFydCBsb2dpbiBmbG93XHJcbiAgICAgIHRoaXMuYWRhbC5fc2F2ZUl0ZW0odGhpcy5hZGFsLkNPTlNUQU5UUy5TVE9SQUdFLlNUQVJUX1BBR0UsIHBhdGgpO1xyXG4gICAgICB0aGlzLmFkYWwuaW5mbygnU3RhcnQgbG9naW4gYXQ6JyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgLy8gVE9ETzogYnJvYWRjYXN0IGxvZ2luIHJlZGlyZWN0P1xyXG4gICAgICB0aGlzLmFkYWwubG9naW4oKTtcclxuICAgICAgcmV0dXJuIGhhbmRsZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbmZpZygpOiBBZGFsQ29uZmlnIHtcclxuICAgIHJldHVybiB0aGlzLmFkYWwuY29uZmlnO1xyXG4gIH1cclxuXHJcbiAgbG9naW4oKSB7XHJcbiAgICB0aGlzLmFkYWwubG9naW4oKTtcclxuICB9XHJcblxyXG4gIGxvZ2luSW5Qcm9ncmVzcygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmFkYWwubG9naW5JblByb2dyZXNzKCk7XHJcbiAgfVxyXG5cclxuICBsb2dPdXQoKSB7XHJcbiAgICB0aGlzLmFkYWwubG9nT3V0KCk7XHJcbiAgfVxyXG5cclxuICBnZXRDYWNoZWRUb2tlbihyZXNvdXJjZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmFkYWwuZ2V0Q2FjaGVkVG9rZW4ocmVzb3VyY2UpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckluZm8oKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLm9hdXRoRGF0YTtcclxuICB9XHJcblxyXG4gIGFjcXVpcmVUb2tlbihyZXNvdXJjZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIC8vIGF1dG9tYXRlZCB0b2tlbiByZXF1ZXN0IGNhbGxcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5hZGFsLmFjcXVpcmVUb2tlbihyZXNvdXJjZSwgKGVycm9yOiBzdHJpbmcsIHRva2VuT3V0OiBzdHJpbmcpID0+IHtcclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc29sdmUodG9rZW5PdXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldFVzZXIoKTogUHJvbWlzZTxVc2VyPiB7XHJcbiAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8VXNlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLmFkYWwuZ2V0VXNlcigoZXJyb3I6IHN0cmluZywgdXNlcjogVXNlcikgPT4ge1xyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZXNvdXJjZUZvckVuZHBvaW50KGVuZHBvaW50OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuYWRhbC5nZXRSZXNvdXJjZUZvckVuZHBvaW50KGVuZHBvaW50KTtcclxuICB9XHJcblxyXG4gIGNsZWFyQ2FjaGUoKSB7XHJcbiAgICB0aGlzLmFkYWwuY2xlYXJDYWNoZSgpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJDYWNoZUZvclJlc291cmNlKHJlc291cmNlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuYWRhbC5jbGVhckNhY2hlRm9yUmVzb3VyY2UocmVzb3VyY2UpO1xyXG4gIH1cclxuXHJcbiAgaW5mbyhtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuYWRhbC5pbmZvKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgdmVyYm9zZShtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuYWRhbC52ZXJib3NlKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcblxyXG4gIGlzQXV0aGVudGljYXRlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLm9hdXRoRGF0YS5pc0F1dGhlbnRpY2F0ZWQ7XHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
