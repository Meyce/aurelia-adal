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
define(["require", "exports", 'aurelia-fetch-client', './aurelia-adal', 'aurelia-framework'], function (require, exports, aurelia_fetch_client_1, aurelia_adal_1, aurelia_framework_1) {
    var AdalFetchConfig = (function () {
        function AdalFetchConfig(httpClient, aureliaAdal) {
            _classCallCheck(this, AdalFetchConfig);

            this.httpClient = httpClient;
            this.aureliaAdal = aureliaAdal;
        }

        _createClass(AdalFetchConfig, [{
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
                            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function callee$5$0() {
                                var resource, tokenStored, isEndpoint, endpointUrl, token;
                                return regeneratorRuntime.wrap(function callee$5$0$(context$6$0) {
                                    while (1) switch (context$6$0.prev = context$6$0.next) {
                                        case 0:
                                            resource = aureliaAdal.getResourceForEndpoint(_request.url);

                                            if (!(resource == null)) {
                                                context$6$0.next = 3;
                                                break;
                                            }

                                            return context$6$0.abrupt("return", _request);

                                        case 3:
                                            tokenStored = aureliaAdal.getCachedToken(resource);
                                            isEndpoint = false;

                                            if (!tokenStored) {
                                                context$6$0.next = 11;
                                                break;
                                            }

                                            aureliaAdal.info('Token is avaliable for this url ' + _request.url);
                                            _request.headers.append('Authorization', 'Bearer ' + tokenStored);
                                            return context$6$0.abrupt("return", _request);

                                        case 11:
                                            if (aureliaAdal.config) {
                                                for (endpointUrl in aureliaAdal.config().endpoints) {
                                                    if (_request.url.indexOf(endpointUrl) > -1) {
                                                        isEndpoint = true;
                                                    }
                                                }
                                            }

                                            if (!aureliaAdal.loginInProgress()) {
                                                context$6$0.next = 17;
                                                break;
                                            }

                                            aureliaAdal.info('login already started.');
                                            throw new Error('login already started');

                                        case 17:
                                            if (!(aureliaAdal.config && isEndpoint)) {
                                                context$6$0.next = 23;
                                                break;
                                            }

                                            context$6$0.next = 20;
                                            return aureliaAdal.acquireToken(resource);

                                        case 20:
                                            token = context$6$0.sent;

                                            aureliaAdal.verbose('Token is avaliable');
                                            _request.headers.set('Authorization', 'Bearer ' + token);

                                        case 23:
                                            return context$6$0.abrupt("return", _request);

                                        case 24:
                                        case "end":
                                            return context$6$0.stop();
                                    }
                                }, callee$5$0, this);
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
    exports.AdalFetchConfig = AdalFetchConfig;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtYWRhbC1mZXRjaC1jb25maWcuanMiLCJhdXJlbGlhLWFkYWwtZmV0Y2gtY29uZmlnLnRzIl0sIm5hbWVzIjpbIkFkYWxGZXRjaENvbmZpZyIsIkFkYWxGZXRjaENvbmZpZy5jb25zdHJ1Y3RvciIsIkFkYWxGZXRjaENvbmZpZy5jb25maWd1cmUiLCJBZGFsRmV0Y2hDb25maWcuY29uZmlndXJlLnJlcXVlc3QiLCJBZGFsRmV0Y2hDb25maWcuY29uZmlndXJlLnJlc3BvbnNlRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUksVUFBVSxHQUFHLEFBQUMsYUFBUSxVQUFLLFVBQVUsSUFBSyxVQUFVLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUNuRixRQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTTtRQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUk7UUFBRSxDQUFDLENBQUM7QUFDN0gsUUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxLQUMxSCxLQUFLLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxD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QUFBLENBQUMsbUJBQUEsQ0FBQSxNQUFNLENBQUMsc0JBQUEsQ0FBQSxVQUFVLEVBQUUsY0FBQSxDQUFBLFdBQVcsQ0FBQyxFRGtGeEIsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUMsc0JBQXNCLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUNuRyxFQUFFLGVBQWUsQ0FBQyxDQ2J0QjtBQXJFWSxXQUFBLENBQUEsZUFBZSxHQUFBLGVBcUUzQixDQUFBO0NEZUEsQ0FBQyxDQUFDIiwiZmlsZSI6ImF1cmVsaWEtYWRhbC1mZXRjaC1jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG52YXIgX19tZXRhZGF0YSA9ICh0aGlzICYmIHRoaXMuX19tZXRhZGF0YSkgfHwgZnVuY3Rpb24gKGssIHYpIHtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEoaywgdik7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUHJvbWlzZSwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwodGhpc0FyZywgX2FyZ3VtZW50cyk7XG4gICAgICAgIGZ1bmN0aW9uIGNhc3QodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSA/IHZhbHVlIDogbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgICAgIGZ1bmN0aW9uIG9uZnVsZmlsbCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwibmV4dFwiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gb25yZWplY3QodmFsdWUpIHsgdHJ5IHsgc3RlcChcInRocm93XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHZlcmIsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZ2VuZXJhdG9yW3ZlcmJdKHZhbHVlKTtcbiAgICAgICAgICAgIHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogY2FzdChyZXN1bHQudmFsdWUpLnRoZW4ob25mdWxmaWxsLCBvbnJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RlcChcIm5leHRcIiwgdm9pZCAwKTtcbiAgICB9KTtcbn07XG5kZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJ2F1cmVsaWEtZmV0Y2gtY2xpZW50JywgJy4vYXVyZWxpYS1hZGFsJywgJ2F1cmVsaWEtZnJhbWV3b3JrJ10sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBhdXJlbGlhX2ZldGNoX2NsaWVudF8xLCBhdXJlbGlhX2FkYWxfMSwgYXVyZWxpYV9mcmFtZXdvcmtfMSkge1xuICAgIGxldCBBZGFsRmV0Y2hDb25maWcgPSBjbGFzcyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGh0dHBDbGllbnQsIGF1cmVsaWFBZGFsKSB7XG4gICAgICAgICAgICB0aGlzLmh0dHBDbGllbnQgPSBodHRwQ2xpZW50O1xuICAgICAgICAgICAgdGhpcy5hdXJlbGlhQWRhbCA9IGF1cmVsaWFBZGFsO1xuICAgICAgICB9XG4gICAgICAgIGNvbmZpZ3VyZSgpIHtcbiAgICAgICAgICAgIGxldCBhdXJlbGlhQWRhbCA9IHRoaXMuYXVyZWxpYUFkYWw7XG4gICAgICAgICAgICB0aGlzLmh0dHBDbGllbnQuY29uZmlndXJlKChodHRwQ29uZmlnKSA9PiB7XG4gICAgICAgICAgICAgICAgaHR0cENvbmZpZ1xuICAgICAgICAgICAgICAgICAgICAud2l0aERlZmF1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLndpdGhJbnRlcmNlcHRvcih7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QocmVxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc291cmNlID0gYXVyZWxpYUFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChyZXF1ZXN0LnVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc291cmNlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b2tlblN0b3JlZCA9IGF1cmVsaWFBZGFsLmdldENhY2hlZFRva2VuKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNFbmRwb2ludCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlblN0b3JlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXJlbGlhQWRhbC5pbmZvKCdUb2tlbiBpcyBhdmFsaWFibGUgZm9yIHRoaXMgdXJsICcgKyByZXF1ZXN0LnVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlblN0b3JlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF1cmVsaWFBZGFsLmNvbmZpZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZW5kcG9pbnRVcmwgaW4gYXVyZWxpYUFkYWwuY29uZmlnKCkuZW5kcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QudXJsLmluZGV4T2YoZW5kcG9pbnRVcmwpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFbmRwb2ludCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdXJlbGlhQWRhbC5sb2dpbkluUHJvZ3Jlc3MoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnbG9naW4gYWxyZWFkeSBzdGFydGVkLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb2dpbiBhbHJlYWR5IHN0YXJ0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhdXJlbGlhQWRhbC5jb25maWcgJiYgaXNFbmRwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRva2VuID0geWllbGQgYXVyZWxpYUFkYWwuYWNxdWlyZVRva2VuKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLnZlcmJvc2UoJ1Rva2VuIGlzIGF2YWxpYWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZUVycm9yKHJlamVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnR2V0dGluZyBlcnJvciBpbiB0aGUgcmVzcG9uc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWplY3Rpb24gJiYgcmVqZWN0aW9uLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc291cmNlID0gYXVyZWxpYUFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChyZWplY3Rpb24uY29uZmlnLnVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuY2xlYXJDYWNoZUZvclJlc291cmNlKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBZGFsRmV0Y2hDb25maWcgPSBfX2RlY29yYXRlKFtcbiAgICAgICAgYXVyZWxpYV9mcmFtZXdvcmtfMS5pbmplY3QoYXVyZWxpYV9mZXRjaF9jbGllbnRfMS5IdHRwQ2xpZW50LCBhdXJlbGlhX2FkYWxfMS5BdXJlbGlhQWRhbCksIFxuICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246cGFyYW10eXBlcycsIFthdXJlbGlhX2ZldGNoX2NsaWVudF8xLkh0dHBDbGllbnQsIGF1cmVsaWFfYWRhbF8xLkF1cmVsaWFBZGFsXSlcbiAgICBdLCBBZGFsRmV0Y2hDb25maWcpO1xuICAgIGV4cG9ydHMuQWRhbEZldGNoQ29uZmlnID0gQWRhbEZldGNoQ29uZmlnO1xufSk7XG4iLCJpbXBvcnQge0h0dHBDbGllbnQsIEh0dHBDbGllbnRDb25maWd1cmF0aW9ufSBmcm9tICdhdXJlbGlhLWZldGNoLWNsaWVudCc7XHJcbmltcG9ydCB7QXVyZWxpYUFkYWx9IGZyb20gJy4vYXVyZWxpYS1hZGFsJztcclxuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuXHJcbkBpbmplY3QoSHR0cENsaWVudCwgQXVyZWxpYUFkYWwpXHJcbmV4cG9ydCBjbGFzcyBBZGFsRmV0Y2hDb25maWcge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCwgcHJpdmF0ZSBhdXJlbGlhQWRhbDogQXVyZWxpYUFkYWwpIHtcclxuXHJcbiAgfVxyXG5cclxuICBjb25maWd1cmUoKSB7XHJcbiAgICBsZXQgYXVyZWxpYUFkYWwgPSB0aGlzLmF1cmVsaWFBZGFsO1xyXG5cclxuICAgIHRoaXMuaHR0cENsaWVudC5jb25maWd1cmUoKGh0dHBDb25maWc6IEh0dHBDbGllbnRDb25maWd1cmF0aW9uKSA9PiB7XHJcbiAgICAgIGh0dHBDb25maWdcclxuICAgICAgICAud2l0aERlZmF1bHRzKHtcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLndpdGhJbnRlcmNlcHRvcih7XHJcbiAgICAgICAgICBhc3luYyByZXF1ZXN0KHJlcXVlc3QpOiBQcm9taXNlPFJlcXVlc3Q+IHtcclxuICAgICAgICAgICAgbGV0IHJlc291cmNlID0gYXVyZWxpYUFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChyZXF1ZXN0LnVybCk7XHJcbiAgICAgICAgICAgIGlmIChyZXNvdXJjZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB0b2tlblN0b3JlZCA9IGF1cmVsaWFBZGFsLmdldENhY2hlZFRva2VuKHJlc291cmNlKTtcclxuICAgICAgICAgICAgbGV0IGlzRW5kcG9pbnQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0b2tlblN0b3JlZCkge1xyXG4gICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ1Rva2VuIGlzIGF2YWxpYWJsZSBmb3IgdGhpcyB1cmwgJyArIHJlcXVlc3QudXJsKTtcclxuICAgICAgICAgICAgICAvLyBjaGVjayBlbmRwb2ludCBtYXBwaW5nIGlmIHByb3ZpZGVkXHJcbiAgICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuU3RvcmVkKTtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoYXVyZWxpYUFkYWwuY29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbmRwb2ludFVybCBpbiBhdXJlbGlhQWRhbC5jb25maWcoKS5lbmRwb2ludHMpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QudXJsLmluZGV4T2YoZW5kcG9pbnRVcmwpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0VuZHBvaW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAvLyBDYW5jZWwgcmVxdWVzdCBpZiBsb2dpbiBpcyBzdGFydGluZ1xyXG4gICAgICAgICAgICAgIGlmIChhdXJlbGlhQWRhbC5sb2dpbkluUHJvZ3Jlc3MoKSkge1xyXG4gICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnbG9naW4gYWxyZWFkeSBzdGFydGVkLicpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb2dpbiBhbHJlYWR5IHN0YXJ0ZWQnKTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGF1cmVsaWFBZGFsLmNvbmZpZyAmJiBpc0VuZHBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBleHRlcm5hbCBlbmRwb2ludHNcclxuICAgICAgICAgICAgICAgIC8vIGRlbGF5ZWQgcmVxdWVzdCB0byByZXR1cm4gYWZ0ZXIgaWZyYW1lIGNvbXBsZXRlc1xyXG4gICAgICAgICAgICAgICAgbGV0IHRva2VuID0gYXdhaXQgYXVyZWxpYUFkYWwuYWNxdWlyZVRva2VuKHJlc291cmNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhdXJlbGlhQWRhbC52ZXJib3NlKCdUb2tlbiBpcyBhdmFsaWFibGUnKTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByZXNwb25zZUVycm9yKHJlamVjdGlvbik6IFJlc3BvbnNlIHtcclxuICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnR2V0dGluZyBlcnJvciBpbiB0aGUgcmVzcG9uc2UnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZWplY3Rpb24gJiYgcmVqZWN0aW9uLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHJlc291cmNlID0gYXVyZWxpYUFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChyZWplY3Rpb24uY29uZmlnLnVybCk7XHJcbiAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuY2xlYXJDYWNoZUZvclJlc291cmNlKHJlc291cmNlKTtcclxuICAgICAgICAgICAgICAvLyBUT0RPOiBicm9hZGNhc3Qgbm90QXV0aG9yaXplZD9cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlamVjdGlvbjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
