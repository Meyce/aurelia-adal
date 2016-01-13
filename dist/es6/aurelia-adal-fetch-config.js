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
import { AureliaAdalManager } from './aurelia-adal-manager';
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
    inject(HttpClient, AureliaAdalManager), 
    __metadata('design:paramtypes', [HttpClient, AureliaAdalManager])
], AureliaAdalFetchConfig);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtYWRhbC1mZXRjaC1jb25maWcudHMiXSwibmFtZXMiOlsiQXVyZWxpYUFkYWxGZXRjaENvbmZpZyIsIkF1cmVsaWFBZGFsRmV0Y2hDb25maWcuY29uc3RydWN0b3IiLCJBdXJlbGlhQWRhbEZldGNoQ29uZmlnLmNvbmZpZ3VyZSIsIkF1cmVsaWFBZGFsRmV0Y2hDb25maWcuY29uZmlndXJlLnJlcXVlc3QiLCJBdXJlbGlhQWRhbEZldGNoQ29uZmlnLmNvbmZpZ3VyZS5yZXNwb25zZUVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BQU8sRUFBQyxVQUFVLEVBQTBCLE1BQU0sc0JBQXNCO09BQ2pFLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx3QkFBd0I7T0FDbEQsRUFBQyxNQUFNLEVBQUMsTUFBTSxtQkFBbUI7QUFFeEM7SUFFRUEsWUFBb0JBLFVBQXNCQSxFQUFVQSxXQUErQkE7UUFBL0RDLGVBQVVBLEdBQVZBLFVBQVVBLENBQVlBO1FBQVVBLGdCQUFXQSxHQUFYQSxXQUFXQSxDQUFvQkE7SUFFbkZBLENBQUNBO0lBRURELFNBQVNBO1FBQ1BFLElBQUlBLFdBQVdBLEdBQUdBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBO1FBRW5DQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxVQUFtQ0E7WUFDNURBLFVBQVVBO2lCQUNQQSxZQUFZQSxDQUFDQTtnQkFDWkEsT0FBT0EsRUFBRUE7b0JBQ1BBLFFBQVFBLEVBQUVBLGtCQUFrQkE7aUJBQzdCQTthQUNGQSxDQUFDQTtpQkFDREEsZUFBZUEsQ0FBQ0E7Z0JBQ1RBLE9BQU9BLENBQUNBLE9BQU9BOzt3QkFDbkJDLElBQUlBLFFBQVFBLEdBQUdBLFdBQVdBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQy9EQSxFQUFFQSxDQUFDQSxDQUFDQSxRQUFRQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFD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Q0FBQyxVQUFVLEVBQUUsa0JBQWtCLENBQUM7OzJCQXNFdEM7QUFBQSIsImZpbGUiOiJhdXJlbGlhLWFkYWwtZmV0Y2gtY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwQ2xpZW50Q29uZmlndXJhdGlvbn0gZnJvbSAnYXVyZWxpYS1mZXRjaC1jbGllbnQnO1xyXG5pbXBvcnQge0F1cmVsaWFBZGFsTWFuYWdlcn0gZnJvbSAnLi9hdXJlbGlhLWFkYWwtbWFuYWdlcic7XHJcbmltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcblxyXG5AaW5qZWN0KEh0dHBDbGllbnQsIEF1cmVsaWFBZGFsTWFuYWdlcilcclxuZXhwb3J0IGNsYXNzIEF1cmVsaWFBZGFsRmV0Y2hDb25maWcge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCwgcHJpdmF0ZSBhdXJlbGlhQWRhbDogQXVyZWxpYUFkYWxNYW5hZ2VyKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgY29uZmlndXJlKCkge1xyXG4gICAgbGV0IGF1cmVsaWFBZGFsID0gdGhpcy5hdXJlbGlhQWRhbDtcclxuXHJcbiAgICB0aGlzLmh0dHBDbGllbnQuY29uZmlndXJlKChodHRwQ29uZmlnOiBIdHRwQ2xpZW50Q29uZmlndXJhdGlvbikgPT4ge1xyXG4gICAgICBodHRwQ29uZmlnXHJcbiAgICAgICAgLndpdGhEZWZhdWx0cyh7XHJcbiAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC53aXRoSW50ZXJjZXB0b3Ioe1xyXG4gICAgICAgICAgYXN5bmMgcmVxdWVzdChyZXF1ZXN0KTogUHJvbWlzZTxSZXF1ZXN0PiB7XHJcbiAgICAgICAgICAgIGxldCByZXNvdXJjZSA9IGF1cmVsaWFBZGFsLmdldFJlc291cmNlRm9yRW5kcG9pbnQocmVxdWVzdC51cmwpO1xyXG4gICAgICAgICAgICBpZiAocmVzb3VyY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdG9rZW5TdG9yZWQgPSBhdXJlbGlhQWRhbC5nZXRDYWNoZWRUb2tlbihyZXNvdXJjZSk7XHJcbiAgICAgICAgICAgIGxldCBpc0VuZHBvaW50ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAodG9rZW5TdG9yZWQpIHtcclxuICAgICAgICAgICAgICBhdXJlbGlhQWRhbC5pbmZvKCdUb2tlbiBpcyBhdmFsaWFibGUgZm9yIHRoaXMgdXJsICcgKyByZXF1ZXN0LnVybCk7XHJcbiAgICAgICAgICAgICAgLy8gY2hlY2sgZW5kcG9pbnQgbWFwcGluZyBpZiBwcm92aWRlZFxyXG4gICAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlblN0b3JlZCk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKGF1cmVsaWFBZGFsLmNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW5kcG9pbnRVcmwgaW4gYXVyZWxpYUFkYWwuY29uZmlnKCkuZW5kcG9pbnRzKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnVybC5pbmRleE9mKGVuZHBvaW50VXJsKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNFbmRwb2ludCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgLy8gQ2FuY2VsIHJlcXVlc3QgaWYgbG9naW4gaXMgc3RhcnRpbmdcclxuICAgICAgICAgICAgICBpZiAoYXVyZWxpYUFkYWwubG9naW5JblByb2dyZXNzKCkpIHtcclxuICAgICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ2xvZ2luIGFscmVhZHkgc3RhcnRlZC4nKTtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbG9naW4gYWxyZWFkeSBzdGFydGVkJyk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChhdXJlbGlhQWRhbC5jb25maWcgJiYgaXNFbmRwb2ludCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZXh0ZXJuYWwgZW5kcG9pbnRzXHJcbiAgICAgICAgICAgICAgICAvLyBkZWxheWVkIHJlcXVlc3QgdG8gcmV0dXJuIGFmdGVyIGlmcmFtZSBjb21wbGV0ZXNcclxuICAgICAgICAgICAgICAgIGxldCB0b2tlbiA9IGF3YWl0IGF1cmVsaWFBZGFsLmFjcXVpcmVUb2tlbihyZXNvdXJjZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwudmVyYm9zZSgnVG9rZW4gaXMgYXZhbGlhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LmhlYWRlcnMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW4pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcmVzcG9uc2VFcnJvcihyZWplY3Rpb24pOiBSZXNwb25zZSB7XHJcbiAgICAgICAgICAgIGF1cmVsaWFBZGFsLmluZm8oJ0dldHRpbmcgZXJyb3IgaW4gdGhlIHJlc3BvbnNlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVqZWN0aW9uICYmIHJlamVjdGlvbi5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAgIHZhciByZXNvdXJjZSA9IGF1cmVsaWFBZGFsLmdldFJlc291cmNlRm9yRW5kcG9pbnQocmVqZWN0aW9uLmNvbmZpZy51cmwpO1xyXG4gICAgICAgICAgICAgIGF1cmVsaWFBZGFsLmNsZWFyQ2FjaGVGb3JSZXNvdXJjZShyZXNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgLy8gVE9ETzogYnJvYWRjYXN0IG5vdEF1dGhvcml6ZWQ/XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZWplY3Rpb247XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
