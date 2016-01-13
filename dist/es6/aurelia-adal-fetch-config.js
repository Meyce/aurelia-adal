var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
import { HttpClient } from 'aurelia-fetch-client';
import { AureliaAdal } from './aurelia-adal';
import { inject } from 'aurelia-framework';
export let AureliaAdalFetchConfig = class {
    constructor(httpClient, aureliaAdal) {
        this.httpClient = httpClient;
        this.aureliaAdal = aureliaAdal;
    }
    configure() {
        let aureliaAdal = this.aureliaAdal;
        this.httpClient.configure((httpConfig) => {
            httpConfig
                .withDefaults({
                headers: {
                    'Accept': 'application/json'
                }
            })
                .withInterceptor({
                request(request) {
                    return __awaiter(this, void 0, Promise, function* () {
                        let resource = aureliaAdal.getResourceForEndpoint(request.url);
                        if (resource == null) {
                            return request;
                        }
                        let tokenStored = aureliaAdal.getCachedToken(resource);
                        let isEndpoint = false;
                        if (tokenStored) {
                            aureliaAdal.info('Token is avaliable for this url ' + request.url);
                            request.headers.append('Authorization', 'Bearer ' + tokenStored);
                            return request;
                        }
                        else {
                            if (aureliaAdal.config) {
                                for (let endpointUrl in aureliaAdal.config().endpoints) {
                                    if (request.url.indexOf(endpointUrl) > -1) {
                                        isEndpoint = true;
                                    }
                                }
                            }
                            if (aureliaAdal.loginInProgress()) {
                                aureliaAdal.info('login already started.');
                                throw new Error('login already started');
                            }
                            else if (aureliaAdal.config && isEndpoint) {
                                let token = yield aureliaAdal.acquireToken(resource);
                                aureliaAdal.verbose('Token is avaliable');
                                request.headers.set('Authorization', 'Bearer ' + token);
                            }
                        }
                        return request;
                    });
                },
                responseError(rejection) {
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
};
AureliaAdalFetchConfig = __decorate([
    inject(HttpClient, AureliaAdal), 
    __metadata('design:paramtypes', [HttpClient, AureliaAdal])
], AureliaAdalFetchConfig);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtYWRhbC1mZXRjaC1jb25maWcudHMiXSwibmFtZXMiOlsiQXVyZWxpYUFkYWxGZXRjaENvbmZpZyIsIkF1cmVsaWFBZGFsRmV0Y2hDb25maWcuY29uc3RydWN0b3IiLCJBdXJlbGlhQWRhbEZldGNoQ29uZmlnLmNvbmZpZ3VyZSIsIkF1cmVsaWFBZGFsRmV0Y2hDb25maWcuY29uZmlndXJlLnJlcXVlc3QiLCJBdXJlbGlhQWRhbEZldGNoQ29uZmlnLmNvbmZpZ3VyZS5yZXNwb25zZUVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BQU8sRUFBQyxVQUFVLEVBQTBCLE1BQU0sc0JBQXNCO09BQ2pFLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCO09BQ25DLEVBQUMsTUFBTSxFQUFDLE1BQU0sbUJBQW1CO0FBRXhDO0lBRUVBLFlBQW9CQSxVQUFzQkEsRUFBVUEsV0FBd0JBO1FBQXhEQyxlQUFVQSxHQUFWQSxVQUFVQSxDQUFZQTtRQUFVQSxnQkFBV0EsR0FBWEEsV0FBV0EsQ0FBYUE7SUFFNUVBLENBQUNBO0lBRURELFNBQVNBO1FBQ1BFLElBQUlBLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBO1FBRW5DQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxVQUFtQ0E7WUFDNURBLFVBQVVBO2lCQUNQQSxZQUFZQSxDQUFDQTtnQkFDWkEsT0FBT0EsRUFBRUE7b0JBQ1BBLFFBQVFBLEVBQUVBLGtCQUFrQkE7aUJBQzdCQTthQUNGQSxDQUFDQTtpQkFDREEsZUFBZUEsQ0FBQ0E7Z0JBQ1RBLE9BQU9BLENBQUNBLE9BQU9BOzt3QkFDbkJDLElBQUlBLFFBQVFBLEdBQUdBLFdBQVdBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQy9EQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDckJBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBO3dCQUNqQkEsQ0FBQ0E7d0JBRURBLElBQUlBLFdBQVdBLEdBQUdBLFdBQVdBLENBQUNBLGNBQWNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO3dCQUN2REEsSUFBSUEsVUFBVUEsR0FBR0EsS0FBS0EsQ0FBQ0E7d0JBRXZCQSxFQUFFQSxDQUFDQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTs0QkFDaEJBLFdBQVdBLENBQUNBLElBQUlBLENBQUNBLGtDQUFrQ0EsR0FBR0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7NEJBRW5FQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxlQUFlQSxFQUFFQSxTQUFTQSxHQUFHQSxXQUFXQSxDQUFDQSxDQUFDQTs0QkFDakVBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBO3dCQUNqQkEsQ0FBQ0E7d0JBQUNBLElBQUlBLENBQUNBLENBQUNBOzRCQUNOQSxFQUFFQSxDQUFDQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtnQ0FDdkJBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLFdBQVdBLElBQUlBLFdBQVdBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO29DQUN2REEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0NBQzFDQSxVQUFVQSxHQUFHQSxJQUFJQSxDQUFDQTtvQ0FDcEJBLENBQUNBO2dDQUNIQSxDQUFDQTs0QkFDSEEsQ0FBQ0E7NEJBR0RBLEVBQUVBLENBQUNBLENBQUNBLFdBQVdBLENBQUNBLGVBQWVBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO2dDQUNsQ0EsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxDQUFDQTtnQ0FDM0NBLE1BQU1BLElBQUlBLEtBQUtBLENBQUNBLHVCQUF1QkEsQ0FBQ0EsQ0FBQ0E7NEJBQzNDQSxDQUFDQTs0QkFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsSUFBSUEsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0NBRzVDQSxJQUFJQSxLQUFLQSxHQUFHQSxNQUFNQSxXQUFXQSxDQUFDQSxZQUFZQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtnQ0FFckRBLFdBQVdBLENBQUNBLE9BQU9BLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0E7Z0NBQzFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxlQUFlQSxFQUFFQSxTQUFTQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQTs0QkFDMURBLENBQUNBO3dCQUNIQSxDQUFDQTt3QkFFREEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7b0JBQ2pCQSxDQUFDQTtpQkFBQUQ7Z0JBQ0RBLGFBQWFBLENBQUNBLFNBQVNBO29CQUNyQkUsV0FBV0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsK0JBQStCQSxDQUFDQSxDQUFDQTtvQkFFbERBLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLElBQUlBLFNBQVNBLENBQUNBLE1BQU1BLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO3dCQUMxQ0EsSUFBSUEsUUFBUUEsR0FBR0EsV0FBV0EsQ0FBQ0Esc0JBQXNCQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDeEVBLFdBQVdBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7b0JBRTlDQSxDQUFDQTtvQkFFREEsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7Z0JBQ25CQSxDQUFDQTthQUNGRixDQUFDQSxDQUFDQTtRQUNQQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNMQSxDQUFDQTtBQUNIRixDQUFDQTtBQXRFRDtJQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDOzsyQkFzRS9CO0FBQUEiLCJmaWxlIjoiYXVyZWxpYS1hZGFsLWZldGNoLWNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SHR0cENsaWVudCwgSHR0cENsaWVudENvbmZpZ3VyYXRpb259IGZyb20gJ2F1cmVsaWEtZmV0Y2gtY2xpZW50JztcclxuaW1wb3J0IHtBdXJlbGlhQWRhbH0gZnJvbSAnLi9hdXJlbGlhLWFkYWwnO1xyXG5pbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5cclxuQGluamVjdChIdHRwQ2xpZW50LCBBdXJlbGlhQWRhbClcclxuZXhwb3J0IGNsYXNzIEF1cmVsaWFBZGFsRmV0Y2hDb25maWcge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCwgcHJpdmF0ZSBhdXJlbGlhQWRhbDogQXVyZWxpYUFkYWwpIHtcclxuXHJcbiAgfVxyXG5cclxuICBjb25maWd1cmUoKSB7XHJcbiAgICBsZXQgYXVyZWxpYUFkYWwgPSB0aGlzLmF1cmVsaWFBZGFsO1xyXG5cclxuICAgIHRoaXMuaHR0cENsaWVudC5jb25maWd1cmUoKGh0dHBDb25maWc6IEh0dHBDbGllbnRDb25maWd1cmF0aW9uKSA9PiB7XHJcbiAgICAgIGh0dHBDb25maWdcclxuICAgICAgICAud2l0aERlZmF1bHRzKHtcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLndpdGhJbnRlcmNlcHRvcih7XHJcbiAgICAgICAgICBhc3luYyByZXF1ZXN0KHJlcXVlc3QpOiBQcm9taXNlPFJlcXVlc3Q+IHtcclxuICAgICAgICAgICAgbGV0IHJlc291cmNlID0gYXVyZWxpYUFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChyZXF1ZXN0LnVybCk7XHJcbiAgICAgICAgICAgIGlmIChyZXNvdXJjZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB0b2tlblN0b3JlZCA9IGF1cmVsaWFBZGFsLmdldENhY2hlZFRva2VuKHJlc291cmNlKTtcclxuICAgICAgICAgICAgbGV0IGlzRW5kcG9pbnQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0b2tlblN0b3JlZCkge1xyXG4gICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ1Rva2VuIGlzIGF2YWxpYWJsZSBmb3IgdGhpcyB1cmwgJyArIHJlcXVlc3QudXJsKTtcclxuICAgICAgICAgICAgICAvLyBjaGVjayBlbmRwb2ludCBtYXBwaW5nIGlmIHByb3ZpZGVkXHJcbiAgICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuU3RvcmVkKTtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoYXVyZWxpYUFkYWwuY29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbmRwb2ludFVybCBpbiBhdXJlbGlhQWRhbC5jb25maWcoKS5lbmRwb2ludHMpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QudXJsLmluZGV4T2YoZW5kcG9pbnRVcmwpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0VuZHBvaW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAvLyBDYW5jZWwgcmVxdWVzdCBpZiBsb2dpbiBpcyBzdGFydGluZ1xyXG4gICAgICAgICAgICAgIGlmIChhdXJlbGlhQWRhbC5sb2dpbkluUHJvZ3Jlc3MoKSkge1xyXG4gICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnbG9naW4gYWxyZWFkeSBzdGFydGVkLicpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb2dpbiBhbHJlYWR5IHN0YXJ0ZWQnKTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGF1cmVsaWFBZGFsLmNvbmZpZyAmJiBpc0VuZHBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBleHRlcm5hbCBlbmRwb2ludHNcclxuICAgICAgICAgICAgICAgIC8vIGRlbGF5ZWQgcmVxdWVzdCB0byByZXR1cm4gYWZ0ZXIgaWZyYW1lIGNvbXBsZXRlc1xyXG4gICAgICAgICAgICAgICAgbGV0IHRva2VuID0gYXdhaXQgYXVyZWxpYUFkYWwuYWNxdWlyZVRva2VuKHJlc291cmNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhdXJlbGlhQWRhbC52ZXJib3NlKCdUb2tlbiBpcyBhdmFsaWFibGUnKTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByZXNwb25zZUVycm9yKHJlamVjdGlvbik6IFJlc3BvbnNlIHtcclxuICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnR2V0dGluZyBlcnJvciBpbiB0aGUgcmVzcG9uc2UnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZWplY3Rpb24gJiYgcmVqZWN0aW9uLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHJlc291cmNlID0gYXVyZWxpYUFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChyZWplY3Rpb24uY29uZmlnLnVybCk7XHJcbiAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuY2xlYXJDYWNoZUZvclJlc291cmNlKHJlc291cmNlKTtcclxuICAgICAgICAgICAgICAvLyBUT0RPOiBicm9hZGNhc3Qgbm90QXV0aG9yaXplZD9cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlamVjdGlvbjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
