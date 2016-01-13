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
export let AdalFetchConfig = class {
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
AdalFetchConfig = __decorate([
    inject(HttpClient, AureliaAdal), 
    __metadata('design:paramtypes', [HttpClient, AureliaAdal])
], AdalFetchConfig);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtYWRhbC1mZXRjaC1jb25maWcudHMiXSwibmFtZXMiOlsiQWRhbEZldGNoQ29uZmlnIiwiQWRhbEZldGNoQ29uZmlnLmNvbnN0cnVjdG9yIiwiQWRhbEZldGNoQ29uZmlnLmNvbmZpZ3VyZSIsIkFkYWxGZXRjaENvbmZpZy5jb25maWd1cmUucmVxdWVzdCIsIkFkYWxGZXRjaENvbmZpZy5jb25maWd1cmUucmVzcG9uc2VFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQUFPLEVBQUMsVUFBVSxFQUEwQixNQUFNLHNCQUFzQjtPQUNqRSxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQjtPQUNuQyxFQUFDLE1BQU0sRUFBQyxNQUFNLG1CQUFtQjtBQUV4QztJQUVFQSxZQUFvQkEsVUFBc0JBLEVBQVVBLFdBQXdCQTtRQUF4REMsZUFBVUEsR0FBVkEsVUFBVUEsQ0FBWUE7UUFBVUEsZ0JBQVdBLEdBQVhBLFdBQVdBLENBQWFBO0lBRTVFQSxDQUFDQTtJQUVERCxTQUFTQTtRQUNQRSxJQUFJQSxXQUFXQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQTtRQUVuQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsVUFBbUNBO1lBQzVEQSxVQUFVQTtpQkFDUEEsWUFBWUEsQ0FBQ0E7Z0JBQ1pBLE9BQU9BLEVBQUVBO29CQUNQQSxRQUFRQSxFQUFFQSxrQkFBa0JBO2lCQUM3QkE7YUFDRkEsQ0FBQ0E7aUJBQ0RBLGVBQWVBLENBQUNBO2dCQUNUQSxPQUFPQSxDQUFDQSxPQUFPQTs7d0JBQ25CQyxJQUFJQSxRQUFRQSxHQUFHQSxXQUFXQSxDQUFDQSxzQkFBc0JBLENBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO3dCQUMvREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7NEJBQ3JCQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFD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IiwiZmlsZSI6ImF1cmVsaWEtYWRhbC1mZXRjaC1jb25maWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0h0dHBDbGllbnQsIEh0dHBDbGllbnRDb25maWd1cmF0aW9ufSBmcm9tICdhdXJlbGlhLWZldGNoLWNsaWVudCc7XHJcbmltcG9ydCB7QXVyZWxpYUFkYWx9IGZyb20gJy4vYXVyZWxpYS1hZGFsJztcclxuaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuXHJcbkBpbmplY3QoSHR0cENsaWVudCwgQXVyZWxpYUFkYWwpXHJcbmV4cG9ydCBjbGFzcyBBZGFsRmV0Y2hDb25maWcge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCwgcHJpdmF0ZSBhdXJlbGlhQWRhbDogQXVyZWxpYUFkYWwpIHtcclxuXHJcbiAgfVxyXG5cclxuICBjb25maWd1cmUoKSB7XHJcbiAgICBsZXQgYXVyZWxpYUFkYWwgPSB0aGlzLmF1cmVsaWFBZGFsO1xyXG5cclxuICAgIHRoaXMuaHR0cENsaWVudC5jb25maWd1cmUoKGh0dHBDb25maWc6IEh0dHBDbGllbnRDb25maWd1cmF0aW9uKSA9PiB7XHJcbiAgICAgIGh0dHBDb25maWdcclxuICAgICAgICAud2l0aERlZmF1bHRzKHtcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLndpdGhJbnRlcmNlcHRvcih7XHJcbiAgICAgICAgICBhc3luYyByZXF1ZXN0KHJlcXVlc3QpOiBQcm9taXNlPFJlcXVlc3Q+IHtcclxuICAgICAgICAgICAgbGV0IHJlc291cmNlID0gYXVyZWxpYUFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChyZXF1ZXN0LnVybCk7XHJcbiAgICAgICAgICAgIGlmIChyZXNvdXJjZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB0b2tlblN0b3JlZCA9IGF1cmVsaWFBZGFsLmdldENhY2hlZFRva2VuKHJlc291cmNlKTtcclxuICAgICAgICAgICAgbGV0IGlzRW5kcG9pbnQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0b2tlblN0b3JlZCkge1xyXG4gICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ1Rva2VuIGlzIGF2YWxpYWJsZSBmb3IgdGhpcyB1cmwgJyArIHJlcXVlc3QudXJsKTtcclxuICAgICAgICAgICAgICAvLyBjaGVjayBlbmRwb2ludCBtYXBwaW5nIGlmIHByb3ZpZGVkXHJcbiAgICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuU3RvcmVkKTtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoYXVyZWxpYUFkYWwuY29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbmRwb2ludFVybCBpbiBhdXJlbGlhQWRhbC5jb25maWcoKS5lbmRwb2ludHMpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3QudXJsLmluZGV4T2YoZW5kcG9pbnRVcmwpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0VuZHBvaW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAvLyBDYW5jZWwgcmVxdWVzdCBpZiBsb2dpbiBpcyBzdGFydGluZ1xyXG4gICAgICAgICAgICAgIGlmIChhdXJlbGlhQWRhbC5sb2dpbkluUHJvZ3Jlc3MoKSkge1xyXG4gICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnbG9naW4gYWxyZWFkeSBzdGFydGVkLicpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb2dpbiBhbHJlYWR5IHN0YXJ0ZWQnKTtcclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGF1cmVsaWFBZGFsLmNvbmZpZyAmJiBpc0VuZHBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBleHRlcm5hbCBlbmRwb2ludHNcclxuICAgICAgICAgICAgICAgIC8vIGRlbGF5ZWQgcmVxdWVzdCB0byByZXR1cm4gYWZ0ZXIgaWZyYW1lIGNvbXBsZXRlc1xyXG4gICAgICAgICAgICAgICAgbGV0IHRva2VuID0gYXdhaXQgYXVyZWxpYUFkYWwuYWNxdWlyZVRva2VuKHJlc291cmNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBhdXJlbGlhQWRhbC52ZXJib3NlKCdUb2tlbiBpcyBhdmFsaWFibGUnKTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5zZXQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByZXNwb25zZUVycm9yKHJlamVjdGlvbik6IFJlc3BvbnNlIHtcclxuICAgICAgICAgICAgYXVyZWxpYUFkYWwuaW5mbygnR2V0dGluZyBlcnJvciBpbiB0aGUgcmVzcG9uc2UnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZWplY3Rpb24gJiYgcmVqZWN0aW9uLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHJlc291cmNlID0gYXVyZWxpYUFkYWwuZ2V0UmVzb3VyY2VGb3JFbmRwb2ludChyZWplY3Rpb24uY29uZmlnLnVybCk7XHJcbiAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuY2xlYXJDYWNoZUZvclJlc291cmNlKHJlc291cmNlKTtcclxuICAgICAgICAgICAgICAvLyBUT0RPOiBicm9hZGNhc3Qgbm90QXV0aG9yaXplZD9cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlamVjdGlvbjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
