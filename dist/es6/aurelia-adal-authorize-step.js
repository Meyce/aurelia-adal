var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject } from 'aurelia-framework';
import { Redirect } from 'aurelia-router';
import { AureliaAdal } from './aurelia-adal';
export let AureliaAdalAuthorizeStep = class {
    constructor(aureliaAdal) {
        this.aureliaAdal = aureliaAdal;
    }
    run(routingContext, next) {
        let hash = window.location.hash;
        return this.aureliaAdal.hashHandler(hash, (url) => {
            return next.cancel(new Redirect(url));
        }, () => {
            let loginRoute = '';
            if (routingContext.getAllInstructions().some(i => !!i.config.settings.requireAdalLogin)) {
                if (!this.aureliaAdal.isAuthenticated()) {
                    return this.aureliaAdal.loginHandler(routingContext.fragment, (url) => {
                        return next.cancel(new Redirect(url));
                    }, () => {
                        return next.cancel('login redirect');
                    });
                }
            }
            else if (this.aureliaAdal.isAuthenticated() && routingContext.getAllInstructions().some(i => i.fragment == loginRoute)) {
                let loginRedirect = '';
                return next.cancel(new Redirect(loginRedirect));
            }
            return next();
        }, () => {
            return next();
        });
    }
};
AureliaAdalAuthorizeStep = __decorate([
    inject(AureliaAdal), 
    __metadata('design:paramtypes', [AureliaAdal])
], AureliaAdalAuthorizeStep);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtYWRhbC1hdXRob3JpemUtc3RlcC50cyJdLCJuYW1lcyI6WyJBdXJlbGlhQWRhbEF1dGhvcml6ZVN0ZXAiLCJBdXJlbGlhQWRhbEF1dGhvcml6ZVN0ZXAuY29uc3RydWN0b3IiLCJBdXJlbGlhQWRhbEF1dGhvcml6ZVN0ZXAucnVuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7T0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG1CQUFtQjtPQUNqQyxFQUF3QixRQUFRLEVBQUMsTUFBTSxnQkFBZ0I7T0FDdkQsRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0I7QUFFMUM7SUFHRUEsWUFBb0JBLFdBQXdCQTtRQUF4QkMsZ0JBQVdBLEdBQVhBLFdBQVdBLENBQWFBO0lBRTVDQSxDQUFDQTtJQUVERCxHQUFHQSxDQUFDQSxjQUFxQ0EsRUFBRUEsSUFBU0E7UUFDbERFLElBQUlBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBO1FBRWhDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFXQTtZQUVwREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDeENBLENBQUNBLEVBQUVBO1lBRURBLElBQUlBLFVBQVVBLEdBQUdBLEVBQUVBLENBQUNBO1lBRXBCQSxFQUFFQSxDQUFDQSxDQUFDQSxjQUFjQSxDQUFDQSxrQkFBa0JBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hGQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFeENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLFlBQVlBLENBQUNBLGNBQWNBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBLEdBQVdBO3dCQUN4RUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3hDQSxDQUFDQSxFQUFFQTt3QkFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQTtvQkFDdkNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNMQSxDQUFDQTtZQUNIQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxlQUFlQSxFQUFFQSxJQUFJQSxjQUFjQSxDQUFDQSxrQkFBa0JBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLFFBQVFBLElBQUlBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUV6SEEsSUFBSUEsYUFBYUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ3ZCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxRQUFRQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNsREEsQ0FBQ0E7WUFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7UUFDZEEsQ0FBQ0EsRUFBRUE7WUFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7UUFDaEJBLENBQUNBLENBQUNBLENBQUNBO0lBQ1BBLENBQUNBO0FBQ0hGLENBQUNBO0FBckNEO0lBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQzs7NkJBcUNuQjtBQUFBIiwiZmlsZSI6ImF1cmVsaWEtYWRhbC1hdXRob3JpemUtc3RlcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7TmF2aWdhdGlvbkluc3RydWN0aW9uLCBSZWRpcmVjdH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xyXG5pbXBvcnQge0F1cmVsaWFBZGFsfSBmcm9tICcuL2F1cmVsaWEtYWRhbCc7XHJcblxyXG5AaW5qZWN0KEF1cmVsaWFBZGFsKVxyXG5leHBvcnQgY2xhc3MgQXVyZWxpYUFkYWxBdXRob3JpemVTdGVwIHtcclxuICBcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1cmVsaWFBZGFsOiBBdXJlbGlhQWRhbCkge1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBydW4ocm91dGluZ0NvbnRleHQ6IE5hdmlnYXRpb25JbnN0cnVjdGlvbiwgbmV4dDogYW55KTogdm9pZCB7XHJcbiAgICBsZXQgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmF1cmVsaWFBZGFsLmhhc2hIYW5kbGVyKGhhc2gsICh1cmw6IHN0cmluZykgPT4ge1xyXG4gICAgICAvLyBXYXMgY2FsbGJhY2tcclxuICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKG5ldyBSZWRpcmVjdCh1cmwpKTtcclxuICAgIH0sICgpID0+IHtcclxuICAgICAgLy8gV2FzIG5vdCBjYWxsYmFja1xyXG4gICAgICBsZXQgbG9naW5Sb3V0ZSA9ICcnOyAvLyBUT0RPOiBnZXQgbG9naW4gdXJsIGZyb20gYXVyZWxpYUFkYWxcclxuXHJcbiAgICAgIGlmIChyb3V0aW5nQ29udGV4dC5nZXRBbGxJbnN0cnVjdGlvbnMoKS5zb21lKGkgPT4gISFpLmNvbmZpZy5zZXR0aW5ncy5yZXF1aXJlQWRhbExvZ2luKSkge1xyXG4gICAgICAgIGlmICghdGhpcy5hdXJlbGlhQWRhbC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xyXG4gICAgICAgICAgLy8gTm90IGxvZ2dlZCBpbiwgcmVkaXJlY3QgdG8gbG9naW4gcm91dGVcclxuICAgICAgICAgIHJldHVybiB0aGlzLmF1cmVsaWFBZGFsLmxvZ2luSGFuZGxlcihyb3V0aW5nQ29udGV4dC5mcmFnbWVudCwgKHVybDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXh0LmNhbmNlbChuZXcgUmVkaXJlY3QodXJsKSk7XHJcbiAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXh0LmNhbmNlbCgnbG9naW4gcmVkaXJlY3QnKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmF1cmVsaWFBZGFsLmlzQXV0aGVudGljYXRlZCgpICYmIHJvdXRpbmdDb250ZXh0LmdldEFsbEluc3RydWN0aW9ucygpLnNvbWUoaSA9PiBpLmZyYWdtZW50ID09IGxvZ2luUm91dGUpKSB7XHJcbiAgICAgICAgLy8gTG9nZ2VkIGluLCBjdXJyZW50IHJvdXRlIGlzIHRoZSBsb2dpbiByb3V0ZVxyXG4gICAgICAgIGxldCBsb2dpblJlZGlyZWN0ID0gJyc7XHJcbiAgICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKG5ldyBSZWRpcmVjdChsb2dpblJlZGlyZWN0KSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBuZXh0KCk7XHJcbiAgICAgIH0sICgpID0+IHtcclxuICAgICAgICByZXR1cm4gbmV4dCgpO1xyXG4gICAgICB9KTtcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
