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
export var AureliaAdal;
(function (AureliaAdal) {
    function configure(frameworkConfig, config) {
        let aureliaAdal = frameworkConfig.container.get(AureliaAdalManager);
        aureliaAdal.configure(config);
    }
    AureliaAdal.configure = configure;
    class AureliaAdalManager2 extends AureliaAdalManager {
    }
    AureliaAdal.AureliaAdalManager2 = AureliaAdalManager2;
})(AureliaAdal || (AureliaAdal = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbIkF1cmVsaWFBZGFsIiwiQXVyZWxpYUFkYWwuY29uZmlndXJlIiwiQXVyZWxpYUFkYWwuQXVyZWxpYUFkYWxNYW5hZ2VyMiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztPQUVPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0I7QUFFM0QsV0FBYyxXQUFXLENBUXhCO0FBUkQsV0FBYyxXQUFXLEVBQUMsQ0FBQztJQUN2QkEsbUJBQTBCQSxlQUF1Q0EsRUFBRUEsTUFBeUJBO1FBQzVGQyxJQUFJQSxXQUFXQSxHQUF1QkEsZUFBZUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQTtRQUV4RkEsV0FBV0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFDOUJBLENBQUNBO0lBSmVELHFCQUFTQSxZQUl4QkEsQ0FBQUE7SUFFREEsa0NBQXlDQSxrQkFBa0JBO0lBQUVFLENBQUNBO0lBQWpERiwrQkFBbUJBLHNCQUE4QkEsQ0FBQUE7QUFDbEVBLENBQUNBLEVBUmEsV0FBVyxLQUFYLFdBQVcsUUFReEIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGcmFtZXdvcmtDb25maWd1cmF0aW9uIH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xyXG5pbXBvcnQgeyBBdXJlbGlhQWRhbENvbmZpZyB9IGZyb20gJy4vYXVyZWxpYS1hZGFsLWNvbmZpZyc7XHJcbmltcG9ydCB7IEF1cmVsaWFBZGFsTWFuYWdlciB9IGZyb20gJy4vYXVyZWxpYS1hZGFsLW1hbmFnZXInO1xyXG5cclxuZXhwb3J0IG1vZHVsZSBBdXJlbGlhQWRhbCB7XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGZyYW1ld29ya0NvbmZpZzogRnJhbWV3b3JrQ29uZmlndXJhdGlvbiwgY29uZmlnOiBBdXJlbGlhQWRhbENvbmZpZykge1xyXG4gICAgbGV0IGF1cmVsaWFBZGFsOiBBdXJlbGlhQWRhbE1hbmFnZXIgPSBmcmFtZXdvcmtDb25maWcuY29udGFpbmVyLmdldChBdXJlbGlhQWRhbE1hbmFnZXIpO1xyXG4gICAgXHJcbiAgICBhdXJlbGlhQWRhbC5jb25maWd1cmUoY29uZmlnKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIEF1cmVsaWFBZGFsTWFuYWdlcjIgZXh0ZW5kcyBBdXJlbGlhQWRhbE1hbmFnZXIge31cclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
