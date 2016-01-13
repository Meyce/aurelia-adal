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
import { AureliaAdalManager } from './aurelia-adal-manager';
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
    inject(AureliaAdalManager), 
    __metadata('design:paramtypes', [AureliaAdalManager])
], AureliaAdalAuthorizeStep);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtYWRhbC1hdXRob3JpemUtc3RlcC50cyJdLCJuYW1lcyI6WyJBdXJlbGlhQWRhbEF1dGhvcml6ZVN0ZXAiLCJBdXJlbGlhQWRhbEF1dGhvcml6ZVN0ZXAuY29uc3RydWN0b3IiLCJBdXJlbGlhQWRhbEF1dGhvcml6ZVN0ZXAucnVuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7T0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG1CQUFtQjtPQUNqQyxFQUF3QixRQUFRLEVBQUMsTUFBTSxnQkFBZ0I7T0FDdkQsRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QjtBQUV6RDtJQUdFQSxZQUFvQkEsV0FBK0JBO1FBQS9CQyxnQkFBV0EsR0FBWEEsV0FBV0EsQ0FBb0JBO0lBRW5EQSxDQUFDQTtJQUVERCxHQUFHQSxDQUFDQSxjQUFxQ0EsRUFBRUEsSUFBU0E7UUFDbERFLElBQUlBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBO1FBRWhDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFXQTtZQUVwREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDeENBLENBQUNBLEVBQUVBO1lBRURBLElBQUlBLFVBQVVBLEdBQUdBLEVBQUVBLENBQUNBO1lBRXBCQSxFQUFFQSxDQUFDQSxDQUFDQSxjQUFjQSxDQUFDQSxrQkFBa0JBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hGQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFeENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLFlBQVlBLENBQUNBLGNBQWNBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBLEdBQVdBO3dCQUN4RUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3hDQSxDQUFDQSxFQUFFQTt3QkFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQTtvQkFDdkNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNMQSxDQUFDQTtZQUNIQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxlQUFlQSxFQUFFQSxJQUFJQSxjQUFjQSxDQUFDQSxrQkFBa0JBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLFFBQVFBLElBQUlBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUV6SEEsSUFBSUEsYUFBYUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ3ZCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxRQUFRQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNsREEsQ0FBQ0E7WUFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7UUFDZEEsQ0FBQ0EsRUFBRUE7WUFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7UUFDaEJBLENBQUNBLENBQUNBLENBQUNBO0lBQ1BBLENBQUNBO0FBQ0hGLENBQUNBO0FBckNEO0lBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDOzs2QkFxQzFCO0FBQUEiLCJmaWxlIjoiYXVyZWxpYS1hZGFsLWF1dGhvcml6ZS1zdGVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHtOYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24sIFJlZGlyZWN0fSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XHJcbmltcG9ydCB7QXVyZWxpYUFkYWxNYW5hZ2VyfSBmcm9tICcuL2F1cmVsaWEtYWRhbC1tYW5hZ2VyJztcclxuXHJcbkBpbmplY3QoQXVyZWxpYUFkYWxNYW5hZ2VyKVxyXG5leHBvcnQgY2xhc3MgQXVyZWxpYUFkYWxBdXRob3JpemVTdGVwIHtcclxuICBcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1cmVsaWFBZGFsOiBBdXJlbGlhQWRhbE1hbmFnZXIpIHtcclxuICAgIFxyXG4gIH1cclxuXHJcbiAgcnVuKHJvdXRpbmdDb250ZXh0OiBOYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24sIG5leHQ6IGFueSk6IHZvaWQge1xyXG4gICAgbGV0IGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5hdXJlbGlhQWRhbC5oYXNoSGFuZGxlcihoYXNoLCAodXJsOiBzdHJpbmcpID0+IHtcclxuICAgICAgLy8gV2FzIGNhbGxiYWNrXHJcbiAgICAgIHJldHVybiBuZXh0LmNhbmNlbChuZXcgUmVkaXJlY3QodXJsKSk7XHJcbiAgICB9LCAoKSA9PiB7XHJcbiAgICAgIC8vIFdhcyBub3QgY2FsbGJhY2tcclxuICAgICAgbGV0IGxvZ2luUm91dGUgPSAnJzsgLy8gVE9ETzogZ2V0IGxvZ2luIHVybCBmcm9tIGF1cmVsaWFBZGFsXHJcblxyXG4gICAgICBpZiAocm91dGluZ0NvbnRleHQuZ2V0QWxsSW5zdHJ1Y3Rpb25zKCkuc29tZShpID0+ICEhaS5jb25maWcuc2V0dGluZ3MucmVxdWlyZUFkYWxMb2dpbikpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXVyZWxpYUFkYWwuaXNBdXRoZW50aWNhdGVkKCkpIHtcclxuICAgICAgICAgIC8vIE5vdCBsb2dnZWQgaW4sIHJlZGlyZWN0IHRvIGxvZ2luIHJvdXRlXHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5hdXJlbGlhQWRhbC5sb2dpbkhhbmRsZXIocm91dGluZ0NvbnRleHQuZnJhZ21lbnQsICh1cmw6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV4dC5jYW5jZWwobmV3IFJlZGlyZWN0KHVybCkpO1xyXG4gICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV4dC5jYW5jZWwoJ2xvZ2luIHJlZGlyZWN0Jyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hdXJlbGlhQWRhbC5pc0F1dGhlbnRpY2F0ZWQoKSAmJiByb3V0aW5nQ29udGV4dC5nZXRBbGxJbnN0cnVjdGlvbnMoKS5zb21lKGkgPT4gaS5mcmFnbWVudCA9PSBsb2dpblJvdXRlKSkge1xyXG4gICAgICAgIC8vIExvZ2dlZCBpbiwgY3VycmVudCByb3V0ZSBpcyB0aGUgbG9naW4gcm91dGVcclxuICAgICAgICBsZXQgbG9naW5SZWRpcmVjdCA9ICcnO1xyXG4gICAgICAgIHJldHVybiBuZXh0LmNhbmNlbChuZXcgUmVkaXJlY3QobG9naW5SZWRpcmVjdCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV4dCgpO1xyXG4gICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG5leHQoKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
