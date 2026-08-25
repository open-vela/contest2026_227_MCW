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
                var __webpack_modules__ = {
                    "./src/common/health.js" (__unused_rspack_module, exports) {
                        "use strict";
                        Object.defineProperty(exports, "__esModule", {
                            value: true
                        });
                        exports["default"] = void 0;
                        var _system = _interopRequireDefault($app_require$1("@app-module/system.storage"));
                        function _interopRequireDefault(e) {
                            return e && e.__esModule ? e : {
                                default: e
                            };
                        }
                        let healthData = {
                            heartRate: 0,
                            steps: 0,
                            healthScore: 0,
                            aiSuggestion: "",
                            sleepDuration: 0,
                            sleepQuality: 0,
                            sportIntensity: "",
                            fatigueTip: ""
                        };
                        let healthHistory = [];
                        function createData() {
                            let heartRate = Math.floor(30 * Math.random() + 60);
                            let steps = Math.floor(5000 * Math.random() + 2000);
                            let sleepDuration = parseFloat((4 * Math.random() + 5).toFixed(1));
                            let sleepQuality = 55;
                            if (sleepDuration >= 7 && sleepDuration <= 8) sleepQuality = 90;
                            else if (sleepDuration >= 6) sleepQuality = 75;
                            let score = 70;
                            if (heartRate >= 60 && heartRate <= 100) score += 10;
                            if (heartRate > 100) score -= 10;
                            if (steps > 5000) score += 10;
                            if (sleepQuality >= 80) score += 10;
                            else if (sleepQuality < 60) score -= 5;
                            if (score > 100) score = 100;
                            if (score < 0) score = 0;
                            let sportIntensity = "";
                            sportIntensity = heartRate < 75 && steps < 1000 ? "静息状态" : heartRate < 90 && steps < 3000 ? "轻度活动" : heartRate < 110 && steps < 6000 ? "中度运动" : "高强度运动";
                            let fatigueTip = "";
                            fatigueTip = heartRate > 110 && steps > 5000 ? "运动量较大，建议补充水分" : heartRate > 100 ? "心率偏高，注意调整呼吸" : steps < 2000 ? "活动量不足，建议起身活动" : "运动平稳，保持当前节奏";
                            let suggestion = score >= 85 ? "今日状态良好，继续保持运动" : "建议增加运动，注意休息";
                            return {
                                heartRate: heartRate,
                                steps: steps,
                                healthScore: score,
                                aiSuggestion: suggestion,
                                sleepDuration: sleepDuration,
                                sleepQuality: sleepQuality,
                                sportIntensity: sportIntensity,
                                fatigueTip: fatigueTip
                            };
                        }
                        function saveData(data) {
                            healthData = data;
                            _system.default.set({
                                key: "todayHealthData",
                                value: JSON.stringify(data)
                            });
                            _system.default.set({
                                key: "heartRate",
                                value: String(data.heartRate)
                            });
                            _system.default.set({
                                key: "steps",
                                value: String(data.steps)
                            });
                            _system.default.set({
                                key: "healthScore",
                                value: String(data.healthScore)
                            });
                            _system.default.set({
                                key: "aiSuggestion",
                                value: data.aiSuggestion
                            });
                            _system.default.set({
                                key: "sleepDuration",
                                value: String(data.sleepDuration)
                            });
                            _system.default.set({
                                key: "sleepQuality",
                                value: String(data.sleepQuality)
                            });
                            _system.default.set({
                                key: "sportIntensity",
                                value: data.sportIntensity
                            });
                            _system.default.set({
                                key: "fatigueTip",
                                value: data.fatigueTip
                            });
                        }
                        function createHistory() {
                            let history = [];
                            for(let i = 6; i >= 0; i--){
                                let data = createData();
                                history.push({
                                    day: "第" + (7 - i) + "天",
                                    heartRate: data.heartRate,
                                    steps: data.steps,
                                    sleepDuration: data.sleepDuration,
                                    healthScore: data.healthScore
                                });
                            }
                            return history;
                        }
                        var _default = exports["default"] = {
                            initApp (callback) {
                                _system.default.get({
                                    key: "todayHealthData",
                                    success: (value)=>{
                                        if (value) {
                                            try {
                                                let data = JSON.parse(value);
                                                if (data && data.heartRate > 0) {
                                                    healthData = data;
                                                    console.log("读取已有健康数据:", JSON.stringify(data));
                                                    if (callback) callback(data);
                                                    return;
                                                }
                                            } catch (e) {
                                                console.error("读取健康数据失败:", JSON.stringify(e));
                                            }
                                        }
                                        console.log("没有有效数据，生成新的健康数据");
                                        let data = createData();
                                        saveData(data);
                                        if (callback) callback(data);
                                    },
                                    fail: ()=>{
                                        console.log("读取健康数据失败，重新生成");
                                        let data = createData();
                                        saveData(data);
                                        if (callback) callback(data);
                                    }
                                });
                            },
                            updateData (callback) {
                                console.log("========== 开始刷新健康数据 ==========");
                                let data = createData();
                                saveData(data);
                                console.log("新的健康数据:", JSON.stringify(data));
                                if (callback) callback(data);
                            },
                            getData () {
                                return healthData;
                            },
                            getWeekReport (callback) {
                                healthHistory = createHistory();
                                let totalHr = 0;
                                let totalSteps = 0;
                                let totalScore = 0;
                                for(let i = 0; i < healthHistory.length; i++){
                                    totalHr += healthHistory[i].heartRate;
                                    totalSteps += healthHistory[i].steps;
                                    totalScore += healthHistory[i].healthScore;
                                }
                                let avgHr = Math.round(totalHr / healthHistory.length);
                                let avgScore = Math.round(totalScore / healthHistory.length);
                                let summary = "";
                                summary = avgScore >= 85 ? "本周整体健康状态优秀，运动与睡眠规律，建议继续保持良好的生活习惯。" : avgScore >= 70 ? "本周健康状态良好，部分日期运动量不足，建议增加日常步行时长。" : "本周健康状态一般，睡眠质量波动较大，建议规律作息，适当增加运动。";
                                if (callback) callback({
                                    avgHeartRate: avgHr,
                                    totalSteps: totalSteps,
                                    avgHealthScore: avgScore,
                                    dayCount: healthHistory.length,
                                    summary: summary
                                });
                            }
                        };
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
                    __webpack_require__.rv = ()=>"1.7.12";
                })();
                (()=>{
                    __webpack_require__.ruid = "bundler=rspack@1.7.12";
                })();
                var __webpack_exports__ = {};
                (()=>{
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
                                paddingLeft: "36px",
                                paddingRight: "36px"
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
                                    "stat-card"
                                ]
                            ],
                            {
                                width: "100%",
                                backgroundColor: "#1a1a1a",
                                borderRadius: "10px",
                                marginTop: "8px",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop: "10px",
                                paddingBottom: "10px"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "stat-label"
                                ]
                            ],
                            {
                                fontSize: "12px",
                                color: "#9ca3af"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "stat-row"
                                ]
                            ],
                            {
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: "3px"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "stat-value"
                                ]
                            ],
                            {
                                fontSize: "20px",
                                color: "#ffffff",
                                fontWeight: 600
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "stat-unit"
                                ]
                            ],
                            {
                                fontSize: "11px",
                                color: "#6b7280",
                                fontWeight: 400
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "status-tag"
                                ]
                            ],
                            {
                                fontSize: "10px",
                                paddingTop: "2px",
                                paddingRight: "6px",
                                paddingBottom: "2px",
                                paddingLeft: "6px",
                                borderRadius: "8px",
                                marginLeft: "6px"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "status-tag"
                                ],
                                [
                                    0,
                                    "normal"
                                ]
                            ],
                            {
                                color: "#22c55e",
                                backgroundColor: "rgba(34, 197, 94, 0.15)"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "status-tag"
                                ],
                                [
                                    0,
                                    "fast"
                                ]
                            ],
                            {
                                color: "#ef4444",
                                backgroundColor: "rgba(239, 68, 68, 0.15)"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "status-tag"
                                ],
                                [
                                    0,
                                    "slow"
                                ]
                            ],
                            {
                                color: "#3b82f6",
                                backgroundColor: "rgba(59, 130, 246, 0.15)"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "summary-card"
                                ]
                            ],
                            {
                                width: "100%",
                                backgroundColor: "#0f2b1a",
                                borderRadius: "10px",
                                marginTop: "12px",
                                paddingTop: "12px",
                                paddingRight: "12px",
                                paddingBottom: "12px",
                                paddingLeft: "12px",
                                flexDirection: "column"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "summary-title"
                                ]
                            ],
                            {
                                fontSize: "13px",
                                color: "#88d8a8",
                                marginBottom: "8px",
                                textAlign: "center",
                                fontWeight: 600
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "summary-text"
                                ]
                            ],
                            {
                                fontSize: "12px",
                                color: "#ffffff",
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
                        var _health = _interopRequireDefault(__webpack_require__("./src/common/health.js"));
                        function _interopRequireDefault(e) {
                            return e && e.__esModule ? e : {
                                default: e
                            };
                        }
                        var _default = exports.default = {
                            data: {
                                avgHeartRate: 0,
                                totalSteps: 0,
                                avgHealthScore: 0,
                                summary: ""
                            },
                            computed: {
                                avgHeartStatus () {
                                    if (this.avgHeartRate < 60) return 'slow';
                                    if (this.avgHeartRate > 100) return 'fast';
                                    return 'normal';
                                },
                                avgHeartStatusText () {
                                    if (this.avgHeartRate < 60) return '偏慢';
                                    if (this.avgHeartRate > 100) return '偏快';
                                    return '正常';
                                }
                            },
                            onInit () {
                                _health.default.getWeekReport((report)=>{
                                    this.avgHeartRate = report.avgHeartRate;
                                    this.totalSteps = report.totalSteps;
                                    this.avgHealthScore = report.avgHealthScore;
                                    this.summary = report.summary;
                                });
                            },
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
                                        value: "健康趋势报告"
                                    }
                                }, []),
                                aiot.__ce__("div", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "stat-card"
                                        ]
                                    }
                                }, [
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "stat-label"
                                            ],
                                            value: "平均心率"
                                        }
                                    }, []),
                                    aiot.__ce__("div", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "stat-row"
                                            ]
                                        }
                                    }, [
                                        aiot.__ce__("text", {
                                            __vm__: _vm_,
                                            __opts__: {
                                                classList: [
                                                    "stat-value"
                                                ]
                                            }
                                        }, [
                                            aiot.__ce__("span", {
                                                __vm__: _vm_,
                                                __opts__: {
                                                    value: function() {
                                                        return _vm_.avgHeartRate;
                                                    }
                                                }
                                            }),
                                            aiot.__ce__("text", {
                                                __vm__: _vm_,
                                                __opts__: {
                                                    classList: [
                                                        "stat-unit"
                                                    ],
                                                    value: "bpm"
                                                }
                                            }, [])
                                        ]),
                                        aiot.__ce__("text", {
                                            __vm__: _vm_,
                                            __opts__: {
                                                classList: function() {
                                                    const $classValue$ = "status-tag " + _vm_.avgHeartStatus;
                                                    if ('string' == typeof $classValue$) return $classValue$.split(' ').map((item)=>item.trim()).filter(Boolean);
                                                    return $classValue$;
                                                },
                                                value: function() {
                                                    return _vm_.avgHeartStatusText;
                                                }
                                            }
                                        }, [])
                                    ])
                                ]),
                                aiot.__ce__("div", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "stat-card"
                                        ]
                                    }
                                }, [
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "stat-label"
                                            ],
                                            value: "7天累计步数"
                                        }
                                    }, []),
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "stat-value"
                                            ]
                                        }
                                    }, [
                                        aiot.__ce__("span", {
                                            __vm__: _vm_,
                                            __opts__: {
                                                value: function() {
                                                    return _vm_.totalSteps;
                                                }
                                            }
                                        }),
                                        aiot.__ce__("text", {
                                            __vm__: _vm_,
                                            __opts__: {
                                                classList: [
                                                    "stat-unit"
                                                ],
                                                value: "步"
                                            }
                                        }, [])
                                    ])
                                ]),
                                aiot.__ce__("div", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "stat-card"
                                        ]
                                    }
                                }, [
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "stat-label"
                                            ],
                                            value: "平均健康评分"
                                        }
                                    }, []),
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "stat-value"
                                            ]
                                        }
                                    }, [
                                        aiot.__ce__("span", {
                                            __vm__: _vm_,
                                            __opts__: {
                                                value: function() {
                                                    return _vm_.avgHealthScore;
                                                }
                                            }
                                        }),
                                        aiot.__ce__("text", {
                                            __vm__: _vm_,
                                            __opts__: {
                                                classList: [
                                                    "stat-unit"
                                                ],
                                                value: "分"
                                            }
                                        }, [])
                                    ])
                                ]),
                                aiot.__ce__("div", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "summary-card"
                                        ]
                                    }
                                }, [
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "summary-title"
                                            ],
                                            value: "📋 AI周度总结"
                                        }
                                    }, []),
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "summary-text"
                                            ],
                                            value: function() {
                                                return _vm_.summary;
                                            }
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
                                            value: "返回首页"
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
            })();
        };
        return createPageHandler();
    })(global, globalThis, window, $app_exports$, $app_evaluate$);
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXNcXHJlcG9ydFxccmVwb3J0LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQUnlpJrkvKDmhJ/ono3lkIjlgaXlurfpmarkvLTmmbrog73miYvooagvc3JjL2NvbW1vbi9oZWFsdGguanMiLCJ3ZWJwYWNrOi8vQUnlpJrkvKDmhJ/ono3lkIjlgaXlurfpmarkvLTmmbrog73miYvooagvd2VicGFjay9ydW50aW1lL3JzcGFja192ZXJzaW9uIiwid2VicGFjazovL0FJ5aSa5Lyg5oSf6J6N5ZCI5YGl5bq36Zmq5Ly05pm66IO95omL6KGoL3dlYnBhY2svcnVudGltZS9yc3BhY2tfdW5pcXVlX2lkIiwid2VicGFjazovL0FJ5aSa5Lyg5oSf6J6N5ZCI5YGl5bq36Zmq5Ly05pm66IO95omL6KGoL3NyYy9wYWdlcy9yZXBvcnQvcmVwb3J0LnV4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdG9yYWdlIGZyb20gJ0BzeXN0ZW0uc3RvcmFnZSdcclxuXHJcbmxldCBoZWFsdGhEYXRhID0ge1xyXG4gIGhlYXJ0UmF0ZTogMCxcclxuICBzdGVwczogMCxcclxuICBoZWFsdGhTY29yZTogMCxcclxuICBhaVN1Z2dlc3Rpb246IFwiXCIsXHJcbiAgc2xlZXBEdXJhdGlvbjogMCxcclxuICBzbGVlcFF1YWxpdHk6IDAsXHJcbiAgc3BvcnRJbnRlbnNpdHk6IFwiXCIsXHJcbiAgZmF0aWd1ZVRpcDogXCJcIlxyXG59XHJcblxyXG5sZXQgaGVhbHRoSGlzdG9yeSA9IFtdXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVEYXRhKCkge1xyXG4gIGxldCBoZWFydFJhdGUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzMCArIDYwKVxyXG4gIGxldCBzdGVwcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUwMDAgKyAyMDAwKVxyXG5cclxuICBsZXQgc2xlZXBEdXJhdGlvbiA9XHJcbiAgICBwYXJzZUZsb2F0KChNYXRoLnJhbmRvbSgpICogNCArIDUpLnRvRml4ZWQoMSkpXHJcblxyXG4gIGxldCBzbGVlcFF1YWxpdHkgPSA1NVxyXG5cclxuICBpZiAoc2xlZXBEdXJhdGlvbiA+PSA3ICYmIHNsZWVwRHVyYXRpb24gPD0gOCkge1xyXG4gICAgc2xlZXBRdWFsaXR5ID0gOTBcclxuICB9IGVsc2UgaWYgKHNsZWVwRHVyYXRpb24gPj0gNikge1xyXG4gICAgc2xlZXBRdWFsaXR5ID0gNzVcclxuICB9XHJcblxyXG4gIGxldCBzY29yZSA9IDcwXHJcblxyXG4gIGlmIChoZWFydFJhdGUgPj0gNjAgJiYgaGVhcnRSYXRlIDw9IDEwMCkge1xyXG4gICAgc2NvcmUgKz0gMTBcclxuICB9XHJcblxyXG4gIGlmIChoZWFydFJhdGUgPiAxMDApIHtcclxuICAgIHNjb3JlIC09IDEwXHJcbiAgfVxyXG5cclxuICBpZiAoc3RlcHMgPiA1MDAwKSB7XHJcbiAgICBzY29yZSArPSAxMFxyXG4gIH1cclxuXHJcbiAgaWYgKHNsZWVwUXVhbGl0eSA+PSA4MCkge1xyXG4gICAgc2NvcmUgKz0gMTBcclxuICB9IGVsc2UgaWYgKHNsZWVwUXVhbGl0eSA8IDYwKSB7XHJcbiAgICBzY29yZSAtPSA1XHJcbiAgfVxyXG5cclxuICBpZiAoc2NvcmUgPiAxMDApIHtcclxuICAgIHNjb3JlID0gMTAwXHJcbiAgfVxyXG5cclxuICBpZiAoc2NvcmUgPCAwKSB7XHJcbiAgICBzY29yZSA9IDBcclxuICB9XHJcblxyXG4gIGxldCBzcG9ydEludGVuc2l0eSA9IFwiXCJcclxuXHJcbiAgaWYgKGhlYXJ0UmF0ZSA8IDc1ICYmIHN0ZXBzIDwgMTAwMCkge1xyXG4gICAgc3BvcnRJbnRlbnNpdHkgPSBcIumdmeaBr+eKtuaAgVwiXHJcbiAgfSBlbHNlIGlmIChoZWFydFJhdGUgPCA5MCAmJiBzdGVwcyA8IDMwMDApIHtcclxuICAgIHNwb3J0SW50ZW5zaXR5ID0gXCLovbvluqbmtLvliqhcIlxyXG4gIH0gZWxzZSBpZiAoaGVhcnRSYXRlIDwgMTEwICYmIHN0ZXBzIDwgNjAwMCkge1xyXG4gICAgc3BvcnRJbnRlbnNpdHkgPSBcIuS4reW6pui/kOWKqFwiXHJcbiAgfSBlbHNlIHtcclxuICAgIHNwb3J0SW50ZW5zaXR5ID0gXCLpq5jlvLrluqbov5DliqhcIlxyXG4gIH1cclxuXHJcbiAgbGV0IGZhdGlndWVUaXAgPSBcIlwiXHJcblxyXG4gIGlmIChoZWFydFJhdGUgPiAxMTAgJiYgc3RlcHMgPiA1MDAwKSB7XHJcbiAgICBmYXRpZ3VlVGlwID0gXCLov5Dliqjph4/ovoPlpKfvvIzlu7rorq7ooaXlhYXmsLTliIZcIlxyXG4gIH0gZWxzZSBpZiAoaGVhcnRSYXRlID4gMTAwKSB7XHJcbiAgICBmYXRpZ3VlVGlwID0gXCLlv4PnjoflgY/pq5jvvIzms6jmhI/osIPmlbTlkbzlkLhcIlxyXG4gIH0gZWxzZSBpZiAoc3RlcHMgPCAyMDAwKSB7XHJcbiAgICBmYXRpZ3VlVGlwID0gXCLmtLvliqjph4/kuI3otrPvvIzlu7rorq7otbfouqvmtLvliqhcIlxyXG4gIH0gZWxzZSB7XHJcbiAgICBmYXRpZ3VlVGlwID0gXCLov5DliqjlubPnqLPvvIzkv53mjIHlvZPliY3oioLlpY9cIlxyXG4gIH1cclxuXHJcbiAgbGV0IHN1Z2dlc3Rpb24gPVxyXG4gICAgc2NvcmUgPj0gODVcclxuICAgICAgPyBcIuS7iuaXpeeKtuaAgeiJr+Wlve+8jOe7p+e7reS/neaMgei/kOWKqFwiXHJcbiAgICAgIDogXCLlu7rorq7lop7liqDov5DliqjvvIzms6jmhI/kvJHmga9cIlxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGVhcnRSYXRlOiBoZWFydFJhdGUsXHJcbiAgICBzdGVwczogc3RlcHMsXHJcbiAgICBoZWFsdGhTY29yZTogc2NvcmUsXHJcbiAgICBhaVN1Z2dlc3Rpb246IHN1Z2dlc3Rpb24sXHJcbiAgICBzbGVlcER1cmF0aW9uOiBzbGVlcER1cmF0aW9uLFxyXG4gICAgc2xlZXBRdWFsaXR5OiBzbGVlcFF1YWxpdHksXHJcbiAgICBzcG9ydEludGVuc2l0eTogc3BvcnRJbnRlbnNpdHksXHJcbiAgICBmYXRpZ3VlVGlwOiBmYXRpZ3VlVGlwXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlRGF0YShkYXRhKSB7XHJcbiAgaGVhbHRoRGF0YSA9IGRhdGFcclxuXHJcbiAgc3RvcmFnZS5zZXQoe1xyXG4gICAga2V5OiBcInRvZGF5SGVhbHRoRGF0YVwiLFxyXG4gICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgfSlcclxuXHJcbiAgc3RvcmFnZS5zZXQoe1xyXG4gICAga2V5OiBcImhlYXJ0UmF0ZVwiLFxyXG4gICAgdmFsdWU6IFN0cmluZyhkYXRhLmhlYXJ0UmF0ZSlcclxuICB9KVxyXG5cclxuICBzdG9yYWdlLnNldCh7XHJcbiAgICBrZXk6IFwic3RlcHNcIixcclxuICAgIHZhbHVlOiBTdHJpbmcoZGF0YS5zdGVwcylcclxuICB9KVxyXG5cclxuICBzdG9yYWdlLnNldCh7XHJcbiAgICBrZXk6IFwiaGVhbHRoU2NvcmVcIixcclxuICAgIHZhbHVlOiBTdHJpbmcoZGF0YS5oZWFsdGhTY29yZSlcclxuICB9KVxyXG5cclxuICBzdG9yYWdlLnNldCh7XHJcbiAgICBrZXk6IFwiYWlTdWdnZXN0aW9uXCIsXHJcbiAgICB2YWx1ZTogZGF0YS5haVN1Z2dlc3Rpb25cclxuICB9KVxyXG5cclxuICBzdG9yYWdlLnNldCh7XHJcbiAgICBrZXk6IFwic2xlZXBEdXJhdGlvblwiLFxyXG4gICAgdmFsdWU6IFN0cmluZyhkYXRhLnNsZWVwRHVyYXRpb24pXHJcbiAgfSlcclxuXHJcbiAgc3RvcmFnZS5zZXQoe1xyXG4gICAga2V5OiBcInNsZWVwUXVhbGl0eVwiLFxyXG4gICAgdmFsdWU6IFN0cmluZyhkYXRhLnNsZWVwUXVhbGl0eSlcclxuICB9KVxyXG5cclxuICBzdG9yYWdlLnNldCh7XHJcbiAgICBrZXk6IFwic3BvcnRJbnRlbnNpdHlcIixcclxuICAgIHZhbHVlOiBkYXRhLnNwb3J0SW50ZW5zaXR5XHJcbiAgfSlcclxuXHJcbiAgc3RvcmFnZS5zZXQoe1xyXG4gICAga2V5OiBcImZhdGlndWVUaXBcIixcclxuICAgIHZhbHVlOiBkYXRhLmZhdGlndWVUaXBcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVIaXN0b3J5KCkge1xyXG4gIGxldCBoaXN0b3J5ID0gW11cclxuXHJcbiAgZm9yIChsZXQgaSA9IDY7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICBsZXQgZGF0YSA9IGNyZWF0ZURhdGEoKVxyXG5cclxuICAgIGhpc3RvcnkucHVzaCh7XHJcbiAgICAgIGRheTogXCLnrKxcIiArICg3IC0gaSkgKyBcIuWkqVwiLFxyXG4gICAgICBoZWFydFJhdGU6IGRhdGEuaGVhcnRSYXRlLFxyXG4gICAgICBzdGVwczogZGF0YS5zdGVwcyxcclxuICAgICAgc2xlZXBEdXJhdGlvbjogZGF0YS5zbGVlcER1cmF0aW9uLFxyXG4gICAgICBoZWFsdGhTY29yZTogZGF0YS5oZWFsdGhTY29yZVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHJldHVybiBoaXN0b3J5XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHJcbiAgaW5pdEFwcChjYWxsYmFjaykge1xyXG5cclxuICAgIHN0b3JhZ2UuZ2V0KHtcclxuICAgICAga2V5OiBcInRvZGF5SGVhbHRoRGF0YVwiLFxyXG5cclxuICAgICAgc3VjY2VzczogKHZhbHVlKSA9PiB7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG5cclxuICAgICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UodmFsdWUpXHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmhlYXJ0UmF0ZSA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgaGVhbHRoRGF0YSA9IGRhdGFcclxuXHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICBcIuivu+WPluW3suacieWBpeW6t+aVsOaNrjpcIixcclxuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgICAgICAgXCLor7vlj5blgaXlurfmlbDmja7lpLHotKU6XCIsXHJcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZSlcclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5rKh5pyJ5pyJ5pWI5pWw5o2u77yM55Sf5oiQ5paw55qE5YGl5bq35pWw5o2uXCIpXHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gY3JlYXRlRGF0YSgpXHJcblxyXG4gICAgICAgIHNhdmVEYXRhKGRhdGEpXHJcblxyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgY2FsbGJhY2soZGF0YSlcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBmYWlsOiAoKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6K+75Y+W5YGl5bq35pWw5o2u5aSx6LSl77yM6YeN5paw55Sf5oiQXCIpXHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gY3JlYXRlRGF0YSgpXHJcblxyXG4gICAgICAgIHNhdmVEYXRhKGRhdGEpXHJcblxyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgY2FsbGJhY2soZGF0YSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlRGF0YShjYWxsYmFjaykge1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PSDlvIDlp4vliLfmlrDlgaXlurfmlbDmja4gPT09PT09PT09PVwiKVxyXG5cclxuICAgIGxldCBkYXRhID0gY3JlYXRlRGF0YSgpXHJcblxyXG4gICAgc2F2ZURhdGEoZGF0YSlcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgXCLmlrDnmoTlgaXlurfmlbDmja46XCIsXHJcbiAgICAgIEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICApXHJcblxyXG4gICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgIGNhbGxiYWNrKGRhdGEpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0RGF0YSgpIHtcclxuICAgIHJldHVybiBoZWFsdGhEYXRhXHJcbiAgfSxcclxuXHJcbiAgZ2V0V2Vla1JlcG9ydChjYWxsYmFjaykge1xyXG5cclxuICAgIGhlYWx0aEhpc3RvcnkgPSBjcmVhdGVIaXN0b3J5KClcclxuXHJcbiAgICBsZXQgdG90YWxIciA9IDBcclxuICAgIGxldCB0b3RhbFN0ZXBzID0gMFxyXG4gICAgbGV0IHRvdGFsU2NvcmUgPSAwXHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFsdGhIaXN0b3J5Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB0b3RhbEhyICs9IGhlYWx0aEhpc3RvcnlbaV0uaGVhcnRSYXRlXHJcbiAgICAgIHRvdGFsU3RlcHMgKz0gaGVhbHRoSGlzdG9yeVtpXS5zdGVwc1xyXG4gICAgICB0b3RhbFNjb3JlICs9IGhlYWx0aEhpc3RvcnlbaV0uaGVhbHRoU2NvcmVcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYXZnSHIgPVxyXG4gICAgICBNYXRoLnJvdW5kKHRvdGFsSHIgLyBoZWFsdGhIaXN0b3J5Lmxlbmd0aClcclxuXHJcbiAgICBsZXQgYXZnU2NvcmUgPVxyXG4gICAgICBNYXRoLnJvdW5kKHRvdGFsU2NvcmUgLyBoZWFsdGhIaXN0b3J5Lmxlbmd0aClcclxuXHJcbiAgICBsZXQgc3VtbWFyeSA9IFwiXCJcclxuXHJcbiAgICBpZiAoYXZnU2NvcmUgPj0gODUpIHtcclxuXHJcbiAgICAgIHN1bW1hcnkgPVxyXG4gICAgICAgIFwi5pys5ZGo5pW05L2T5YGl5bq354q25oCB5LyY56eA77yM6L+Q5Yqo5LiO552h55yg6KeE5b6L77yM5bu66K6u57un57ut5L+d5oyB6Imv5aW955qE55Sf5rS75Lmg5oOv44CCXCJcclxuXHJcbiAgICB9IGVsc2UgaWYgKGF2Z1Njb3JlID49IDcwKSB7XHJcblxyXG4gICAgICBzdW1tYXJ5ID1cclxuICAgICAgICBcIuacrOWRqOWBpeW6t+eKtuaAgeiJr+Wlve+8jOmDqOWIhuaXpeacn+i/kOWKqOmHj+S4jei2s++8jOW7uuiuruWinuWKoOaXpeW4uOatpeihjOaXtumVv+OAglwiXHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIHN1bW1hcnkgPVxyXG4gICAgICAgIFwi5pys5ZGo5YGl5bq354q25oCB5LiA6Iis77yM552h55yg6LSo6YeP5rOi5Yqo6L6D5aSn77yM5bu66K6u6KeE5b6L5L2c5oGv77yM6YCC5b2T5aKe5Yqg6L+Q5Yqo44CCXCJcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2FsbGJhY2spIHtcclxuXHJcbiAgICAgIGNhbGxiYWNrKHtcclxuXHJcbiAgICAgICAgYXZnSGVhcnRSYXRlOiBhdmdIcixcclxuXHJcbiAgICAgICAgdG90YWxTdGVwczogdG90YWxTdGVwcyxcclxuXHJcbiAgICAgICAgYXZnSGVhbHRoU2NvcmU6IGF2Z1Njb3JlLFxyXG5cclxuICAgICAgICBkYXlDb3VudDogaGVhbHRoSGlzdG9yeS5sZW5ndGgsXHJcblxyXG4gICAgICAgIHN1bW1hcnk6IHN1bW1hcnlcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn0iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLnJ2ID0gKCkgPT4gKFwiMS43LjEyXCIpIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ydWlkID0gXCJidW5kbGVyPXJzcGFja0AxLjcuMTJcIjsiLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cInBhZ2VcIj5cclxuICAgIDxzY3JvbGwgY2xhc3M9XCJzY3JvbGwtY29udGVudFwiIHNjcm9sbC15PVwidHJ1ZVwiPlxyXG4gICAgICA8dGV4dCBjbGFzcz1cInRpdGxlXCI+XHJcbiAgICAgICAg5YGl5bq36LaL5Yq/5oql5ZGKXHJcbiAgICAgIDwvdGV4dD5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWNhcmRcIj5cclxuICAgICAgICA8dGV4dCBjbGFzcz1cInN0YXQtbGFiZWxcIj5cclxuICAgICAgICAgIOW5s+Wdh+W/g+eOh1xyXG4gICAgICAgIDwvdGV4dD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1yb3dcIj5cclxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwic3RhdC12YWx1ZVwiPlxyXG4gICAgICAgICAgICB7e2F2Z0hlYXJ0UmF0ZX19IDx0ZXh0IGNsYXNzPVwic3RhdC11bml0XCI+YnBtPC90ZXh0PlxyXG4gICAgICAgICAgPC90ZXh0PlxyXG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJzdGF0dXMtdGFnIHt7YXZnSGVhcnRTdGF0dXN9fVwiPlxyXG4gICAgICAgICAgICB7e2F2Z0hlYXJ0U3RhdHVzVGV4dH19XHJcbiAgICAgICAgICA8L3RleHQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cInN0YXQtY2FyZFwiPlxyXG4gICAgICAgIDx0ZXh0IGNsYXNzPVwic3RhdC1sYWJlbFwiPlxyXG4gICAgICAgICAgN+Wkqee0r+iuoeatpeaVsFxyXG4gICAgICAgIDwvdGV4dD5cclxuICAgICAgICA8dGV4dCBjbGFzcz1cInN0YXQtdmFsdWVcIj5cclxuICAgICAgICAgIHt7dG90YWxTdGVwc319IDx0ZXh0IGNsYXNzPVwic3RhdC11bml0XCI+5q2lPC90ZXh0PlxyXG4gICAgICAgIDwvdGV4dD5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwic3RhdC1jYXJkXCI+XHJcbiAgICAgICAgPHRleHQgY2xhc3M9XCJzdGF0LWxhYmVsXCI+XHJcbiAgICAgICAgICDlubPlnYflgaXlurfor4TliIZcclxuICAgICAgICA8L3RleHQ+XHJcbiAgICAgICAgPHRleHQgY2xhc3M9XCJzdGF0LXZhbHVlXCI+XHJcbiAgICAgICAgICB7e2F2Z0hlYWx0aFNjb3JlfX0gPHRleHQgY2xhc3M9XCJzdGF0LXVuaXRcIj7liIY8L3RleHQ+XHJcbiAgICAgICAgPC90ZXh0PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzdW1tYXJ5LWNhcmRcIj5cclxuICAgICAgICA8dGV4dCBjbGFzcz1cInN1bW1hcnktdGl0bGVcIj5cclxuICAgICAgICAgIPCfk4sgQUnlkajluqbmgLvnu5NcclxuICAgICAgICA8L3RleHQ+XHJcbiAgICAgICAgPHRleHQgY2xhc3M9XCJzdW1tYXJ5LXRleHRcIj5cclxuICAgICAgICAgIHt7c3VtbWFyeX19XHJcbiAgICAgICAgPC90ZXh0PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJiYWNrLWJ1dHRvblwiIEBjbGljaz1cImJhY2tIb21lXCI+XHJcbiAgICAgICAgPHRleHQgY2xhc3M9XCJiYWNrLXRleHRcIj5cclxuICAgICAgICAgIOi/lOWbnummlumhtVxyXG4gICAgICAgIDwvdGV4dD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3Njcm9sbD5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCByb3V0ZXIgZnJvbSAnQHN5c3RlbS5yb3V0ZXInXHJcbmltcG9ydCBoZWFsdGggZnJvbSAnLi4vLi4vY29tbW9uL2hlYWx0aC5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBkYXRhOiB7XHJcbiAgICBhdmdIZWFydFJhdGU6IDAsXHJcbiAgICB0b3RhbFN0ZXBzOiAwLFxyXG4gICAgYXZnSGVhbHRoU2NvcmU6IDAsXHJcbiAgICBzdW1tYXJ5OiBcIlwiXHJcbiAgfSxcclxuXHJcbiAgY29tcHV0ZWQ6IHtcclxuICAgIGF2Z0hlYXJ0U3RhdHVzKCkge1xyXG4gICAgICBpZiAodGhpcy5hdmdIZWFydFJhdGUgPCA2MCkgcmV0dXJuICdzbG93J1xyXG4gICAgICBpZiAodGhpcy5hdmdIZWFydFJhdGUgPiAxMDApIHJldHVybiAnZmFzdCdcclxuICAgICAgcmV0dXJuICdub3JtYWwnXHJcbiAgICB9LFxyXG4gICAgYXZnSGVhcnRTdGF0dXNUZXh0KCkge1xyXG4gICAgICBpZiAodGhpcy5hdmdIZWFydFJhdGUgPCA2MCkgcmV0dXJuICflgY/mhaInXHJcbiAgICAgIGlmICh0aGlzLmF2Z0hlYXJ0UmF0ZSA+IDEwMCkgcmV0dXJuICflgY/lv6snXHJcbiAgICAgIHJldHVybiAn5q2j5bi4J1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIG9uSW5pdCgpIHtcclxuICAgIGhlYWx0aC5nZXRXZWVrUmVwb3J0KChyZXBvcnQpID0+IHtcclxuICAgICAgdGhpcy5hdmdIZWFydFJhdGUgPSByZXBvcnQuYXZnSGVhcnRSYXRlXHJcbiAgICAgIHRoaXMudG90YWxTdGVwcyA9IHJlcG9ydC50b3RhbFN0ZXBzXHJcbiAgICAgIHRoaXMuYXZnSGVhbHRoU2NvcmUgPSByZXBvcnQuYXZnSGVhbHRoU2NvcmVcclxuICAgICAgdGhpcy5zdW1tYXJ5ID0gcmVwb3J0LnN1bW1hcnlcclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgYmFja0hvbWUoKSB7XHJcbiAgICByb3V0ZXIuYmFjaygpXHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlPlxyXG4ucGFnZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwO1xyXG4gIHBhZGRpbmctbGVmdDogMzZweDtcclxuICBwYWRkaW5nLXJpZ2h0OiAzNnB4O1xyXG59XHJcblxyXG4uc2Nyb2xsLWNvbnRlbnQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwYWRkaW5nLXRvcDogMTJweDtcclxuICBwYWRkaW5nLWJvdHRvbTogMTZweDtcclxufVxyXG5cclxuLnRpdGxlIHtcclxuICBmb250LXNpemU6IDIycHg7XHJcbiAgY29sb3I6ICNmZmZmZmY7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5zdGF0LWNhcmQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMxYTFhMWE7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICBtYXJnaW4tdG9wOiA4cHg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHBhZGRpbmctdG9wOiAxMHB4O1xyXG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uc3RhdC1sYWJlbCB7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIGNvbG9yOiAjOWNhM2FmO1xyXG59XHJcblxyXG4uc3RhdC1yb3cge1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tdG9wOiAzcHg7XHJcbn1cclxuXHJcbi5zdGF0LXZhbHVlIHtcclxuICBmb250LXNpemU6IDIwcHg7XHJcbiAgY29sb3I6ICNmZmZmZmY7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxufVxyXG5cclxuLnN0YXQtdW5pdCB7XHJcbiAgZm9udC1zaXplOiAxMXB4O1xyXG4gIGNvbG9yOiAjNmI3MjgwO1xyXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbn1cclxuXHJcbi5zdGF0dXMtdGFnIHtcclxuICBmb250LXNpemU6IDEwcHg7XHJcbiAgcGFkZGluZzogMnB4IDZweDtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgbWFyZ2luLWxlZnQ6IDZweDtcclxufVxyXG5cclxuLnN0YXR1cy10YWcubm9ybWFsIHtcclxuICBjb2xvcjogIzIyYzU1ZTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDM0LCAxOTcsIDk0LCAwLjE1KTtcclxufVxyXG5cclxuLnN0YXR1cy10YWcuZmFzdCB7XHJcbiAgY29sb3I6ICNlZjQ0NDQ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMzksIDY4LCA2OCwgMC4xNSk7XHJcbn1cclxuXHJcbi5zdGF0dXMtdGFnLnNsb3cge1xyXG4gIGNvbG9yOiAjM2I4MmY2O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNTksIDEzMCwgMjQ2LCAwLjE1KTtcclxufVxyXG5cclxuLnN1bW1hcnktY2FyZCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBmMmIxYTtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIG1hcmdpbi10b3A6IDEycHg7XHJcbiAgcGFkZGluZzogMTJweDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcblxyXG4uc3VtbWFyeS10aXRsZSB7XHJcbiAgZm9udC1zaXplOiAxM3B4O1xyXG4gIGNvbG9yOiAjODhkOGE4O1xyXG4gIG1hcmdpbi1ib3R0b206IDhweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxufVxyXG5cclxuLnN1bW1hcnktdGV4dCB7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIGNvbG9yOiAjZmZmZmZmO1xyXG4gIGxpbmUtaGVpZ2h0OiAxOHB4O1xyXG59XHJcblxyXG4uYmFjay1idXR0b24ge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogNDJweDtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjM2I4MmY2LCAjMjU2M2ViKTtcclxuICBib3JkZXItcmFkaXVzOiAyMXB4O1xyXG4gIG1hcmdpbi10b3A6IDE2cHg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLmJhY2stdGV4dCB7XHJcbiAgZm9udC1zaXplOiAxNXB4O1xyXG4gIGNvbG9yOiAjZmZmZmZmO1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbn1cclxuPC9zdHlsZT5cclxuXHJcbiJdLCJuYW1lcyI6WyJfc3lzdGVtIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIiRhcHBfcmVxdWlyZSQiLCJlIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJoZWFsdGhEYXRhIiwiaGVhcnRSYXRlIiwic3RlcHMiLCJoZWFsdGhTY29yZSIsImFpU3VnZ2VzdGlvbiIsInNsZWVwRHVyYXRpb24iLCJzbGVlcFF1YWxpdHkiLCJzcG9ydEludGVuc2l0eSIsImZhdGlndWVUaXAiLCJoZWFsdGhIaXN0b3J5IiwiY3JlYXRlRGF0YSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwic2NvcmUiLCJzdWdnZXN0aW9uIiwic2F2ZURhdGEiLCJkYXRhIiwic3RvcmFnZSIsInNldCIsImtleSIsInZhbHVlIiwiSlNPTiIsInN0cmluZ2lmeSIsIlN0cmluZyIsImNyZWF0ZUhpc3RvcnkiLCJoaXN0b3J5IiwiaSIsInB1c2giLCJkYXkiLCJfZGVmYXVsdCIsImV4cG9ydHMiLCJpbml0QXBwIiwiY2FsbGJhY2siLCJnZXQiLCJzdWNjZXNzIiwicGFyc2UiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJmYWlsIiwidXBkYXRlRGF0YSIsImdldERhdGEiLCJnZXRXZWVrUmVwb3J0IiwidG90YWxIciIsInRvdGFsU3RlcHMiLCJ0b3RhbFNjb3JlIiwibGVuZ3RoIiwiYXZnSHIiLCJyb3VuZCIsImF2Z1Njb3JlIiwic3VtbWFyeSIsImF2Z0hlYXJ0UmF0ZSIsImF2Z0hlYWx0aFNjb3JlIiwiZGF5Q291bnQiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiX2hlYWx0aCIsInJlcXVpcmUiLCJjb21wdXRlZCIsImF2Z0hlYXJ0U3RhdHVzIiwiYXZnSGVhcnRTdGF0dXNUZXh0Iiwib25Jbml0IiwiaGVhbHRoIiwicmVwb3J0IiwiYmFja0hvbWUiLCJyb3V0ZXIiLCJiYWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozt3QkFBQSxJQUFBQSxVQUFBQyx1QkFBQUMsZUFBQTt3QkFBcUMsU0FBQUQsdUJBQUFFLENBQUE7NEJBQUEsT0FBQUEsS0FBQUEsRUFBQUMsVUFBQSxHQUFBRCxJQUFBO2dDQUFBRSxTQUFBRjs0QkFBQTt3QkFBQTt3QkFFckMsSUFBSUcsYUFBYTs0QkFDZkMsV0FBVzs0QkFDWEMsT0FBTzs0QkFDUEMsYUFBYTs0QkFDYkMsY0FBYzs0QkFDZEMsZUFBZTs0QkFDZkMsY0FBYzs0QkFDZEMsZ0JBQWdCOzRCQUNoQkMsWUFBWTt3QkFDZDt3QkFFQSxJQUFJQyxnQkFBZ0IsRUFBRTt3QkFFdEIsU0FBU0M7NEJBQ1AsSUFBSVQsWUFBWVUsS0FBS0MsS0FBSyxDQUFDRCxBQUFnQixLQUFoQkEsS0FBS0UsTUFBTSxLQUFVOzRCQUNoRCxJQUFJWCxRQUFRUyxLQUFLQyxLQUFLLENBQUNELEFBQWdCLE9BQWhCQSxLQUFLRSxNQUFNLEtBQVk7NEJBRTlDLElBQUlSLGdCQUNGUyxXQUFXLEFBQUNILENBQUFBLEFBQWdCLElBQWhCQSxLQUFLRSxNQUFNLEtBQVMsR0FBR0UsT0FBTyxDQUFDOzRCQUU3QyxJQUFJVCxlQUFlOzRCQUVuQixJQUFJRCxpQkFBaUIsS0FBS0EsaUJBQWlCLEdBQ3pDQyxlQUFlO2lDQUNWLElBQUlELGlCQUFpQixHQUMxQkMsZUFBZTs0QkFHakIsSUFBSVUsUUFBUTs0QkFFWixJQUFJZixhQUFhLE1B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