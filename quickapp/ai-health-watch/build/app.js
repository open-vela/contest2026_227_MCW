export default function(global, globalThis, window, $app_exports$, $app_evaluate$) {
    var org_app_require = $app_require$;
    (function(global, globalThis, window, $app_exports$, $app_evaluate$) {
        var setTimeout = global.setTimeout;
        var setInterval = global.setInterval;
        var clearTimeout = global.clearTimeout;
        var clearInterval = global.clearInterval;
        var $app_require$1 = global.$app_require$ || org_app_require;
        var createAppHandler = function() {
            return (()=>{
                var __webpack_modules__ = {
                    "./src/manifest.json" (module) {
                        "use strict";
                        module.exports = JSON.parse('{"package":"com.application.watch.demo","name":"AI多传感融合健康陪伴智能手表","versionName":"1.0.0","versionCode":1,"minPlatformVersion":1000,"icon":"/common/logo.png","deviceTypeList":["watch"],"permissions":[{"name":"hapjs.permission.HEALTH"}],"features":[{"name":"system.router"},{"name":"service.health"},{"name":"system.storage"}],"config":{"logLevel":"log","designWidth":"device-width","background":{"features":["service.health"]}},"router":{"entry":"pages/index","pages":{"pages/index":{"component":"index"},"pages/detail":{"component":"detail"},"pages/report":{"component":"report"},"pages/about":{"component":"about"}}}}');
                    }
                };
                var __webpack_module_cache__ = {};
                function __webpack_require__(moduleId) {
                    var cachedModule = __webpack_module_cache__[moduleId];
                    if (void 0 !== cachedModule) return cachedModule.exports;
                    var module = __webpack_module_cache__[moduleId] = {
                        exports: {}
                    };
                    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
                    return module.exports;
                }
                (()=>{
                    __webpack_require__.g = (()=>{
                        if ('object' == typeof globalThis) return globalThis;
                        try {
                            return this || new Function('return this')();
                        } catch (e) {
                            if ('object' == typeof window) return window;
                        }
                    })();
                })();
                (()=>{
                    __webpack_require__.rv = ()=>"1.7.12";
                })();
                (()=>{
                    __webpack_require__.ruid = "bundler=rspack@1.7.12";
                })();
                (()=>{
                    var $app_style$ = [];
                    var $app_script$ = function __scriptModule__(module, exports, $app_require$1) {
                        "use strict";
                        Object.defineProperty(exports, "__esModule", {
                            value: true
                        });
                        exports.default = void 0;
                        var _system = _interopRequireDefault($app_require$1("@app-module/system.router"));
                        function _interopRequireDefault(e) {
                            return e && e.__esModule ? e : {
                                default: e
                            };
                        }
                        var _default = exports.default = {
                            methods: {
                                goHome () {
                                    _system.default.push({
                                        uri: "/pages/index/index"
                                    });
                                }
                            }
                        };
                    };
                    $app_script$({}, $app_exports$, $app_require$1);
                    $app_exports$.default.style = $app_style$;
                    $app_exports$.default.manifest = __webpack_require__("./src/manifest.json");
                    var $translateStyle$ = function(value) {
                        if ('string' == typeof value) return Object.fromEntries(value.split(';').filter((item)=>Boolean(item && item.trim())).map((item)=>{
                            const matchs = item.match(/([^:]+):(.*)/);
                            if (matchs && matchs.length > 2) return [
                                matchs[1].trim().replace(/-([a-z])/g, (_, match)=>match.toUpperCase()),
                                matchs[2].trim()
                            ];
                            return [];
                        }));
                        return value;
                    };
                    __webpack_require__.g.$translateStyle$ = $translateStyle$;
                })();
            })();
        };
        return createAppHandler();
    })(global, globalThis, window, $app_exports$, $app_evaluate$);
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQUnlpJrkvKDmhJ/ono3lkIjlgaXlurfpmarkvLTmmbrog73miYvooagvanNvbnxlOlxcb3BlbnZlbGFcXC50ZW1wX0FJ5aSa5Lyg5oSf6J6N5ZCI5YGl5bq36Zmq5Ly05pm66IO95omL6KGoXFxzcmNcXG1hbmlmZXN0Lmpzb24iLCJ3ZWJwYWNrOi8vQUnlpJrkvKDmhJ/ono3lkIjlgaXlurfpmarkvLTmmbrog73miYvooagvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9BSeWkmuS8oOaEn+iejeWQiOWBpeW6t+mZquS8tOaZuuiDveaJi+ihqC93ZWJwYWNrL3J1bnRpbWUvcnNwYWNrX3ZlcnNpb24iLCJ3ZWJwYWNrOi8vQUnlpJrkvKDmhJ/ono3lkIjlgaXlurfpmarkvLTmmbrog73miYvooagvd2VicGFjay9ydW50aW1lL3JzcGFja191bmlxdWVfaWQiLCJ3ZWJwYWNrOi8vQUnlpJrkvKDmhJ/ono3lkIjlgaXlurfpmarkvLTmmbrog73miYvooagvc3JjL2FwcC51eCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IEpTT04ucGFyc2UoJ3tcInBhY2thZ2VcIjpcImNvbS5hcHBsaWNhdGlvbi53YXRjaC5kZW1vXCIsXCJuYW1lXCI6XCJBSeWkmuS8oOaEn+iejeWQiOWBpeW6t+mZquS8tOaZuuiDveaJi+ihqFwiLFwidmVyc2lvbk5hbWVcIjpcIjEuMC4wXCIsXCJ2ZXJzaW9uQ29kZVwiOjEsXCJtaW5QbGF0Zm9ybVZlcnNpb25cIjoxMDAwLFwiaWNvblwiOlwiL2NvbW1vbi9sb2dvLnBuZ1wiLFwiZGV2aWNlVHlwZUxpc3RcIjpbXCJ3YXRjaFwiXSxcInBlcm1pc3Npb25zXCI6W3tcIm5hbWVcIjpcImhhcGpzLnBlcm1pc3Npb24uSEVBTFRIXCJ9XSxcImZlYXR1cmVzXCI6W3tcIm5hbWVcIjpcInN5c3RlbS5yb3V0ZXJcIn0se1wibmFtZVwiOlwic2VydmljZS5oZWFsdGhcIn0se1wibmFtZVwiOlwic3lzdGVtLnN0b3JhZ2VcIn1dLFwiY29uZmlnXCI6e1wibG9nTGV2ZWxcIjpcImxvZ1wiLFwiZGVzaWduV2lkdGhcIjpcImRldmljZS13aWR0aFwiLFwiYmFja2dyb3VuZFwiOntcImZlYXR1cmVzXCI6W1wic2VydmljZS5oZWFsdGhcIl19fSxcInJvdXRlclwiOntcImVudHJ5XCI6XCJwYWdlcy9pbmRleFwiLFwicGFnZXNcIjp7XCJwYWdlcy9pbmRleFwiOntcImNvbXBvbmVudFwiOlwiaW5kZXhcIn0sXCJwYWdlcy9kZXRhaWxcIjp7XCJjb21wb25lbnRcIjpcImRldGFpbFwifSxcInBhZ2VzL3JlcG9ydFwiOntcImNvbXBvbmVudFwiOlwicmVwb3J0XCJ9LFwicGFnZXMvYWJvdXRcIjp7XCJjb21wb25lbnRcIjpcImFib3V0XCJ9fX19JykiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoKCkgPT4ge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLnJ2ID0gKCkgPT4gKFwiMS43LjEyXCIpIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ydWlkID0gXCJidW5kbGVyPXJzcGFja0AxLjcuMTJcIjsiLCI8c2NyaXB0PlxuaW1wb3J0IHJvdXRlciBmcm9tIFwiQHN5c3RlbS5yb3V0ZXJcIlxuZXhwb3J0IGRlZmF1bHQge1xuICBtZXRob2RzOntcbiAgICBnb0hvbWUoKXtcbiAgICAgIHJvdXRlci5wdXNoKHt1cmk6XCIvcGFnZXMvaW5kZXgvaW5kZXhcIn0pXG4gICAgfVxuICB9XG59XG48L3NjcmlwdD5cblxuIl0sIm5hbWVzIjpbIm1vZHVsZSIsIkpTT04iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiZ2xvYmFsVGhpcyIsIkZ1bmN0aW9uIiwiZSIsIndpbmRvdyIsIl9zeXN0ZW0iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiJGFwcF9yZXF1aXJlJCIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0IiwiX2RlZmF1bHQiLCJleHBvcnRzIiwibWV0aG9kcyIsImdvSG9tZSIsInJvdXRlciIsInB1c2giLCJ1cmkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7d0JBQUFBLE9BQU8sT0FBTyxHQUFHQyxLQUFLLEtBQUssQ0FBQzs7Ozs7Ozs7Ozs7Ozs7b0JDQTVCQyxvQkFBb0IsQ0FBQyxHQUFHLEFBQUM7d0JBQ3hCLElBQUksQUFBc0IsWUFBdEIsT0FBT0MsWUFBeUIsT0FBT0E7d0JBQzNDLElBQUk7NEJBQ0gsT0FBTyxJQUFJLElBQUksSUFBSUMsU0FBUzt3QkFDN0IsRUFBRSxPQUFPQyxHQUFHOzRCQUNYLElBQUksQUFBa0IsWUFBbEIsT0FBT0MsUUFBcUIsT0FBT0E7d0JBQ3hDO29CQUNEOzs7b0JDUEFKLG9CQUFvQixFQUFFLEdBQUcsSUFBTzs7O29CQ0FoQ0Esb0JBQW9CLElBQUksR0FBRzs7Ozs7Ozs7Ozt3QkNDM0IsSUFBQUssVUFBQUMsdUJBQUFDLGVBQUE7d0JBQW1DLFNBQUFELHVCQUFBSCxDQUFBOzRCQUFBLE9BQUFBLEtBQUFBLEVBQUFLLFVBQUEsR0FBQUwsSUFBQTtnQ0FBQU0sU0FBQU47NEJBQUE7d0JBQUE7d0JBQUEsSUFBQU8sV0FBQUMsUUFBQUYsT0FBQSxHQUNwQjs0QkFDYkcsU0FBUTtnQ0FDTkM7b0NBQ0VDLFFBQUFBLE9BQU0sQ0FBQ0MsSUFBSSxDQUFDO3dDQUFDQyxLQUFJO29DQUFvQjtnQ0FDdkM7NEJBQ0Y7d0JBQ0YifQ==