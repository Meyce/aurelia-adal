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

    return AdalFetchConfig;
})();
AdalFetchConfig = __decorate([aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_adal_1.AureliaAdal), __metadata('design:paramtypes', [aurelia_fetch_client_1.HttpClient, aurelia_adal_1.AureliaAdal])], AdalFetchConfig);
exports.AdalFetchConfig = AdalFetchConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtYWRhbC1mZXRjaC1jb25maWcuanMiLCJhdXJlbGlhLWFkYWwtZmV0Y2gtY29uZmlnLnRzIl0sIm5hbWVzIjpbIkFkYWxGZXRjaENvbmZpZyIsIkFkYWxGZXRjaENvbmZpZy5jb25zdHJ1Y3RvciIsIkFkYWxGZXRjaENvbmZpZy5jb25maWd1cmUiLCJBZGFsRmV0Y2hDb25maWcuY29uZmlndXJlLnJlcXVlc3QiLCJBZGFsRmV0Y2hDb25maWcuY29uZmlndXJlLnJlc3BvbnNlRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUksVUFBVSxHQUFHLEFBQUMsYUFBUSxVQUFLLFVBQVUsSUFBSyxVQUFVLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUNuRixRQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTTtRQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUk7UUFBRSxDQUFDLENBQUM7QUFDN0gsUUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxLQUMxSCxLQUFLLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxD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QSxDQUFBLENBQUMsbUJBQUEsQ0FBQSxNQUFNLENBQUMsc0JBQUEsQ0FBQSxVQUFVLEVBQUUsY0FBQSxDQUFBLFdBQVcsQ0FBQyxFRG9GNUIsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUMsc0JBQXNCLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUNuRyxFQUFFLGVBQWUsQ0FBQyxDQ2ZsQjtBQXJFWSxPQUFBLENBQUEsZUFBZSxHQUFBLGVBcUUzQixDQUFBIiwiZmlsZSI6ImF1cmVsaWEtYWRhbC1mZXRjaC1jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG52YXIgX19tZXRhZGF0YSA9ICh0aGlzICYmIHRoaXMuX19tZXRhZGF0YSkgfHwgZnVuY3Rpb24gKGssIHYpIHtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEoaywgdik7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUHJvbWlzZSwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwodGhpc0FyZywgX2FyZ3VtZW50cyk7XG4gICAgICAgIGZ1bmN0aW9uIGNhc3QodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSA/IHZhbHVlIDogbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgICAgIGZ1bmN0aW9uIG9uZnVsZmlsbCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwibmV4dFwiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gb25yZWplY3QodmFsdWUpIHsgdHJ5IHsgc3RlcChcInRocm93XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHZlcmIsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZ2VuZXJhdG9yW3ZlcmJdKHZhbHVlKTtcbiAgICAgICAgICAgIHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogY2FzdChyZXN1bHQudmFsdWUpLnRoZW4ob25mdWxmaWxsLCBvbnJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RlcChcIm5leHRcIiwgdm9pZCAwKTtcbiAgICB9KTtcbn07XG52YXIgYXVyZWxpYV9mZXRjaF9jbGllbnRfMSA9IHJlcXVpcmUoJ2F1cmVsaWEtZmV0Y2gtY2xpZW50Jyk7XG52YXIgYXVyZWxpYV9hZGFsXzEgPSByZXF1aXJlKCcuL2F1cmVsaWEtYWRhbCcpO1xudmFyIGF1cmVsaWFfZnJhbWV3b3JrXzEgPSByZXF1aXJlKCdhdXJlbGlhLWZyYW1ld29yaycpO1xubGV0IEFkYWxGZXRjaENvbmZpZyA9IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihodHRwQ2xpZW50LCBhdXJlbGlhQWRhbCkge1xuICAgICAgICB0aGlzLmh0dHBDbGllbnQgPSBodHRwQ2xpZW50O1xuICAgICAgICB0aGlzLmF1cmVsaWFBZGFsID0gYXVyZWxpYUFkYWw7XG4gICAgfVxuICAgIGNvbmZpZ3VyZSgpIHtcbiAgICAgICAgbGV0IGF1cmVsaWFBZGFsID0gdGhpcy5hdXJlbGlhQWRhbDtcbiAgICAgICAgdGhpcy5odHRwQ2xpZW50LmNvbmZpZ3VyZSgoaHR0cENvbmZpZykgPT4ge1xuICAgICAgICAgICAgaHR0cENvbmZpZ1xuICAgICAgICAgICAgICAgIC53aXRoRGVmYXVsdHMoe1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLndpdGhJbnRlcmNlcHRvcih7XG4gICAgICAgICAgICAgICAgcmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc291cmNlID0gYXVyZWxpYUFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChyZXF1ZXN0LnVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzb3VyY2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRva2VuU3RvcmVkID0gYXVyZWxpYUFkYWwuZ2V0Q2FjaGVkVG9rZW4ocmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzRW5kcG9pbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlblN0b3JlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ1Rva2VuIGlzIGF2YWxpYWJsZSBmb3IgdGhpcyB1cmwgJyArIHJlcXVlc3QudXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW5TdG9yZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF1cmVsaWFBZGFsLmNvbmZpZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbmRwb2ludFVybCBpbiBhdXJlbGlhQWRhbC5jb25maWcoKS5lbmRwb2ludHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnVybC5pbmRleE9mKGVuZHBvaW50VXJsKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFbmRwb2ludCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF1cmVsaWFBZGFsLmxvZ2luSW5Qcm9ncmVzcygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ2xvZ2luIGFscmVhZHkgc3RhcnRlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb2dpbiBhbHJlYWR5IHN0YXJ0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYXVyZWxpYUFkYWwuY29uZmlnICYmIGlzRW5kcG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRva2VuID0geWllbGQgYXVyZWxpYUFkYWwuYWNxdWlyZVRva2VuKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwudmVyYm9zZSgnVG9rZW4gaXMgYXZhbGlhYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VFcnJvcihyZWplY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnR2V0dGluZyBlcnJvciBpbiB0aGUgcmVzcG9uc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlamVjdGlvbiAmJiByZWplY3Rpb24uc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IGF1cmVsaWFBZGFsLmdldFJlc291cmNlRm9yRW5kcG9pbnQocmVqZWN0aW9uLmNvbmZpZy51cmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuY2xlYXJDYWNoZUZvclJlc291cmNlKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuQWRhbEZldGNoQ29uZmlnID0gX19kZWNvcmF0ZShbXG4gICAgYXVyZWxpYV9mcmFtZXdvcmtfMS5pbmplY3QoYXVyZWxpYV9mZXRjaF9jbGllbnRfMS5IdHRwQ2xpZW50LCBhdXJlbGlhX2FkYWxfMS5BdXJlbGlhQWRhbCksIFxuICAgIF9fbWV0YWRhdGEoJ2Rlc2lnbjpwYXJhbXR5cGVzJywgW2F1cmVsaWFfZmV0Y2hfY2xpZW50XzEuSHR0cENsaWVudCwgYXVyZWxpYV9hZGFsXzEuQXVyZWxpYUFkYWxdKVxuXSwgQWRhbEZldGNoQ29uZmlnKTtcbmV4cG9ydHMuQWRhbEZldGNoQ29uZmlnID0gQWRhbEZldGNoQ29uZmlnO1xuIiwiaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwQ2xpZW50Q29uZmlndXJhdGlvbn0gZnJvbSAnYXVyZWxpYS1mZXRjaC1jbGllbnQnO1xyXG5pbXBvcnQge0F1cmVsaWFBZGFsfSBmcm9tICcuL2F1cmVsaWEtYWRhbCc7XHJcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcblxyXG5AaW5qZWN0KEh0dHBDbGllbnQsIEF1cmVsaWFBZGFsKVxyXG5leHBvcnQgY2xhc3MgQWRhbEZldGNoQ29uZmlnIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsIHByaXZhdGUgYXVyZWxpYUFkYWw6IEF1cmVsaWFBZGFsKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgY29uZmlndXJlKCkge1xyXG4gICAgbGV0IGF1cmVsaWFBZGFsID0gdGhpcy5hdXJlbGlhQWRhbDtcclxuXHJcbiAgICB0aGlzLmh0dHBDbGllbnQuY29uZmlndXJlKChodHRwQ29uZmlnOiBIdHRwQ2xpZW50Q29uZmlndXJhdGlvbikgPT4ge1xyXG4gICAgICBodHRwQ29uZmlnXHJcbiAgICAgICAgLndpdGhEZWZhdWx0cyh7XHJcbiAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC53aXRoSW50ZXJjZXB0b3Ioe1xyXG4gICAgICAgICAgYXN5bmMgcmVxdWVzdChyZXF1ZXN0KTogUHJvbWlzZTxSZXF1ZXN0PiB7XHJcbiAgICAgICAgICAgIGxldCByZXNvdXJjZSA9IGF1cmVsaWFBZGFsLmdldFJlc291cmNlRm9yRW5kcG9pbnQocmVxdWVzdC51cmwpO1xyXG4gICAgICAgICAgICBpZiAocmVzb3VyY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdG9rZW5TdG9yZWQgPSBhdXJlbGlhQWRhbC5nZXRDYWNoZWRUb2tlbihyZXNvdXJjZSk7XHJcbiAgICAgICAgICAgIGxldCBpc0VuZHBvaW50ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAodG9rZW5TdG9yZWQpIHtcclxuICAgICAgICAgICAgICBhdXJlbGlhQWRhbC5pbmZvKCdUb2tlbiBpcyBhdmFsaWFibGUgZm9yIHRoaXMgdXJsICcgKyByZXF1ZXN0LnVybCk7XHJcbiAgICAgICAgICAgICAgLy8gY2hlY2sgZW5kcG9pbnQgbWFwcGluZyBpZiBwcm92aWRlZFxyXG4gICAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlblN0b3JlZCk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKGF1cmVsaWFBZGFsLmNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW5kcG9pbnRVcmwgaW4gYXVyZWxpYUFkYWwuY29uZmlnKCkuZW5kcG9pbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnVybC5pbmRleE9mKGVuZHBvaW50VXJsKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNFbmRwb2ludCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgLy8gQ2FuY2VsIHJlcXVlc3QgaWYgbG9naW4gaXMgc3RhcnRpbmdcclxuICAgICAgICAgICAgICBpZiAoYXVyZWxpYUFkYWwubG9naW5JblByb2dyZXNzKCkpIHtcclxuICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ2xvZ2luIGFscmVhZHkgc3RhcnRlZC4nKTtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbG9naW4gYWxyZWFkeSBzdGFydGVkJyk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChhdXJlbGlhQWRhbC5jb25maWcgJiYgaXNFbmRwb2ludCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZXh0ZXJuYWwgZW5kcG9pbnRzXHJcbiAgICAgICAgICAgICAgICAvLyBkZWxheWVkIHJlcXVlc3QgdG8gcmV0dXJuIGFmdGVyIGlmcmFtZSBjb21wbGV0ZXNcclxuICAgICAgICAgICAgICAgIGxldCB0b2tlbiA9IGF3YWl0IGF1cmVsaWFBZGFsLmFjcXVpcmVUb2tlbihyZXNvdXJjZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwudmVyYm9zZSgnVG9rZW4gaXMgYXZhbGlhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW4pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmVzcG9uc2VFcnJvcihyZWplY3Rpb24pOiBSZXNwb25zZSB7XHJcbiAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ0dldHRpbmcgZXJyb3IgaW4gdGhlIHJlc3BvbnNlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVqZWN0aW9uICYmIHJlamVjdGlvbi5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IGF1cmVsaWFBZGFsLmdldFJlc291cmNlRm9yRW5kcG9pbnQocmVqZWN0aW9uLmNvbmZpZy51cmwpO1xyXG4gICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmNsZWFyQ2FjaGVGb3JSZXNvdXJjZShyZXNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgLy8gVE9ETzogYnJvYWRjYXN0IG5vdEF1dGhvcml6ZWQ/XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZWplY3Rpb247XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
