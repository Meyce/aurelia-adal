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
export function configure(frameworkConfig, config) {
    let aureliaAdal = frameworkConfig.container.get(AureliaAdal);
    aureliaAdal.configure(config);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbImNvbmZpZ3VyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztPQUVPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCO0FBRTVDLDBCQUEwQixlQUF1QyxFQUFFLE1BQXlCO0lBQzFGQSxJQUFJQSxXQUFXQSxHQUFnQkEsZUFBZUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7SUFFMUVBLFdBQVdBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO0FBQ2hDQSxDQUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZyYW1ld29ya0NvbmZpZ3VyYXRpb24gfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7IEF1cmVsaWFBZGFsQ29uZmlnIH0gZnJvbSAnLi9hdXJlbGlhLWFkYWwtY29uZmlnJztcclxuaW1wb3J0IHsgQXVyZWxpYUFkYWwgfSBmcm9tICcuL2F1cmVsaWEtYWRhbCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGZyYW1ld29ya0NvbmZpZzogRnJhbWV3b3JrQ29uZmlndXJhdGlvbiwgY29uZmlnOiBBdXJlbGlhQWRhbENvbmZpZykge1xyXG4gIGxldCBhdXJlbGlhQWRhbDogQXVyZWxpYUFkYWwgPSBmcmFtZXdvcmtDb25maWcuY29udGFpbmVyLmdldChBdXJlbGlhQWRhbCk7XHJcbiAgXHJcbiAgYXVyZWxpYUFkYWwuY29uZmlndXJlKGNvbmZpZyk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
