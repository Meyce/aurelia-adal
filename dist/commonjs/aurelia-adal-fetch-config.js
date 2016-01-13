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
var aurelia_fetch_client_1 = require('aurelia-fetch-client');
var aurelia_adal_manager_1 = require('./aurelia-adal-manager');
var aurelia_framework_1 = require('aurelia-framework');
var AureliaAdalFetchConfig = (function () {
    function AureliaAdalFetchConfig(httpClient, aureliaAdal) {
        _classCallCheck(this, AureliaAdalFetchConfig);

        this.httpClient = httpClient;
        this.aureliaAdal = aureliaAdal;
    }

    _createClass(AureliaAdalFetchConfig, [{
        key: "configure",
        value: function configure() {
            var aureliaAdal = this.aureliaAdal;
            this.httpClient.configure(function (httpConfig) {
                httpConfig.withDefaults({
                    headers: {
                        'Accept': 'application/json'
                    }
                }).withInterceptor({
                    request: function request(_request) {
                        return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function callee$4$0() {
                            var resource, tokenStored, isEndpoint, endpointUrl, token;
                            return regeneratorRuntime.wrap(function callee$4$0$(context$5$0) {
                                while (1) switch (context$5$0.prev = context$5$0.next) {
                                    case 0:
                                        resource = aureliaAdal.getResourceForEndpoint(_request.url);

                                        if (!(resource == null)) {
                                            context$5$0.next = 3;
                                            break;
                                        }

                                        return context$5$0.abrupt("return", _request);

                                    case 3:
                                        tokenStored = aureliaAdal.getCachedToken(resource);
                                        isEndpoint = false;

                                        if (!tokenStored) {
                                            context$5$0.next = 11;
                                            break;
                                        }

                                        aureliaAdal.info('Token is avaliable for this url ' + _request.url);
                                        _request.headers.append('Authorization', 'Bearer ' + tokenStored);
                                        return context$5$0.abrupt("return", _request);

                                    case 11:
                                        if (aureliaAdal.config) {
                                            for (endpointUrl in aureliaAdal.config().endpoints) {
                                                if (_request.url.indexOf(endpointUrl) > -1) {
                                                    isEndpoint = true;
                                                }
                                            }
                                        }

                                        if (!aureliaAdal.loginInProgress()) {
                                            context$5$0.next = 17;
                                            break;
                                        }

                                        aureliaAdal.info('login already started.');
                                        throw new Error('login already started');

                                    case 17:
                                        if (!(aureliaAdal.config && isEndpoint)) {
                                            context$5$0.next = 23;
                                            break;
                                        }

                                        context$5$0.next = 20;
                                        return aureliaAdal.acquireToken(resource);

                                    case 20:
                                        token = context$5$0.sent;

                                        aureliaAdal.verbose('Token is avaliable');
                                        _request.headers.set('Authorization', 'Bearer ' + token);

                                    case 23:
                                        return context$5$0.abrupt("return", _request);

                                    case 24:
                                    case "end":
                                        return context$5$0.stop();
                                }
                            }, callee$4$0, this);
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

    return AureliaAdalFetchConfig;
})();
AureliaAdalFetchConfig = __decorate([aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_adal_manager_1.AureliaAdalManager), __metadata('design:paramtypes', [aurelia_fetch_client_1.HttpClient, aurelia_adal_manager_1.AureliaAdalManager])], AureliaAdalFetchConfig);
exports.AureliaAdalFetchConfig = AureliaAdalFetchConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtYWRhbC1mZXRjaC1jb25maWcuanMiLCJhdXJlbGlhLWFkYWwtZmV0Y2gtY29uZmlnLnRzIl0sIm5hbWVzIjpbIkF1cmVsaWFBZGFsRmV0Y2hDb25maWciLCJBdXJlbGlhQWRhbEZldGNoQ29uZmlnLmNvbnN0cnVjdG9yIiwiQXVyZWxpYUFkYWxGZXRjaENvbmZpZy5jb25maWd1cmUiLCJBdXJlbGlhQWRhbEZldGNoQ29uZmlnLmNvbmZpZ3VyZS5yZXF1ZXN0IiwiQXVyZWxpYUFkYWxGZXRjaENvbmZpZy5jb25maWd1cmUucmVzcG9uc2VFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBSSxVQUFVLEdBQUcsQUFBQyxhQUFRLFVBQUssVUFBVSxJQUFLLFVBQVUsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQ25GLFFBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNO1FBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSTtRQUFFLENBQUMsQ0FBQztBQUM3SCxRQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssVUFBVSxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQzFILEtBQUssSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxD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Q0pBOzs7O0lBQ0ZGLENBQUFBO0FBdEVELHNCQUFBLEdBQUEsVUFBQSxDQUFBLENBQUMsbUJBQUEsQ0FBQSxNQUFNLENBQUMsc0JBQUEsQ0FBQSxVQUFVLEVBQUUsc0JBQUEsQ0FBQSxrQkFBa0IsQ0FBQyxFRG9GbkMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUMsc0JBQXNCLENBQUMsVUFBVSxFQUFFLHNCQUFzQixDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FDbEgsRUFBRSxzQkFBc0IsQ0FBQyxDQ2Z6QjtBQXJFWSxPQUFBLENBQUEsc0JBQXNCLEdBQUEsc0JBcUVsQyxDQUFBIiwiZmlsZSI6ImF1cmVsaWEtYWRhbC1mZXRjaC1jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG52YXIgX19tZXRhZGF0YSA9ICh0aGlzICYmIHRoaXMuX19tZXRhZGF0YSkgfHwgZnVuY3Rpb24gKGssIHYpIHtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEoaywgdik7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUHJvbWlzZSwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwodGhpc0FyZywgX2FyZ3VtZW50cyk7XG4gICAgICAgIGZ1bmN0aW9uIGNhc3QodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSA/IHZhbHVlIDogbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgICAgIGZ1bmN0aW9uIG9uZnVsZmlsbCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwibmV4dFwiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gb25yZWplY3QodmFsdWUpIHsgdHJ5IHsgc3RlcChcInRocm93XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHZlcmIsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZ2VuZXJhdG9yW3ZlcmJdKHZhbHVlKTtcbiAgICAgICAgICAgIHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogY2FzdChyZXN1bHQudmFsdWUpLnRoZW4ob25mdWxmaWxsLCBvbnJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RlcChcIm5leHRcIiwgdm9pZCAwKTtcbiAgICB9KTtcbn07XG52YXIgYXVyZWxpYV9mZXRjaF9jbGllbnRfMSA9IHJlcXVpcmUoJ2F1cmVsaWEtZmV0Y2gtY2xpZW50Jyk7XG52YXIgYXVyZWxpYV9hZGFsX21hbmFnZXJfMSA9IHJlcXVpcmUoJy4vYXVyZWxpYS1hZGFsLW1hbmFnZXInKTtcbnZhciBhdXJlbGlhX2ZyYW1ld29ya18xID0gcmVxdWlyZSgnYXVyZWxpYS1mcmFtZXdvcmsnKTtcbmxldCBBdXJlbGlhQWRhbEZldGNoQ29uZmlnID0gY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGh0dHBDbGllbnQsIGF1cmVsaWFBZGFsKSB7XG4gICAgICAgIHRoaXMuaHR0cENsaWVudCA9IGh0dHBDbGllbnQ7XG4gICAgICAgIHRoaXMuYXVyZWxpYUFkYWwgPSBhdXJlbGlhQWRhbDtcbiAgICB9XG4gICAgY29uZmlndXJlKCkge1xuICAgICAgICBsZXQgYXVyZWxpYUFkYWwgPSB0aGlzLmF1cmVsaWFBZGFsO1xuICAgICAgICB0aGlzLmh0dHBDbGllbnQuY29uZmlndXJlKChodHRwQ29uZmlnKSA9PiB7XG4gICAgICAgICAgICBodHRwQ29uZmlnXG4gICAgICAgICAgICAgICAgLndpdGhEZWZhdWx0cyh7XG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAud2l0aEludGVyY2VwdG9yKHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzb3VyY2UgPSBhdXJlbGlhQWRhbC5nZXRSZXNvdXJjZUZvckVuZHBvaW50KHJlcXVlc3QudXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNvdXJjZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG9rZW5TdG9yZWQgPSBhdXJlbGlhQWRhbC5nZXRDYWNoZWRUb2tlbihyZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNFbmRwb2ludCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuU3RvcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnVG9rZW4gaXMgYXZhbGlhYmxlIGZvciB0aGlzIHVybCAnICsgcmVxdWVzdC51cmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlblN0b3JlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXVyZWxpYUFkYWwuY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGVuZHBvaW50VXJsIGluIGF1cmVsaWFBZGFsLmNvbmZpZygpLmVuZHBvaW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QudXJsLmluZGV4T2YoZW5kcG9pbnRVcmwpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0VuZHBvaW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXVyZWxpYUFkYWwubG9naW5JblByb2dyZXNzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnbG9naW4gYWxyZWFkeSBzdGFydGVkLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvZ2luIGFscmVhZHkgc3RhcnRlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhdXJlbGlhQWRhbC5jb25maWcgJiYgaXNFbmRwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdG9rZW4gPSB5aWVsZCBhdXJlbGlhQWRhbC5hY3F1aXJlVG9rZW4ocmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXJlbGlhQWRhbC52ZXJib3NlKCdUb2tlbiBpcyBhdmFsaWFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZXNwb25zZUVycm9yKHJlamVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBhdXJlbGlhQWRhbC5pbmZvKCdHZXR0aW5nIGVycm9yIGluIHRoZSByZXNwb25zZScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVqZWN0aW9uICYmIHJlamVjdGlvbi5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc291cmNlID0gYXVyZWxpYUFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChyZWplY3Rpb24uY29uZmlnLnVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXJlbGlhQWRhbC5jbGVhckNhY2hlRm9yUmVzb3VyY2UocmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3Rpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5BdXJlbGlhQWRhbEZldGNoQ29uZmlnID0gX19kZWNvcmF0ZShbXG4gICAgYXVyZWxpYV9mcmFtZXdvcmtfMS5pbmplY3QoYXVyZWxpYV9mZXRjaF9jbGllbnRfMS5IdHRwQ2xpZW50LCBhdXJlbGlhX2FkYWxfbWFuYWdlcl8xLkF1cmVsaWFBZGFsTWFuYWdlciksIFxuICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjpwYXJhbXR5cGVzJywgW2F1cmVsaWFfZmV0Y2hfY2xpZW50XzEuSHR0cENsaWVudCwgYXVyZWxpYV9hZGFsX21hbmFnZXJfMS5BdXJlbGlhQWRhbE1hbmFnZXJdKVxuXSwgQXVyZWxpYUFkYWxGZXRjaENvbmZpZyk7XG5leHBvcnRzLkF1cmVsaWFBZGFsRmV0Y2hDb25maWcgPSBBdXJlbGlhQWRhbEZldGNoQ29uZmlnO1xuIiwiaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwQ2xpZW50Q29uZmlndXJhdGlvbn0gZnJvbSAnYXVyZWxpYS1mZXRjaC1jbGllbnQnO1xyXG5pbXBvcnQge0F1cmVsaWFBZGFsTWFuYWdlcn0gZnJvbSAnLi9hdXJlbGlhLWFkYWwtbWFuYWdlcic7XHJcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcblxyXG5AaW5qZWN0KEh0dHBDbGllbnQsIEF1cmVsaWFBZGFsTWFuYWdlcilcclxuZXhwb3J0IGNsYXNzIEF1cmVsaWFBZGFsRmV0Y2hDb25maWcge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCwgcHJpdmF0ZSBhdXJlbGlhQWRhbDogQXVyZWxpYUFkYWxNYW5hZ2VyKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgY29uZmlndXJlKCkge1xyXG4gICAgbGV0IGF1cmVsaWFBZGFsID0gdGhpcy5hdXJlbGlhQWRhbDtcclxuXHJcbiAgICB0aGlzLmh0dHBDbGllbnQuY29uZmlndXJlKChodHRwQ29uZmlnOiBIdHRwQ2xpZW50Q29uZmlndXJhdGlvbikgPT4ge1xyXG4gICAgICBodHRwQ29uZmlnXHJcbiAgICAgICAgLndpdGhEZWZhdWx0cyh7XHJcbiAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC53aXRoSW50ZXJjZXB0b3Ioe1xyXG4gICAgICAgICAgYXN5bmMgcmVxdWVzdChyZXF1ZXN0KTogUHJvbWlzZTxSZXF1ZXN0PiB7XHJcbiAgICAgICAgICAgIGxldCByZXNvdXJjZSA9IGF1cmVsaWFBZGFsLmdldFJlc291cmNlRm9yRW5kcG9pbnQocmVxdWVzdC51cmwpO1xyXG4gICAgICAgICAgICBpZiAocmVzb3VyY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdG9rZW5TdG9yZWQgPSBhdXJlbGlhQWRhbC5nZXRDYWNoZWRUb2tlbihyZXNvdXJjZSk7XHJcbiAgICAgICAgICAgIGxldCBpc0VuZHBvaW50ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAodG9rZW5TdG9yZWQpIHtcclxuICAgICAgICAgICAgICBhdXJlbGlhQWRhbC5pbmZvKCdUb2tlbiBpcyBhdmFsaWFibGUgZm9yIHRoaXMgdXJsICcgKyByZXF1ZXN0LnVybCk7XHJcbiAgICAgICAgICAgICAgLy8gY2hlY2sgZW5kcG9pbnQgbWFwcGluZyBpZiBwcm92aWRlZFxyXG4gICAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlblN0b3JlZCk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKGF1cmVsaWFBZGFsLmNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW5kcG9pbnRVcmwgaW4gYXVyZWxpYUFkYWwuY29uZmlnKCkuZW5kcG9pbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnVybC5pbmRleE9mKGVuZHBvaW50VXJsKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNFbmRwb2ludCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgLy8gQ2FuY2VsIHJlcXVlc3QgaWYgbG9naW4gaXMgc3RhcnRpbmdcclxuICAgICAgICAgICAgICBpZiAoYXVyZWxpYUFkYWwubG9naW5JblByb2dyZXNzKCkpIHtcclxuICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ2xvZ2luIGFscmVhZHkgc3RhcnRlZC4nKTtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbG9naW4gYWxyZWFkeSBzdGFydGVkJyk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChhdXJlbGlhQWRhbC5jb25maWcgJiYgaXNFbmRwb2ludCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZXh0ZXJuYWwgZW5kcG9pbnRzXHJcbiAgICAgICAgICAgICAgICAvLyBkZWxheWVkIHJlcXVlc3QgdG8gcmV0dXJuIGFmdGVyIGlmcmFtZSBjb21wbGV0ZXNcclxuICAgICAgICAgICAgICAgIGxldCB0b2tlbiA9IGF3YWl0IGF1cmVsaWFBZGFsLmFjcXVpcmVUb2tlbihyZXNvdXJjZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwudmVyYm9zZSgnVG9rZW4gaXMgYXZhbGlhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW4pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmVzcG9uc2VFcnJvcihyZWplY3Rpb24pOiBSZXNwb25zZSB7XHJcbiAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ0dldHRpbmcgZXJyb3IgaW4gdGhlIHJlc3BvbnNlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVqZWN0aW9uICYmIHJlamVjdGlvbi5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IGF1cmVsaWFBZGFsLmdldFJlc291cmNlRm9yRW5kcG9pbnQocmVqZWN0aW9uLmNvbmZpZy51cmwpO1xyXG4gICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmNsZWFyQ2FjaGVGb3JSZXNvdXJjZShyZXNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgLy8gVE9ETzogYnJvYWRjYXN0IG5vdEF1dGhvcml6ZWQ/XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZWplY3Rpb247XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
