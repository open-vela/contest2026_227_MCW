export default function(global, globalThis, window, $app_exports$, $app_evaluate$) {
    var org_app_require = $app_require$;
    (function(global, globalThis, window, $app_exports$, $app_evaluate$) {
        var setTimeout = global.setTimeout;
        var setInterval = global.setInterval;
        var clearTimeout = global.clearTimeout;
        var clearInterval = global.clearInterval;
        var $app_require$1 = global.$app_require$ || org_app_require;
        var createPageHandler = function() {
            return (()=>{
                var __webpack_modules__ = {};
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
                    __webpack_require__.rv = ()=>"1.7.12";
                })();
                (()=>{
                    __webpack_require__.ruid = "bundler=rspack@1.7.12";
                })();
                var $app_style$ = [
                    [
                        [
                            [
                                0,
                                "page"
                            ]
                        ],
                        {
                            width: "100%",
                            height: "100%",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: "#000000",
                            paddingLeft: "50cap",
                            paddingRight: "50cap"
                        }
                    ],
                    [
                        [
                            [
                                0,
                                "scroll-content"
                            ]
                        ],
                        {
                            width: "100%",
                            flexDirection: "column",
                            alignItems: "center",
                            paddingTop: "12px",
                            paddingBottom: "16px"
                        }
                    ],
                    [
                        [
                            [
                                0,
                                "title"
                            ]
                        ],
                        {
                            fontSize: "22px",
                            color: "#ffffff",
                            marginBottom: "10px",
                            fontWeight: "bold",
                            textAlign: "center"
                        }
                    ],
                    [
                        [
                            [
                                0,
                                "info-card"
                            ]
                        ],
                        {
                            width: "100%",
                            backgroundColor: "#1a1a1a",
                            borderRadius: "10px",
                            marginTop: "8px",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            paddingTop: "10px",
                            paddingRight: "12px",
                            paddingBottom: "10px",
                            paddingLeft: "12px"
                        }
                    ],
                    [
                        [
                            [
                                0,
                                "card-title"
                            ]
                        ],
                        {
                            fontSize: "12px",
                            color: "#9ca3af",
                            marginBottom: "4px"
                        }
                    ],
                    [
                        [
                            [
                                0,
                                "card-content"
                            ]
                        ],
                        {
                            fontSize: "15px",
                            color: "#ffffff",
                            fontWeight: 500
                        }
                    ],
                    [
                        [
                            [
                                0,
                                "card-desc"
                            ]
                        ],
                        {
                            fontSize: "12px",
                            color: "#d1d5db",
                            lineHeight: "18px"
                        }
                    ],
                    [
                        [
                            [
                                0,
                                "back-button"
                            ]
                        ],
                        {
                            width: "100%",
                            height: "42px",
                            background: "{\"values\":[{\"type\":\"linearGradient\",\"directions\":[\"135deg\"],\"values\":[\"#3b82f6\",\"#2563eb\"]}]}",
                            borderRadius: "21px",
                            marginTop: "16px",
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    ],
                    [
                        [
                            [
                                0,
                                "back-text"
                            ]
                        ],
                        {
                            fontSize: "15px",
                            color: "#ffffff",
                            fontWeight: 500
                        }
                    ]
                ];
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
                        data: {},
                        backHome () {
                            _system.default.back();
                        }
                    };
                    const moduleOwn = exports.default || module.exports;
                    const accessors = [
                        'public',
                        'protected',
                        'private'
                    ];
                    if (moduleOwn.data && accessors.some(function(acc) {
                        return moduleOwn[acc];
                    })) throw new Error('页面VM对象中的属性data不可与"' + accessors.join(',') + '"同时存在，请使用private替换data名称');
                    if (!moduleOwn.data) {
                        moduleOwn.data = {};
                        moduleOwn._descriptor = {};
                        accessors.forEach(function(acc) {
                            const accType = typeof moduleOwn[acc];
                            if ('object' === accType) {
                                moduleOwn.data = Object.assign(moduleOwn.data, moduleOwn[acc]);
                                for(const name in moduleOwn[acc])moduleOwn._descriptor[name] = {
                                    access: acc
                                };
                            } else if ('function' === accType) console.warn('页面VM对象中的属性' + acc + '的值不能是函数，请使用对象');
                        });
                    }
                };
                var $app_template$ = function(vm) {
                    const _vm_ = vm || this;
                    return aiot.__ce__("div", {
                        __vm__: _vm_,
                        __opts__: {
                            classList: [
                                "page"
                            ]
                        }
                    }, [
                        aiot.__ce__("scroll", {
                            __vm__: _vm_,
                            __opts__: {
                                classList: [
                                    "scroll-content"
                                ],
                                scrollY: "true"
                            }
                        }, [
                            aiot.__ce__("text", {
                                __vm__: _vm_,
                                __opts__: {
                                    classList: [
                                        "title"
                                    ],
                                    value: "关于应用"
                                }
                            }, []),
                            aiot.__ce__("div", {
                                __vm__: _vm_,
                                __opts__: {
                                    classList: [
                                        "info-card"
                                    ]
                                }
                            }, [
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "card-title"
                                        ],
                                        value: "应用名称"
                                    }
                                }, []),
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "card-content"
                                        ],
                                        value: "AI多传感融合健康陪伴智能手表"
                                    }
                                }, [])
                            ]),
                            aiot.__ce__("div", {
                                __vm__: _vm_,
                                __opts__: {
                                    classList: [
                                        "info-card"
                                    ]
                                }
                            }, [
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "card-title"
                                        ],
                                        value: "版本信息"
                                    }
                                }, []),
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "card-content"
                                        ],
                                        value: "版本 1.0.0"
                                    }
                                }, [])
                            ]),
                            aiot.__ce__("div", {
                                __vm__: _vm_,
                                __opts__: {
                                    classList: [
                                        "info-card"
                                    ]
                                }
                            }, [
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "card-title"
                                        ],
                                        value: "应用介绍"
                                    }
                                }, []),
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "card-desc"
                                        ],
                                        value: "本应用基于OpenVela快应用框架开发，依托智能手表多传感器能力，实现心率、步数、睡眠等健康数据的实时监测与AI分析，为用户提供全天候健康陪伴与个性化健康建议。"
                                    }
                                }, [])
                            ]),
                            aiot.__ce__("div", {
                                __vm__: _vm_,
                                __opts__: {
                                    classList: [
                                        "info-card"
                                    ]
                                }
                            }, [
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "card-title"
                                        ],
                                        value: "核心功能"
                                    }
                                }, []),
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "card-desc"
                                        ],
                                        value: "· 实时心率监测与状态判定 · 每日步数与运动强度分析 · 睡眠质量监测与评估 · AI智能健康建议生成 · 周度健康趋势报告"
                                    }
                                }, [])
                            ]),
                            aiot.__ce__("div", {
                                __vm__: _vm_,
                                __opts__: {
                                    classList: [
                                        "back-button"
                                    ],
                                    events: {
                                        click: function(evt) {
                                            return _vm_.backHome(evt);
                                        }
                                    }
                                }
                            }, [
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "back-text"
                                        ],
                                        value: "返回"
                                    }
                                }, [])
                            ])
                        ])
                    ]);
                };
                $app_exports$['entry'] = function($app_exports$) {
                    $app_script$({}, $app_exports$, $app_require$1);
                    $app_exports$.default.template = $app_template$;
                    $app_exports$.default.style = $app_style$;
                };
            })();
        };
        return createPageHandler();
    })(global, globalThis, window, $app_exports$, $app_evaluate$);
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXNcXGFib3V0XFxhYm91dC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL0FJ5aSa5Lyg5oSf6J6N5ZCI5YGl5bq36Zmq5Ly05pm66IO95omL6KGoL3dlYnBhY2svcnVudGltZS9yc3BhY2tfdmVyc2lvbiIsIndlYnBhY2s6Ly9BSeWkmuS8oOaEn+iejeWQiOWBpeW6t+mZquS8tOaZuuiDveaJi+ihqC93ZWJwYWNrL3J1bnRpbWUvcnNwYWNrX3VuaXF1ZV9pZCIsIndlYnBhY2s6Ly9BSeWkmuS8oOaEn+iejeWQiOWBpeW6t+mZquS8tOaZuuiDveaJi+ihqC9zcmMvcGFnZXMvYWJvdXQvYWJvdXQudXgiXSwic291cmNlc0NvbnRlbnQiOlsiX193ZWJwYWNrX3JlcXVpcmVfXy5ydiA9ICgpID0+IChcIjEuNy4xMlwiKSIsIl9fd2VicGFja19yZXF1aXJlX18ucnVpZCA9IFwiYnVuZGxlcj1yc3BhY2tAMS43LjEyXCI7IiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJwYWdlXCI+XHJcbiAgICA8c2Nyb2xsIGNsYXNzPVwic2Nyb2xsLWNvbnRlbnRcIiBzY3JvbGwteT1cInRydWVcIj5cclxuICAgICAgPHRleHQgY2xhc3M9XCJ0aXRsZVwiPlxyXG4gICAgICAgIOWFs+S6juW6lOeUqFxyXG4gICAgICA8L3RleHQ+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1jYXJkXCI+XHJcbiAgICAgICAgPHRleHQgY2xhc3M9XCJjYXJkLXRpdGxlXCI+XHJcbiAgICAgICAgICDlupTnlKjlkI3np7BcclxuICAgICAgICA8L3RleHQ+XHJcbiAgICAgICAgPHRleHQgY2xhc3M9XCJjYXJkLWNvbnRlbnRcIj5cclxuICAgICAgICAgIEFJ5aSa5Lyg5oSf6J6N5ZCI5YGl5bq36Zmq5Ly05pm66IO95omL6KGoXHJcbiAgICAgICAgPC90ZXh0PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWNhcmRcIj5cclxuICAgICAgICA8dGV4dCBjbGFzcz1cImNhcmQtdGl0bGVcIj5cclxuICAgICAgICAgIOeJiOacrOS/oeaBr1xyXG4gICAgICAgIDwvdGV4dD5cclxuICAgICAgICA8dGV4dCBjbGFzcz1cImNhcmQtY29udGVudFwiPlxyXG4gICAgICAgICAg54mI5pysIDEuMC4wXHJcbiAgICAgICAgPC90ZXh0PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWNhcmRcIj5cclxuICAgICAgICA8dGV4dCBjbGFzcz1cImNhcmQtdGl0bGVcIj5cclxuICAgICAgICAgIOW6lOeUqOS7i+e7jVxyXG4gICAgICAgIDwvdGV4dD5cclxuICAgICAgICA8dGV4dCBjbGFzcz1cImNhcmQtZGVzY1wiPlxyXG4gICAgICAgICAg5pys5bqU55So5Z+65LqOT3BlblZlbGHlv6vlupTnlKjmoYbmnrblvIDlj5HvvIzkvp3miZjmmbrog73miYvooajlpJrkvKDmhJ/lmajog73lipvvvIzlrp7njrDlv4PnjofjgIHmraXmlbDjgIHnnaHnnKDnrYnlgaXlurfmlbDmja7nmoTlrp7ml7bnm5HmtYvkuI5BSeWIhuaekO+8jOS4uueUqOaIt+aPkOS+m+WFqOWkqeWAmeWBpeW6t+mZquS8tOS4juS4quaAp+WMluWBpeW6t+W7uuiuruOAglxyXG4gICAgICAgIDwvdGV4dD5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1jYXJkXCI+XHJcbiAgICAgICAgPHRleHQgY2xhc3M9XCJjYXJkLXRpdGxlXCI+XHJcbiAgICAgICAgICDmoLjlv4Plip/og71cclxuICAgICAgICA8L3RleHQ+XHJcbiAgICAgICAgPHRleHQgY2xhc3M9XCJjYXJkLWRlc2NcIj5cclxuICAgICAgICAgIMK3IOWunuaXtuW/g+eOh+ebkea1i+S4jueKtuaAgeWIpOWumlxyXG4gICAgICAgICAgwrcg5q+P5pel5q2l5pWw5LiO6L+Q5Yqo5by65bqm5YiG5p6QXHJcbiAgICAgICAgICDCtyDnnaHnnKDotKjph4/nm5HmtYvkuI7or4TkvLBcclxuICAgICAgICAgIMK3IEFJ5pm66IO95YGl5bq35bu66K6u55Sf5oiQXHJcbiAgICAgICAgICDCtyDlkajluqblgaXlurfotovlir/miqXlkYpcclxuICAgICAgICA8L3RleHQ+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cImJhY2stYnV0dG9uXCIgQGNsaWNrPVwiYmFja0hvbWVcIj5cclxuICAgICAgICA8dGV4dCBjbGFzcz1cImJhY2stdGV4dFwiPlxyXG4gICAgICAgICAg6L+U5ZueXHJcbiAgICAgICAgPC90ZXh0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2Nyb2xsPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuaW1wb3J0IHJvdXRlciBmcm9tICdAc3lzdGVtLnJvdXRlcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBkYXRhOiB7XHJcbiAgICBcclxuICB9LFxyXG5cclxuICBiYWNrSG9tZSgpIHtcclxuICAgIHJvdXRlci5iYWNrKClcclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGU+XHJcbi5wYWdlIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XHJcbiAgcGFkZGluZy1sZWZ0OiA1MGNhcDtcclxuICBwYWRkaW5nLXJpZ2h0OiA1MGNhcDtcclxufVxyXG5cclxuLnNjcm9sbC1jb250ZW50IHtcclxuICB3aWR0aDogMTAwJTtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZy10b3A6IDEycHg7XHJcbiAgcGFkZGluZy1ib3R0b206IDE2cHg7XHJcbn1cclxuXHJcbi50aXRsZSB7XHJcbiAgZm9udC1zaXplOiAyMnB4O1xyXG4gIGNvbG9yOiAjZmZmZmZmO1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uaW5mby1jYXJkIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWExYTFhO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgbWFyZ2luLXRvcDogOHB4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgcGFkZGluZzogMTBweCAxMnB4O1xyXG59XHJcblxyXG4uY2FyZC10aXRsZSB7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIGNvbG9yOiAjOWNhM2FmO1xyXG4gIG1hcmdpbi1ib3R0b206IDRweDtcclxufVxyXG5cclxuLmNhcmQtY29udGVudCB7XHJcbiAgZm9udC1zaXplOiAxNXB4O1xyXG4gIGNvbG9yOiAjZmZmZmZmO1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbn1cclxuXHJcbi5jYXJkLWRlc2Mge1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBjb2xvcjogI2QxZDVkYjtcclxuICBsaW5lLWhlaWdodDogMThweDtcclxufVxyXG5cclxuLmJhY2stYnV0dG9uIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDQycHg7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzNiODJmNiwgIzI1NjNlYik7XHJcbiAgYm9yZGVyLXJhZGl1czogMjFweDtcclxuICBtYXJnaW4tdG9wOiAxNnB4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5iYWNrLXRleHQge1xyXG4gIGZvbnQtc2l6ZTogMTVweDtcclxuICBjb2xvcjogI2ZmZmZmZjtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG59XHJcbjwvc3R5bGU+XHJcblxyXG4iXSwibmFtZXMiOlsiX193ZWJwYWNrX3JlcXVpcmVfXyIsIl9zeXN0ZW0iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiJGFwcF9yZXF1aXJlJCIsImUiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIl9kZWZhdWx0IiwiZXhwb3J0cyIsImRhdGEiLCJiYWNrSG9tZSIsInJvdXRlciIsImJhY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBQUFBLG9CQUFvQixFQUFFLEdBQUcsSUFBTzs7O29CQ0FoQ0Esb0JBQW9CLElBQUksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ3lEM0IsSUFBQUMsVUFBQUMsdUJBQUFDLGVBQUE7b0JBQW1DLFNBQUFELHVCQUFBRSxDQUFBO3dCQUFBLE9BQUFBLEtBQUFBLEVBQUFDLFVBQUEsR0FBQUQsSUFBQTs0QkFBQUUsU0FBQUY7d0JBQUE7b0JBQUE7b0JBQUEsSUFBQUcsV0FBQUMsUUFBQUYsT0FBQSxHQUVwQjt3QkFDYkcsTUFBTSxDQUVOO3dCQUVBQzs0QkFDRUMsUUFBQUEsT0FBTSxDQUFDQyxJQUFJO3dCQUNiO29CQUNGIn0=