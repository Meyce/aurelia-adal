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
export let AdalAuthorizeStep = class {
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
AdalAuthorizeStep = __decorate([
    inject(AureliaAdal), 
    __metadata('design:paramtypes', [AureliaAdal])
], AdalAuthorizeStep);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1cmVsaWEtYWRhbC1hdXRob3JpemUtc3RlcC50cyJdLCJuYW1lcyI6WyJBZGFsQXV0aG9yaXplU3RlcCIsIkFkYWxBdXRob3JpemVTdGVwLmNvbnN0cnVjdG9yIiwiQWRhbEF1dGhvcml6ZVN0ZXAucnVuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7T0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG1CQUFtQjtPQUNqQyxFQUF3QixRQUFRLEVBQUMsTUFBTSxnQkFBZ0I7T0FDdkQsRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0I7QUFFMUM7SUFHRUEsWUFBb0JBLFdBQXdCQTtRQUF4QkMsZ0JBQVdBLEdBQVhBLFdBQVdBLENBQWFBO0lBRTVDQSxDQUFDQTtJQUVERCxHQUFHQSxDQUFDQSxjQUFxQ0EsRUFBRUEsSUFBU0E7UUFDbERFLElBQUlBLElBQUlBLEdBQUdBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBO1FBRWhDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFXQTtZQUVwREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDeENBLENBQUNBLEVBQUVBO1lBRURBLElBQUlBLFVBQVVBLEdBQUdBLEVBQUVBLENBQUNBO1lBRXBCQSxFQUFFQSxDQUFDQSxDQUFDQSxjQUFjQSxDQUFDQSxrQkFBa0JBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hGQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxlQUFlQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFeENBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLFlBQVlBLENBQUNBLGNBQWNBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBLEdBQVdBO3dCQUN4RUEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsUUFBUUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3hDQSxDQUFDQSxFQUFFQTt3QkFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQTtvQkFDdkNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNMQSxDQUFDQTtZQUNIQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxlQUFlQSxFQUFFQSxJQUFJQSxjQUFjQSxDQUFDQSxrQkFBa0JBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLFFBQVFBLElBQUlBLFVBQVVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUV6SEEsSUFBSUEsYUFBYUEsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ3ZCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxRQUFRQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNsREEsQ0FBQ0E7WUFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7UUFDZEEsQ0FBQ0EsRUFBRUE7WUFDREEsTUFBTUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7UUFDaEJBLENBQUNBLENBQUNBLENBQUNBO0lBQ1BBLENBQUNBO0FBQ0hGLENBQUNBO0FBckNEO0lBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQzs7c0JBcUNuQjtBQUFBIiwiZmlsZSI6ImF1cmVsaWEtYWRhbC1hdXRob3JpemUtc3RlcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7TmF2aWdhdGlvbkluc3RydWN0aW9uLCBSZWRpcmVjdH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xyXG5pbXBvcnQge0F1cmVsaWFBZGFsfSBmcm9tICcuL2F1cmVsaWEtYWRhbCc7XHJcblxyXG5AaW5qZWN0KEF1cmVsaWFBZGFsKVxyXG5leHBvcnQgY2xhc3MgQWRhbEF1dGhvcml6ZVN0ZXAge1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXVyZWxpYUFkYWw6IEF1cmVsaWFBZGFsKSB7XHJcbiAgICBcclxuICB9XHJcblxyXG4gIHJ1bihyb3V0aW5nQ29udGV4dDogTmF2aWdhdGlvbkluc3RydWN0aW9uLCBuZXh0OiBhbnkpOiB2b2lkIHtcclxuICAgIGxldCBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuYXVyZWxpYUFkYWwuaGFzaEhhbmRsZXIoaGFzaCwgKHVybDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIC8vIFdhcyBjYWxsYmFja1xyXG4gICAgICByZXR1cm4gbmV4dC5jYW5jZWwobmV3IFJlZGlyZWN0KHVybCkpO1xyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICAvLyBXYXMgbm90IGNhbGxiYWNrXHJcbiAgICAgIGxldCBsb2dpblJvdXRlID0gJyc7IC8vIFRPRE86IGdldCBsb2dpbiB1cmwgZnJvbSBhdXJlbGlhQWRhbFxyXG5cclxuICAgICAgaWYgKHJvdXRpbmdDb250ZXh0LmdldEFsbEluc3RydWN0aW9ucygpLnNvbWUoaSA9PiAhIWkuY29uZmlnLnNldHRpbmdzLnJlcXVpcmVBZGFsTG9naW4pKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmF1cmVsaWFBZGFsLmlzQXV0aGVudGljYXRlZCgpKSB7XHJcbiAgICAgICAgICAvLyBOb3QgbG9nZ2VkIGluLCByZWRpcmVjdCB0byBsb2dpbiByb3V0ZVxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuYXVyZWxpYUFkYWwubG9naW5IYW5kbGVyKHJvdXRpbmdDb250ZXh0LmZyYWdtZW50LCAodXJsOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKG5ldyBSZWRpcmVjdCh1cmwpKTtcclxuICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKCdsb2dpbiByZWRpcmVjdCcpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYXVyZWxpYUFkYWwuaXNBdXRoZW50aWNhdGVkKCkgJiYgcm91dGluZ0NvbnRleHQuZ2V0QWxsSW5zdHJ1Y3Rpb25zKCkuc29tZShpID0+IGkuZnJhZ21lbnQgPT0gbG9naW5Sb3V0ZSkpIHtcclxuICAgICAgICAvLyBMb2dnZWQgaW4sIGN1cnJlbnQgcm91dGUgaXMgdGhlIGxvZ2luIHJvdXRlXHJcbiAgICAgICAgbGV0IGxvZ2luUmVkaXJlY3QgPSAnJztcclxuICAgICAgICByZXR1cm4gbmV4dC5jYW5jZWwobmV3IFJlZGlyZWN0KGxvZ2luUmVkaXJlY3QpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5leHQoKTtcclxuICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBuZXh0KCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
