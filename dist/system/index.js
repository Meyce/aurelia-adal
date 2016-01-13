"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

System.register(['./aurelia-adal-manager'], function (exports_1) {
    var __awaiter = this && this.__awaiter || function (thisArg, _arguments, Promise, generator) {
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
    var aurelia_adal_manager_1;
    var AureliaAdal;
    return {
        setters: [function (aurelia_adal_manager_1_1) {
            aurelia_adal_manager_1 = aurelia_adal_manager_1_1;
        }],
        execute: function execute() {
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
            })(AureliaAdal = AureliaAdal || (AureliaAdal = {}));
            exports_1("AureliaAdal", AureliaAdal);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwiaW5kZXgudHMiXSwibmFtZXMiOlsiQXVyZWxpYUFkYWwiLCJBdXJlbGlhQWRhbC5jb25maWd1cmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLEVBQUUsVUFBUyxTQUFTLEVBQUU7QUFDNUQsUUFBSSxTQUFTLEdBQUcsQUFBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSyxVQUFVLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRTtBQUMzRixlQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMxQyxxQkFBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ2hELHFCQUFTLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFBRSx1QkFBTyxLQUFLLFlBQVksT0FBTyxJQUFJLEtBQUssQ0FBQyxXQUFXLEtBQUssT0FBTyxHQUFHLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRTtBQUFFLDJCQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQUUsQ0FBQyxDQUFDO2FBQUU7QUFDeEoscUJBQVMsU0FBUyxDQUFDLEtBQUssRUFBRTtBQUFFLG9CQUFJO0FBQUUsd0JBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUFFLDBCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQUU7YUFBRTtBQUNuRixxQkFBUyxRQUFRLENBQUMsS0FBSyxFQUFFO0FBQUUsb0JBQUk7QUFBRSx3QkFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQUUsMEJBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFBRTthQUFFO0FBQ25GLHFCQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO0FBQ3ZCLG9CQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEMsc0JBQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDdEY7QUFDRCxnQkFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3hCLENBQUMsQ0FBQztLQUNOLENBQUM7QUFDRixRQUFJLHNCQUFzQixDQUFDO0FBQzNCLFFBQUksV0FBVyxDQUFDO0FBQ2hCLFdBQU87QUFDSCxlQUFPLEVBQUMsQ0FDSixVQUFVLHdCQUF3QixFQUFFO0FBQ2hDLGtDQUFzQixHQUFHLHdCQUF3QixDQUFDO1NBQ3JELENBQUM7QUFDTixlQUFPLEVBQUUsbUJBQVc7QUNqQjVCLGdCQUFjLFdBQVcsQ0FReEI7QUFSRCxhQUFBLFVBQWMsV0FBVyxFQUFDO0FBQ3RCQSx5QkFBQUEsU0FBQUEsQ0FBMEJBLGVBQXVDQSxFQUFFQSxNQUF5QkEsRUFBQUE7QUFDNUZDLHdCQUFJQSxXQUFXQSxHQUF1QkEsZUFBZUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0Esc0JBQUFBLENBQUFBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7QUFFeEZBLCtCQUFXQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtpQkFDN0JBO0FBSmVELDJCQUFBQSxDQUFBQSxTQUFTQSxHQUFBQSxTQUl4QkEsQ0FBQUE7O29CQUVEQSxtQkFBQUE7OEJBQUFBLG1CQUFBQTs7NkJBQUFBLG1CQUFBQTs4Q0FBQUEsbUJBQUFBOzttREFBQUEsbUJBQUFBOzs7MkJBQUFBLG1CQUFBQTttQkFBeUNBLHNCQUFBQSxDQUFBQSxrQkFBa0JBOztBQUE5Q0EsMkJBQUFBLENBQUFBLG1CQUFtQkEsR0FBQUEsbUJBQThCQSxDQUFBQTthQUNqRUEsQ0FBQUEsQ0FSYSxXQUFXLEdBQVgsV0FBVyxLQUFYLFdBQVcsR0FBQSxFQUFBLENBQUEsQ0FBQSxDQVF4QjtBRHFCVyxxQkFBUyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0NyQmhEO1NEc0JRO0tBQ0osQ0FBQTtDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlN5c3RlbS5yZWdpc3RlcihbJy4vYXVyZWxpYS1hZGFsLW1hbmFnZXInXSwgZnVuY3Rpb24oZXhwb3J0c18xKSB7XG4gICAgdmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUHJvbWlzZSwgZ2VuZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBnZW5lcmF0b3IgPSBnZW5lcmF0b3IuY2FsbCh0aGlzQXJnLCBfYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNhc3QodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSA/IHZhbHVlIDogbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgICAgICAgICBmdW5jdGlvbiBvbmZ1bGZpbGwodmFsdWUpIHsgdHJ5IHsgc3RlcChcIm5leHRcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgICAgICBmdW5jdGlvbiBvbnJlamVjdCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwidGhyb3dcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgICAgICBmdW5jdGlvbiBzdGVwKHZlcmIsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGdlbmVyYXRvclt2ZXJiXSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBjYXN0KHJlc3VsdC52YWx1ZSkudGhlbihvbmZ1bGZpbGwsIG9ucmVqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ZXAoXCJuZXh0XCIsIHZvaWQgMCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGF1cmVsaWFfYWRhbF9tYW5hZ2VyXzE7XG4gICAgdmFyIEF1cmVsaWFBZGFsO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNldHRlcnM6W1xuICAgICAgICAgICAgZnVuY3Rpb24gKGF1cmVsaWFfYWRhbF9tYW5hZ2VyXzFfMSkge1xuICAgICAgICAgICAgICAgIGF1cmVsaWFfYWRhbF9tYW5hZ2VyXzEgPSBhdXJlbGlhX2FkYWxfbWFuYWdlcl8xXzE7XG4gICAgICAgICAgICB9XSxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgQXVyZWxpYUFkYWw7XG4gICAgICAgICAgICAoZnVuY3Rpb24gKEF1cmVsaWFBZGFsKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gY29uZmlndXJlKGZyYW1ld29ya0NvbmZpZywgY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhdXJlbGlhQWRhbCA9IGZyYW1ld29ya0NvbmZpZy5jb250YWluZXIuZ2V0KGF1cmVsaWFfYWRhbF9tYW5hZ2VyXzEuQXVyZWxpYUFkYWxNYW5hZ2VyKTtcbiAgICAgICAgICAgICAgICAgICAgYXVyZWxpYUFkYWwuY29uZmlndXJlKGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIEF1cmVsaWFBZGFsLmNvbmZpZ3VyZSA9IGNvbmZpZ3VyZTtcbiAgICAgICAgICAgICAgICBjbGFzcyBBdXJlbGlhQWRhbE1hbmFnZXIyIGV4dGVuZHMgYXVyZWxpYV9hZGFsX21hbmFnZXJfMS5BdXJlbGlhQWRhbE1hbmFnZXIge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBBdXJlbGlhQWRhbC5BdXJlbGlhQWRhbE1hbmFnZXIyID0gQXVyZWxpYUFkYWxNYW5hZ2VyMjtcbiAgICAgICAgICAgIH0pKEF1cmVsaWFBZGFsID0gQXVyZWxpYUFkYWwgfHwgKEF1cmVsaWFBZGFsID0ge30pKTtcbiAgICAgICAgICAgIGV4cG9ydHNfMShcIkF1cmVsaWFBZGFsXCIsIEF1cmVsaWFBZGFsKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIiwiaW1wb3J0IHsgRnJhbWV3b3JrQ29uZmlndXJhdGlvbiB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHsgQXVyZWxpYUFkYWxDb25maWcgfSBmcm9tICcuL2F1cmVsaWEtYWRhbC1jb25maWcnO1xyXG5pbXBvcnQgeyBBdXJlbGlhQWRhbE1hbmFnZXIgfSBmcm9tICcuL2F1cmVsaWEtYWRhbC1tYW5hZ2VyJztcclxuXHJcbmV4cG9ydCBtb2R1bGUgQXVyZWxpYUFkYWwge1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShmcmFtZXdvcmtDb25maWc6IEZyYW1ld29ya0NvbmZpZ3VyYXRpb24sIGNvbmZpZzogQXVyZWxpYUFkYWxDb25maWcpIHtcclxuICAgIGxldCBhdXJlbGlhQWRhbDogQXVyZWxpYUFkYWxNYW5hZ2VyID0gZnJhbWV3b3JrQ29uZmlnLmNvbnRhaW5lci5nZXQoQXVyZWxpYUFkYWxNYW5hZ2VyKTtcclxuICAgIFxyXG4gICAgYXVyZWxpYUFkYWwuY29uZmlndXJlKGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBBdXJlbGlhQWRhbE1hbmFnZXIyIGV4dGVuZHMgQXVyZWxpYUFkYWxNYW5hZ2VyIHt9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
