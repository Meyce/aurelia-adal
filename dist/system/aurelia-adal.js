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
    var AureliaAdal;
    return {
        setters: [function (aurelia_framework_1_1) {
            aurelia_framework_1 = aurelia_framework_1_1;
        }, function (Adal_1) {
            Adal = Adal_1;
        }],
        execute: function execute() {
            var AureliaAdal = (function () {
                function AureliaAdal(adalConstructor) {
                    _classCallCheck(this, AureliaAdal);

                    this.adalConstructor = adalConstructor;
                    this.oauthData = {
                        isAuthenticated: false,
                        userName: '',
                        loginError: '',
                        profile: null
                    };
                }

                _createClass(AureliaAdal, [{
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

                return AureliaAdal;
            })();
            AureliaAdal = __decorate([aurelia_framework_1.inject(Adal), __metadata('design:paramtypes', [Object])], AureliaAdal);
            AureliaAdal = AureliaAdal;
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtYWRhbC5qcyIsImF1cmVsaWEtYWRhbC50cyJdLCJuYW1lcyI6WyJBdXJlbGlhQWRhbCIsIkF1cmVsaWFBZGFsLmNvbnN0cnVjdG9yIiwiQXVyZWxpYUFkYWwuY29uZmlndXJlIiwiQXVyZWxpYUFkYWwudXBkYXRlRGF0YUZyb21DYWNoZSIsIkF1cmVsaWFBZGFsLmhhc2hIYW5kbGVyIiwiQXVyZWxpYUFkYWwubG9naW5IYW5kbGVyIiwiQXVyZWxpYUFkYWwuY29uZmlnIiwiQXVyZWxpYUFkYWwubG9naW4iLCJBdXJlbGlhQWRhbC5sb2dpbkluUHJvZ3Jlc3MiLCJBdXJlbGlhQWRhbC5sb2dPdXQiLCJBdXJlbGlhQWRhbC5nZXRDYWNoZWRUb2tlbiIsIkF1cmVsaWFBZGFsLmdldFVzZXJJbmZvIiwiQXVyZWxpYUFkYWwuYWNxdWlyZVRva2VuIiwiQXVyZWxpYUFkYWwuZ2V0VXNlciIsIkF1cmVsaWFBZGFsLmdldFJlc291cmNlRm9yRW5kcG9pbnQiLCJBdXJlbGlhQWRhbC5jbGVhckNhY2hlIiwiQXVyZWxpYUFkYWwuY2xlYXJDYWNoZUZvclJlc291cmNlIiwiQXVyZWxpYUFkYWwuaW5mbyIsIkF1cmVsaWFBZGFsLnZlcmJvc2UiLCJBdXJlbGlhQWRhbC5pc0F1dGhlbnRpY2F0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsRUFBRSxVQUFTLFNBQVMsRUFBRTtBQUMvRCxRQUFJLFVBQVUsR0FBRyxBQUFDLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFLLFVBQVUsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQ25GLFlBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNO1lBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyx3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Q0FBQ0E7cUJBQ3pCQTs7OzJCQUVNakIsaUJBQUNBLE9BQWVBLEVBQUFBO0FBQ3JCa0IsNEJBQUlBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLENBQUNBO3FCQUM1QkE7OzsyQkFHY2xCLDJCQUFBQTtBQUNibUIsK0JBQU9BLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLGVBQWVBLENBQUNBO3FCQUN2Q0E7Ozs7Z0JBQ0ZuQixDQUFBQTtBQWxNRCx1QkFBQSxHQUFBLFVBQUEsQ0FBQSxDQUFDLG1CQUFBLENBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxFRDhMRyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUM1QyxFQUFFLFdBQVcsQ0FBQyxDQ0cxQjtBQWpNWSx1QkFBVyxHQUFBLFdBaU12QixDQUFBO1NERFE7S0FDSixDQUFBO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6ImF1cmVsaWEtYWRhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbJ2F1cmVsaWEtZnJhbWV3b3JrJywgJ2FkYWwnXSwgZnVuY3Rpb24oZXhwb3J0c18xKSB7XG4gICAgdmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgICAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgICAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgICAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xuICAgIH07XG4gICAgdmFyIF9fbWV0YWRhdGEgPSAodGhpcyAmJiB0aGlzLl9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShrLCB2KTtcbiAgICB9O1xuICAgIHZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFByb21pc2UsIGdlbmVyYXRvcikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwodGhpc0FyZywgX2FyZ3VtZW50cyk7XG4gICAgICAgICAgICBmdW5jdGlvbiBjYXN0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IFByb21pc2UgPyB2YWx1ZSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgICAgICAgICAgZnVuY3Rpb24gb25mdWxmaWxsKHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICAgICAgZnVuY3Rpb24gb25yZWplY3QodmFsdWUpIHsgdHJ5IHsgc3RlcChcInRocm93XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICAgICAgZnVuY3Rpb24gc3RlcCh2ZXJiLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbdmVyYl0odmFsdWUpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogY2FzdChyZXN1bHQudmFsdWUpLnRoZW4ob25mdWxmaWxsLCBvbnJlamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGVwKFwibmV4dFwiLCB2b2lkIDApO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBhdXJlbGlhX2ZyYW1ld29ya18xLCBBZGFsO1xuICAgIHZhciBBdXJlbGlhQWRhbDtcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXR0ZXJzOltcbiAgICAgICAgICAgIGZ1bmN0aW9uIChhdXJlbGlhX2ZyYW1ld29ya18xXzEpIHtcbiAgICAgICAgICAgICAgICBhdXJlbGlhX2ZyYW1ld29ya18xID0gYXVyZWxpYV9mcmFtZXdvcmtfMV8xO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChBZGFsXzEpIHtcbiAgICAgICAgICAgICAgICBBZGFsID0gQWRhbF8xO1xuICAgICAgICAgICAgfV0sXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IEF1cmVsaWFBZGFsID0gY2xhc3Mge1xuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yKGFkYWxDb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWxDb25zdHJ1Y3RvciA9IGFkYWxDb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vYXV0aERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlck5hbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbG9naW5FcnJvcjogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9maWxlOiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyZShjb25maWcpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb25maWdPcHRpb25zID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWdPcHRpb25zLnRlbmFudCA9IGNvbmZpZy50ZW5hbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWdPcHRpb25zLmNsaWVudElkID0gY29uZmlnLmNsaWVudElkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnT3B0aW9ucy5lbmRwb2ludHMgPSBjb25maWcuZW5kcG9pbnRzO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGV4aXN0aW5nSGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGhEZWZhdWx0ID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdIYXNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aERlZmF1bHQgPSBwYXRoRGVmYXVsdC5yZXBsYWNlKGV4aXN0aW5nSGFzaCwgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnT3B0aW9ucy5yZWRpcmVjdFVyaSA9IGNvbmZpZ09wdGlvbnMucmVkaXJlY3RVcmkgfHwgcGF0aERlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWdPcHRpb25zLnBvc3RMb2dvdXRSZWRpcmVjdFVyaSA9IGNvbmZpZ09wdGlvbnMucG9zdExvZ291dFJlZGlyZWN0VXJpIHx8IHBhdGhEZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsID0gdGhpcy5hZGFsQ29uc3RydWN0b3IuaW5qZWN0KGNvbmZpZ09wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LkF1dGhlbnRpY2F0aW9uQ29udGV4dCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hZGFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRGF0YUZyb21DYWNoZSh0aGlzLmFkYWwuY29uZmlnLmxvZ2luUmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1cGRhdGVEYXRhRnJvbUNhY2hlKHJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IHRoaXMuYWRhbC5nZXRDYWNoZWRUb2tlbihyZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2F1dGhEYXRhLmlzQXV0aGVudGljYXRlZCA9IHRva2VuICE9PSBudWxsICYmIHRva2VuLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAgICAgICAgIHZhciB1c2VyID0gdGhpcy5hZGFsLmdldENhY2hlZFVzZXIoKSB8fCB7IHVzZXJOYW1lOiAnJywgcHJvZmlsZTogbnVsbCB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9hdXRoRGF0YS51c2VyTmFtZSA9IHVzZXIudXNlck5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2F1dGhEYXRhLnByb2ZpbGUgPSB1c2VyLnByb2ZpbGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2F1dGhEYXRhLmxvZ2luRXJyb3IgPSB0aGlzLmFkYWwuZ2V0TG9naW5FcnJvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBoYXNoSGFuZGxlcihoYXNoLCByZWRpcmVjdEhhbmRsZXIsIGlzTm90Q2FsbGJhY2tIYW5kbGVyLCBuZXh0SGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZGFsLmlzQ2FsbGJhY2soaGFzaCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXF1ZXN0SW5mbyA9IHRoaXMuYWRhbC5nZXRSZXF1ZXN0SW5mbyhoYXNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5zYXZlVG9rZW5Gcm9tSGFzaChyZXF1ZXN0SW5mbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdEluZm8ucmVxdWVzdFR5cGUgIT09IHRoaXMuYWRhbC5SRVFVRVNUX1RZUEUuTE9HSU4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWwuY2FsbGJhY2sgPSB3aW5kb3cucGFyZW50LkF1dGhlbnRpY2F0aW9uQ29udGV4dCgpLmNhbGxiYWNrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0SW5mby5yZXF1ZXN0VHlwZSA9PT0gdGhpcy5hZGFsLlJFUVVFU1RfVFlQRS5SRU5FV19UT0tFTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWwuY2FsbGJhY2sgPSB3aW5kb3cucGFyZW50LmNhbGxCYWNrTWFwcGVkVG9SZW5ld1N0YXRlc1tyZXF1ZXN0SW5mby5zdGF0ZVJlc3BvbnNlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdEluZm8uc3RhdGVNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5hZGFsLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0SW5mby5yZXF1ZXN0VHlwZSA9PT0gdGhpcy5hZGFsLlJFUVVFU1RfVFlQRS5SRU5FV19UT0tFTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RJbmZvLnBhcmFtZXRlcnNbJ2FjY2Vzc190b2tlbiddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsLmNhbGxiYWNrKHRoaXMuYWRhbC5fZ2V0SXRlbSh0aGlzLmFkYWwuQ09OU1RBTlRTLlNUT1JBR0UuRVJST1JfREVTQ1JJUFRJT04pLCByZXF1ZXN0SW5mby5wYXJhbWV0ZXJzWydhY2Nlc3NfdG9rZW4nXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHRIYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXF1ZXN0SW5mby5wYXJhbWV0ZXJzWydpZF90b2tlbiddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsLmNhbGxiYWNrKHRoaXMuYWRhbC5fZ2V0SXRlbSh0aGlzLmFkYWwuQ09OU1RBTlRTLlNUT1JBR0UuRVJST1JfREVTQ1JJUFRJT04pLCByZXF1ZXN0SW5mby5wYXJhbWV0ZXJzWydpZF90b2tlbiddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dEhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRhRnJvbUNhY2hlKHRoaXMuYWRhbC5jb25maWcubG9naW5SZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9hdXRoRGF0YS51c2VyTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVEYXRhRnJvbUNhY2hlKHNlbGYuYWRhbC5jb25maWcubG9naW5SZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbG9naW5TdGFydFBhZ2UgPSBzZWxmLmFkYWwuX2dldEl0ZW0oc2VsZi5hZGFsLkNPTlNUQU5UUy5TVE9SQUdFLlNUQVJUX1BBR0UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvZ2luU3RhcnRQYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZGlyZWN0SGFuZGxlcihsb2dpblN0YXJ0UGFnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNOb3RDYWxsYmFja0hhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb2dpbkhhbmRsZXIocGF0aCwgcmVkaXJlY3RIYW5kbGVyLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5pbmZvKCdMb2dpbiBldmVudCBmb3I6JyArIHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZGFsLmNvbmZpZyAmJiB0aGlzLmFkYWwuY29uZmlnLmxvY2FsTG9naW5VcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWRpcmVjdEhhbmRsZXIodGhpcy5hZGFsLmNvbmZpZy5sb2NhbExvZ2luVXJsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5fc2F2ZUl0ZW0odGhpcy5hZGFsLkNPTlNUQU5UUy5TVE9SQUdFLlNUQVJUX1BBR0UsIHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsLmluZm8oJ1N0YXJ0IGxvZ2luIGF0OicgKyB3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWwubG9naW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uZmlnKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hZGFsLmNvbmZpZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbG9naW4oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5sb2dpbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb2dpbkluUHJvZ3Jlc3MoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFkYWwubG9naW5JblByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvZ091dCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsLmxvZ091dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBnZXRDYWNoZWRUb2tlbihyZXNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hZGFsLmdldENhY2hlZFRva2VuKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZ2V0VXNlckluZm8oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9hdXRoRGF0YTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWNxdWlyZVRva2VuKHJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWwuYWNxdWlyZVRva2VuKHJlc291cmNlLCAoZXJyb3IsIHRva2VuT3V0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRva2VuT3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGdldFVzZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWwuZ2V0VXNlcigoZXJyb3IsIHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh1c2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBnZXRSZXNvdXJjZUZvckVuZHBvaW50KGVuZHBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChlbmRwb2ludCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsZWFyQ2FjaGUoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5jbGVhckNhY2hlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsZWFyQ2FjaGVGb3JSZXNvdXJjZShyZXNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYWwuY2xlYXJDYWNoZUZvclJlc291cmNlKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5mbyhtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRhbC5pbmZvKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2ZXJib3NlKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFsLnZlcmJvc2UobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlzQXV0aGVudGljYXRlZCgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub2F1dGhEYXRhLmlzQXV0aGVudGljYXRlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgQXVyZWxpYUFkYWwgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgICAgICAgICBhdXJlbGlhX2ZyYW1ld29ya18xLmluamVjdChBZGFsKSwgXG4gICAgICAgICAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbT2JqZWN0XSlcbiAgICAgICAgICAgIF0sIEF1cmVsaWFBZGFsKTtcbiAgICAgICAgICAgIEF1cmVsaWFBZGFsID0gQXVyZWxpYUFkYWw7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7QXVyZWxpYUFkYWxDb25maWd9IGZyb20gJy4vYXVyZWxpYS1hZGFsLWNvbmZpZyc7XHJcbmltcG9ydCAqIGFzIEFkYWwgZnJvbSAnYWRhbCc7XHJcblxyXG5AaW5qZWN0KEFkYWwpXHJcbmV4cG9ydCBjbGFzcyBBdXJlbGlhQWRhbCB7XHJcblxyXG4gIHByaXZhdGUgYWRhbDogQWRhbDtcclxuICBwcml2YXRlIG9hdXRoRGF0YSA9IHtcclxuICAgIGlzQXV0aGVudGljYXRlZDogZmFsc2UsXHJcbiAgICB1c2VyTmFtZTogJycsXHJcbiAgICBsb2dpbkVycm9yOiAnJyxcclxuICAgIHByb2ZpbGU6IG51bGxcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYWRhbENvbnN0cnVjdG9yOiBBZGFsKSB7XHJcbiAgICBcclxuICB9XHJcbiAgXHJcbiAgY29uZmlndXJlKGNvbmZpZzogQXVyZWxpYUFkYWxDb25maWcpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBjb25maWdPcHRpb25zOiBBZGFsQ29uZmlnID0ge307XHJcbiAgICAgIFxyXG4gICAgICBjb25maWdPcHRpb25zLnRlbmFudCA9IGNvbmZpZy50ZW5hbnQ7XHJcbiAgICAgIGNvbmZpZ09wdGlvbnMuY2xpZW50SWQgPSBjb25maWcuY2xpZW50SWQ7XHJcbiAgICAgIGNvbmZpZ09wdGlvbnMuZW5kcG9pbnRzID0gY29uZmlnLmVuZHBvaW50cztcclxuXHJcbiAgICAgIC8vIHJlZGlyZWN0IGFuZCBsb2dvdXRfcmVkaXJlY3QgYXJlIHNldCB0byBjdXJyZW50IGxvY2F0aW9uIGJ5IGRlZmF1bHRcclxuICAgICAgbGV0IGV4aXN0aW5nSGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xyXG4gICAgICBsZXQgcGF0aERlZmF1bHQgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICAgICAgaWYgKGV4aXN0aW5nSGFzaCkge1xyXG4gICAgICAgIHBhdGhEZWZhdWx0ID0gcGF0aERlZmF1bHQucmVwbGFjZShleGlzdGluZ0hhc2gsICcnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uZmlnT3B0aW9ucy5yZWRpcmVjdFVyaSA9IGNvbmZpZ09wdGlvbnMucmVkaXJlY3RVcmkgfHwgcGF0aERlZmF1bHQ7XHJcbiAgICAgIGNvbmZpZ09wdGlvbnMucG9zdExvZ291dFJlZGlyZWN0VXJpID0gY29uZmlnT3B0aW9ucy5wb3N0TG9nb3V0UmVkaXJlY3RVcmkgfHwgcGF0aERlZmF1bHQ7XHJcblxyXG4gICAgICB0aGlzLmFkYWwgPSB0aGlzLmFkYWxDb25zdHJ1Y3Rvci5pbmplY3QoY29uZmlnT3B0aW9ucyk7XHJcbiAgICAgIFxyXG4gICAgICB3aW5kb3cuQXV0aGVudGljYXRpb25Db250ZXh0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkYWw7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIHRoaXMudXBkYXRlRGF0YUZyb21DYWNoZSh0aGlzLmFkYWwuY29uZmlnLmxvZ2luUmVzb3VyY2UpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVEYXRhRnJvbUNhY2hlKHJlc291cmNlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHZhciB0b2tlbiA9IHRoaXMuYWRhbC5nZXRDYWNoZWRUb2tlbihyZXNvdXJjZSk7XHJcbiAgICB0aGlzLm9hdXRoRGF0YS5pc0F1dGhlbnRpY2F0ZWQgPSB0b2tlbiAhPT0gbnVsbCAmJiB0b2tlbi5sZW5ndGggPiAwO1xyXG4gICAgdmFyIHVzZXIgPSB0aGlzLmFkYWwuZ2V0Q2FjaGVkVXNlcigpIHx8IHsgdXNlck5hbWU6ICcnLCBwcm9maWxlOiBudWxsIH07XHJcbiAgICB0aGlzLm9hdXRoRGF0YS51c2VyTmFtZSA9IHVzZXIudXNlck5hbWU7XHJcbiAgICB0aGlzLm9hdXRoRGF0YS5wcm9maWxlID0gdXNlci5wcm9maWxlO1xyXG4gICAgdGhpcy5vYXV0aERhdGEubG9naW5FcnJvciA9IHRoaXMuYWRhbC5nZXRMb2dpbkVycm9yKCk7XHJcbiAgfVxyXG5cclxuICBoYXNoSGFuZGxlcihoYXNoOiBzdHJpbmcsIHJlZGlyZWN0SGFuZGxlcjogRnVuY3Rpb24sIGlzTm90Q2FsbGJhY2tIYW5kbGVyOiBGdW5jdGlvbiwgbmV4dEhhbmRsZXI6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5hZGFsLmlzQ2FsbGJhY2soaGFzaCkpIHtcclxuICAgICAgbGV0IHJlcXVlc3RJbmZvID0gdGhpcy5hZGFsLmdldFJlcXVlc3RJbmZvKGhhc2gpO1xyXG4gICAgICBcclxuICAgICAgdGhpcy5hZGFsLnNhdmVUb2tlbkZyb21IYXNoKHJlcXVlc3RJbmZvKTtcclxuXHJcbiAgICAgIGlmIChyZXF1ZXN0SW5mby5yZXF1ZXN0VHlwZSAhPT0gdGhpcy5hZGFsLlJFUVVFU1RfVFlQRS5MT0dJTikge1xyXG4gICAgICAgIHRoaXMuYWRhbC5jYWxsYmFjayA9IHdpbmRvdy5wYXJlbnQuQXV0aGVudGljYXRpb25Db250ZXh0KCkuY2FsbGJhY2s7XHJcbiAgICAgICAgaWYgKHJlcXVlc3RJbmZvLnJlcXVlc3RUeXBlID09PSB0aGlzLmFkYWwuUkVRVUVTVF9UWVBFLlJFTkVXX1RPS0VOKSB7XHJcbiAgICAgICAgICB0aGlzLmFkYWwuY2FsbGJhY2sgPSB3aW5kb3cucGFyZW50LmNhbGxCYWNrTWFwcGVkVG9SZW5ld1N0YXRlc1tyZXF1ZXN0SW5mby5zdGF0ZVJlc3BvbnNlXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJldHVybiB0byBjYWxsYmFjayBpZiBpdCBpcyBzZW50IGZyb20gaWZyYW1lXHJcbiAgICAgIGlmIChyZXF1ZXN0SW5mby5zdGF0ZU1hdGNoKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmFkYWwuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgIC8vIENhbGwgd2l0aGluIHRoZSBzYW1lIGNvbnRleHQgd2l0aG91dCBmdWxsIHBhZ2UgcmVkaXJlY3Qga2VlcHMgdGhlIGNhbGxiYWNrXHJcbiAgICAgICAgICBpZiAocmVxdWVzdEluZm8ucmVxdWVzdFR5cGUgPT09IHRoaXMuYWRhbC5SRVFVRVNUX1RZUEUuUkVORVdfVE9LRU4pIHtcclxuICAgICAgICAgICAgLy8gSWR0b2tlbiBvciBBY2Nlc3Rva2VuIGNhbiBiZSByZW5ld2VkXHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0SW5mby5wYXJhbWV0ZXJzWydhY2Nlc3NfdG9rZW4nXSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuYWRhbC5jYWxsYmFjayh0aGlzLmFkYWwuX2dldEl0ZW0odGhpcy5hZGFsLkNPTlNUQU5UUy5TVE9SQUdFLkVSUk9SX0RFU0NSSVBUSU9OKSwgcmVxdWVzdEluZm8ucGFyYW1ldGVyc1snYWNjZXNzX3Rva2VuJ10pO1xyXG4gICAgICAgICAgICAgIHJldHVybiBuZXh0SGFuZGxlcigpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlcXVlc3RJbmZvLnBhcmFtZXRlcnNbJ2lkX3Rva2VuJ10pIHtcclxuICAgICAgICAgICAgICB0aGlzLmFkYWwuY2FsbGJhY2sodGhpcy5hZGFsLl9nZXRJdGVtKHRoaXMuYWRhbC5DT05TVEFOVFMuU1RPUkFHRS5FUlJPUl9ERVNDUklQVElPTiksIHJlcXVlc3RJbmZvLnBhcmFtZXRlcnNbJ2lkX3Rva2VuJ10pO1xyXG4gICAgICAgICAgICAgIHJldHVybiBuZXh0SGFuZGxlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIG5vcm1hbCBmdWxsIGxvZ2luIHJlZGlyZWN0IGhhcHBlbmVkIG9uIHRoZSBwYWdlXHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZURhdGFGcm9tQ2FjaGUodGhpcy5hZGFsLmNvbmZpZy5sb2dpblJlc291cmNlKTtcclxuICAgICAgICAgIGlmICh0aGlzLm9hdXRoRGF0YS51c2VyTmFtZSkge1xyXG4gICAgICAgICAgICAvL0lEdG9rZW4gaXMgYWRkZWQgYXMgdG9rZW4gZm9yIHRoZSBhcHBcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgc2VsZi51cGRhdGVEYXRhRnJvbUNhY2hlKHNlbGYuYWRhbC5jb25maWcubG9naW5SZXNvdXJjZSk7XHJcbiAgICAgICAgICAgIC8vIHJlZGlyZWN0IHRvIGxvZ2luIHJlcXVlc3RlZCBwYWdlXHJcbiAgICAgICAgICAgIHZhciBsb2dpblN0YXJ0UGFnZSA9IHNlbGYuYWRhbC5fZ2V0SXRlbShzZWxmLmFkYWwuQ09OU1RBTlRTLlNUT1JBR0UuU1RBUlRfUEFHRSk7XHJcbiAgICAgICAgICAgIGlmIChsb2dpblN0YXJ0UGFnZSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiByZWRpcmVjdEhhbmRsZXIobG9naW5TdGFydFBhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFRPRE86IGJyb2FkY2FzdCBsb2dpbiBzdWNjZXNzP1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogYnJvYWRjYXN0IGxvZ2luIGZhaWx1cmU/IChyZWFzb246IHRoaXMuYWRhbC5fZ2V0SXRlbSh0aGlzLmFkYWwuQ09OU1RBTlRTLlNUT1JBR0UuRVJST1JfREVTQ1JJUFRJT04pKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGlzTm90Q2FsbGJhY2tIYW5kbGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb2dpbkhhbmRsZXIocGF0aDogc3RyaW5nLCByZWRpcmVjdEhhbmRsZXI6IEZ1bmN0aW9uLCBoYW5kbGVyOiBGdW5jdGlvbikge1xyXG4gICAgdGhpcy5hZGFsLmluZm8oJ0xvZ2luIGV2ZW50IGZvcjonICsgcGF0aCk7XHJcblxyXG4gICAgaWYgKHRoaXMuYWRhbC5jb25maWcgJiYgdGhpcy5hZGFsLmNvbmZpZy5sb2NhbExvZ2luVXJsKSB7XHJcbiAgICAgIHJldHVybiByZWRpcmVjdEhhbmRsZXIodGhpcy5hZGFsLmNvbmZpZy5sb2NhbExvZ2luVXJsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGRpcmVjdGx5IHN0YXJ0IGxvZ2luIGZsb3dcclxuICAgICAgdGhpcy5hZGFsLl9zYXZlSXRlbSh0aGlzLmFkYWwuQ09OU1RBTlRTLlNUT1JBR0UuU1RBUlRfUEFHRSwgcGF0aCk7XHJcbiAgICAgIHRoaXMuYWRhbC5pbmZvKCdTdGFydCBsb2dpbiBhdDonICsgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAvLyBUT0RPOiBicm9hZGNhc3QgbG9naW4gcmVkaXJlY3Q/XHJcbiAgICAgIHRoaXMuYWRhbC5sb2dpbigpO1xyXG4gICAgICByZXR1cm4gaGFuZGxlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uZmlnKCk6IEFkYWxDb25maWcge1xyXG4gICAgcmV0dXJuIHRoaXMuYWRhbC5jb25maWc7XHJcbiAgfVxyXG5cclxuICBsb2dpbigpIHtcclxuICAgIHRoaXMuYWRhbC5sb2dpbigpO1xyXG4gIH1cclxuXHJcbiAgbG9naW5JblByb2dyZXNzKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYWRhbC5sb2dpbkluUHJvZ3Jlc3MoKTtcclxuICB9XHJcblxyXG4gIGxvZ091dCgpIHtcclxuICAgIHRoaXMuYWRhbC5sb2dPdXQoKTtcclxuICB9XHJcblxyXG4gIGdldENhY2hlZFRva2VuKHJlc291cmNlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuYWRhbC5nZXRDYWNoZWRUb2tlbihyZXNvdXJjZSk7XHJcbiAgfVxyXG5cclxuICBnZXRVc2VySW5mbygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMub2F1dGhEYXRhO1xyXG4gIH1cclxuXHJcbiAgYWNxdWlyZVRva2VuKHJlc291cmNlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgLy8gYXV0b21hdGVkIHRva2VuIHJlcXVlc3QgY2FsbFxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLmFkYWwuYWNxdWlyZVRva2VuKHJlc291cmNlLCAoZXJyb3I6IHN0cmluZywgdG9rZW5PdXQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzb2x2ZSh0b2tlbk91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0VXNlcigpOiBQcm9taXNlPFVzZXI+IHtcclxuICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZTxVc2VyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuYWRhbC5nZXRVc2VyKChlcnJvcjogc3RyaW5nLCB1c2VyOiBVc2VyKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXNvbHZlKHVzZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFJlc291cmNlRm9yRW5kcG9pbnQoZW5kcG9pbnQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5hZGFsLmdldFJlc291cmNlRm9yRW5kcG9pbnQoZW5kcG9pbnQpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJDYWNoZSgpIHtcclxuICAgIHRoaXMuYWRhbC5jbGVhckNhY2hlKCk7XHJcbiAgfVxyXG5cclxuICBjbGVhckNhY2hlRm9yUmVzb3VyY2UocmVzb3VyY2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5hZGFsLmNsZWFyQ2FjaGVGb3JSZXNvdXJjZShyZXNvdXJjZSk7XHJcbiAgfVxyXG5cclxuICBpbmZvKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5hZGFsLmluZm8obWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICB2ZXJib3NlKG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgdGhpcy5hZGFsLnZlcmJvc2UobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgaXNBdXRoZW50aWNhdGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMub2F1dGhEYXRhLmlzQXV0aGVudGljYXRlZDtcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
