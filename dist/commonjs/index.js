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
var aurelia_adal_manager_1 = require('./aurelia-adal-manager');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwiaW5kZXgudHMiXSwibmFtZXMiOlsiQXVyZWxpYUFkYWwiLCJBdXJlbGlhQWRhbC5jb25maWd1cmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBSSxTQUFTLEdBQUcsQUFBQyxhQUFRLFVBQUssU0FBUyxJQUFLLFVBQVUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFO0FBQzNGLFdBQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQzFDLGlCQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDaEQsaUJBQVMsSUFBSSxDQUFDLEtBQUssRUFBRTtBQUFFLG1CQUFPLEtBQUssWUFBWSxPQUFPLElBQUksS0FBSyxDQUFDLFdBQVcsS0FBSyxPQUFPLEdBQUcsS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFO0FBQUUsdUJBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUFFLENBQUMsQ0FBQztTQUFFO0FBQ3hKLGlCQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUU7QUFBRSxnQkFBSTtBQUFFLG9CQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUFFLHNCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFBRTtTQUFFO0FBQ25GLGlCQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUU7QUFBRSxnQkFBSTtBQUFFLG9CQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUFFLHNCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFBRTtTQUFFO0FBQ25GLGlCQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO0FBQ3ZCLGdCQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEMsa0JBQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDdEY7QUFDRCxZQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0NBQ04sQ0FBQztBQ1ZGLElBQUEsc0JBQUEsR0FBQSxPQUFBLENBQW1DLHdCQUF3QixDQUFDLENBQUE7QUFFNUQsSUFBYyxXQUFXLENBUXhCO0FBUkQsQ0FBQSxVQUFjLFdBQVcsRUFBQztBQUN0QkEsYUFBQUEsU0FBQUEsQ0FBMEJBLGVBQXVDQSxFQUFFQSxNQUF5QkEsRUFBQUE7QUFDNUZDLFlBQUlBLFdBQVdBLEdBQXVCQSxlQUFlQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxDQUFDQSxzQkFBQUEsQ0FBQUEsa0JBQWtCQSxDQUFDQSxDQUFDQTtBQUV4RkEsbUJBQVdBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO0tBQzdCQTtBQUplRCxlQUFBQSxDQUFBQSxTQUFTQSxHQUFBQSxTQUl4QkEsQ0FBQUE7O1FBRURBLG1CQUFBQTtrQkFBQUEsbUJBQUFBOztpQkFBQUEsbUJBQUFBO2tDQUFBQSxtQkFBQUE7O3VDQUFBQSxtQkFBQUE7OztlQUFBQSxtQkFBQUE7T0FBeUNBLHNCQUFBQSxDQUFBQSxrQkFBa0JBOztBQUE5Q0EsZUFBQUEsQ0FBQUEsbUJBQW1CQSxHQUFBQSxtQkFBOEJBLENBQUFBO0NBQ2pFQSxDQUFBQSxDQVJhLFdBQVcsR0FBWCxPQUFBLENBQUEsV0FBVyxLQUFYLE9BQUEsQ0FBQSxXQUFXLEdBQUEsRUFBQSxDQUFBLENBQUEsQ0FReEIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQcm9taXNlLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBnZW5lcmF0b3IgPSBnZW5lcmF0b3IuY2FsbCh0aGlzQXJnLCBfYXJndW1lbnRzKTtcbiAgICAgICAgZnVuY3Rpb24gY2FzdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlID8gdmFsdWUgOiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICAgICAgZnVuY3Rpb24gb25mdWxmaWxsKHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBvbnJlamVjdCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwidGhyb3dcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAodmVyYiwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbdmVyYl0odmFsdWUpO1xuICAgICAgICAgICAgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBjYXN0KHJlc3VsdC52YWx1ZSkudGhlbihvbmZ1bGZpbGwsIG9ucmVqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBzdGVwKFwibmV4dFwiLCB2b2lkIDApO1xuICAgIH0pO1xufTtcbnZhciBhdXJlbGlhX2FkYWxfbWFuYWdlcl8xID0gcmVxdWlyZSgnLi9hdXJlbGlhLWFkYWwtbWFuYWdlcicpO1xudmFyIEF1cmVsaWFBZGFsO1xuKGZ1bmN0aW9uIChBdXJlbGlhQWRhbCkge1xuICAgIGZ1bmN0aW9uIGNvbmZpZ3VyZShmcmFtZXdvcmtDb25maWcsIGNvbmZpZykge1xuICAgICAgICBsZXQgYXVyZWxpYUFkYWwgPSBmcmFtZXdvcmtDb25maWcuY29udGFpbmVyLmdldChhdXJlbGlhX2FkYWxfbWFuYWdlcl8xLkF1cmVsaWFBZGFsTWFuYWdlcik7XG4gICAgICAgIGF1cmVsaWFBZGFsLmNvbmZpZ3VyZShjb25maWcpO1xuICAgIH1cbiAgICBBdXJlbGlhQWRhbC5jb25maWd1cmUgPSBjb25maWd1cmU7XG4gICAgY2xhc3MgQXVyZWxpYUFkYWxNYW5hZ2VyMiBleHRlbmRzIGF1cmVsaWFfYWRhbF9tYW5hZ2VyXzEuQXVyZWxpYUFkYWxNYW5hZ2VyIHtcbiAgICB9XG4gICAgQXVyZWxpYUFkYWwuQXVyZWxpYUFkYWxNYW5hZ2VyMiA9IEF1cmVsaWFBZGFsTWFuYWdlcjI7XG59KShBdXJlbGlhQWRhbCA9IGV4cG9ydHMuQXVyZWxpYUFkYWwgfHwgKGV4cG9ydHMuQXVyZWxpYUFkYWwgPSB7fSkpO1xuIiwiaW1wb3J0IHsgRnJhbWV3b3JrQ29uZmlndXJhdGlvbiB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcclxuaW1wb3J0IHsgQXVyZWxpYUFkYWxDb25maWcgfSBmcm9tICcuL2F1cmVsaWEtYWRhbC1jb25maWcnO1xyXG5pbXBvcnQgeyBBdXJlbGlhQWRhbE1hbmFnZXIgfSBmcm9tICcuL2F1cmVsaWEtYWRhbC1tYW5hZ2VyJztcclxuXHJcbmV4cG9ydCBtb2R1bGUgQXVyZWxpYUFkYWwge1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShmcmFtZXdvcmtDb25maWc6IEZyYW1ld29ya0NvbmZpZ3VyYXRpb24sIGNvbmZpZzogQXVyZWxpYUFkYWxDb25maWcpIHtcclxuICAgIGxldCBhdXJlbGlhQWRhbDogQXVyZWxpYUFkYWxNYW5hZ2VyID0gZnJhbWV3b3JrQ29uZmlnLmNvbnRhaW5lci5nZXQoQXVyZWxpYUFkYWxNYW5hZ2VyKTtcclxuICAgIFxyXG4gICAgYXVyZWxpYUFkYWwuY29uZmlndXJlKGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBBdXJlbGlhQWRhbE1hbmFnZXIyIGV4dGVuZHMgQXVyZWxpYUFkYWxNYW5hZ2VyIHt9XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
