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

        return AureliaAdalFetchConfig;
    })();
    AureliaAdalFetchConfig = __decorate([aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_adal_1.AureliaAdal), __metadata('design:paramtypes', [aurelia_fetch_client_1.HttpClient, aurelia_adal_1.AureliaAdal])], AureliaAdalFetchConfig);
    exports.AureliaAdalFetchConfig = AureliaAdalFetchConfig;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtYWRhbC1mZXRjaC1jb25maWcuanMiLCJhdXJlbGlhLWFkYWwtZmV0Y2gtY29uZmlnLnRzIl0sIm5hbWVzIjpbIkF1cmVsaWFBZGFsRmV0Y2hDb25maWciLCJBdXJlbGlhQWRhbEZldGNoQ29uZmlnLmNvbnN0cnVjdG9yIiwiQXVyZWxpYUFkYWxGZXRjaENvbmZpZy5jb25maWd1cmUiLCJBdXJlbGlhQWRhbEZldGNoQ29uZmlnLmNvbmZpZ3VyZS5yZXF1ZXN0IiwiQXVyZWxpYUFkYWxGZXRjaENvbmZpZy5jb25maWd1cmUucmVzcG9uc2VFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBSSxVQUFVLEdBQUcsQUFBQyxhQUFRLFVBQUssVUFBVSxJQUFLLFVBQVUsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQ25GLFFBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNO1FBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSTtRQUFFLENBQUMsQ0FBQztBQUM3SCxRQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLE9BQU8sQ0FBQyxRQUFRLEtBQUssVUFBVSxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQzFILEtBQUssSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxD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O1FBQ0ZGLENBQUFBO0FBdEVELDBCQUFBLEdBQUEsVUFBQSxDQUFBLENBQUMsbUJBQUEsQ0FBQSxNQUFNLENBQUMsc0JBQUEsQ0FBQSxVQUFVLEVBQUUsY0FBQSxDQUFBLFdBQVcsQ0FBQyxFRGtGeEIsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUMsc0JBQXNCLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUNuRyxFQUFFLHNCQUFzQixDQUFDLENDYjdCO0FBckVZLFdBQUEsQ0FBQSxzQkFBc0IsR0FBQSxzQkFxRWxDLENBQUE7Q0RlQSxDQUFDLENBQUMiLCJmaWxlIjoiYXVyZWxpYS1hZGFsLWZldGNoLWNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2RlY29yYXRlID0gKHRoaXMgJiYgdGhpcy5fX2RlY29yYXRlKSB8fCBmdW5jdGlvbiAoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xufTtcbnZhciBfX21ldGFkYXRhID0gKHRoaXMgJiYgdGhpcy5fX21ldGFkYXRhKSB8fCBmdW5jdGlvbiAoaywgdikge1xuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShrLCB2KTtcbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQcm9taXNlLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBnZW5lcmF0b3IgPSBnZW5lcmF0b3IuY2FsbCh0aGlzQXJnLCBfYXJndW1lbnRzKTtcbiAgICAgICAgZnVuY3Rpb24gY2FzdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlID8gdmFsdWUgOiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICAgICAgZnVuY3Rpb24gb25mdWxmaWxsKHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBvbnJlamVjdCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwidGhyb3dcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAodmVyYiwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbdmVyYl0odmFsdWUpO1xuICAgICAgICAgICAgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBjYXN0KHJlc3VsdC52YWx1ZSkudGhlbihvbmZ1bGZpbGwsIG9ucmVqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBzdGVwKFwibmV4dFwiLCB2b2lkIDApO1xuICAgIH0pO1xufTtcbmRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnYXVyZWxpYS1mZXRjaC1jbGllbnQnLCAnLi9hdXJlbGlhLWFkYWwnLCAnYXVyZWxpYS1mcmFtZXdvcmsnXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIGF1cmVsaWFfZmV0Y2hfY2xpZW50XzEsIGF1cmVsaWFfYWRhbF8xLCBhdXJlbGlhX2ZyYW1ld29ya18xKSB7XG4gICAgbGV0IEF1cmVsaWFBZGFsRmV0Y2hDb25maWcgPSBjbGFzcyB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGh0dHBDbGllbnQsIGF1cmVsaWFBZGFsKSB7XG4gICAgICAgICAgICB0aGlzLmh0dHBDbGllbnQgPSBodHRwQ2xpZW50O1xuICAgICAgICAgICAgdGhpcy5hdXJlbGlhQWRhbCA9IGF1cmVsaWFBZGFsO1xuICAgICAgICB9XG4gICAgICAgIGNvbmZpZ3VyZSgpIHtcbiAgICAgICAgICAgIGxldCBhdXJlbGlhQWRhbCA9IHRoaXMuYXVyZWxpYUFkYWw7XG4gICAgICAgICAgICB0aGlzLmh0dHBDbGllbnQuY29uZmlndXJlKChodHRwQ29uZmlnKSA9PiB7XG4gICAgICAgICAgICAgICAgaHR0cENvbmZpZ1xuICAgICAgICAgICAgICAgICAgICAud2l0aERlZmF1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLndpdGhJbnRlcmNlcHRvcih7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QocmVxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc291cmNlID0gYXVyZWxpYUFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChyZXF1ZXN0LnVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc291cmNlID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b2tlblN0b3JlZCA9IGF1cmVsaWFBZGFsLmdldENhY2hlZFRva2VuKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXNFbmRwb2ludCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlblN0b3JlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXJlbGlhQWRhbC5pbmZvKCdUb2tlbiBpcyBhdmFsaWFibGUgZm9yIHRoaXMgdXJsICcgKyByZXF1ZXN0LnVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlblN0b3JlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF1cmVsaWFBZGFsLmNvbmZpZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZW5kcG9pbnRVcmwgaW4gYXVyZWxpYUFkYWwuY29uZmlnKCkuZW5kcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QudXJsLmluZGV4T2YoZW5kcG9pbnRVcmwpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFbmRwb2ludCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdXJlbGlhQWRhbC5sb2dpbkluUHJvZ3Jlc3MoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnbG9naW4gYWxyZWFkeSBzdGFydGVkLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb2dpbiBhbHJlYWR5IHN0YXJ0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhdXJlbGlhQWRhbC5jb25maWcgJiYgaXNFbmRwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRva2VuID0geWllbGQgYXVyZWxpYUFkYWwuYWNxdWlyZVRva2VuKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLnZlcmJvc2UoJ1Rva2VuIGlzIGF2YWxpYWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZUVycm9yKHJlamVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnR2V0dGluZyBlcnJvciBpbiB0aGUgcmVzcG9uc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWplY3Rpb24gJiYgcmVqZWN0aW9uLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc291cmNlID0gYXVyZWxpYUFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChyZWplY3Rpb24uY29uZmlnLnVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuY2xlYXJDYWNoZUZvclJlc291cmNlKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBdXJlbGlhQWRhbEZldGNoQ29uZmlnID0gX19kZWNvcmF0ZShbXG4gICAgICAgIGF1cmVsaWFfZnJhbWV3b3JrXzEuaW5qZWN0KGF1cmVsaWFfZmV0Y2hfY2xpZW50XzEuSHR0cENsaWVudCwgYXVyZWxpYV9hZGFsXzEuQXVyZWxpYUFkYWwpLCBcbiAgICAgICAgX19tZXRhZGF0YSgnZGVzaWduOnBhcmFtdHlwZXMnLCBbYXVyZWxpYV9mZXRjaF9jbGllbnRfMS5IdHRwQ2xpZW50LCBhdXJlbGlhX2FkYWxfMS5BdXJlbGlhQWRhbF0pXG4gICAgXSwgQXVyZWxpYUFkYWxGZXRjaENvbmZpZyk7XG4gICAgZXhwb3J0cy5BdXJlbGlhQWRhbEZldGNoQ29uZmlnID0gQXVyZWxpYUFkYWxGZXRjaENvbmZpZztcbn0pO1xuIiwiaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwQ2xpZW50Q29uZmlndXJhdGlvbn0gZnJvbSAnYXVyZWxpYS1mZXRjaC1jbGllbnQnO1xyXG5pbXBvcnQge0F1cmVsaWFBZGFsfSBmcm9tICcuL2F1cmVsaWEtYWRhbCc7XHJcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcblxyXG5AaW5qZWN0KEh0dHBDbGllbnQsIEF1cmVsaWFBZGFsKVxyXG5leHBvcnQgY2xhc3MgQXVyZWxpYUFkYWxGZXRjaENvbmZpZyB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LCBwcml2YXRlIGF1cmVsaWFBZGFsOiBBdXJlbGlhQWRhbCkge1xyXG5cclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZSgpIHtcclxuICAgIGxldCBhdXJlbGlhQWRhbCA9IHRoaXMuYXVyZWxpYUFkYWw7XHJcblxyXG4gICAgdGhpcy5odHRwQ2xpZW50LmNvbmZpZ3VyZSgoaHR0cENvbmZpZzogSHR0cENsaWVudENvbmZpZ3VyYXRpb24pID0+IHtcclxuICAgICAgaHR0cENvbmZpZ1xyXG4gICAgICAgIC53aXRoRGVmYXVsdHMoe1xyXG4gICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAud2l0aEludGVyY2VwdG9yKHtcclxuICAgICAgICAgIGFzeW5jIHJlcXVlc3QocmVxdWVzdCk6IFByb21pc2U8UmVxdWVzdD4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzb3VyY2UgPSBhdXJlbGlhQWRhbC5nZXRSZXNvdXJjZUZvckVuZHBvaW50KHJlcXVlc3QudXJsKTtcclxuICAgICAgICAgICAgaWYgKHJlc291cmNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHRva2VuU3RvcmVkID0gYXVyZWxpYUFkYWwuZ2V0Q2FjaGVkVG9rZW4ocmVzb3VyY2UpO1xyXG4gICAgICAgICAgICBsZXQgaXNFbmRwb2ludCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRva2VuU3RvcmVkKSB7XHJcbiAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnVG9rZW4gaXMgYXZhbGlhYmxlIGZvciB0aGlzIHVybCAnICsgcmVxdWVzdC51cmwpO1xyXG4gICAgICAgICAgICAgIC8vIGNoZWNrIGVuZHBvaW50IG1hcHBpbmcgaWYgcHJvdmlkZWRcclxuICAgICAgICAgICAgICByZXF1ZXN0LmhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW5TdG9yZWQpO1xyXG4gICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmIChhdXJlbGlhQWRhbC5jb25maWcpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGVuZHBvaW50VXJsIGluIGF1cmVsaWFBZGFsLmNvbmZpZygpLmVuZHBvaW50cykge1xyXG4gICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC51cmwuaW5kZXhPZihlbmRwb2ludFVybCkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRW5kcG9pbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIC8vIENhbmNlbCByZXF1ZXN0IGlmIGxvZ2luIGlzIHN0YXJ0aW5nXHJcbiAgICAgICAgICAgICAgaWYgKGF1cmVsaWFBZGFsLmxvZ2luSW5Qcm9ncmVzcygpKSB7XHJcbiAgICAgICAgICAgICAgICBhdXJlbGlhQWRhbC5pbmZvKCdsb2dpbiBhbHJlYWR5IHN0YXJ0ZWQuJyk7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvZ2luIGFscmVhZHkgc3RhcnRlZCcpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXVyZWxpYUFkYWwuY29uZmlnICYmIGlzRW5kcG9pbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGV4dGVybmFsIGVuZHBvaW50c1xyXG4gICAgICAgICAgICAgICAgLy8gZGVsYXllZCByZXF1ZXN0IHRvIHJldHVybiBhZnRlciBpZnJhbWUgY29tcGxldGVzXHJcbiAgICAgICAgICAgICAgICBsZXQgdG9rZW4gPSBhd2FpdCBhdXJlbGlhQWRhbC5hY3F1aXJlVG9rZW4ocmVzb3VyY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLnZlcmJvc2UoJ1Rva2VuIGlzIGF2YWxpYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHJlc3BvbnNlRXJyb3IocmVqZWN0aW9uKTogUmVzcG9uc2Uge1xyXG4gICAgICAgICAgICBhdXJlbGlhQWRhbC5pbmZvKCdHZXR0aW5nIGVycm9yIGluIHRoZSByZXNwb25zZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlamVjdGlvbiAmJiByZWplY3Rpb24uc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgICAgICAgICB2YXIgcmVzb3VyY2UgPSBhdXJlbGlhQWRhbC5nZXRSZXNvdXJjZUZvckVuZHBvaW50KHJlamVjdGlvbi5jb25maWcudXJsKTtcclxuICAgICAgICAgICAgICBhdXJlbGlhQWRhbC5jbGVhckNhY2hlRm9yUmVzb3VyY2UocmVzb3VyY2UpO1xyXG4gICAgICAgICAgICAgIC8vIFRPRE86IGJyb2FkY2FzdCBub3RBdXRob3JpemVkP1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
