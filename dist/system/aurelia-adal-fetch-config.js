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
    var AureliaAdalFetchConfig;
    return {
        setters: [function (aurelia_fetch_client_1_1) {
            aurelia_fetch_client_1 = aurelia_fetch_client_1_1;
        }, function (aurelia_adal_1_1) {
            aurelia_adal_1 = aurelia_adal_1_1;
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
            AureliaAdalFetchConfig = __decorate([aurelia_framework_1.inject(aurelia_fetch_client_1.HttpClient, aurelia_adal_1.AureliaAdal), __metadata('design:paramtypes', [aurelia_fetch_client_1.HttpClient, aurelia_adal_1.AureliaAdal])], AureliaAdalFetchConfig);
            AureliaAdalFetchConfig = AureliaAdalFetchConfig;
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtYWRhbC1mZXRjaC1jb25maWcuanMiLCJhdXJlbGlhLWFkYWwtZmV0Y2gtY29uZmlnLnRzIl0sIm5hbWVzIjpbIkF1cmVsaWFBZGFsRmV0Y2hDb25maWciLCJBdXJlbGlhQWRhbEZldGNoQ29uZmlnLmNvbnN0cnVjdG9yIiwiQXVyZWxpYUFkYWxGZXRjaENvbmZpZy5jb25maWd1cmUiLCJBdXJlbGlhQWRhbEZldGNoQ29uZmlnLmNvbmZpZ3VyZS5yZXF1ZXN0IiwiQXVyZWxpYUFkYWxGZXRjaENvbmZpZy5jb25maWd1cmUucmVzcG9uc2VFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLHNCQUFzQixFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixDQUFDLEVBQUUsVUFBUyxTQUFTLEVBQUU7QUFDakcsUUFBSSxVQUFVLEdBQUcsQUFBQyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSyxVQUFVLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtBQUNuRixZQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTTtZQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUk7WUFBRSxDQUFDLENBQUM7QUFDN0gsWUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxLQUMxSCxLQUFLLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQSxJQUFLLENBQUMsQ0FBQztBQUNsSixlQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDakUsQ0FBQztBQUNGLFFBQUksVUFBVSxHQUFHLEFBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUssVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQzFELFlBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE9BQU8sT0FBTyxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUUsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUM1RyxDQUFDO0FBQ0YsUUFBSSxTQUFTLEdBQUcsQUFBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSyxVQUFVLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRTtBQUMzRixlQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMxQyxxQkFBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ2hELHFCQUFTLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFBRSx1QkFBTyxLQUFLLFlBQVksT0FBTyxJQUFJLEtBQUssQ0FBQyxXQUFXLEtBQUssT0FBTyxHQUFHLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRTtBQUFFLDJCQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQUUsQ0FBQyxDQUFDO2FBQUU7QUFDeEoscUJBQVMsU0FBUyxDQUFDLEtBQUssRUFBRTtBQUFFLG9CQUFJO0FBQUUsd0JBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUFFLDBCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQUU7YUFBRTtBQUNuRixxQkFBUyxRQUFRLENBQUMsS0FBSyxFQUFFO0FBQUUsb0JBQUk7QUFBRSx3QkFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQUUsMEJBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFBRTthQUFFO0FBQ25GLHFCQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO0FBQ3ZCLG9CQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEMsc0JBQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDdEY7QUFDRCxnQkFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3hCLENBQUMsQ0FBQztLQUNOLENBQUM7QUFDRixRQUFJLHNCQUFzQixFQUFFLGNBQWMsRUFBRSxtQkFBbUIsQ0FBQztBQUNoRSxRQUFJLHNCQUFzQixDQUFDO0FBQzNCLFdBQU87QUFDSCxlQUFPLEVBQUMsQ0FDSixVQUFVLHdCQUF3QixFQUFFO0FBQ2hDLGtDQUFzQixHQUFHLHdCQUF3QixDQUFDO1NBQ3JELEVBQ0QsVUFBVSxnQkFBZ0IsRUFBRTtBQUN4QiwwQkFBYyxHQUFHLGdCQUFnQixDQUFDO1NBQ3JDLEVBQ0QsVUFBVSxxQkFBcUIsRUFBRTtBQUM3QiwrQkFBbUIsR0FBRyxxQkFBcUIsQ0FBQztTQUMvQyxDQUFDO0FBQ04sZUFBTyxFQUFFLG1CQUFXO0FDaEM1QixnQkFBQSxzQkFBQTtBQUVFQSxnREFBb0JBLFVBQXNCQSxFQUFVQSxXQUF3QkEsRUFBQUE7OztBQUF4REMsd0JBQUFBLENBQUFBLFVBQVVBLEdBQVZBLFVBQVVBLENBQVlBO0FBQVVBLHdCQUFBQSxDQUFBQSxXQUFXQSxHQUFYQSxXQUFXQSxDQUFhQTtpQkFFM0VBOzs7OzJCQUVRRCxxQkFBQUE7QUFDUEUsNEJBQUlBLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBO0FBRW5DQSw0QkFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsVUFBQ0EsVUFBbUNBLEVBQUFBO0FBQzVEQSxzQ0FBVUEsQ0FDUEEsWUFBWUEsQ0FBQ0E7QUFDWkEsdUNBQU9BLEVBQUVBO0FBQ1BBLDRDQUFRQSxFQUFFQSxrQkFBa0JBO2lDQUM3QkE7NkJBQ0ZBLENBQUNBLENBQ0RBLGVBQWVBLENBQUNBO0FBQ1RBLHVDQUFPQSxFQUFBQSxpQkFBQ0EsUUFBT0EsRUFBQUE7QURnQ0MsMkNBQU8sU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLDBCQUFFOzRDQy9CeERDLFFBQVFBLEVBS1JBLFdBQVdBLEVBQ1hBLFVBQVVBLEVBU0RBLFdBQVdBLEVBY2hCQSxLQUFLQTs7OztBQTdCVEEsNERBQVFBLEdBQUdBLFdBQVdBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsUUFBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7OzBEQUMxREEsUUFBUUEsSUFBSUEsSUFBSUEsQ0FBQUE7Ozs7O3dGQUNYQSxRQUFPQTs7O0FBR1pBLCtEQUFXQSxHQUFHQSxXQUFXQSxDQUFDQSxjQUFjQSxDQUFDQSxRQUFRQSxDQUFDQTtBQUNsREEsOERBQVVBLEdBQUdBLEtBQUtBOzt5REFFbEJBLFdBQVdBOzs7OztBQUNiQSwrREFBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esa0NBQWtDQSxHQUFHQSxRQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtBQUVuRUEsNERBQU9BLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLGVBQWVBLEVBQUVBLFNBQVNBLEdBQUdBLFdBQVdBLENBQUNBLENBQUNBO3dGQUMxREEsUUFBT0E7OztBQUVkQSx3REFBSUEsV0FBV0EsQ0FBQ0EsTUFBTUEsRUFBRUE7QUFDdEJBLDZEQUFTQSxXQUFXQSxJQUFJQSxXQUFXQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxTQUFTQSxFQUFFQTtBQUN0REEsZ0VBQUlBLFFBQU9BLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBO0FBQ3pDQSwwRUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0E7NkRBQ25CQTt5REFDRkE7cURBQ0ZBOzt5REFHR0EsV0FBV0EsQ0FBQ0EsZUFBZUEsRUFBRUE7Ozs7O0FBQy9CQSwrREFBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxDQUFDQTswREFDckNBLElBQUlBLEtBQUtBLENBQUNBLHVCQUF1QkEsQ0FBQ0E7OzswREFDL0JBLFdBQVdBLENBQUNBLE1BQU1BLElBQUlBLFVBQVVBLENBQUFBOzs7Ozs7MkRBR3ZCQSxXQUFXQSxDQUFDQSxZQUFZQSxDQUFDQSxRQUFRQSxDQUFDQTs7O0FBQWhEQSx5REFBS0E7O0FBRVRBLCtEQUFXQSxDQUFDQSxPQUFPQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBO0FBQzFDQSw0REFBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsZUFBZUEsRUFBRUEsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7Ozt3RkFJckRBLFFBQU9BOzs7Ozs7O3FDQUNmQSxFQUFBQSxDQUFBQTtpQ0FBQUQ7QUFDREEsNkNBQWFBLEVBQUFBLHVCQUFDQSxTQUFTQSxFQUFBQTtBQUNyQkUsK0NBQVdBLENBQUNBLElBQUlBLENBQUNBLCtCQUErQkEsQ0FBQ0EsQ0FBQ0E7QUFFbERBLHdDQUFJQSxTQUFTQSxJQUFJQSxTQUFTQSxDQUFDQSxNQUFNQSxLQUFLQSxHQUFHQSxFQUFFQTtBQUN6Q0EsNENBQUlBLFFBQVFBLEdBQUdBLFdBQVdBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7QUFDeEVBLG1EQUFXQSxDQUFDQSxxQkFBcUJBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO3FDQUU3Q0E7QUFFREEsMkNBQU9BLFNBQVNBLENBQUNBO2lDQUNsQkE7NkJBQ0ZGLENBQUNBLENBQUNBO3lCQUNOQSxDQUFDQSxDQUFDQTtxQkFDSkE7Ozs7Z0JBQ0ZGLENBQUFBO0FBdEVELGtDQUFBLEdBQUEsVUFBQSxDQUFBLENBQUMsbUJBQUEsQ0FBQSxNQUFNLENBQUMsc0JBQUEsQ0FBQSxVQUFVLEVBQUUsY0FBQSxDQUFBLFdBQVcsQ0FBQyxFRGdHaEIsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUMsc0JBQXNCLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUNuRyxFQUFFLHNCQUFzQixDQUFDLENDM0JyQztBQXJFWSxrQ0FBc0IsR0FBQSxzQkFxRWxDLENBQUE7U0Q2QlE7S0FDSixDQUFBO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6ImF1cmVsaWEtYWRhbC1mZXRjaC1jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJTeXN0ZW0ucmVnaXN0ZXIoWydhdXJlbGlhLWZldGNoLWNsaWVudCcsICcuL2F1cmVsaWEtYWRhbCcsICdhdXJlbGlhLWZyYW1ld29yayddLCBmdW5jdGlvbihleHBvcnRzXzEpIHtcbiAgICB2YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XG4gICAgICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG4gICAgfTtcbiAgICB2YXIgX19tZXRhZGF0YSA9ICh0aGlzICYmIHRoaXMuX19tZXRhZGF0YSkgfHwgZnVuY3Rpb24gKGssIHYpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKGssIHYpO1xuICAgIH07XG4gICAgdmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUHJvbWlzZSwgZ2VuZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBnZW5lcmF0b3IgPSBnZW5lcmF0b3IuY2FsbCh0aGlzQXJnLCBfYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNhc3QodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSA/IHZhbHVlIDogbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgICAgICAgICBmdW5jdGlvbiBvbmZ1bGZpbGwodmFsdWUpIHsgdHJ5IHsgc3RlcChcIm5leHRcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgICAgICBmdW5jdGlvbiBvbnJlamVjdCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwidGhyb3dcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgICAgICBmdW5jdGlvbiBzdGVwKHZlcmIsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGdlbmVyYXRvclt2ZXJiXSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBjYXN0KHJlc3VsdC52YWx1ZSkudGhlbihvbmZ1bGZpbGwsIG9ucmVqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ZXAoXCJuZXh0XCIsIHZvaWQgMCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGF1cmVsaWFfZmV0Y2hfY2xpZW50XzEsIGF1cmVsaWFfYWRhbF8xLCBhdXJlbGlhX2ZyYW1ld29ya18xO1xuICAgIHZhciBBdXJlbGlhQWRhbEZldGNoQ29uZmlnO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6W1xuICAgICAgICAgICAgZnVuY3Rpb24gKGF1cmVsaWFfZmV0Y2hfY2xpZW50XzFfMSkge1xuICAgICAgICAgICAgICAgIGF1cmVsaWFfZmV0Y2hfY2xpZW50XzEgPSBhdXJlbGlhX2ZldGNoX2NsaWVudF8xXzE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKGF1cmVsaWFfYWRhbF8xXzEpIHtcbiAgICAgICAgICAgICAgICBhdXJlbGlhX2FkYWxfMSA9IGF1cmVsaWFfYWRhbF8xXzE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24gKGF1cmVsaWFfZnJhbWV3b3JrXzFfMSkge1xuICAgICAgICAgICAgICAgIGF1cmVsaWFfZnJhbWV3b3JrXzEgPSBhdXJlbGlhX2ZyYW1ld29ya18xXzE7XG4gICAgICAgICAgICB9XSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgQXVyZWxpYUFkYWxGZXRjaENvbmZpZyA9IGNsYXNzIHtcbiAgICAgICAgICAgICAgICBjb25zdHJ1Y3RvcihodHRwQ2xpZW50LCBhdXJlbGlhQWRhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmh0dHBDbGllbnQgPSBodHRwQ2xpZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmF1cmVsaWFBZGFsID0gYXVyZWxpYUFkYWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF1cmVsaWFBZGFsID0gdGhpcy5hdXJlbGlhQWRhbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwQ2xpZW50LmNvbmZpZ3VyZSgoaHR0cENvbmZpZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaHR0cENvbmZpZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC53aXRoRGVmYXVsdHMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLndpdGhJbnRlcmNlcHRvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc291cmNlID0gYXVyZWxpYUFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChyZXF1ZXN0LnVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzb3VyY2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRva2VuU3RvcmVkID0gYXVyZWxpYUFkYWwuZ2V0Q2FjaGVkVG9rZW4ocmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzRW5kcG9pbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlblN0b3JlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ1Rva2VuIGlzIGF2YWxpYWJsZSBmb3IgdGhpcyB1cmwgJyArIHJlcXVlc3QudXJsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW5TdG9yZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF1cmVsaWFBZGFsLmNvbmZpZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbmRwb2ludFVybCBpbiBhdXJlbGlhQWRhbC5jb25maWcoKS5lbmRwb2ludHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnVybC5pbmRleE9mKGVuZHBvaW50VXJsKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFbmRwb2ludCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF1cmVsaWFBZGFsLmxvZ2luSW5Qcm9ncmVzcygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ2xvZ2luIGFscmVhZHkgc3RhcnRlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb2dpbiBhbHJlYWR5IHN0YXJ0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYXVyZWxpYUFkYWwuY29uZmlnICYmIGlzRW5kcG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRva2VuID0geWllbGQgYXVyZWxpYUFkYWwuYWNxdWlyZVRva2VuKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwudmVyYm9zZSgnVG9rZW4gaXMgYXZhbGlhYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VFcnJvcihyZWplY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnR2V0dGluZyBlcnJvciBpbiB0aGUgcmVzcG9uc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlamVjdGlvbiAmJiByZWplY3Rpb24uc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IGF1cmVsaWFBZGFsLmdldFJlc291cmNlRm9yRW5kcG9pbnQocmVqZWN0aW9uLmNvbmZpZy51cmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuY2xlYXJDYWNoZUZvclJlc291cmNlKHJlc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgQXVyZWxpYUFkYWxGZXRjaENvbmZpZyA9IF9fZGVjb3JhdGUoW1xuICAgICAgICAgICAgICAgIGF1cmVsaWFfZnJhbWV3b3JrXzEuaW5qZWN0KGF1cmVsaWFfZmV0Y2hfY2xpZW50XzEuSHR0cENsaWVudCwgYXVyZWxpYV9hZGFsXzEuQXVyZWxpYUFkYWwpLCBcbiAgICAgICAgICAgICAgICBfX21ldGFkYXRhKCdkZXNpZ246cGFyYW10eXBlcycsIFthdXJlbGlhX2ZldGNoX2NsaWVudF8xLkh0dHBDbGllbnQsIGF1cmVsaWFfYWRhbF8xLkF1cmVsaWFBZGFsXSlcbiAgICAgICAgICAgIF0sIEF1cmVsaWFBZGFsRmV0Y2hDb25maWcpO1xuICAgICAgICAgICAgQXVyZWxpYUFkYWxGZXRjaENvbmZpZyA9IEF1cmVsaWFBZGFsRmV0Y2hDb25maWc7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsImltcG9ydCB7SHR0cENsaWVudCwgSHR0cENsaWVudENvbmZpZ3VyYXRpb259IGZyb20gJ2F1cmVsaWEtZmV0Y2gtY2xpZW50JztcclxuaW1wb3J0IHtBdXJlbGlhQWRhbH0gZnJvbSAnLi9hdXJlbGlhLWFkYWwnO1xyXG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5cclxuQGluamVjdChIdHRwQ2xpZW50LCBBdXJlbGlhQWRhbClcclxuZXhwb3J0IGNsYXNzIEF1cmVsaWFBZGFsRmV0Y2hDb25maWcge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCwgcHJpdmF0ZSBhdXJlbGlhQWRhbDogQXVyZWxpYUFkYWwpIHtcclxuXHJcbiAgfVxyXG5cclxuICBjb25maWd1cmUoKSB7XHJcbiAgICBsZXQgYXVyZWxpYUFkYWwgPSB0aGlzLmF1cmVsaWFBZGFsO1xyXG5cclxuICAgIHRoaXMuaHR0cENsaWVudC5jb25maWd1cmUoKGh0dHBDb25maWc6IEh0dHBDbGllbnRDb25maWd1cmF0aW9uKSA9PiB7XHJcbiAgICAgIGh0dHBDb25maWdcclxuICAgICAgICAud2l0aERlZmF1bHRzKHtcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLndpdGhJbnRlcmNlcHRvcih7XHJcbiAgICAgICAgICBhc3luYyByZXF1ZXN0KHJlcXVlc3QpOiBQcm9taXNlPFJlcXVlc3Q+IHtcclxuICAgICAgICAgICAgbGV0IHJlc291cmNlID0gYXVyZWxpYUFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChyZXF1ZXN0LnVybCk7XHJcbiAgICAgICAgICAgIGlmIChyZXNvdXJjZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB0b2tlblN0b3JlZCA9IGF1cmVsaWFBZGFsLmdldENhY2hlZFRva2VuKHJlc291cmNlKTtcclxuICAgICAgICAgICAgbGV0IGlzRW5kcG9pbnQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0b2tlblN0b3JlZCkge1xyXG4gICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ1Rva2VuIGlzIGF2YWxpYWJsZSBmb3IgdGhpcyB1cmwgJyArIHJlcXVlc3QudXJsKTtcclxuICAgICAgICAgICAgICAvLyBjaGVjayBlbmRwb2ludCBtYXBwaW5nIGlmIHByb3ZpZGVkXHJcbiAgICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuU3RvcmVkKTtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoYXVyZWxpYUFkYWwuY29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbmRwb2ludFVybCBpbiBhdXJlbGlhQWRhbC5jb25maWcoKS5lbmRwb2ludHMpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QudXJsLmluZGV4T2YoZW5kcG9pbnRVcmwpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0VuZHBvaW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAvLyBDYW5jZWwgcmVxdWVzdCBpZiBsb2dpbiBpcyBzdGFydGluZ1xyXG4gICAgICAgICAgICAgIGlmIChhdXJlbGlhQWRhbC5sb2dpbkluUHJvZ3Jlc3MoKSkge1xyXG4gICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnbG9naW4gYWxyZWFkeSBzdGFydGVkLicpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb2dpbiBhbHJlYWR5IHN0YXJ0ZWQnKTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGF1cmVsaWFBZGFsLmNvbmZpZyAmJiBpc0VuZHBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBleHRlcm5hbCBlbmRwb2ludHNcclxuICAgICAgICAgICAgICAgIC8vIGRlbGF5ZWQgcmVxdWVzdCB0byByZXR1cm4gYWZ0ZXIgaWZyYW1lIGNvbXBsZXRlc1xyXG4gICAgICAgICAgICAgICAgbGV0IHRva2VuID0gYXdhaXQgYXVyZWxpYUFkYWwuYWNxdWlyZVRva2VuKHJlc291cmNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhdXJlbGlhQWRhbC52ZXJib3NlKCdUb2tlbiBpcyBhdmFsaWFibGUnKTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByZXNwb25zZUVycm9yKHJlamVjdGlvbik6IFJlc3BvbnNlIHtcclxuICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnR2V0dGluZyBlcnJvciBpbiB0aGUgcmVzcG9uc2UnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZWplY3Rpb24gJiYgcmVqZWN0aW9uLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHJlc291cmNlID0gYXVyZWxpYUFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChyZWplY3Rpb24uY29uZmlnLnVybCk7XHJcbiAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuY2xlYXJDYWNoZUZvclJlc291cmNlKHJlc291cmNlKTtcclxuICAgICAgICAgICAgICAvLyBUT0RPOiBicm9hZGNhc3Qgbm90QXV0aG9yaXplZD9cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlamVjdGlvbjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
