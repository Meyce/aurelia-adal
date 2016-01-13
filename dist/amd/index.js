"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) {
            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
                resolve(value);
            });
        }
        function onfulfill(value) {
            try {
                step("next", value);
            } catch (e) {
                reject(e);
            }
        }
        function onreject(value) {
            try {
                step("throw", value);
            } catch (e) {
                reject(e);
            }
        }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
define(["require", "exports", './aurelia-adal-manager'], function (require, exports, aurelia_adal_manager_1) {
    var AureliaAdal;
    (function (AureliaAdal) {
        function configure(frameworkConfig, config) {
            var aureliaAdal = frameworkConfig.container.get(aurelia_adal_manager_1.AureliaAdalManager);
            aureliaAdal.configure(config);
        }
        AureliaAdal.configure = configure;

        var AureliaAdalManager2 = (function (_aurelia_adal_manager_1$AureliaAdalManager) {
            _inherits(AureliaAdalManager2, _aurelia_adal_manager_1$AureliaAdalManager);

            function AureliaAdalManager2() {
                _classCallCheck(this, AureliaAdalManager2);

                _get(Object.getPrototypeOf(AureliaAdalManager2.prototype), "constructor", this).apply(this, arguments);
            }

            return AureliaAdalManager2;
        })(aurelia_adal_manager_1.AureliaAdalManager);

        AureliaAdal.AureliaAdalManager2 = AureliaAdalManager2;
    })(AureliaAdal = exports.AureliaAdal || (exports.AureliaAdal = {}));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwiaW5kZXgudHMiXSwibmFtZXMiOlsiQXVyZWxpYUFkYWwiLCJBdXJlbGlhQWRhbC5jb25maWd1cmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBSSxTQUFTLEdBQUcsQUFBQyxhQUFRLFVBQUssU0FBUyxJQUFLLFVBQVUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFO0FBQzNGLFdBQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQzFDLGlCQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDaEQsaUJBQVMsSUFBSSxDQUFDLEtBQUssRUFBRTtBQUFFLG1CQUFPLEtBQUssWUFBWSxPQUFPLElBQUksS0FBSyxDQUFDLFdBQVcsS0FBSyxPQUFPLEdBQUcsS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFO0FBQUUsdUJBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUFFLENBQUMsQ0FBQztTQUFFO0FBQ3hKLGlCQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUU7QUFBRSxnQkFBSTtBQUFFLG9CQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUFFLHNCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFBRTtTQUFFO0FBQ25GLGlCQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUU7QUFBRSxnQkFBSTtBQUFFLG9CQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUFFLHNCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFBRTtTQUFFO0FBQ25GLGlCQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO0FBQ3ZCLGdCQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEMsa0JBQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDdEY7QUFDRCxZQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0NBQ04sQ0FBQztBQUNGLE1BQU0sQ0FBQyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsd0JBQXdCLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUU7QUNUN0csUUFBYyxXQUFXLENBUXhCO0FBUkQsS0FBQSxVQUFjLFdBQVcsRUFBQztBQUN0QkEsaUJBQUFBLFNBQUFBLENBQTBCQSxlQUF1Q0EsRUFBRUEsTUFBeUJBLEVBQUFBO0FBQzVGQyxnQkFBSUEsV0FBV0EsR0FBdUJBLGVBQWVBLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLHNCQUFBQSxDQUFBQSxrQkFBa0JBLENBQUNBLENBQUNBO0FBRXhGQSx1QkFBV0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7U0FDN0JBO0FBSmVELG1CQUFBQSxDQUFBQSxTQUFTQSxHQUFBQSxTQUl4QkEsQ0FBQUE7O1lBRURBLG1CQUFBQTtzQkFBQUEsbUJBQUFBOztxQkFBQUEsbUJBQUFBO3NDQUFBQSxtQkFBQUE7OzJDQUFBQSxtQkFBQUE7OzttQkFBQUEsbUJBQUFBO1dBQXlDQSxzQkFBQUEsQ0FBQUEsa0JBQWtCQTs7QUFBOUNBLG1CQUFBQSxDQUFBQSxtQkFBbUJBLEdBQUFBLG1CQUE4QkEsQ0FBQUE7S0FDakVBLENBQUFBLENBUmEsV0FBVyxHQUFYLE9BQUEsQ0FBQSxXQUFXLEtBQVgsT0FBQSxDQUFBLFdBQVcsR0FBQSxFQUFBLENBQUEsQ0FBQSxDQVF4QjtDRGFBLENBQUMsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFByb21pc2UsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGdlbmVyYXRvciA9IGdlbmVyYXRvci5jYWxsKHRoaXNBcmcsIF9hcmd1bWVudHMpO1xuICAgICAgICBmdW5jdGlvbiBjYXN0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IFByb21pc2UgPyB2YWx1ZSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgICAgICBmdW5jdGlvbiBvbmZ1bGZpbGwodmFsdWUpIHsgdHJ5IHsgc3RlcChcIm5leHRcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIG9ucmVqZWN0KHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJ0aHJvd1wiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcCh2ZXJiLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGdlbmVyYXRvclt2ZXJiXSh2YWx1ZSk7XG4gICAgICAgICAgICByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGNhc3QocmVzdWx0LnZhbHVlKS50aGVuKG9uZnVsZmlsbCwgb25yZWplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHN0ZXAoXCJuZXh0XCIsIHZvaWQgMCk7XG4gICAgfSk7XG59O1xuZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuL2F1cmVsaWEtYWRhbC1tYW5hZ2VyJ10sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBhdXJlbGlhX2FkYWxfbWFuYWdlcl8xKSB7XG4gICAgdmFyIEF1cmVsaWFBZGFsO1xuICAgIChmdW5jdGlvbiAoQXVyZWxpYUFkYWwpIHtcbiAgICAgICAgZnVuY3Rpb24gY29uZmlndXJlKGZyYW1ld29ya0NvbmZpZywgY29uZmlnKSB7XG4gICAgICAgICAgICBsZXQgYXVyZWxpYUFkYWwgPSBmcmFtZXdvcmtDb25maWcuY29udGFpbmVyLmdldChhdXJlbGlhX2FkYWxfbWFuYWdlcl8xLkF1cmVsaWFBZGFsTWFuYWdlcik7XG4gICAgICAgICAgICBhdXJlbGlhQWRhbC5jb25maWd1cmUoY29uZmlnKTtcbiAgICAgICAgfVxuICAgICAgICBBdXJlbGlhQWRhbC5jb25maWd1cmUgPSBjb25maWd1cmU7XG4gICAgICAgIGNsYXNzIEF1cmVsaWFBZGFsTWFuYWdlcjIgZXh0ZW5kcyBhdXJlbGlhX2FkYWxfbWFuYWdlcl8xLkF1cmVsaWFBZGFsTWFuYWdlciB7XG4gICAgICAgIH1cbiAgICAgICAgQXVyZWxpYUFkYWwuQXVyZWxpYUFkYWxNYW5hZ2VyMiA9IEF1cmVsaWFBZGFsTWFuYWdlcjI7XG4gICAgfSkoQXVyZWxpYUFkYWwgPSBleHBvcnRzLkF1cmVsaWFBZGFsIHx8IChleHBvcnRzLkF1cmVsaWFBZGFsID0ge30pKTtcbn0pO1xuIiwiaW1wb3J0IHsgRnJhbWV3b3JrQ29uZmlndXJhdGlvbiB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHsgQXVyZWxpYUFkYWxDb25maWcgfSBmcm9tICcuL2F1cmVsaWEtYWRhbC1jb25maWcnO1xyXG5pbXBvcnQgeyBBdXJlbGlhQWRhbE1hbmFnZXIgfSBmcm9tICcuL2F1cmVsaWEtYWRhbC1tYW5hZ2VyJztcclxuXHJcbmV4cG9ydCBtb2R1bGUgQXVyZWxpYUFkYWwge1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShmcmFtZXdvcmtDb25maWc6IEZyYW1ld29ya0NvbmZpZ3VyYXRpb24sIGNvbmZpZzogQXVyZWxpYUFkYWxDb25maWcpIHtcclxuICAgIGxldCBhdXJlbGlhQWRhbDogQXVyZWxpYUFkYWxNYW5hZ2VyID0gZnJhbWV3b3JrQ29uZmlnLmNvbnRhaW5lci5nZXQoQXVyZWxpYUFkYWxNYW5hZ2VyKTtcclxuICAgIFxyXG4gICAgYXVyZWxpYUFkYWwuY29uZmlndXJlKGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBBdXJlbGlhQWRhbE1hbmFnZXIyIGV4dGVuZHMgQXVyZWxpYUFkYWxNYW5hZ2VyIHt9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
