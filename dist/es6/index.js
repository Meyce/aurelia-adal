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
import { AureliaAdalManager } from './aurelia-adal-manager';
export function configure(frameworkConfig, config) {
    let aureliaAdal = frameworkConfig.container.get(AureliaAdalManager);
    aureliaAdal.configure(config);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbImNvbmZpZ3VyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztPQUVPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0I7QUFFM0QsMEJBQTBCLGVBQXVDLEVBQUUsTUFBeUI7SUFDMUZBLElBQUlBLFdBQVdBLEdBQXVCQSxlQUFlQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxDQUFDQSxrQkFBa0JBLENBQUNBLENBQUNBO0lBRXhGQSxXQUFXQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtBQUNoQ0EsQ0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGcmFtZXdvcmtDb25maWd1cmF0aW9uIH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5pbXBvcnQgeyBBdXJlbGlhQWRhbENvbmZpZyB9IGZyb20gJy4vYXVyZWxpYS1hZGFsLWNvbmZpZyc7XHJcbmltcG9ydCB7IEF1cmVsaWFBZGFsTWFuYWdlciB9IGZyb20gJy4vYXVyZWxpYS1hZGFsLW1hbmFnZXInO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShmcmFtZXdvcmtDb25maWc6IEZyYW1ld29ya0NvbmZpZ3VyYXRpb24sIGNvbmZpZzogQXVyZWxpYUFkYWxDb25maWcpIHtcclxuICBsZXQgYXVyZWxpYUFkYWw6IEF1cmVsaWFBZGFsTWFuYWdlciA9IGZyYW1ld29ya0NvbmZpZy5jb250YWluZXIuZ2V0KEF1cmVsaWFBZGFsTWFuYWdlcik7XHJcbiAgXHJcbiAgYXVyZWxpYUFkYWwuY29uZmlndXJlKGNvbmZpZyk7XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
