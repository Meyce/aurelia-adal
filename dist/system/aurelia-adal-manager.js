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
                            if (requestInfo.stateMatch) {
                                if (typeof this.adal.callback === 'function') {
                                    if (requestInfo.requestType === this.adal.REQUEST_TYPE.RENEW_TOKEN) {
                                        if (requestInfo.parameters['access_token']) {
                                            this.adal.callback(this.adal._getItem(this.adal.CONSTANTS.STORAGE.ERROR_DESCRIPTION), requestInfo.parameters['access_token']);
                                            return nextHandler();
                                        } else if (requestInfo.parameters['id_token']) {
                                            this.adal.callback(this.adal._getItem(this.adal.CONSTANTS.STORAGE.ERROR_DESCRIPTION), requestInfo.parameters['id_token']);
                                            return nextHandler();
                                        }
                                    }
                                } else {
                                    this.updateDataFromCache(this.adal.config.loginResource);
                                    if (this.oauthData.userName) {
                                        var _self = this;
                                        _self.updateDataFromCache(_self.adal.config.loginResource);
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
                            this.adal._saveItem(this.adal.CONSTANTS.STORAGE.START_PAGE, path);
                            this.adal.info('Start login at:' + window.location.href);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtYWRhbC1tYW5hZ2VyLmpzIiwiYXVyZWxpYS1hZGFsLW1hbmFnZXIudHMiXSwibmFtZXMiOlsiQXVyZWxpYUFkYWxNYW5hZ2VyIiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmNvbnN0cnVjdG9yIiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmNvbmZpZ3VyZSIsIkF1cmVsaWFBZGFsTWFuYWdlci51cGRhdGVEYXRhRnJvbUNhY2hlIiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmhhc2hIYW5kbGVyIiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmxvZ2luSGFuZGxlciIsIkF1cmVsaWFBZGFsTWFuYWdlci5jb25maWciLCJBdXJlbGlhQWRhbE1hbmFnZXIubG9naW4iLCJBdXJlbGlhQWRhbE1hbmFnZXIubG9naW5JblByb2dyZXNzIiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmxvZ091dCIsIkF1cmVsaWFBZGFsTWFuYWdlci5nZXRDYWNoZWRUb2tlbiIsIkF1cmVsaWFBZGFsTWFuYWdlci5nZXRVc2VySW5mbyIsIkF1cmVsaWFBZGFsTWFuYWdlci5hY3F1aXJlVG9rZW4iLCJBdXJlbGlhQWRhbE1hbmFnZXIuZ2V0VXNlciIsIkF1cmVsaWFBZGFsTWFuYWdlci5nZXRSZXNvdXJjZUZvckVuZHBvaW50IiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmNsZWFyQ2FjaGUiLCJBdXJlbGlhQWRhbE1hbmFnZXIuY2xlYXJDYWNoZUZvclJlc291cmNlIiwiQXVyZWxpYUFkYWxNYW5hZ2VyLmluZm8iLCJBdXJlbGlhQWRhbE1hbmFnZXIudmVyYm9zZSIsIkF1cmVsaWFBZGFsTWFuYWdlci5pc0F1dGhlbnRpY2F0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsRUFBRSxVQUFTLFNBQVMsRUFBRTtBQUMvRCxRQUFJLFVBQVUsR0FBRyxBQUFDLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFLLFVBQVUsVUFBVSxF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O0FBQ3BDZ0IsNEJBQUlBLENBQUNBLElBQUlBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7cUJBQzNDQTs7OzJCQUVHaEIsY0FBQ0EsT0FBZUEsRUFBQUE7QUFDbEJpQiw0QkFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7cUJBQ3pCQTs7OzJCQUVNakIsaUJBQUNBLE9BQWVBLEVBQUFBO0FBQ3JCa0IsNEJBQUlBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO3FCQUM1QkE7OzsyQkFHY2xCLDJCQUFBQTtBQUNibUIsK0JBQU9BLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLGVBQWVBLENBQUNBO3FCQUN2Q0E7Ozs7Z0JBQ0ZuQixDQUFBQTtBQWxNRCw4QkFBQSxHQUFBLFVBQUEsQ0FBQSxDQUFDLG1CQUFBLENBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxFRDhMRyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUM1QyxFQUFFLGtCQUFrQixDQUFDLENDR2pDO0FBak1ZLDhCQUFrQixHQUFBLGtCQWlNOUIsQ0FBQTtTRERRO0tBQ0osQ0FBQTtDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJhdXJlbGlhLWFkYWwtbWFuYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbJ2F1cmVsaWEtZnJhbWV3b3JrJywgJ2FkYWwnXSwgZnVuY3Rpb24oZXhwb3J0c18xKSB7XG4gICAgdmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgICAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgICAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgICAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xuICAgIH07XG4gICAgdmFyIF9fbWV0YWRhdGEgPSAodGhpcyAmJiB0aGlzLl9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShrLCB2KTtcbiAgICB9O1xuICAgIHZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFByb21pc2UsIGdlbmVyYXRvcikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwodGhpc0FyZywgX2FyZ3VtZW50cyk7XG4gICAgICAgICAgICBmdW5jdGlvbiBjYXN0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IFByb21pc2UgPyB2YWx1ZSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgICAgICAgICAgZnVuY3Rpb24gb25mdWxmaWxsKHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICAgICAgZnVuY3Rpb24gb25yZWplY3QodmFsdWUpIHsgdHJ5IHsgc3RlcChcInRocm93XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICAgICAgZnVuY3Rpb24gc3RlcCh2ZXJiLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbdmVyYl0odmFsdWUpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogY2FzdChyZXN1bHQudmFsdWUpLnRoZW4ob25mdWxmaWxsLCBvbnJlamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGVwKFwibmV4dFwiLCB2b2lkIDApO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBhdXJlbGlhX2ZyYW1ld29ya18xLCBBZGFsO1xuICAgIHZhciBBdXJlbGlhQWRhbE1hbmFnZXI7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0dGVyczpbXG4gICAgICAgICAgICBmdW5jdGlvbiAoYXVyZWxpYV9mcmFtZXdvcmtfMV8xKSB7XG4gICAgICAgICAgICAgICAgYXVyZWxpYV9mcmFtZXdvcmtfMSA9IGF1cmVsaWFfZnJhbWV3b3JrXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoQWRhbF8xKSB7XG4gICAgICAgICAgICAgICAgQWRhbCA9IEFkYWxfMTtcbiAgICAgICAgICAgIH1dLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBBdXJlbGlhQWRhbE1hbmFnZXIgPSBjbGFzcyB7XG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3IoYWRhbENvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbENvbnN0cnVjdG9yID0gYWRhbENvbnN0cnVjdG9yO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9hdXRoRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQXV0aGVudGljYXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyTmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dpbkVycm9yOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGU6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uZmlndXJlKGNvbmZpZykge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbmZpZ09wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ09wdGlvbnMudGVuYW50ID0gY29uZmlnLnRlbmFudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ09wdGlvbnMuY2xpZW50SWQgPSBjb25maWcuY2xpZW50SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWdPcHRpb25zLmVuZHBvaW50cyA9IGNvbmZpZy5lbmRwb2ludHM7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXhpc3RpbmdIYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aERlZmF1bHQgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ0hhc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoRGVmYXVsdCA9IHBhdGhEZWZhdWx0LnJlcGxhY2UoZXhpc3RpbmdIYXNoLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWdPcHRpb25zLnJlZGlyZWN0VXJpID0gY29uZmlnT3B0aW9ucy5yZWRpcmVjdFVyaSB8fCBwYXRoRGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ09wdGlvbnMucG9zdExvZ291dFJlZGlyZWN0VXJpID0gY29uZmlnT3B0aW9ucy5wb3N0TG9nb3V0UmVkaXJlY3RVcmkgfHwgcGF0aERlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWwgPSB0aGlzLmFkYWxDb25zdHJ1Y3Rvci5pbmplY3QoY29uZmlnT3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuQXV0aGVudGljYXRpb25Db250ZXh0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFkYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhRnJvbUNhY2hlKHRoaXMuYWRhbC5jb25maWcubG9naW5SZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVwZGF0ZURhdGFGcm9tQ2FjaGUocmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VuID0gdGhpcy5hZGFsLmdldENhY2hlZFRva2VuKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYXV0aERhdGEuaXNBdXRoZW50aWNhdGVkID0gdG9rZW4gIT09IG51bGwgJiYgdG9rZW4ubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXIgPSB0aGlzLmFkYWwuZ2V0Q2FjaGVkVXNlcigpIHx8IHsgdXNlck5hbWU6ICcnLCBwcm9maWxlOiBudWxsIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2F1dGhEYXRhLnVzZXJOYW1lID0gdXNlci51c2VyTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYXV0aERhdGEucHJvZmlsZSA9IHVzZXIucHJvZmlsZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYXV0aERhdGEubG9naW5FcnJvciA9IHRoaXMuYWRhbC5nZXRMb2dpbkVycm9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGhhc2hIYW5kbGVyKGhhc2gsIHJlZGlyZWN0SGFuZGxlciwgaXNOb3RDYWxsYmFja0hhbmRsZXIsIG5leHRIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkYWwuaXNDYWxsYmFjayhoYXNoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlcXVlc3RJbmZvID0gdGhpcy5hZGFsLmdldFJlcXVlc3RJbmZvKGhhc2gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsLnNhdmVUb2tlbkZyb21IYXNoKHJlcXVlc3RJbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0SW5mby5yZXF1ZXN0VHlwZSAhPT0gdGhpcy5hZGFsLlJFUVVFU1RfVFlQRS5MT0dJTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5jYWxsYmFjayA9IHdpbmRvdy5wYXJlbnQuQXV0aGVudGljYXRpb25Db250ZXh0KCkuY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RJbmZvLnJlcXVlc3RUeXBlID09PSB0aGlzLmFkYWwuUkVRVUVTVF9UWVBFLlJFTkVXX1RPS0VOKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5jYWxsYmFjayA9IHdpbmRvdy5wYXJlbnQuY2FsbEJhY2tNYXBwZWRUb1JlbmV3U3RhdGVzW3JlcXVlc3RJbmZvLnN0YXRlUmVzcG9uc2VdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0SW5mby5zdGF0ZU1hdGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmFkYWwuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RJbmZvLnJlcXVlc3RUeXBlID09PSB0aGlzLmFkYWwuUkVRVUVTVF9UWVBFLlJFTkVXX1RPS0VOKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdEluZm8ucGFyYW1ldGVyc1snYWNjZXNzX3Rva2VuJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWwuY2FsbGJhY2sodGhpcy5hZGFsLl9nZXRJdGVtKHRoaXMuYWRhbC5DT05TVEFOVFMuU1RPUkFHRS5FUlJPUl9ERVNDUklQVElPTiksIHJlcXVlc3RJbmZvLnBhcmFtZXRlcnNbJ2FjY2Vzc190b2tlbiddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dEhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHJlcXVlc3RJbmZvLnBhcmFtZXRlcnNbJ2lkX3Rva2VuJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWwuY2FsbGJhY2sodGhpcy5hZGFsLl9nZXRJdGVtKHRoaXMuYWRhbC5DT05TVEFOVFMuU1RPUkFHRS5FUlJPUl9ERVNDUklQVElPTiksIHJlcXVlc3RJbmZvLnBhcmFtZXRlcnNbJ2lkX3Rva2VuJ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0SGFuZGxlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZURhdGFGcm9tQ2FjaGUodGhpcy5hZGFsLmNvbmZpZy5sb2dpblJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub2F1dGhEYXRhLnVzZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZURhdGFGcm9tQ2FjaGUoc2VsZi5hZGFsLmNvbmZpZy5sb2dpblJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsb2dpblN0YXJ0UGFnZSA9IHNlbGYuYWRhbC5fZ2V0SXRlbShzZWxmLmFkYWwuQ09OU1RBTlRTLlNUT1JBR0UuU1RBUlRfUEFHRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9naW5TdGFydFBhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVkaXJlY3RIYW5kbGVyKGxvZ2luU3RhcnRQYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc05vdENhbGxiYWNrSGFuZGxlcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvZ2luSGFuZGxlcihwYXRoLCByZWRpcmVjdEhhbmRsZXIsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsLmluZm8oJ0xvZ2luIGV2ZW50IGZvcjonICsgcGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkYWwuY29uZmlnICYmIHRoaXMuYWRhbC5jb25maWcubG9jYWxMb2dpblVybCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZGlyZWN0SGFuZGxlcih0aGlzLmFkYWwuY29uZmlnLmxvY2FsTG9naW5VcmwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsLl9zYXZlSXRlbSh0aGlzLmFkYWwuQ09OU1RBTlRTLlNUT1JBR0UuU1RBUlRfUEFHRSwgcGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWwuaW5mbygnU3RhcnQgbG9naW4gYXQ6JyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5sb2dpbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25maWcoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFkYWwuY29uZmlnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb2dpbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsLmxvZ2luKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvZ2luSW5Qcm9ncmVzcygpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRhbC5sb2dpbkluUHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbG9nT3V0KCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWwubG9nT3V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGdldENhY2hlZFRva2VuKHJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFkYWwuZ2V0Q2FjaGVkVG9rZW4ocmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBnZXRVc2VySW5mbygpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub2F1dGhEYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhY3F1aXJlVG9rZW4ocmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5hY3F1aXJlVG9rZW4ocmVzb3VyY2UsIChlcnJvciwgdG9rZW5PdXQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodG9rZW5PdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZ2V0VXNlcigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5nZXRVc2VyKChlcnJvciwgdXNlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHVzZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGdldFJlc291cmNlRm9yRW5kcG9pbnQoZW5kcG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRhbC5nZXRSZXNvdXJjZUZvckVuZHBvaW50KGVuZHBvaW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xlYXJDYWNoZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsLmNsZWFyQ2FjaGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xlYXJDYWNoZUZvclJlc291cmNlKHJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5jbGVhckNhY2hlRm9yUmVzb3VyY2UocmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbmZvKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsLmluZm8obWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZlcmJvc2UobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWwudmVyYm9zZShtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaXNBdXRoZW50aWNhdGVkKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vYXV0aERhdGEuaXNBdXRoZW50aWNhdGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBBdXJlbGlhQWRhbE1hbmFnZXIgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgICAgICAgICBhdXJlbGlhX2ZyYW1ld29ya18xLmluamVjdChBZGFsKSwgXG4gICAgICAgICAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbT2JqZWN0XSlcbiAgICAgICAgICAgIF0sIEF1cmVsaWFBZGFsTWFuYWdlcik7XG4gICAgICAgICAgICBBdXJlbGlhQWRhbE1hbmFnZXIgPSBBdXJlbGlhQWRhbE1hbmFnZXI7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7QXVyZWxpYUFkYWxDb25maWd9IGZyb20gJy4vYXVyZWxpYS1hZGFsLWNvbmZpZyc7XHJcbmltcG9ydCAqIGFzIEFkYWwgZnJvbSAnYWRhbCc7XHJcblxyXG5AaW5qZWN0KEFkYWwpXHJcbmV4cG9ydCBjbGFzcyBBdXJlbGlhQWRhbE1hbmFnZXIge1xyXG5cclxuICBwcml2YXRlIGFkYWw6IEFkYWw7XHJcbiAgcHJpdmF0ZSBvYXV0aERhdGEgPSB7XHJcbiAgICBpc0F1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxyXG4gICAgdXNlck5hbWU6ICcnLFxyXG4gICAgbG9naW5FcnJvcjogJycsXHJcbiAgICBwcm9maWxlOiBudWxsXHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFkYWxDb25zdHJ1Y3RvcjogQWRhbCkge1xyXG4gICAgXHJcbiAgfVxyXG4gIFxyXG4gIGNvbmZpZ3VyZShjb25maWc6IEF1cmVsaWFBZGFsQ29uZmlnKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgY29uZmlnT3B0aW9uczogQWRhbENvbmZpZyA9IHt9O1xyXG4gICAgICBcclxuICAgICAgY29uZmlnT3B0aW9ucy50ZW5hbnQgPSBjb25maWcudGVuYW50O1xyXG4gICAgICBjb25maWdPcHRpb25zLmNsaWVudElkID0gY29uZmlnLmNsaWVudElkO1xyXG4gICAgICBjb25maWdPcHRpb25zLmVuZHBvaW50cyA9IGNvbmZpZy5lbmRwb2ludHM7XHJcblxyXG4gICAgICAvLyByZWRpcmVjdCBhbmQgbG9nb3V0X3JlZGlyZWN0IGFyZSBzZXQgdG8gY3VycmVudCBsb2NhdGlvbiBieSBkZWZhdWx0XHJcbiAgICAgIGxldCBleGlzdGluZ0hhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuICAgICAgbGV0IHBhdGhEZWZhdWx0ID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgIGlmIChleGlzdGluZ0hhc2gpIHtcclxuICAgICAgICBwYXRoRGVmYXVsdCA9IHBhdGhEZWZhdWx0LnJlcGxhY2UoZXhpc3RpbmdIYXNoLCAnJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbmZpZ09wdGlvbnMucmVkaXJlY3RVcmkgPSBjb25maWdPcHRpb25zLnJlZGlyZWN0VXJpIHx8IHBhdGhEZWZhdWx0O1xyXG4gICAgICBjb25maWdPcHRpb25zLnBvc3RMb2dvdXRSZWRpcmVjdFVyaSA9IGNvbmZpZ09wdGlvbnMucG9zdExvZ291dFJlZGlyZWN0VXJpIHx8IHBhdGhEZWZhdWx0O1xyXG5cclxuICAgICAgdGhpcy5hZGFsID0gdGhpcy5hZGFsQ29uc3RydWN0b3IuaW5qZWN0KGNvbmZpZ09wdGlvbnMpO1xyXG4gICAgICBcclxuICAgICAgd2luZG93LkF1dGhlbnRpY2F0aW9uQ29udGV4dCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hZGFsO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICB0aGlzLnVwZGF0ZURhdGFGcm9tQ2FjaGUodGhpcy5hZGFsLmNvbmZpZy5sb2dpblJlc291cmNlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlRGF0YUZyb21DYWNoZShyZXNvdXJjZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB2YXIgdG9rZW4gPSB0aGlzLmFkYWwuZ2V0Q2FjaGVkVG9rZW4ocmVzb3VyY2UpO1xyXG4gICAgdGhpcy5vYXV0aERhdGEuaXNBdXRoZW50aWNhdGVkID0gdG9rZW4gIT09IG51bGwgJiYgdG9rZW4ubGVuZ3RoID4gMDtcclxuICAgIHZhciB1c2VyID0gdGhpcy5hZGFsLmdldENhY2hlZFVzZXIoKSB8fCB7IHVzZXJOYW1lOiAnJywgcHJvZmlsZTogbnVsbCB9O1xyXG4gICAgdGhpcy5vYXV0aERhdGEudXNlck5hbWUgPSB1c2VyLnVzZXJOYW1lO1xyXG4gICAgdGhpcy5vYXV0aERhdGEucHJvZmlsZSA9IHVzZXIucHJvZmlsZTtcclxuICAgIHRoaXMub2F1dGhEYXRhLmxvZ2luRXJyb3IgPSB0aGlzLmFkYWwuZ2V0TG9naW5FcnJvcigpO1xyXG4gIH1cclxuXHJcbiAgaGFzaEhhbmRsZXIoaGFzaDogc3RyaW5nLCByZWRpcmVjdEhhbmRsZXI6IEZ1bmN0aW9uLCBpc05vdENhbGxiYWNrSGFuZGxlcjogRnVuY3Rpb24sIG5leHRIYW5kbGVyOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuYWRhbC5pc0NhbGxiYWNrKGhhc2gpKSB7XHJcbiAgICAgIGxldCByZXF1ZXN0SW5mbyA9IHRoaXMuYWRhbC5nZXRSZXF1ZXN0SW5mbyhoYXNoKTtcclxuICAgICAgXHJcbiAgICAgIHRoaXMuYWRhbC5zYXZlVG9rZW5Gcm9tSGFzaChyZXF1ZXN0SW5mbyk7XHJcblxyXG4gICAgICBpZiAocmVxdWVzdEluZm8ucmVxdWVzdFR5cGUgIT09IHRoaXMuYWRhbC5SRVFVRVNUX1RZUEUuTE9HSU4pIHtcclxuICAgICAgICB0aGlzLmFkYWwuY2FsbGJhY2sgPSB3aW5kb3cucGFyZW50LkF1dGhlbnRpY2F0aW9uQ29udGV4dCgpLmNhbGxiYWNrO1xyXG4gICAgICAgIGlmIChyZXF1ZXN0SW5mby5yZXF1ZXN0VHlwZSA9PT0gdGhpcy5hZGFsLlJFUVVFU1RfVFlQRS5SRU5FV19UT0tFTikge1xyXG4gICAgICAgICAgdGhpcy5hZGFsLmNhbGxiYWNrID0gd2luZG93LnBhcmVudC5jYWxsQmFja01hcHBlZFRvUmVuZXdTdGF0ZXNbcmVxdWVzdEluZm8uc3RhdGVSZXNwb25zZV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZXR1cm4gdG8gY2FsbGJhY2sgaWYgaXQgaXMgc2VudCBmcm9tIGlmcmFtZVxyXG4gICAgICBpZiAocmVxdWVzdEluZm8uc3RhdGVNYXRjaCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5hZGFsLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAvLyBDYWxsIHdpdGhpbiB0aGUgc2FtZSBjb250ZXh0IHdpdGhvdXQgZnVsbCBwYWdlIHJlZGlyZWN0IGtlZXBzIHRoZSBjYWxsYmFja1xyXG4gICAgICAgICAgaWYgKHJlcXVlc3RJbmZvLnJlcXVlc3RUeXBlID09PSB0aGlzLmFkYWwuUkVRVUVTVF9UWVBFLlJFTkVXX1RPS0VOKSB7XHJcbiAgICAgICAgICAgIC8vIElkdG9rZW4gb3IgQWNjZXN0b2tlbiBjYW4gYmUgcmVuZXdlZFxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdEluZm8ucGFyYW1ldGVyc1snYWNjZXNzX3Rva2VuJ10pIHtcclxuICAgICAgICAgICAgICB0aGlzLmFkYWwuY2FsbGJhY2sodGhpcy5hZGFsLl9nZXRJdGVtKHRoaXMuYWRhbC5DT05TVEFOVFMuU1RPUkFHRS5FUlJPUl9ERVNDUklQVElPTiksIHJlcXVlc3RJbmZvLnBhcmFtZXRlcnNbJ2FjY2Vzc190b2tlbiddKTtcclxuICAgICAgICAgICAgICByZXR1cm4gbmV4dEhhbmRsZXIoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXF1ZXN0SW5mby5wYXJhbWV0ZXJzWydpZF90b2tlbiddKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5hZGFsLmNhbGxiYWNrKHRoaXMuYWRhbC5fZ2V0SXRlbSh0aGlzLmFkYWwuQ09OU1RBTlRTLlNUT1JBR0UuRVJST1JfREVTQ1JJUFRJT04pLCByZXF1ZXN0SW5mby5wYXJhbWV0ZXJzWydpZF90b2tlbiddKTtcclxuICAgICAgICAgICAgICByZXR1cm4gbmV4dEhhbmRsZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBub3JtYWwgZnVsbCBsb2dpbiByZWRpcmVjdCBoYXBwZW5lZCBvbiB0aGUgcGFnZVxyXG4gICAgICAgICAgdGhpcy51cGRhdGVEYXRhRnJvbUNhY2hlKHRoaXMuYWRhbC5jb25maWcubG9naW5SZXNvdXJjZSk7XHJcbiAgICAgICAgICBpZiAodGhpcy5vYXV0aERhdGEudXNlck5hbWUpIHtcclxuICAgICAgICAgICAgLy9JRHRva2VuIGlzIGFkZGVkIGFzIHRva2VuIGZvciB0aGUgYXBwXHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHNlbGYudXBkYXRlRGF0YUZyb21DYWNoZShzZWxmLmFkYWwuY29uZmlnLmxvZ2luUmVzb3VyY2UpO1xyXG4gICAgICAgICAgICAvLyByZWRpcmVjdCB0byBsb2dpbiByZXF1ZXN0ZWQgcGFnZVxyXG4gICAgICAgICAgICB2YXIgbG9naW5TdGFydFBhZ2UgPSBzZWxmLmFkYWwuX2dldEl0ZW0oc2VsZi5hZGFsLkNPTlNUQU5UUy5TVE9SQUdFLlNUQVJUX1BBR0UpO1xyXG4gICAgICAgICAgICBpZiAobG9naW5TdGFydFBhZ2UpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVkaXJlY3RIYW5kbGVyKGxvZ2luU3RhcnRQYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBicm9hZGNhc3QgbG9naW4gc3VjY2Vzcz9cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IGJyb2FkY2FzdCBsb2dpbiBmYWlsdXJlPyAocmVhc29uOiB0aGlzLmFkYWwuX2dldEl0ZW0odGhpcy5hZGFsLkNPTlNUQU5UUy5TVE9SQUdFLkVSUk9SX0RFU0NSSVBUSU9OKSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBpc05vdENhbGxiYWNrSGFuZGxlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9naW5IYW5kbGVyKHBhdGg6IHN0cmluZywgcmVkaXJlY3RIYW5kbGVyOiBGdW5jdGlvbiwgaGFuZGxlcjogRnVuY3Rpb24pIHtcclxuICAgIHRoaXMuYWRhbC5pbmZvKCdMb2dpbiBldmVudCBmb3I6JyArIHBhdGgpO1xyXG5cclxuICAgIGlmICh0aGlzLmFkYWwuY29uZmlnICYmIHRoaXMuYWRhbC5jb25maWcubG9jYWxMb2dpblVybCkge1xyXG4gICAgICByZXR1cm4gcmVkaXJlY3RIYW5kbGVyKHRoaXMuYWRhbC5jb25maWcubG9jYWxMb2dpblVybCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBkaXJlY3RseSBzdGFydCBsb2dpbiBmbG93XHJcbiAgICAgIHRoaXMuYWRhbC5fc2F2ZUl0ZW0odGhpcy5hZGFsLkNPTlNUQU5UUy5TVE9SQUdFLlNUQVJUX1BBR0UsIHBhdGgpO1xyXG4gICAgICB0aGlzLmFkYWwuaW5mbygnU3RhcnQgbG9naW4gYXQ6JyArIHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgLy8gVE9ETzogYnJvYWRjYXN0IGxvZ2luIHJlZGlyZWN0P1xyXG4gICAgICB0aGlzLmFkYWwubG9naW4oKTtcclxuICAgICAgcmV0dXJuIGhhbmRsZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbmZpZygpOiBBZGFsQ29uZmlnIHtcclxuICAgIHJldHVybiB0aGlzLmFkYWwuY29uZmlnO1xyXG4gIH1cclxuXHJcbiAgbG9naW4oKSB7XHJcbiAgICB0aGlzLmFkYWwubG9naW4oKTtcclxuICB9XHJcblxyXG4gIGxvZ2luSW5Qcm9ncmVzcygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmFkYWwubG9naW5JblByb2dyZXNzKCk7XHJcbiAgfVxyXG5cclxuICBsb2dPdXQoKSB7XHJcbiAgICB0aGlzLmFkYWwubG9nT3V0KCk7XHJcbiAgfVxyXG5cclxuICBnZXRDYWNoZWRUb2tlbihyZXNvdXJjZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmFkYWwuZ2V0Q2FjaGVkVG9rZW4ocmVzb3VyY2UpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckluZm8oKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLm9hdXRoRGF0YTtcclxuICB9XHJcblxyXG4gIGFjcXVpcmVUb2tlbihyZXNvdXJjZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIC8vIGF1dG9tYXRlZCB0b2tlbiByZXF1ZXN0IGNhbGxcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5hZGFsLmFjcXVpcmVUb2tlbihyZXNvdXJjZSwgKGVycm9yOiBzdHJpbmcsIHRva2VuT3V0OiBzdHJpbmcpID0+IHtcclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc29sdmUodG9rZW5PdXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldFVzZXIoKTogUHJvbWlzZTxVc2VyPiB7XHJcbiAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8VXNlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLmFkYWwuZ2V0VXNlcigoZXJyb3I6IHN0cmluZywgdXNlcjogVXNlcikgPT4ge1xyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZXNvdXJjZUZvckVuZHBvaW50KGVuZHBvaW50OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuYWRhbC5nZXRSZXNvdXJjZUZvckVuZHBvaW50KGVuZHBvaW50KTtcclxuICB9XHJcblxyXG4gIGNsZWFyQ2FjaGUoKSB7XHJcbiAgICB0aGlzLmFkYWwuY2xlYXJDYWNoZSgpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJDYWNoZUZvclJlc291cmNlKHJlc291cmNlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuYWRhbC5jbGVhckNhY2hlRm9yUmVzb3VyY2UocmVzb3VyY2UpO1xyXG4gIH1cclxuXHJcbiAgaW5mbyhtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuYWRhbC5pbmZvKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgdmVyYm9zZShtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuYWRhbC52ZXJib3NlKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcblxyXG4gIGlzQXV0aGVudGljYXRlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLm9hdXRoRGF0YS5pc0F1dGhlbnRpY2F0ZWQ7XHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
