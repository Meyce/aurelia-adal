'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

System.register(['aurelia-fetch-client', './aurelia-adal-manager', 'aurelia-framework'], function (exports_1) {
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
    var aurelia_fetch_client_1, aurelia_adal_manager_1, aurelia_framework_1;
    var AureliaAdalFetchConfig;
    return {
        setters: [function (aurelia_fetch_client_1_1) {
            aurelia_fetch_client_1 = aurelia_fetch_client_1_1;
        }, function (aurelia_adal_manager_1_1) {
            aurelia_adal_manager_1 = aurelia_adal_manager_1_1;
        }, function (aurelia_framework_1_1) {
            aurelia_framework_1 = aurelia_framework_1_1;
        }],
        execute: function execute() {
            var AureliaAdalFetchConfig = (function () {
                function AureliaAdalFetchConfig(httpClient, aureliaAdal) {
                    _classCallCheck(this, AureliaAdalFetchConfig);

                    this.httpClient = httpClient;
                    this.aureliaAdal = aureliaAdal;
                }

                _createClass(AureliaAdalFetchConfig, [{
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

                return AureliaAdalFetchConfig;
            })();
            AureliaAdalFetchConfig = __decorate([aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_adal_manager_1.AureliaAdalManager), __metadata('design:paramtypes', [aurelia_fetch_client_1.HttpClient, aurelia_adal_manager_1.AureliaAdalManager])], AureliaAdalFetchConfig);
            AureliaAdalFetchConfig = AureliaAdalFetchConfig;
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtYWRhbC1mZXRjaC1jb25maWcuanMiLCJhdXJlbGlhLWFkYWwtZmV0Y2gtY29uZmlnLnRzIl0sIm5hbWVzIjpbIkF1cmVsaWFBZGFsRmV0Y2hDb25maWciLCJBdXJlbGlhQWRhbEZldGNoQ29uZmlnLmNvbnN0cnVjdG9yIiwiQXVyZWxpYUFkYWxGZXRjaENvbmZpZy5jb25maWd1cmUiLCJBdXJlbGlhQWRhbEZldGNoQ29uZmlnLmNvbmZpZ3VyZS5yZXF1ZXN0IiwiQXVyZWxpYUFkYWxGZXRjaENvbmZpZy5jb25maWd1cmUucmVzcG9uc2VFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLHNCQUFzQixFQUFFLHdCQUF3QixFQUFFLG1CQUFtQixDQUFDLEVBQUUsVUFBUyxTQUFTLEVBQUU7QUFDekcsUUFBSSxVQUFVLEdBQUcsQUFBQyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSyxVQUFVLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUNuRixZQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTTtZQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUk7WUFBRSxDQUFDLENBQUM7QUFDN0gsWUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxLQUMxSCxLQUFLLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFF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U0FBU0EsSUFBSUEsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsR0FBR0EsRUFBRUE7QUFDekNBLDRDQUFJQSxRQUFRQSxHQUFHQSxXQUFXQSxDQUFDQSxzQkFBc0JBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO0FBQ3hFQSxtREFBV0EsQ0FBQ0EscUJBQXFCQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtxQ0FFN0NBO0FBRURBLDJDQUFPQSxTQUFTQSxDQUFDQTtpQ0FDbEJBOzZCQUNGRixDQUFDQSxDQUFDQTt5QkFDTkEsQ0FBQ0EsQ0FBQ0E7cUJBQ0pBOzs7O2dCQUNGRixDQUFBQTtBQXRFRCxrQ0FBQSxHQUFBLFVBQUEsQ0FBQSxDQUFDLG1CQUFBLENBQUEsTUFBTSxDQUFDLHNCQUFBLENBQUEsVUFBVSxFQUFFLHNCQUFBLENBQUEsa0JBQWtCLENBQUMsRURnR3ZCLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsRUFBRSxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQ2xILEVBQUUsc0JBQXNCLENBQUMsQ0MzQnJDO0FBckVZLGtDQUFzQixHQUFBLHNCQXFFbEMsQ0FBQTtTRDZCUTtLQUNKLENBQUE7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoiYXVyZWxpYS1hZGFsLWZldGNoLWNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbJ2F1cmVsaWEtZmV0Y2gtY2xpZW50JywgJy4vYXVyZWxpYS1hZGFsLW1hbmFnZXInLCAnYXVyZWxpYS1mcmFtZXdvcmsnXSwgZnVuY3Rpb24oZXhwb3J0c18xKSB7XG4gICAgdmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgICAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xuICAgICAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgICAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgICAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xuICAgIH07XG4gICAgdmFyIF9fbWV0YWRhdGEgPSAodGhpcyAmJiB0aGlzLl9fbWV0YWRhdGEpIHx8IGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShrLCB2KTtcbiAgICB9O1xuICAgIHZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFByb21pc2UsIGdlbmVyYXRvcikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwodGhpc0FyZywgX2FyZ3VtZW50cyk7XG4gICAgICAgICAgICBmdW5jdGlvbiBjYXN0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IFByb21pc2UgPyB2YWx1ZSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgICAgICAgICAgZnVuY3Rpb24gb25mdWxmaWxsKHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICAgICAgZnVuY3Rpb24gb25yZWplY3QodmFsdWUpIHsgdHJ5IHsgc3RlcChcInRocm93XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICAgICAgZnVuY3Rpb24gc3RlcCh2ZXJiLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbdmVyYl0odmFsdWUpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogY2FzdChyZXN1bHQudmFsdWUpLnRoZW4ob25mdWxmaWxsLCBvbnJlamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGVwKFwibmV4dFwiLCB2b2lkIDApO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHZhciBhdXJlbGlhX2ZldGNoX2NsaWVudF8xLCBhdXJlbGlhX2FkYWxfbWFuYWdlcl8xLCBhdXJlbGlhX2ZyYW1ld29ya18xO1xuICAgIHZhciBBdXJlbGlhQWRhbEZldGNoQ29uZmlnO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6W1xuICAgICAgICAgICAgZnVuY3Rpb24gKGF1cmVsaWFfZmV0Y2hfY2xpZW50XzFfMSkge1xuICAgICAgICAgICAgICAgIGF1cmVsaWFfZmV0Y2hfY2xpZW50XzEgPSBhdXJlbGlhX2ZldGNoX2NsaWVudF8xXzE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKGF1cmVsaWFfYWRhbF9tYW5hZ2VyXzFfMSkge1xuICAgICAgICAgICAgICAgIGF1cmVsaWFfYWRhbF9tYW5hZ2VyXzEgPSBhdXJlbGlhX2FkYWxfbWFuYWdlcl8xXzE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKGF1cmVsaWFfZnJhbWV3b3JrXzFfMSkge1xuICAgICAgICAgICAgICAgIGF1cmVsaWFfZnJhbWV3b3JrXzEgPSBhdXJlbGlhX2ZyYW1ld29ya18xXzE7XG4gICAgICAgICAgICB9XSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgQXVyZWxpYUFkYWxGZXRjaENvbmZpZyA9IGNsYXNzIHtcbiAgICAgICAgICAgICAgICBjb25zdHJ1Y3RvcihodHRwQ2xpZW50LCBhdXJlbGlhQWRhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmh0dHBDbGllbnQgPSBodHRwQ2xpZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1cmVsaWFBZGFsID0gYXVyZWxpYUFkYWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF1cmVsaWFBZGFsID0gdGhpcy5hdXJlbGlhQWRhbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwQ2xpZW50LmNvbmZpZ3VyZSgoaHR0cENvbmZpZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHR0cENvbmZpZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC53aXRoRGVmYXVsdHMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLndpdGhJbnRlcmNlcHRvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc291cmNlID0gYXVyZWxpYUFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChyZXF1ZXN0LnVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzb3VyY2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRva2VuU3RvcmVkID0gYXVyZWxpYUFkYWwuZ2V0Q2FjaGVkVG9rZW4ocmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzRW5kcG9pbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlblN0b3JlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ1Rva2VuIGlzIGF2YWxpYWJsZSBmb3IgdGhpcyB1cmwgJyArIHJlcXVlc3QudXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW5TdG9yZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF1cmVsaWFBZGFsLmNvbmZpZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbmRwb2ludFVybCBpbiBhdXJlbGlhQWRhbC5jb25maWcoKS5lbmRwb2ludHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnVybC5pbmRleE9mKGVuZHBvaW50VXJsKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFbmRwb2ludCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF1cmVsaWFBZGFsLmxvZ2luSW5Qcm9ncmVzcygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ2xvZ2luIGFscmVhZHkgc3RhcnRlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb2dpbiBhbHJlYWR5IHN0YXJ0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYXVyZWxpYUFkYWwuY29uZmlnICYmIGlzRW5kcG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRva2VuID0geWllbGQgYXVyZWxpYUFkYWwuYWNxdWlyZVRva2VuKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwudmVyYm9zZSgnVG9rZW4gaXMgYXZhbGlhYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VFcnJvcihyZWplY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnR2V0dGluZyBlcnJvciBpbiB0aGUgcmVzcG9uc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlamVjdGlvbiAmJiByZWplY3Rpb24uc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IGF1cmVsaWFBZGFsLmdldFJlc291cmNlRm9yRW5kcG9pbnQocmVqZWN0aW9uLmNvbmZpZy51cmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuY2xlYXJDYWNoZUZvclJlc291cmNlKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgQXVyZWxpYUFkYWxGZXRjaENvbmZpZyA9IF9fZGVjb3JhdGUoW1xuICAgICAgICAgICAgICAgIGF1cmVsaWFfZnJhbWV3b3JrXzEuaW5qZWN0KGF1cmVsaWFfZmV0Y2hfY2xpZW50XzEuSHR0cENsaWVudCwgYXVyZWxpYV9hZGFsX21hbmFnZXJfMS5BdXJlbGlhQWRhbE1hbmFnZXIpLCBcbiAgICAgICAgICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246cGFyYW10eXBlcycsIFthdXJlbGlhX2ZldGNoX2NsaWVudF8xLkh0dHBDbGllbnQsIGF1cmVsaWFfYWRhbF9tYW5hZ2VyXzEuQXVyZWxpYUFkYWxNYW5hZ2VyXSlcbiAgICAgICAgICAgIF0sIEF1cmVsaWFBZGFsRmV0Y2hDb25maWcpO1xuICAgICAgICAgICAgQXVyZWxpYUFkYWxGZXRjaENvbmZpZyA9IEF1cmVsaWFBZGFsRmV0Y2hDb25maWc7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsImltcG9ydCB7SHR0cENsaWVudCwgSHR0cENsaWVudENvbmZpZ3VyYXRpb259IGZyb20gJ2F1cmVsaWEtZmV0Y2gtY2xpZW50JztcclxuaW1wb3J0IHtBdXJlbGlhQWRhbE1hbmFnZXJ9IGZyb20gJy4vYXVyZWxpYS1hZGFsLW1hbmFnZXInO1xyXG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5cclxuQGluamVjdChIdHRwQ2xpZW50LCBBdXJlbGlhQWRhbE1hbmFnZXIpXHJcbmV4cG9ydCBjbGFzcyBBdXJlbGlhQWRhbEZldGNoQ29uZmlnIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsIHByaXZhdGUgYXVyZWxpYUFkYWw6IEF1cmVsaWFBZGFsTWFuYWdlcikge1xyXG5cclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZSgpIHtcclxuICAgIGxldCBhdXJlbGlhQWRhbCA9IHRoaXMuYXVyZWxpYUFkYWw7XHJcblxyXG4gICAgdGhpcy5odHRwQ2xpZW50LmNvbmZpZ3VyZSgoaHR0cENvbmZpZzogSHR0cENsaWVudENvbmZpZ3VyYXRpb24pID0+IHtcclxuICAgICAgaHR0cENvbmZpZ1xyXG4gICAgICAgIC53aXRoRGVmYXVsdHMoe1xyXG4gICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAud2l0aEludGVyY2VwdG9yKHtcclxuICAgICAgICAgIGFzeW5jIHJlcXVlc3QocmVxdWVzdCk6IFByb21pc2U8UmVxdWVzdD4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzb3VyY2UgPSBhdXJlbGlhQWRhbC5nZXRSZXNvdXJjZUZvckVuZHBvaW50KHJlcXVlc3QudXJsKTtcclxuICAgICAgICAgICAgaWYgKHJlc291cmNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHRva2VuU3RvcmVkID0gYXVyZWxpYUFkYWwuZ2V0Q2FjaGVkVG9rZW4ocmVzb3VyY2UpO1xyXG4gICAgICAgICAgICBsZXQgaXNFbmRwb2ludCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRva2VuU3RvcmVkKSB7XHJcbiAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnVG9rZW4gaXMgYXZhbGlhYmxlIGZvciB0aGlzIHVybCAnICsgcmVxdWVzdC51cmwpO1xyXG4gICAgICAgICAgICAgIC8vIGNoZWNrIGVuZHBvaW50IG1hcHBpbmcgaWYgcHJvdmlkZWRcclxuICAgICAgICAgICAgICByZXF1ZXN0LmhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW5TdG9yZWQpO1xyXG4gICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmIChhdXJlbGlhQWRhbC5jb25maWcpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGVuZHBvaW50VXJsIGluIGF1cmVsaWFBZGFsLmNvbmZpZygpLmVuZHBvaW50cykge1xyXG4gICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC51cmwuaW5kZXhPZihlbmRwb2ludFVybCkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRW5kcG9pbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIC8vIENhbmNlbCByZXF1ZXN0IGlmIGxvZ2luIGlzIHN0YXJ0aW5nXHJcbiAgICAgICAgICAgICAgaWYgKGF1cmVsaWFBZGFsLmxvZ2luSW5Qcm9ncmVzcygpKSB7XHJcbiAgICAgICAgICAgICAgICBhdXJlbGlhQWRhbC5pbmZvKCdsb2dpbiBhbHJlYWR5IHN0YXJ0ZWQuJyk7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvZ2luIGFscmVhZHkgc3RhcnRlZCcpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXVyZWxpYUFkYWwuY29uZmlnICYmIGlzRW5kcG9pbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGV4dGVybmFsIGVuZHBvaW50c1xyXG4gICAgICAgICAgICAgICAgLy8gZGVsYXllZCByZXF1ZXN0IHRvIHJldHVybiBhZnRlciBpZnJhbWUgY29tcGxldGVzXHJcbiAgICAgICAgICAgICAgICBsZXQgdG9rZW4gPSBhd2FpdCBhdXJlbGlhQWRhbC5hY3F1aXJlVG9rZW4ocmVzb3VyY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLnZlcmJvc2UoJ1Rva2VuIGlzIGF2YWxpYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHJlc3BvbnNlRXJyb3IocmVqZWN0aW9uKTogUmVzcG9uc2Uge1xyXG4gICAgICAgICAgICBhdXJlbGlhQWRhbC5pbmZvKCdHZXR0aW5nIGVycm9yIGluIHRoZSByZXNwb25zZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlamVjdGlvbiAmJiByZWplY3Rpb24uc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgICAgICAgICB2YXIgcmVzb3VyY2UgPSBhdXJlbGlhQWRhbC5nZXRSZXNvdXJjZUZvckVuZHBvaW50KHJlamVjdGlvbi5jb25maWcudXJsKTtcclxuICAgICAgICAgICAgICBhdXJlbGlhQWRhbC5jbGVhckNhY2hlRm9yUmVzb3VyY2UocmVzb3VyY2UpO1xyXG4gICAgICAgICAgICAgIC8vIFRPRE86IGJyb2FkY2FzdCBub3RBdXRob3JpemVkP1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
