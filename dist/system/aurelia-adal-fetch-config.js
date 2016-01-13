'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

System.register(['aurelia-fetch-client', './aurelia-adal', 'aurelia-framework'], function (exports_1) {
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
    var aurelia_fetch_client_1, aurelia_adal_1, aurelia_framework_1;
    var AdalFetchConfig;
    return {
        setters: [function (aurelia_fetch_client_1_1) {
            aurelia_fetch_client_1 = aurelia_fetch_client_1_1;
        }, function (aurelia_adal_1_1) {
            aurelia_adal_1 = aurelia_adal_1_1;
        }, function (aurelia_framework_1_1) {
            aurelia_framework_1 = aurelia_framework_1_1;
        }],
        execute: function execute() {
            var AdalFetchConfig = (function () {
                function AdalFetchConfig(httpClient, aureliaAdal) {
                    _classCallCheck(this, AdalFetchConfig);

                    this.httpClient = httpClient;
                    this.aureliaAdal = aureliaAdal;
                }

                _createClass(AdalFetchConfig, [{
                    key: 'configure',
                    value: function configure() {
                        var aureliaAdal = this.aureliaAdal;
                        this.httpClient.configure(function (httpConfig) {
                            httpConfig.withDefaults({
                                headers: {
                                    'Accept': 'application/json'
                                }
                            }).withInterceptor({
                                request: function request(_request) {
                                    return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function callee$6$0() {
                                        var resource, tokenStored, isEndpoint, endpointUrl, token;
                                        return regeneratorRuntime.wrap(function callee$6$0$(context$7$0) {
                                            while (1) switch (context$7$0.prev = context$7$0.next) {
                                                case 0:
                                                    resource = aureliaAdal.getResourceForEndpoint(_request.url);

                                                    if (!(resource == null)) {
                                                        context$7$0.next = 3;
                                                        break;
                                                    }

                                                    return context$7$0.abrupt('return', _request);

                                                case 3:
                                                    tokenStored = aureliaAdal.getCachedToken(resource);
                                                    isEndpoint = false;

                                                    if (!tokenStored) {
                                                        context$7$0.next = 11;
                                                        break;
                                                    }

                                                    aureliaAdal.info('Token is avaliable for this url ' + _request.url);
                                                    _request.headers.append('Authorization', 'Bearer ' + tokenStored);
                                                    return context$7$0.abrupt('return', _request);

                                                case 11:
                                                    if (aureliaAdal.config) {
                                                        for (endpointUrl in aureliaAdal.config().endpoints) {
                                                            if (_request.url.indexOf(endpointUrl) > -1) {
                                                                isEndpoint = true;
                                                            }
                                                        }
                                                    }

                                                    if (!aureliaAdal.loginInProgress()) {
                                                        context$7$0.next = 17;
                                                        break;
                                                    }

                                                    aureliaAdal.info('login already started.');
                                                    throw new Error('login already started');

                                                case 17:
                                                    if (!(aureliaAdal.config && isEndpoint)) {
                                                        context$7$0.next = 23;
                                                        break;
                                                    }

                                                    context$7$0.next = 20;
                                                    return aureliaAdal.acquireToken(resource);

                                                case 20:
                                                    token = context$7$0.sent;

                                                    aureliaAdal.verbose('Token is avaliable');
                                                    _request.headers.set('Authorization', 'Bearer ' + token);

                                                case 23:
                                                    return context$7$0.abrupt('return', _request);

                                                case 24:
                                                case 'end':
                                                    return context$7$0.stop();
                                            }
                                        }, callee$6$0, this);
                                    }));
                                },
                                responseError: function responseError(rejection) {
                                    aureliaAdal.info('Getting error in the response');
                                    if (rejection && rejection.status === 401) {
                                        var resource = aureliaAdal.getResourceForEndpoint(rejection.config.url);
                                        aureliaAdal.clearCacheForResource(resource);
                                    }
                                    return rejection;
                                }
                            });
                        });
                    }
                }]);

                return AdalFetchConfig;
            })();
            AdalFetchConfig = __decorate([aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_adal_1.AureliaAdal), __metadata('design:paramtypes', [aurelia_fetch_client_1.HttpClient, aurelia_adal_1.AureliaAdal])], AdalFetchConfig);
            AdalFetchConfig = AdalFetchConfig;
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtYWRhbC1mZXRjaC1jb25maWcuanMiLCJhdXJlbGlhLWFkYWwtZmV0Y2gtY29uZmlnLnRzIl0sIm5hbWVzIjpbIkFkYWxGZXRjaENvbmZpZyIsIkFkYWxGZXRjaENvbmZpZy5jb25zdHJ1Y3RvciIsIkFkYWxGZXRjaENvbmZpZy5jb25maWd1cmUiLCJBZGFsRmV0Y2hDb25maWcuY29uZmlndXJlLnJlcXVlc3QiLCJBZGFsRmV0Y2hDb25maWcuY29uZmlndXJlLnJlc3BvbnNlRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQyxFQUFFLFVBQVMsU0FBUyxFQUFFO0FBQ2pHLFFBQUksVUFBVSxHQUFHLEFBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUssVUFBVSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDbkYsWUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU07WUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJO1lBQUUsQ0FBQyxDQUFDO0FBQzdILFlBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE9BQU8sT0FBTyxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FDMUgsS0FBSyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFD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RUFBRUE7QUFDekNBLDRDQUFJQSxRQUFRQSxHQUFHQSxXQUFXQSxDQUFDQSxzQkFBc0JBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO0FBQ3hFQSxtREFBV0EsQ0FBQ0EscUJBQXFCQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtxQ0FFN0NBO0FBRURBLDJDQUFPQSxTQUFTQSxDQUFDQTtpQ0FDbEJBOzZCQUNGRixDQUFDQSxDQUFDQTt5QkFDTkEsQ0FBQ0EsQ0FBQ0E7cUJBQ0pBOzs7O2dCQUNGRixDQUFBQTtBQXRFRCwyQkFBQSxHQUFBLFVBQUEsQ0FBQSxDQUFDLG1CQUFBLENBQUEsTUFBTSxDQUFDLHNCQUFBLENBQUEsVUFBVSxFQUFFLGNBQUEsQ0FBQSxXQUFXLENBQUMsRURnR2hCLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FDbkcsRUFBRSxlQUFlLENBQUMsQ0MzQjlCO0FBckVZLDJCQUFlLEdBQUEsZUFxRTNCLENBQUE7U0Q2QlE7S0FDSixDQUFBO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6ImF1cmVsaWEtYWRhbC1mZXRjaC1jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoWydhdXJlbGlhLWZldGNoLWNsaWVudCcsICcuL2F1cmVsaWEtYWRhbCcsICdhdXJlbGlhLWZyYW1ld29yayddLCBmdW5jdGlvbihleHBvcnRzXzEpIHtcbiAgICB2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG4gICAgfTtcbiAgICB2YXIgX19tZXRhZGF0YSA9ICh0aGlzICYmIHRoaXMuX19tZXRhZGF0YSkgfHwgZnVuY3Rpb24gKGssIHYpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xuICAgIH07XG4gICAgdmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUHJvbWlzZSwgZ2VuZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBnZW5lcmF0b3IgPSBnZW5lcmF0b3IuY2FsbCh0aGlzQXJnLCBfYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNhc3QodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSA/IHZhbHVlIDogbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgICAgICAgICBmdW5jdGlvbiBvbmZ1bGZpbGwodmFsdWUpIHsgdHJ5IHsgc3RlcChcIm5leHRcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgICAgICBmdW5jdGlvbiBvbnJlamVjdCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwidGhyb3dcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgICAgICBmdW5jdGlvbiBzdGVwKHZlcmIsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGdlbmVyYXRvclt2ZXJiXSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBjYXN0KHJlc3VsdC52YWx1ZSkudGhlbihvbmZ1bGZpbGwsIG9ucmVqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ZXAoXCJuZXh0XCIsIHZvaWQgMCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGF1cmVsaWFfZmV0Y2hfY2xpZW50XzEsIGF1cmVsaWFfYWRhbF8xLCBhdXJlbGlhX2ZyYW1ld29ya18xO1xuICAgIHZhciBBZGFsRmV0Y2hDb25maWc7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0dGVyczpbXG4gICAgICAgICAgICBmdW5jdGlvbiAoYXVyZWxpYV9mZXRjaF9jbGllbnRfMV8xKSB7XG4gICAgICAgICAgICAgICAgYXVyZWxpYV9mZXRjaF9jbGllbnRfMSA9IGF1cmVsaWFfZmV0Y2hfY2xpZW50XzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoYXVyZWxpYV9hZGFsXzFfMSkge1xuICAgICAgICAgICAgICAgIGF1cmVsaWFfYWRhbF8xID0gYXVyZWxpYV9hZGFsXzFfMTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoYXVyZWxpYV9mcmFtZXdvcmtfMV8xKSB7XG4gICAgICAgICAgICAgICAgYXVyZWxpYV9mcmFtZXdvcmtfMSA9IGF1cmVsaWFfZnJhbWV3b3JrXzFfMTtcbiAgICAgICAgICAgIH1dLFxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBBZGFsRmV0Y2hDb25maWcgPSBjbGFzcyB7XG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3IoaHR0cENsaWVudCwgYXVyZWxpYUFkYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwQ2xpZW50ID0gaHR0cENsaWVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXJlbGlhQWRhbCA9IGF1cmVsaWFBZGFsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25maWd1cmUoKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhdXJlbGlhQWRhbCA9IHRoaXMuYXVyZWxpYUFkYWw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaHR0cENsaWVudC5jb25maWd1cmUoKGh0dHBDb25maWcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0dHBDb25maWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAud2l0aERlZmF1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC53aXRoSW50ZXJjZXB0b3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QocmVxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXNvdXJjZSA9IGF1cmVsaWFBZGFsLmdldFJlc291cmNlRm9yRW5kcG9pbnQocmVxdWVzdC51cmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc291cmNlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b2tlblN0b3JlZCA9IGF1cmVsaWFBZGFsLmdldENhY2hlZFRva2VuKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpc0VuZHBvaW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW5TdG9yZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXJlbGlhQWRhbC5pbmZvKCdUb2tlbiBpcyBhdmFsaWFibGUgZm9yIHRoaXMgdXJsICcgKyByZXF1ZXN0LnVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuU3RvcmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdXJlbGlhQWRhbC5jb25maWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZW5kcG9pbnRVcmwgaW4gYXVyZWxpYUFkYWwuY29uZmlnKCkuZW5kcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC51cmwuaW5kZXhPZihlbmRwb2ludFVybCkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRW5kcG9pbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdXJlbGlhQWRhbC5sb2dpbkluUHJvZ3Jlc3MoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXJlbGlhQWRhbC5pbmZvKCdsb2dpbiBhbHJlYWR5IHN0YXJ0ZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbG9naW4gYWxyZWFkeSBzdGFydGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGF1cmVsaWFBZGFsLmNvbmZpZyAmJiBpc0VuZHBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b2tlbiA9IHlpZWxkIGF1cmVsaWFBZGFsLmFjcXVpcmVUb2tlbihyZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLnZlcmJvc2UoJ1Rva2VuIGlzIGF2YWxpYWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3IocmVqZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ0dldHRpbmcgZXJyb3IgaW4gdGhlIHJlc3BvbnNlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWplY3Rpb24gJiYgcmVqZWN0aW9uLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzb3VyY2UgPSBhdXJlbGlhQWRhbC5nZXRSZXNvdXJjZUZvckVuZHBvaW50KHJlamVjdGlvbi5jb25maWcudXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmNsZWFyQ2FjaGVGb3JSZXNvdXJjZShyZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIEFkYWxGZXRjaENvbmZpZyA9IF9fZGVjb3JhdGUoW1xuICAgICAgICAgICAgICAgIGF1cmVsaWFfZnJhbWV3b3JrXzEuaW5qZWN0KGF1cmVsaWFfZmV0Y2hfY2xpZW50XzEuSHR0cENsaWVudCwgYXVyZWxpYV9hZGFsXzEuQXVyZWxpYUFkYWwpLCBcbiAgICAgICAgICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246cGFyYW10eXBlcycsIFthdXJlbGlhX2ZldGNoX2NsaWVudF8xLkh0dHBDbGllbnQsIGF1cmVsaWFfYWRhbF8xLkF1cmVsaWFBZGFsXSlcbiAgICAgICAgICAgIF0sIEFkYWxGZXRjaENvbmZpZyk7XG4gICAgICAgICAgICBBZGFsRmV0Y2hDb25maWcgPSBBZGFsRmV0Y2hDb25maWc7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsImltcG9ydCB7SHR0cENsaWVudCwgSHR0cENsaWVudENvbmZpZ3VyYXRpb259IGZyb20gJ2F1cmVsaWEtZmV0Y2gtY2xpZW50JztcclxuaW1wb3J0IHtBdXJlbGlhQWRhbH0gZnJvbSAnLi9hdXJlbGlhLWFkYWwnO1xyXG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5cclxuQGluamVjdChIdHRwQ2xpZW50LCBBdXJlbGlhQWRhbClcclxuZXhwb3J0IGNsYXNzIEFkYWxGZXRjaENvbmZpZyB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LCBwcml2YXRlIGF1cmVsaWFBZGFsOiBBdXJlbGlhQWRhbCkge1xyXG5cclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZSgpIHtcclxuICAgIGxldCBhdXJlbGlhQWRhbCA9IHRoaXMuYXVyZWxpYUFkYWw7XHJcblxyXG4gICAgdGhpcy5odHRwQ2xpZW50LmNvbmZpZ3VyZSgoaHR0cENvbmZpZzogSHR0cENsaWVudENvbmZpZ3VyYXRpb24pID0+IHtcclxuICAgICAgaHR0cENvbmZpZ1xyXG4gICAgICAgIC53aXRoRGVmYXVsdHMoe1xyXG4gICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAud2l0aEludGVyY2VwdG9yKHtcclxuICAgICAgICAgIGFzeW5jIHJlcXVlc3QocmVxdWVzdCk6IFByb21pc2U8UmVxdWVzdD4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzb3VyY2UgPSBhdXJlbGlhQWRhbC5nZXRSZXNvdXJjZUZvckVuZHBvaW50KHJlcXVlc3QudXJsKTtcclxuICAgICAgICAgICAgaWYgKHJlc291cmNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHRva2VuU3RvcmVkID0gYXVyZWxpYUFkYWwuZ2V0Q2FjaGVkVG9rZW4ocmVzb3VyY2UpO1xyXG4gICAgICAgICAgICBsZXQgaXNFbmRwb2ludCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRva2VuU3RvcmVkKSB7XHJcbiAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnVG9rZW4gaXMgYXZhbGlhYmxlIGZvciB0aGlzIHVybCAnICsgcmVxdWVzdC51cmwpO1xyXG4gICAgICAgICAgICAgIC8vIGNoZWNrIGVuZHBvaW50IG1hcHBpbmcgaWYgcHJvdmlkZWRcclxuICAgICAgICAgICAgICByZXF1ZXN0LmhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW5TdG9yZWQpO1xyXG4gICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmIChhdXJlbGlhQWRhbC5jb25maWcpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGVuZHBvaW50VXJsIGluIGF1cmVsaWFBZGFsLmNvbmZpZygpLmVuZHBvaW50cykge1xyXG4gICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC51cmwuaW5kZXhPZihlbmRwb2ludFVybCkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRW5kcG9pbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIC8vIENhbmNlbCByZXF1ZXN0IGlmIGxvZ2luIGlzIHN0YXJ0aW5nXHJcbiAgICAgICAgICAgICAgaWYgKGF1cmVsaWFBZGFsLmxvZ2luSW5Qcm9ncmVzcygpKSB7XHJcbiAgICAgICAgICAgICAgICBhdXJlbGlhQWRhbC5pbmZvKCdsb2dpbiBhbHJlYWR5IHN0YXJ0ZWQuJyk7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvZ2luIGFscmVhZHkgc3RhcnRlZCcpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXVyZWxpYUFkYWwuY29uZmlnICYmIGlzRW5kcG9pbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGV4dGVybmFsIGVuZHBvaW50c1xyXG4gICAgICAgICAgICAgICAgLy8gZGVsYXllZCByZXF1ZXN0IHRvIHJldHVybiBhZnRlciBpZnJhbWUgY29tcGxldGVzXHJcbiAgICAgICAgICAgICAgICBsZXQgdG9rZW4gPSBhd2FpdCBhdXJlbGlhQWRhbC5hY3F1aXJlVG9rZW4ocmVzb3VyY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLnZlcmJvc2UoJ1Rva2VuIGlzIGF2YWxpYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHJlc3BvbnNlRXJyb3IocmVqZWN0aW9uKTogUmVzcG9uc2Uge1xyXG4gICAgICAgICAgICBhdXJlbGlhQWRhbC5pbmZvKCdHZXR0aW5nIGVycm9yIGluIHRoZSByZXNwb25zZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlamVjdGlvbiAmJiByZWplY3Rpb24uc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgICAgICAgICB2YXIgcmVzb3VyY2UgPSBhdXJlbGlhQWRhbC5nZXRSZXNvdXJjZUZvckVuZHBvaW50KHJlamVjdGlvbi5jb25maWcudXJsKTtcclxuICAgICAgICAgICAgICBhdXJlbGlhQWRhbC5jbGVhckNhY2hlRm9yUmVzb3VyY2UocmVzb3VyY2UpO1xyXG4gICAgICAgICAgICAgIC8vIFRPRE86IGJyb2FkY2FzdCBub3RBdXRob3JpemVkP1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
