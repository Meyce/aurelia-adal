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
var aurelia_adal_1 = require('./aurelia-adal');
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
AureliaAdalFetchConfig = __decorate([aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_adal_1.AureliaAdal), __metadata('design:paramtypes', [aurelia_fetch_client_1.HttpClient, aurelia_adal_1.AureliaAdal])], AureliaAdalFetchConfig);
exports.AureliaAdalFetchConfig = AureliaAdalFetchConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtYWRhbC1mZXRjaC1jb25maWcuanMiLCJhdXJlbGlhLWFkYWwtZmV0Y2gtY29uZmlnLnRzIl0sIm5hbWVzIjpbIkF1cmVsaWFBZGFsRmV0Y2hDb25maWciLCJBdXJlbGlhQWRhbEZldGNoQ29uZmlnLmNvbnN0cnVjdG9yIiwiQXVyZWxpYUFkYWxGZXRjaENvbmZpZy5jb25maWd1cmUiLCJBdXJlbGlhQWRhbEZldGNoQ29uZmlnLmNvbmZpZ3VyZS5yZXF1ZXN0IiwiQXVyZWxpYUFkYWxGZXRjaENvbmZpZy5jb25maWd1cmUucmVzcG9uc2VFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBSSxVQUFVLEdBQUcsQUFBQyxhQUFRLFVBQUssVUFBVSxJQUFLLFVBQVUsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQ25GLFFBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNO1FBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSTtRQUFFLENBQUMsQ0FBQztBQUM3SCxRQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssVUFBVSxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQzFILEtBQUssSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxD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QTs7OztJQUNGRixDQUFBQTtBQXRFRCxzQkFBQSxHQUFBLFVBQUEsQ0FBQSxDQUFDLG1CQUFBLENBQUEsTUFBTSxDQUFDLHNCQUFBLENBQUEsVUFBVSxFQUFFLGNBQUEsQ0FBQSxXQUFXLENBQUMsRURvRjVCLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FDbkcsRUFBRSxzQkFBc0IsQ0FBQyxDQ2Z6QjtBQXJFWSxPQUFBLENBQUEsc0JBQXNCLEdBQUEsc0JBcUVsQyxDQUFBIiwiZmlsZSI6ImF1cmVsaWEtYWRhbC1mZXRjaC1jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG52YXIgX19tZXRhZGF0YSA9ICh0aGlzICYmIHRoaXMuX19tZXRhZGF0YSkgfHwgZnVuY3Rpb24gKGssIHYpIHtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEoaywgdik7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUHJvbWlzZSwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwodGhpc0FyZywgX2FyZ3VtZW50cyk7XG4gICAgICAgIGZ1bmN0aW9uIGNhc3QodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSA/IHZhbHVlIDogbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgICAgIGZ1bmN0aW9uIG9uZnVsZmlsbCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwibmV4dFwiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gb25yZWplY3QodmFsdWUpIHsgdHJ5IHsgc3RlcChcInRocm93XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHZlcmIsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZ2VuZXJhdG9yW3ZlcmJdKHZhbHVlKTtcbiAgICAgICAgICAgIHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogY2FzdChyZXN1bHQudmFsdWUpLnRoZW4ob25mdWxmaWxsLCBvbnJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RlcChcIm5leHRcIiwgdm9pZCAwKTtcbiAgICB9KTtcbn07XG52YXIgYXVyZWxpYV9mZXRjaF9jbGllbnRfMSA9IHJlcXVpcmUoJ2F1cmVsaWEtZmV0Y2gtY2xpZW50Jyk7XG52YXIgYXVyZWxpYV9hZGFsXzEgPSByZXF1aXJlKCcuL2F1cmVsaWEtYWRhbCcpO1xudmFyIGF1cmVsaWFfZnJhbWV3b3JrXzEgPSByZXF1aXJlKCdhdXJlbGlhLWZyYW1ld29yaycpO1xubGV0IEF1cmVsaWFBZGFsRmV0Y2hDb25maWcgPSBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoaHR0cENsaWVudCwgYXVyZWxpYUFkYWwpIHtcbiAgICAgICAgdGhpcy5odHRwQ2xpZW50ID0gaHR0cENsaWVudDtcbiAgICAgICAgdGhpcy5hdXJlbGlhQWRhbCA9IGF1cmVsaWFBZGFsO1xuICAgIH1cbiAgICBjb25maWd1cmUoKSB7XG4gICAgICAgIGxldCBhdXJlbGlhQWRhbCA9IHRoaXMuYXVyZWxpYUFkYWw7XG4gICAgICAgIHRoaXMuaHR0cENsaWVudC5jb25maWd1cmUoKGh0dHBDb25maWcpID0+IHtcbiAgICAgICAgICAgIGh0dHBDb25maWdcbiAgICAgICAgICAgICAgICAud2l0aERlZmF1bHRzKHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC53aXRoSW50ZXJjZXB0b3Ioe1xuICAgICAgICAgICAgICAgIHJlcXVlc3QocmVxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXNvdXJjZSA9IGF1cmVsaWFBZGFsLmdldFJlc291cmNlRm9yRW5kcG9pbnQocmVxdWVzdC51cmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc291cmNlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b2tlblN0b3JlZCA9IGF1cmVsaWFBZGFsLmdldENhY2hlZFRva2VuKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpc0VuZHBvaW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW5TdG9yZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXJlbGlhQWRhbC5pbmZvKCdUb2tlbiBpcyBhdmFsaWFibGUgZm9yIHRoaXMgdXJsICcgKyByZXF1ZXN0LnVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuU3RvcmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdXJlbGlhQWRhbC5jb25maWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZW5kcG9pbnRVcmwgaW4gYXVyZWxpYUFkYWwuY29uZmlnKCkuZW5kcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC51cmwuaW5kZXhPZihlbmRwb2ludFVybCkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRW5kcG9pbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdXJlbGlhQWRhbC5sb2dpbkluUHJvZ3Jlc3MoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXJlbGlhQWRhbC5pbmZvKCdsb2dpbiBhbHJlYWR5IHN0YXJ0ZWQuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbG9naW4gYWxyZWFkeSBzdGFydGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGF1cmVsaWFBZGFsLmNvbmZpZyAmJiBpc0VuZHBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b2tlbiA9IHlpZWxkIGF1cmVsaWFBZGFsLmFjcXVpcmVUb2tlbihyZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLnZlcmJvc2UoJ1Rva2VuIGlzIGF2YWxpYWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3IocmVqZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ0dldHRpbmcgZXJyb3IgaW4gdGhlIHJlc3BvbnNlJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWplY3Rpb24gJiYgcmVqZWN0aW9uLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzb3VyY2UgPSBhdXJlbGlhQWRhbC5nZXRSZXNvdXJjZUZvckVuZHBvaW50KHJlamVjdGlvbi5jb25maWcudXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmNsZWFyQ2FjaGVGb3JSZXNvdXJjZShyZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbkF1cmVsaWFBZGFsRmV0Y2hDb25maWcgPSBfX2RlY29yYXRlKFtcbiAgICBhdXJlbGlhX2ZyYW1ld29ya18xLmluamVjdChhdXJlbGlhX2ZldGNoX2NsaWVudF8xLkh0dHBDbGllbnQsIGF1cmVsaWFfYWRhbF8xLkF1cmVsaWFBZGFsKSwgXG4gICAgX19tZXRhZGF0YSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbYXVyZWxpYV9mZXRjaF9jbGllbnRfMS5IdHRwQ2xpZW50LCBhdXJlbGlhX2FkYWxfMS5BdXJlbGlhQWRhbF0pXG5dLCBBdXJlbGlhQWRhbEZldGNoQ29uZmlnKTtcbmV4cG9ydHMuQXVyZWxpYUFkYWxGZXRjaENvbmZpZyA9IEF1cmVsaWFBZGFsRmV0Y2hDb25maWc7XG4iLCJpbXBvcnQge0h0dHBDbGllbnQsIEh0dHBDbGllbnRDb25maWd1cmF0aW9ufSBmcm9tICdhdXJlbGlhLWZldGNoLWNsaWVudCc7XHJcbmltcG9ydCB7QXVyZWxpYUFkYWx9IGZyb20gJy4vYXVyZWxpYS1hZGFsJztcclxuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuXHJcbkBpbmplY3QoSHR0cENsaWVudCwgQXVyZWxpYUFkYWwpXHJcbmV4cG9ydCBjbGFzcyBBdXJlbGlhQWRhbEZldGNoQ29uZmlnIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsIHByaXZhdGUgYXVyZWxpYUFkYWw6IEF1cmVsaWFBZGFsKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgY29uZmlndXJlKCkge1xyXG4gICAgbGV0IGF1cmVsaWFBZGFsID0gdGhpcy5hdXJlbGlhQWRhbDtcclxuXHJcbiAgICB0aGlzLmh0dHBDbGllbnQuY29uZmlndXJlKChodHRwQ29uZmlnOiBIdHRwQ2xpZW50Q29uZmlndXJhdGlvbikgPT4ge1xyXG4gICAgICBodHRwQ29uZmlnXHJcbiAgICAgICAgLndpdGhEZWZhdWx0cyh7XHJcbiAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC53aXRoSW50ZXJjZXB0b3Ioe1xyXG4gICAgICAgICAgYXN5bmMgcmVxdWVzdChyZXF1ZXN0KTogUHJvbWlzZTxSZXF1ZXN0PiB7XHJcbiAgICAgICAgICAgIGxldCByZXNvdXJjZSA9IGF1cmVsaWFBZGFsLmdldFJlc291cmNlRm9yRW5kcG9pbnQocmVxdWVzdC51cmwpO1xyXG4gICAgICAgICAgICBpZiAocmVzb3VyY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdG9rZW5TdG9yZWQgPSBhdXJlbGlhQWRhbC5nZXRDYWNoZWRUb2tlbihyZXNvdXJjZSk7XHJcbiAgICAgICAgICAgIGxldCBpc0VuZHBvaW50ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAodG9rZW5TdG9yZWQpIHtcclxuICAgICAgICAgICAgICBhdXJlbGlhQWRhbC5pbmZvKCdUb2tlbiBpcyBhdmFsaWFibGUgZm9yIHRoaXMgdXJsICcgKyByZXF1ZXN0LnVybCk7XHJcbiAgICAgICAgICAgICAgLy8gY2hlY2sgZW5kcG9pbnQgbWFwcGluZyBpZiBwcm92aWRlZFxyXG4gICAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlblN0b3JlZCk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKGF1cmVsaWFBZGFsLmNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW5kcG9pbnRVcmwgaW4gYXVyZWxpYUFkYWwuY29uZmlnKCkuZW5kcG9pbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnVybC5pbmRleE9mKGVuZHBvaW50VXJsKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNFbmRwb2ludCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgLy8gQ2FuY2VsIHJlcXVlc3QgaWYgbG9naW4gaXMgc3RhcnRpbmdcclxuICAgICAgICAgICAgICBpZiAoYXVyZWxpYUFkYWwubG9naW5JblByb2dyZXNzKCkpIHtcclxuICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ2xvZ2luIGFscmVhZHkgc3RhcnRlZC4nKTtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbG9naW4gYWxyZWFkeSBzdGFydGVkJyk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChhdXJlbGlhQWRhbC5jb25maWcgJiYgaXNFbmRwb2ludCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZXh0ZXJuYWwgZW5kcG9pbnRzXHJcbiAgICAgICAgICAgICAgICAvLyBkZWxheWVkIHJlcXVlc3QgdG8gcmV0dXJuIGFmdGVyIGlmcmFtZSBjb21wbGV0ZXNcclxuICAgICAgICAgICAgICAgIGxldCB0b2tlbiA9IGF3YWl0IGF1cmVsaWFBZGFsLmFjcXVpcmVUb2tlbihyZXNvdXJjZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwudmVyYm9zZSgnVG9rZW4gaXMgYXZhbGlhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW4pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmVzcG9uc2VFcnJvcihyZWplY3Rpb24pOiBSZXNwb25zZSB7XHJcbiAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ0dldHRpbmcgZXJyb3IgaW4gdGhlIHJlc3BvbnNlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVqZWN0aW9uICYmIHJlamVjdGlvbi5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IGF1cmVsaWFBZGFsLmdldFJlc291cmNlRm9yRW5kcG9pbnQocmVqZWN0aW9uLmNvbmZpZy51cmwpO1xyXG4gICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmNsZWFyQ2FjaGVGb3JSZXNvdXJjZShyZXNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgLy8gVE9ETzogYnJvYWRjYXN0IG5vdEF1dGhvcml6ZWQ/XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZWplY3Rpb247XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
