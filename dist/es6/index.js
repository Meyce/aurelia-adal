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
import { AureliaAdal } from './aurelia-adal';
import { AureliaAdalFetchConfig } from './aurelia-adal-fetch-config';
import { AureliaAdalAuthorizeStep } from './aurelia-adal-authorize-step';
export function configure(frameworkConfig, config) {
    let aureliaAdal = frameworkConfig.container.get(AureliaAdal);
    aureliaAdal.configure(config);
}
export { AureliaAdal, AureliaAdalFetchConfig, AureliaAdalAuthorizeStep };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbImNvbmZpZ3VyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztPQUVPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCO09BQ3JDLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkI7T0FDN0QsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQjtBQUV4RSwwQkFBMEIsZUFBdUMsRUFBRSxNQUF5QjtJQUMxRkEsSUFBSUEsV0FBV0EsR0FBZ0JBLGVBQWVBLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO0lBRTFFQSxXQUFXQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtBQUNoQ0EsQ0FBQ0E7QUFFRCxTQUNJLFdBQVcsRUFFWCxzQkFBc0IsRUFDdEIsd0JBQXdCLEdBQzNCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnJhbWV3b3JrQ29uZmlndXJhdGlvbiB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHsgQXVyZWxpYUFkYWxDb25maWcgfSBmcm9tICcuL2F1cmVsaWEtYWRhbC1jb25maWcnO1xyXG5pbXBvcnQgeyBBdXJlbGlhQWRhbCB9IGZyb20gJy4vYXVyZWxpYS1hZGFsJztcclxuaW1wb3J0IHsgQXVyZWxpYUFkYWxGZXRjaENvbmZpZyB9IGZyb20gJy4vYXVyZWxpYS1hZGFsLWZldGNoLWNvbmZpZyc7XHJcbmltcG9ydCB7IEF1cmVsaWFBZGFsQXV0aG9yaXplU3RlcCB9IGZyb20gJy4vYXVyZWxpYS1hZGFsLWF1dGhvcml6ZS1zdGVwJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmUoZnJhbWV3b3JrQ29uZmlnOiBGcmFtZXdvcmtDb25maWd1cmF0aW9uLCBjb25maWc6IEF1cmVsaWFBZGFsQ29uZmlnKSB7XHJcbiAgbGV0IGF1cmVsaWFBZGFsOiBBdXJlbGlhQWRhbCA9IGZyYW1ld29ya0NvbmZpZy5jb250YWluZXIuZ2V0KEF1cmVsaWFBZGFsKTtcclxuICBcclxuICBhdXJlbGlhQWRhbC5jb25maWd1cmUoY29uZmlnKTtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIEF1cmVsaWFBZGFsLFxyXG4gICAgQXVyZWxpYUFkYWxDb25maWcsXHJcbiAgICBBdXJlbGlhQWRhbEZldGNoQ29uZmlnLFxyXG4gICAgQXVyZWxpYUFkYWxBdXRob3JpemVTdGVwXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
