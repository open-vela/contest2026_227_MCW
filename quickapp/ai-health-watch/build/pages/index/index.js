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
                                paddingLeft: "50cap",
                                paddingRight: "50cap",
                                paddingTop: "12px",
                                paddingBottom: "12px"
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
                                fontWeight: "bold",
                                marginTop: "8px",
                                marginBottom: "12px",
                                textAlign: "center"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "data-card"
                                ]
                            ],
                            {
                                width: "100%",
                                height: "50px",
                                backgroundColor: "#1a1a1a",
                                borderRadius: "10px",
                                marginBottom: "8px",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                paddingLeft: "10px",
                                paddingRight: "10px"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "label-text"
                                ]
                            ],
                            {
                                fontSize: "12px",
                                color: "#9ca3af",
                                fontWeight: 400
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "data-right"
                                ]
                            ],
                            {
                                flexDirection: "row",
                                alignItems: "center"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "data-text"
                                ]
                            ],
                            {
                                fontSize: "16px",
                                color: "#ffffff",
                                fontWeight: 600
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "data-unit"
                                ]
                            ],
                            {
                                fontSize: "10px",
                                color: "#6b7280",
                                fontWeight: 400,
                                marginLeft: "2px"
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
                                    "ai-card"
                                ]
                            ],
                            {
                                width: "100%",
                                backgroundColor: "#0f2b1a",
                                borderRadius: "10px",
                                marginTop: "2px",
                                marginBottom: "10px",
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
                                    "ai-label"
                                ]
                            ],
                            {
                                fontSize: "12px",
                                color: "#88d8a8",
                                fontWeight: 600,
                                marginBottom: "4px"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "ai-text"
                                ]
                            ],
                            {
                                fontSize: "11px",
                                color: "#ffffff",
                                lineHeight: "16px"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "button-card"
                                ]
                            ],
                            {
                                width: "100%",
                                height: "40px",
                                borderRadius: "20px",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: "7px"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "button-text"
                                ]
                            ],
                            {
                                fontSize: "14px",
                                color: "#ffffff",
                                fontWeight: 500
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "detail-btn"
                                ]
                            ],
                            {
                                background: "{\"values\":[{\"type\":\"linearGradient\",\"directions\":[\"135deg\"],\"values\":[\"#ef4444\",\"#dc2626\"]}]}",
                                marginTop: "4px"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "report-btn"
                                ]
                            ],
                            {
                                background: "{\"values\":[{\"type\":\"linearGradient\",\"directions\":[\"135deg\"],\"values\":[\"#f97316\",\"#ea580c\"]}]}"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "refresh-btn"
                                ]
                            ],
                            {
                                background: "{\"values\":[{\"type\":\"linearGradient\",\"directions\":[\"135deg\"],\"values\":[\"#22c55e\",\"#16a34a\"]}]}"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "about-btn"
                                ]
                            ],
                            {
                                background: "{\"values\":[{\"type\":\"linearGradient\",\"directions\":[\"135deg\"],\"values\":[\"#52525b\",\"#3f3f46\"]}]}",
                                marginTop: "4px"
                            }
                        ]
                    ];
                    var $app_script$ = function __scriptModule__(module, exports, $app_require$1) {
                        "use strict";
                        Object.defineProperty(exports, "__esModule", {
                            value: true
                        });
                        exports.default = void 0;
                        var _health = _interopRequireDefault(__webpack_require__("./src/common/health.js"));
                        var _system = _interopRequireDefault($app_require$1("@app-module/system.router"));
                        function _interopRequireDefault(e) {
                            return e && e.__esModule ? e : {
                                default: e
                            };
                        }
                        var _default = exports.default = {
                            data: {
                                heartRate: 0,
                                steps: 0,
                                sleepDuration: 0,
                                sleepQuality: 0,
                                sportIntensity: "",
                                fatigueTip: "",
                                healthScore: 0,
                                aiSuggestion: "正在分析健康状态",
                                heartTimer: null,
                                baseHeartRate: 0
                            },
                            computed: {
                                heartStatus () {
                                    if (this.heartRate < 60) return 'slow';
                                    if (this.heartRate > 100) return 'fast';
                                    return 'normal';
                                },
                                heartStatusText () {
                                    if (this.heartRate < 60) return '偏慢';
                                    if (this.heartRate > 100) return '偏快';
                                    return '正常';
                                }
                            },
                            onInit () {
                                _health.default.initApp((data)=>{
                                    this.heartRate = data.heartRate;
                                    this.baseHeartRate = data.heartRate;
                                    this.steps = data.steps;
                                    this.sleepDuration = data.sleepDuration;
                                    this.sleepQuality = data.sleepQuality;
                                    this.sportIntensity = data.sportIntensity;
                                    this.fatigueTip = data.fatigueTip;
                                    this.healthScore = data.healthScore;
                                    this.aiSuggestion = data.aiSuggestion;
                                    this.startHeartBeat();
                                });
                            },
                            onDestroy () {
                                if (this.heartTimer) clearInterval(this.heartTimer);
                            },
                            startHeartBeat () {
                                if (this.heartTimer) clearInterval(this.heartTimer);
                                this.heartTimer = setInterval(()=>{
                                    let offset = Math.floor(7 * Math.random()) - 3;
                                    let newRate = this.baseHeartRate + offset;
                                    if (newRate < 60) newRate = 60;
                                    if (newRate > 100) newRate = 100;
                                    this.heartRate = newRate;
                                }, 2000);
                            },
                            refreshData () {
                                _health.default.updateData((data)=>{
                                    this.steps = data.steps;
                                    this.sleepDuration = data.sleepDuration;
                                    this.sleepQuality = data.sleepQuality;
                                    this.sportIntensity = data.sportIntensity;
                                    this.fatigueTip = data.fatigueTip;
                                    this.healthScore = data.healthScore;
                                    this.aiSuggestion = data.aiSuggestion;
                                    this.baseHeartRate = data.heartRate;
                                    this.heartRate = data.heartRate;
                                });
                            },
                            goDetail () {
                                let data = {
                                    heartRate: this.heartRate,
                                    steps: this.steps,
                                    sleepDuration: this.sleepDuration,
                                    sleepQuality: this.sleepQuality,
                                    sportIntensity: this.sportIntensity,
                                    fatigueTip: this.fatigueTip,
                                    healthScore: this.healthScore,
                                    aiSuggestion: this.aiSuggestion
                                };
                                _system.default.push({
                                    uri: "/pages/detail",
                                    params: {
                                        healthData: JSON.stringify(data)
                                    }
                                });
                            },
                            goReport () {
                                _system.default.push({
                                    uri: "/pages/report"
                                });
                            },
                            goAbout () {
                                _system.default.push({
                                    uri: "/pages/about"
                                });
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
                            aiot.__ce__("text", {
                                __vm__: _vm_,
                                __opts__: {
                                    classList: [
                                        "title"
                                    ],
                                    value: "AI健康陪伴手表"
                                }
                            }, []),
                            aiot.__ce__("div", {
                                __vm__: _vm_,
                                __opts__: {
                                    classList: [
                                        "data-card"
                                    ]
                                }
                            }, [
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "label-text"
                                        ],
                                        value: "❤️ 心率"
                                    }
                                }, []),
                                aiot.__ce__("div", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "data-right"
                                        ]
                                    }
                                }, [
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "data-text"
                                            ]
                                        }
                                    }, [
                                        aiot.__ce__("span", {
                                            __vm__: _vm_,
                                            __opts__: {
                                                value: function() {
                                                    return _vm_.heartRate;
                                                }
                                            }
                                        }),
                                        aiot.__ce__("text", {
                                            __vm__: _vm_,
                                            __opts__: {
                                                classList: [
                                                    "data-unit"
                                                ],
                                                value: "bpm"
                                            }
                                        }, [])
                                    ]),
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: function() {
                                                const $classValue$ = "status-tag " + _vm_.heartStatus;
                                                if ('string' == typeof $classValue$) return $classValue$.split(' ').map((item)=>item.trim()).filter(Boolean);
                                                return $classValue$;
                                            },
                                            value: function() {
                                                return _vm_.heartStatusText;
                                            }
                                        }
                                    }, [])
                                ])
                            ]),
                            aiot.__ce__("div", {
                                __vm__: _vm_,
                                __opts__: {
                                    classList: [
                                        "data-card"
                                    ]
                                }
                            }, [
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "label-text"
                                        ],
                                        value: "🚶 步数"
                                    }
                                }, []),
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "data-text"
                                        ]
                                    }
                                }, [
                                    aiot.__ce__("span", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            value: function() {
                                                return _vm_.steps;
                                            }
                                        }
                                    }),
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "data-unit"
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
                                        "data-card"
                                    ]
                                }
                            }, [
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "label-text"
                                        ],
                                        value: "😴 睡眠"
                                    }
                                }, []),
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "data-text"
                                        ]
                                    }
                                }, [
                                    aiot.__ce__("span", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            value: function() {
                                                return _vm_.sleepDuration;
                                            }
                                        }
                                    }),
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "data-unit"
                                            ],
                                            value: "小时"
                                        }
                                    }, [])
                                ])
                            ]),
                            aiot.__ce__("div", {
                                __vm__: _vm_,
                                __opts__: {
                                    classList: [
                                        "data-card"
                                    ]
                                }
                            }, [
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "label-text"
                                        ],
                                        value: "🏃 状态"
                                    }
                                }, []),
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "data-text"
                                        ],
                                        value: function() {
                                            return _vm_.sportIntensity;
                                        }
                                    }
                                }, [])
                            ]),
                            aiot.__ce__("div", {
                                __vm__: _vm_,
                                __opts__: {
                                    classList: [
                                        "ai-card"
                                    ]
                                }
                            }, [
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "ai-label"
                                        ],
                                        value: "💡 AI 健康建议"
                                    }
                                }, []),
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "ai-text"
                                        ],
                                        value: function() {
                                            return _vm_.aiSuggestion;
                                        }
                                    }
                                }, [])
                            ]),
                            aiot.__ce__("div", {
                                __vm__: _vm_,
                                __opts__: {
                                    classList: [
                                        "button-card",
                                        "detail-btn"
                                    ],
                                    events: {
                                        click: function(evt) {
                                            return _vm_.goDetail(evt);
                                        }
                                    }
                                }
                            }, [
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "button-text"
                                        ],
                                        value: "查询健康详情"
                                    }
                                }, [])
                            ]),
                            aiot.__ce__("div", {
                                __vm__: _vm_,
                                __opts__: {
                                    classList: [
                                        "button-card",
                                        "report-btn"
                                    ],
                                    events: {
                                        click: function(evt) {
                                            return _vm_.goReport(evt);
                                        }
                                    }
                                }
                            }, [
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "button-text"
                                        ],
                                        value: "查看健康报告"
                                    }
                                }, [])
                            ]),
                            aiot.__ce__("div", {
                                __vm__: _vm_,
                                __opts__: {
                                    classList: [
                                        "button-card",
                                        "refresh-btn"
                                    ],
                                    events: {
                                        click: function(evt) {
                                            return _vm_.refreshData(evt);
                                        }
                                    }
                                }
                            }, [
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "button-text"
                                        ],
                                        value: "手动刷新健康数据"
                                    }
                                }, [])
                            ]),
                            aiot.__ce__("div", {
                                __vm__: _vm_,
                                __opts__: {
                                    classList: [
                                        "button-card",
                                        "about-btn"
                                    ],
                                    events: {
                                        click: function(evt) {
                                            return _vm_.goAbout(evt);
                                        }
                                    }
                                }
                            }, [
                                aiot.__ce__("text", {
                                    __vm__: _vm_,
                                    __opts__: {
                                        classList: [
                                            "button-text"
                                        ],
                                        value: "关于应用"
                                    }
                                }, [])
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXNcXGluZGV4XFxpbmRleC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL0FJ5aSa5Lyg5oSf6J6N5ZCI5YGl5bq36Zmq5Ly05pm66IO95omL6KGoL3NyYy9jb21tb24vaGVhbHRoLmpzIiwid2VicGFjazovL0FJ5aSa5Lyg5oSf6J6N5ZCI5YGl5bq36Zmq5Ly05pm66IO95omL6KGoL3dlYnBhY2svcnVudGltZS9yc3BhY2tfdmVyc2lvbiIsIndlYnBhY2s6Ly9BSeWkmuS8oOaEn+iejeWQiOWBpeW6t+mZquS8tOaZuuiDveaJi+ihqC93ZWJwYWNrL3J1bnRpbWUvcnNwYWNrX3VuaXF1ZV9pZCIsIndlYnBhY2s6Ly9BSeWkmuS8oOaEn+iejeWQiOWBpeW6t+mZquS8tOaZuuiDveaJi+ihqC9zcmMvcGFnZXMvaW5kZXgvaW5kZXgudXgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0b3JhZ2UgZnJvbSAnQHN5c3RlbS5zdG9yYWdlJ1xyXG5cclxubGV0IGhlYWx0aERhdGEgPSB7XHJcbiAgaGVhcnRSYXRlOiAwLFxyXG4gIHN0ZXBzOiAwLFxyXG4gIGhlYWx0aFNjb3JlOiAwLFxyXG4gIGFpU3VnZ2VzdGlvbjogXCJcIixcclxuICBzbGVlcER1cmF0aW9uOiAwLFxyXG4gIHNsZWVwUXVhbGl0eTogMCxcclxuICBzcG9ydEludGVuc2l0eTogXCJcIixcclxuICBmYXRpZ3VlVGlwOiBcIlwiXHJcbn1cclxuXHJcbmxldCBoZWFsdGhIaXN0b3J5ID0gW11cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURhdGEoKSB7XHJcbiAgbGV0IGhlYXJ0UmF0ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMwICsgNjApXHJcbiAgbGV0IHN0ZXBzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNTAwMCArIDIwMDApXHJcblxyXG4gIGxldCBzbGVlcER1cmF0aW9uID1cclxuICAgIHBhcnNlRmxvYXQoKE1hdGgucmFuZG9tKCkgKiA0ICsgNSkudG9GaXhlZCgxKSlcclxuXHJcbiAgbGV0IHNsZWVwUXVhbGl0eSA9IDU1XHJcblxyXG4gIGlmIChzbGVlcER1cmF0aW9uID49IDcgJiYgc2xlZXBEdXJhdGlvbiA8PSA4KSB7XHJcbiAgICBzbGVlcFF1YWxpdHkgPSA5MFxyXG4gIH0gZWxzZSBpZiAoc2xlZXBEdXJhdGlvbiA+PSA2KSB7XHJcbiAgICBzbGVlcFF1YWxpdHkgPSA3NVxyXG4gIH1cclxuXHJcbiAgbGV0IHNjb3JlID0gNzBcclxuXHJcbiAgaWYgKGhlYXJ0UmF0ZSA+PSA2MCAmJiBoZWFydFJhdGUgPD0gMTAwKSB7XHJcbiAgICBzY29yZSArPSAxMFxyXG4gIH1cclxuXHJcbiAgaWYgKGhlYXJ0UmF0ZSA+IDEwMCkge1xyXG4gICAgc2NvcmUgLT0gMTBcclxuICB9XHJcblxyXG4gIGlmIChzdGVwcyA+IDUwMDApIHtcclxuICAgIHNjb3JlICs9IDEwXHJcbiAgfVxyXG5cclxuICBpZiAoc2xlZXBRdWFsaXR5ID49IDgwKSB7XHJcbiAgICBzY29yZSArPSAxMFxyXG4gIH0gZWxzZSBpZiAoc2xlZXBRdWFsaXR5IDwgNjApIHtcclxuICAgIHNjb3JlIC09IDVcclxuICB9XHJcblxyXG4gIGlmIChzY29yZSA+IDEwMCkge1xyXG4gICAgc2NvcmUgPSAxMDBcclxuICB9XHJcblxyXG4gIGlmIChzY29yZSA8IDApIHtcclxuICAgIHNjb3JlID0gMFxyXG4gIH1cclxuXHJcbiAgbGV0IHNwb3J0SW50ZW5zaXR5ID0gXCJcIlxyXG5cclxuICBpZiAoaGVhcnRSYXRlIDwgNzUgJiYgc3RlcHMgPCAxMDAwKSB7XHJcbiAgICBzcG9ydEludGVuc2l0eSA9IFwi6Z2Z5oGv54q25oCBXCJcclxuICB9IGVsc2UgaWYgKGhlYXJ0UmF0ZSA8IDkwICYmIHN0ZXBzIDwgMzAwMCkge1xyXG4gICAgc3BvcnRJbnRlbnNpdHkgPSBcIui9u+W6pua0u+WKqFwiXHJcbiAgfSBlbHNlIGlmIChoZWFydFJhdGUgPCAxMTAgJiYgc3RlcHMgPCA2MDAwKSB7XHJcbiAgICBzcG9ydEludGVuc2l0eSA9IFwi5Lit5bqm6L+Q5YqoXCJcclxuICB9IGVsc2Uge1xyXG4gICAgc3BvcnRJbnRlbnNpdHkgPSBcIumrmOW8uuW6pui/kOWKqFwiXHJcbiAgfVxyXG5cclxuICBsZXQgZmF0aWd1ZVRpcCA9IFwiXCJcclxuXHJcbiAgaWYgKGhlYXJ0UmF0ZSA+IDExMCAmJiBzdGVwcyA+IDUwMDApIHtcclxuICAgIGZhdGlndWVUaXAgPSBcIui/kOWKqOmHj+i+g+Wkp++8jOW7uuiuruihpeWFheawtOWIhlwiXHJcbiAgfSBlbHNlIGlmIChoZWFydFJhdGUgPiAxMDApIHtcclxuICAgIGZhdGlndWVUaXAgPSBcIuW/g+eOh+WBj+mrmO+8jOazqOaEj+iwg+aVtOWRvOWQuFwiXHJcbiAgfSBlbHNlIGlmIChzdGVwcyA8IDIwMDApIHtcclxuICAgIGZhdGlndWVUaXAgPSBcIua0u+WKqOmHj+S4jei2s++8jOW7uuiurui1t+i6q+a0u+WKqFwiXHJcbiAgfSBlbHNlIHtcclxuICAgIGZhdGlndWVUaXAgPSBcIui/kOWKqOW5s+eos++8jOS/neaMgeW9k+WJjeiKguWlj1wiXHJcbiAgfVxyXG5cclxuICBsZXQgc3VnZ2VzdGlvbiA9XHJcbiAgICBzY29yZSA+PSA4NVxyXG4gICAgICA/IFwi5LuK5pel54q25oCB6Imv5aW977yM57un57ut5L+d5oyB6L+Q5YqoXCJcclxuICAgICAgOiBcIuW7uuiuruWinuWKoOi/kOWKqO+8jOazqOaEj+S8keaBr1wiXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoZWFydFJhdGU6IGhlYXJ0UmF0ZSxcclxuICAgIHN0ZXBzOiBzdGVwcyxcclxuICAgIGhlYWx0aFNjb3JlOiBzY29yZSxcclxuICAgIGFpU3VnZ2VzdGlvbjogc3VnZ2VzdGlvbixcclxuICAgIHNsZWVwRHVyYXRpb246IHNsZWVwRHVyYXRpb24sXHJcbiAgICBzbGVlcFF1YWxpdHk6IHNsZWVwUXVhbGl0eSxcclxuICAgIHNwb3J0SW50ZW5zaXR5OiBzcG9ydEludGVuc2l0eSxcclxuICAgIGZhdGlndWVUaXA6IGZhdGlndWVUaXBcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVEYXRhKGRhdGEpIHtcclxuICBoZWFsdGhEYXRhID0gZGF0YVxyXG5cclxuICBzdG9yYWdlLnNldCh7XHJcbiAgICBrZXk6IFwidG9kYXlIZWFsdGhEYXRhXCIsXHJcbiAgICB2YWx1ZTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuICB9KVxyXG5cclxuICBzdG9yYWdlLnNldCh7XHJcbiAgICBrZXk6IFwiaGVhcnRSYXRlXCIsXHJcbiAgICB2YWx1ZTogU3RyaW5nKGRhdGEuaGVhcnRSYXRlKVxyXG4gIH0pXHJcblxyXG4gIHN0b3JhZ2Uuc2V0KHtcclxuICAgIGtleTogXCJzdGVwc1wiLFxyXG4gICAgdmFsdWU6IFN0cmluZyhkYXRhLnN0ZXBzKVxyXG4gIH0pXHJcblxyXG4gIHN0b3JhZ2Uuc2V0KHtcclxuICAgIGtleTogXCJoZWFsdGhTY29yZVwiLFxyXG4gICAgdmFsdWU6IFN0cmluZyhkYXRhLmhlYWx0aFNjb3JlKVxyXG4gIH0pXHJcblxyXG4gIHN0b3JhZ2Uuc2V0KHtcclxuICAgIGtleTogXCJhaVN1Z2dlc3Rpb25cIixcclxuICAgIHZhbHVlOiBkYXRhLmFpU3VnZ2VzdGlvblxyXG4gIH0pXHJcblxyXG4gIHN0b3JhZ2Uuc2V0KHtcclxuICAgIGtleTogXCJzbGVlcER1cmF0aW9uXCIsXHJcbiAgICB2YWx1ZTogU3RyaW5nKGRhdGEuc2xlZXBEdXJhdGlvbilcclxuICB9KVxyXG5cclxuICBzdG9yYWdlLnNldCh7XHJcbiAgICBrZXk6IFwic2xlZXBRdWFsaXR5XCIsXHJcbiAgICB2YWx1ZTogU3RyaW5nKGRhdGEuc2xlZXBRdWFsaXR5KVxyXG4gIH0pXHJcblxyXG4gIHN0b3JhZ2Uuc2V0KHtcclxuICAgIGtleTogXCJzcG9ydEludGVuc2l0eVwiLFxyXG4gICAgdmFsdWU6IGRhdGEuc3BvcnRJbnRlbnNpdHlcclxuICB9KVxyXG5cclxuICBzdG9yYWdlLnNldCh7XHJcbiAgICBrZXk6IFwiZmF0aWd1ZVRpcFwiLFxyXG4gICAgdmFsdWU6IGRhdGEuZmF0aWd1ZVRpcFxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUhpc3RvcnkoKSB7XHJcbiAgbGV0IGhpc3RvcnkgPSBbXVxyXG5cclxuICBmb3IgKGxldCBpID0gNjsgaSA+PSAwOyBpLS0pIHtcclxuICAgIGxldCBkYXRhID0gY3JlYXRlRGF0YSgpXHJcblxyXG4gICAgaGlzdG9yeS5wdXNoKHtcclxuICAgICAgZGF5OiBcIuesrFwiICsgKDcgLSBpKSArIFwi5aSpXCIsXHJcbiAgICAgIGhlYXJ0UmF0ZTogZGF0YS5oZWFydFJhdGUsXHJcbiAgICAgIHN0ZXBzOiBkYXRhLnN0ZXBzLFxyXG4gICAgICBzbGVlcER1cmF0aW9uOiBkYXRhLnNsZWVwRHVyYXRpb24sXHJcbiAgICAgIGhlYWx0aFNjb3JlOiBkYXRhLmhlYWx0aFNjb3JlXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGhpc3RvcnlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cclxuICBpbml0QXBwKGNhbGxiYWNrKSB7XHJcblxyXG4gICAgc3RvcmFnZS5nZXQoe1xyXG4gICAgICBrZXk6IFwidG9kYXlIZWFsdGhEYXRhXCIsXHJcblxyXG4gICAgICBzdWNjZXNzOiAodmFsdWUpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcblxyXG4gICAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh2YWx1ZSlcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuaGVhcnRSYXRlID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICBoZWFsdGhEYXRhID0gZGF0YVxyXG5cclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgIFwi6K+75Y+W5bey5pyJ5YGl5bq35pWw5o2uOlwiLFxyXG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSlcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcclxuICAgICAgICAgICAgICBcIuivu+WPluWBpeW6t+aVsOaNruWksei0pTpcIixcclxuICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShlKVxyXG4gICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCLmsqHmnInmnInmlYjmlbDmja7vvIznlJ/miJDmlrDnmoTlgaXlurfmlbDmja5cIilcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSBjcmVhdGVEYXRhKClcclxuXHJcbiAgICAgICAgc2F2ZURhdGEoZGF0YSlcclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICBjYWxsYmFjayhkYXRhKVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuXHJcbiAgICAgIGZhaWw6ICgpID0+IHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCLor7vlj5blgaXlurfmlbDmja7lpLHotKXvvIzph43mlrDnlJ/miJBcIilcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSBjcmVhdGVEYXRhKClcclxuXHJcbiAgICAgICAgc2F2ZURhdGEoZGF0YSlcclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICBjYWxsYmFjayhkYXRhKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICB1cGRhdGVEYXRhKGNhbGxiYWNrKSB7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCI9PT09PT09PT09IOW8gOWni+WIt+aWsOWBpeW6t+aVsOaNriA9PT09PT09PT09XCIpXHJcblxyXG4gICAgbGV0IGRhdGEgPSBjcmVhdGVEYXRhKClcclxuXHJcbiAgICBzYXZlRGF0YShkYXRhKVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICBcIuaWsOeahOWBpeW6t+aVsOaNrjpcIixcclxuICAgICAgSlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuICAgIClcclxuXHJcbiAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgY2FsbGJhY2soZGF0YSlcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXREYXRhKCkge1xyXG4gICAgcmV0dXJuIGhlYWx0aERhdGFcclxuICB9LFxyXG5cclxuICBnZXRXZWVrUmVwb3J0KGNhbGxiYWNrKSB7XHJcblxyXG4gICAgaGVhbHRoSGlzdG9yeSA9IGNyZWF0ZUhpc3RvcnkoKVxyXG5cclxuICAgIGxldCB0b3RhbEhyID0gMFxyXG4gICAgbGV0IHRvdGFsU3RlcHMgPSAwXHJcbiAgICBsZXQgdG90YWxTY29yZSA9IDBcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlYWx0aEhpc3RvcnkubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIHRvdGFsSHIgKz0gaGVhbHRoSGlzdG9yeVtpXS5oZWFydFJhdGVcclxuICAgICAgdG90YWxTdGVwcyArPSBoZWFsdGhIaXN0b3J5W2ldLnN0ZXBzXHJcbiAgICAgIHRvdGFsU2NvcmUgKz0gaGVhbHRoSGlzdG9yeVtpXS5oZWFsdGhTY29yZVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBhdmdIciA9XHJcbiAgICAgIE1hdGgucm91bmQodG90YWxIciAvIGhlYWx0aEhpc3RvcnkubGVuZ3RoKVxyXG5cclxuICAgIGxldCBhdmdTY29yZSA9XHJcbiAgICAgIE1hdGgucm91bmQodG90YWxTY29yZSAvIGhlYWx0aEhpc3RvcnkubGVuZ3RoKVxyXG5cclxuICAgIGxldCBzdW1tYXJ5ID0gXCJcIlxyXG5cclxuICAgIGlmIChhdmdTY29yZSA+PSA4NSkge1xyXG5cclxuICAgICAgc3VtbWFyeSA9XHJcbiAgICAgICAgXCLmnKzlkajmlbTkvZPlgaXlurfnirbmgIHkvJjnp4DvvIzov5DliqjkuI7nnaHnnKDop4TlvovvvIzlu7rorq7nu6fnu63kv53mjIHoia/lpb3nmoTnlJ/mtLvkuaDmg6/jgIJcIlxyXG5cclxuICAgIH0gZWxzZSBpZiAoYXZnU2NvcmUgPj0gNzApIHtcclxuXHJcbiAgICAgIHN1bW1hcnkgPVxyXG4gICAgICAgIFwi5pys5ZGo5YGl5bq354q25oCB6Imv5aW977yM6YOo5YiG5pel5pyf6L+Q5Yqo6YeP5LiN6Laz77yM5bu66K6u5aKe5Yqg5pel5bi45q2l6KGM5pe26ZW/44CCXCJcclxuXHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgc3VtbWFyeSA9XHJcbiAgICAgICAgXCLmnKzlkajlgaXlurfnirbmgIHkuIDoiKzvvIznnaHnnKDotKjph4/ms6LliqjovoPlpKfvvIzlu7rorq7op4TlvovkvZzmga/vvIzpgILlvZPlop7liqDov5DliqjjgIJcIlxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjYWxsYmFjaykge1xyXG5cclxuICAgICAgY2FsbGJhY2soe1xyXG5cclxuICAgICAgICBhdmdIZWFydFJhdGU6IGF2Z0hyLFxyXG5cclxuICAgICAgICB0b3RhbFN0ZXBzOiB0b3RhbFN0ZXBzLFxyXG5cclxuICAgICAgICBhdmdIZWFsdGhTY29yZTogYXZnU2NvcmUsXHJcblxyXG4gICAgICAgIGRheUNvdW50OiBoZWFsdGhIaXN0b3J5Lmxlbmd0aCxcclxuXHJcbiAgICAgICAgc3VtbWFyeTogc3VtbWFyeVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufSIsIl9fd2VicGFja19yZXF1aXJlX18ucnYgPSAoKSA9PiAoXCIxLjcuMTJcIikiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLnJ1aWQgPSBcImJ1bmRsZXI9cnNwYWNrQDEuNy4xMlwiOyIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cInBhZ2VcIj5cbiAgICA8dGV4dCBjbGFzcz1cInRpdGxlXCI+XG4gICAgICBBSeWBpeW6t+mZquS8tOaJi+ihqFxuICAgIDwvdGV4dD5cblxuICAgIDxkaXYgY2xhc3M9XCJkYXRhLWNhcmRcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwibGFiZWwtdGV4dFwiPlxuICAgICAgICDinaTvuI8g5b+D546HXG4gICAgICA8L3RleHQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiZGF0YS1yaWdodFwiPlxuICAgICAgICA8dGV4dCBjbGFzcz1cImRhdGEtdGV4dFwiPlxuICAgICAgICAgIHt7aGVhcnRSYXRlfX0gPHRleHQgY2xhc3M9XCJkYXRhLXVuaXRcIj5icG08L3RleHQ+XG4gICAgICAgIDwvdGV4dD5cbiAgICAgICAgPHRleHQgY2xhc3M9XCJzdGF0dXMtdGFnIHt7aGVhcnRTdGF0dXN9fVwiPlxuICAgICAgICAgIHt7aGVhcnRTdGF0dXNUZXh0fX1cbiAgICAgICAgPC90ZXh0PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiZGF0YS1jYXJkXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cImxhYmVsLXRleHRcIj5cbiAgICAgICAg8J+atiDmraXmlbBcbiAgICAgIDwvdGV4dD5cbiAgICAgIDx0ZXh0IGNsYXNzPVwiZGF0YS10ZXh0XCI+XG4gICAgICAgIHt7c3RlcHN9fSA8dGV4dCBjbGFzcz1cImRhdGEtdW5pdFwiPuatpTwvdGV4dD5cbiAgICAgIDwvdGV4dD5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJkYXRhLWNhcmRcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwibGFiZWwtdGV4dFwiPlxuICAgICAgICDwn5i0IOedoeecoFxuICAgICAgPC90ZXh0PlxuICAgICAgPHRleHQgY2xhc3M9XCJkYXRhLXRleHRcIj5cbiAgICAgICAge3tzbGVlcER1cmF0aW9ufX0gPHRleHQgY2xhc3M9XCJkYXRhLXVuaXRcIj7lsI/ml7Y8L3RleHQ+XG4gICAgICA8L3RleHQ+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiZGF0YS1jYXJkXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cImxhYmVsLXRleHRcIj5cbiAgICAgICAg8J+PgyDnirbmgIFcbiAgICAgIDwvdGV4dD5cbiAgICAgIDx0ZXh0IGNsYXNzPVwiZGF0YS10ZXh0XCI+XG4gICAgICAgIHt7c3BvcnRJbnRlbnNpdHl9fVxuICAgICAgPC90ZXh0PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImFpLWNhcmRcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwiYWktbGFiZWxcIj5cbiAgICAgICAg8J+SoSBBSSDlgaXlurflu7rorq5cbiAgICAgIDwvdGV4dD5cbiAgICAgIDx0ZXh0IGNsYXNzPVwiYWktdGV4dFwiPlxuICAgICAgICB7e2FpU3VnZ2VzdGlvbn19XG4gICAgICA8L3RleHQ+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uLWNhcmQgZGV0YWlsLWJ0blwiIEBjbGljaz1cImdvRGV0YWlsXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cImJ1dHRvbi10ZXh0XCI+XG4gICAgICAgIOafpeivouWBpeW6t+ivpuaDhVxuICAgICAgPC90ZXh0PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1jYXJkIHJlcG9ydC1idG5cIiBAY2xpY2s9XCJnb1JlcG9ydFwiPlxuICAgICAgPHRleHQgY2xhc3M9XCJidXR0b24tdGV4dFwiPlxuICAgICAgICDmn6XnnIvlgaXlurfmiqXlkYpcbiAgICAgIDwvdGV4dD5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJidXR0b24tY2FyZCByZWZyZXNoLWJ0blwiIEBjbGljaz1cInJlZnJlc2hEYXRhXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cImJ1dHRvbi10ZXh0XCI+XG4gICAgICAgIOaJi+WKqOWIt+aWsOWBpeW6t+aVsOaNrlxuICAgICAgPC90ZXh0PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1jYXJkIGFib3V0LWJ0blwiIEBjbGljaz1cImdvQWJvdXRcIj5cbiAgICAgIDx0ZXh0IGNsYXNzPVwiYnV0dG9uLXRleHRcIj7lhbPkuo7lupTnlKg8L3RleHQ+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBoZWFsdGhNb2NrIGZyb20gXCIuLi8uLi9jb21tb24vaGVhbHRoLmpzXCJcbmltcG9ydCByb3V0ZXIgZnJvbSAnQHN5c3RlbS5yb3V0ZXInXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YToge1xuICAgIGhlYXJ0UmF0ZTogMCxcbiAgICBzdGVwczogMCxcbiAgICBzbGVlcER1cmF0aW9uOiAwLFxuICAgIHNsZWVwUXVhbGl0eTogMCxcbiAgICBzcG9ydEludGVuc2l0eTogXCJcIixcbiAgICBmYXRpZ3VlVGlwOiBcIlwiLFxuICAgIGhlYWx0aFNjb3JlOiAwLFxuICAgIGFpU3VnZ2VzdGlvbjogXCLmraPlnKjliIbmnpDlgaXlurfnirbmgIFcIixcbiAgICBoZWFydFRpbWVyOiBudWxsLFxuICAgIGJhc2VIZWFydFJhdGU6IDBcbiAgfSxcblxuICBjb21wdXRlZDoge1xuICAgIGhlYXJ0U3RhdHVzKCkge1xuICAgICAgaWYgKHRoaXMuaGVhcnRSYXRlIDwgNjApIHJldHVybiAnc2xvdydcbiAgICAgIGlmICh0aGlzLmhlYXJ0UmF0ZSA+IDEwMCkgcmV0dXJuICdmYXN0J1xuICAgICAgcmV0dXJuICdub3JtYWwnXG4gICAgfSxcbiAgICBoZWFydFN0YXR1c1RleHQoKSB7XG4gICAgICBpZiAodGhpcy5oZWFydFJhdGUgPCA2MCkgcmV0dXJuICflgY/mhaInXG4gICAgICBpZiAodGhpcy5oZWFydFJhdGUgPiAxMDApIHJldHVybiAn5YGP5b+rJ1xuICAgICAgcmV0dXJuICfmraPluLgnXG4gICAgfVxuICB9LFxuXG4gIG9uSW5pdCgpe1xuICAgIGhlYWx0aE1vY2suaW5pdEFwcCgoZGF0YSk9PntcbiAgICAgIHRoaXMuaGVhcnRSYXRlID0gZGF0YS5oZWFydFJhdGVcbiAgICAgIHRoaXMuYmFzZUhlYXJ0UmF0ZSA9IGRhdGEuaGVhcnRSYXRlXG4gICAgICB0aGlzLnN0ZXBzID0gZGF0YS5zdGVwc1xuICAgICAgdGhpcy5zbGVlcER1cmF0aW9uID0gZGF0YS5zbGVlcER1cmF0aW9uXG4gICAgICB0aGlzLnNsZWVwUXVhbGl0eSA9IGRhdGEuc2xlZXBRdWFsaXR5XG4gICAgICB0aGlzLnNwb3J0SW50ZW5zaXR5ID0gZGF0YS5zcG9ydEludGVuc2l0eVxuICAgICAgdGhpcy5mYXRpZ3VlVGlwID0gZGF0YS5mYXRpZ3VlVGlwXG4gICAgICB0aGlzLmhlYWx0aFNjb3JlID0gZGF0YS5oZWFsdGhTY29yZVxuICAgICAgdGhpcy5haVN1Z2dlc3Rpb24gPSBkYXRhLmFpU3VnZ2VzdGlvblxuICAgICAgdGhpcy5zdGFydEhlYXJ0QmVhdCgpXG4gICAgfSlcbiAgfSxcblxuICBvbkRlc3Ryb3koKXtcbiAgICBpZih0aGlzLmhlYXJ0VGltZXIpe1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmhlYXJ0VGltZXIpXG4gICAgfVxuICB9LFxuXG4gIHN0YXJ0SGVhcnRCZWF0KCl7XG4gICAgaWYodGhpcy5oZWFydFRpbWVyKXtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5oZWFydFRpbWVyKVxuICAgIH1cbiAgICB0aGlzLmhlYXJ0VGltZXIgPSBzZXRJbnRlcnZhbCgoKT0+e1xuICAgICAgbGV0IG9mZnNldCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDcpIC0gM1xuICAgICAgbGV0IG5ld1JhdGUgPSB0aGlzLmJhc2VIZWFydFJhdGUgKyBvZmZzZXRcbiAgICAgIGlmKG5ld1JhdGUgPCA2MCkgbmV3UmF0ZSA9IDYwXG4gICAgICBpZihuZXdSYXRlID4gMTAwKSBuZXdSYXRlID0gMTAwXG4gICAgICB0aGlzLmhlYXJ0UmF0ZSA9IG5ld1JhdGVcbiAgICB9LCAyMDAwKVxuICB9LFxuXG4gIHJlZnJlc2hEYXRhKCl7XG4gICAgaGVhbHRoTW9jay51cGRhdGVEYXRhKChkYXRhKT0+e1xuICAgICAgdGhpcy5zdGVwcyA9IGRhdGEuc3RlcHNcbiAgICAgIHRoaXMuc2xlZXBEdXJhdGlvbiA9IGRhdGEuc2xlZXBEdXJhdGlvblxuICAgICAgdGhpcy5zbGVlcFF1YWxpdHkgPSBkYXRhLnNsZWVwUXVhbGl0eVxuICAgICAgdGhpcy5zcG9ydEludGVuc2l0eSA9IGRhdGEuc3BvcnRJbnRlbnNpdHlcbiAgICAgIHRoaXMuZmF0aWd1ZVRpcCA9IGRhdGEuZmF0aWd1ZVRpcFxuICAgICAgdGhpcy5oZWFsdGhTY29yZSA9IGRhdGEuaGVhbHRoU2NvcmVcbiAgICAgIHRoaXMuYWlTdWdnZXN0aW9uID0gZGF0YS5haVN1Z2dlc3Rpb25cbiAgICAgIC8vIOWIt+aWsOWQjOatpeabtOaWsOW/g+eOh+WfuuWHhuWAvFxuICAgICAgdGhpcy5iYXNlSGVhcnRSYXRlID0gZGF0YS5oZWFydFJhdGVcbiAgICAgIHRoaXMuaGVhcnRSYXRlID0gZGF0YS5oZWFydFJhdGVcbiAgICB9KVxuICB9LFxuXG4gIGdvRGV0YWlsKCl7XG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICBoZWFydFJhdGU6dGhpcy5oZWFydFJhdGUsXG4gICAgICBzdGVwczp0aGlzLnN0ZXBzLFxuICAgICAgc2xlZXBEdXJhdGlvbjogdGhpcy5zbGVlcER1cmF0aW9uLFxuICAgICAgc2xlZXBRdWFsaXR5OiB0aGlzLnNsZWVwUXVhbGl0eSxcbiAgICAgIHNwb3J0SW50ZW5zaXR5OiB0aGlzLnNwb3J0SW50ZW5zaXR5LFxuICAgICAgZmF0aWd1ZVRpcDogdGhpcy5mYXRpZ3VlVGlwLFxuICAgICAgaGVhbHRoU2NvcmU6dGhpcy5oZWFsdGhTY29yZSxcbiAgICAgIGFpU3VnZ2VzdGlvbjp0aGlzLmFpU3VnZ2VzdGlvblxuICAgIH1cbiAgICByb3V0ZXIucHVzaCh7XG4gICAgICB1cmk6XCIvcGFnZXMvZGV0YWlsXCIsXG4gICAgICBwYXJhbXM6IHsgaGVhbHRoRGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSkgfVxuICAgIH0pXG4gIH0sXG5cbiAgZ29SZXBvcnQoKXtcbiAgICByb3V0ZXIucHVzaCh7IHVyaTpcIi9wYWdlcy9yZXBvcnRcIiB9KVxuICB9LFxuXG4gIGdvQWJvdXQoKSB7XG4gICAgcm91dGVyLnB1c2goeyB1cmk6IFwiL3BhZ2VzL2Fib3V0XCIgfSlcbiAgfVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbi5wYWdlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDAwMDtcbiAgcGFkZGluZy1sZWZ0OiA1MGNhcDtcbiAgcGFkZGluZy1yaWdodDogNTBjYXA7XG4gIHBhZGRpbmctdG9wOiAxMnB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTJweDtcbn1cblxuLnRpdGxlIHtcbiAgZm9udC1zaXplOiAyMnB4O1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uZGF0YS1jYXJkIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNTBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFhMWExYTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmctbGVmdDogMTBweDtcbiAgcGFkZGluZy1yaWdodDogMTBweDtcbn1cblxuLmxhYmVsLXRleHQge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiAjOWNhM2FmO1xuICBmb250LXdlaWdodDogNDAwO1xufVxuXG4uZGF0YS1yaWdodCB7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5kYXRhLXRleHQge1xuICBmb250LXNpemU6IDE2cHg7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG4uZGF0YS11bml0IHtcbiAgZm9udC1zaXplOiAxMHB4O1xuICBjb2xvcjogIzZiNzI4MDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgbWFyZ2luLWxlZnQ6IDJweDtcbn1cblxuLnN0YXR1cy10YWcge1xuICBmb250LXNpemU6IDEwcHg7XG4gIHBhZGRpbmc6IDJweCA2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgbWFyZ2luLWxlZnQ6IDZweDtcbn1cblxuLnN0YXR1cy10YWcubm9ybWFsIHtcbiAgY29sb3I6ICMyMmM1NWU7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMzQsIDE5NywgOTQsIDAuMTUpO1xufVxuXG4uc3RhdHVzLXRhZy5mYXN0IHtcbiAgY29sb3I6ICNlZjQ0NDQ7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjM5LCA2OCwgNjgsIDAuMTUpO1xufVxuXG4uc3RhdHVzLXRhZy5zbG93IHtcbiAgY29sb3I6ICMzYjgyZjY7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNTksIDEzMCwgMjQ2LCAwLjE1KTtcbn1cblxuLmFpLWNhcmQge1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBmMmIxYTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgbWFyZ2luLXRvcDogMnB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIHBhZGRpbmc6IDEwcHggMTJweDtcbn1cblxuLmFpLWxhYmVsIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogIzg4ZDhhODtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xufVxuXG4uYWktdGV4dCB7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGxpbmUtaGVpZ2h0OiAxNnB4O1xufVxuXG4uYnV0dG9uLWNhcmQge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA0MHB4O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogN3B4O1xufVxuXG4uYnV0dG9uLXRleHQge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4uZGV0YWlsLWJ0biB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNlZjQ0NDQsICNkYzI2MjYpO1xuICBtYXJnaW4tdG9wOiA0cHg7XG59XG5cbi5yZXBvcnQtYnRuIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2Y5NzMxNiwgI2VhNTgwYyk7XG59XG5cbi5yZWZyZXNoLWJ0biB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMyMmM1NWUsICMxNmEzNGEpO1xufVxuXG4uYWJvdXQtYnRuIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzUyNTI1YiwgIzNmM2Y0Nik7XG4gIG1hcmdpbi10b3A6IDRweDtcbn1cblxuXG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9zeXN0ZW0iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiJGFwcF9yZXF1aXJlJCIsImUiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsImhlYWx0aERhdGEiLCJoZWFydFJhdGUiLCJzdGVwcyIsImhlYWx0aFNjb3JlIiwiYWlTdWdnZXN0aW9uIiwic2xlZXBEdXJhdGlvbiIsInNsZWVwUXVhbGl0eSIsInNwb3J0SW50ZW5zaXR5IiwiZmF0aWd1ZVRpcCIsImhlYWx0aEhpc3RvcnkiLCJjcmVhdGVEYXRhIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicGFyc2VGbG9hdCIsInRvRml4ZWQiLCJzY29yZSIsInN1Z2dlc3Rpb24iLCJzYXZlRGF0YSIsImRhdGEiLCJzdG9yYWdlIiwic2V0Iiwia2V5IiwidmFsdWUiLCJKU09OIiwic3RyaW5naWZ5IiwiU3RyaW5nIiwiY3JlYXRlSGlzdG9yeSIsImhpc3RvcnkiLCJpIiwicHVzaCIsImRheSIsIl9kZWZhdWx0IiwiZXhwb3J0cyIsImluaXRBcHAiLCJjYWxsYmFjayIsImdldCIsInN1Y2Nlc3MiLCJwYXJzZSIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsImZhaWwiLCJ1cGRhdGVEYXRhIiwiZ2V0RGF0YSIsImdldFdlZWtSZXBvcnQiLCJ0b3RhbEhyIiwidG90YWxTdGVwcyIsInRvdGFsU2NvcmUiLCJsZW5ndGgiLCJhdmdIciIsInJvdW5kIiwiYXZnU2NvcmUiLCJzdW1tYXJ5IiwiYXZnSGVhcnRSYXRlIiwiYXZnSGVhbHRoU2NvcmUiLCJkYXlDb3VudCIsIl9fd2VicGFja19yZXF1aXJlX18iLCJfaGVhbHRoIiwicmVxdWlyZSIsImhlYXJ0VGltZXIiLCJiYXNlSGVhcnRSYXRlIiwiY29tcHV0ZWQiLCJoZWFydFN0YXR1cyIsImhlYXJ0U3RhdHVzVGV4dCIsIm9uSW5pdCIsImhlYWx0aE1vY2siLCJzdGFydEhlYXJ0QmVhdCIsIm9uRGVzdHJveSIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsIm9mZnNldCIsIm5ld1JhdGUiLCJyZWZyZXNoRGF0YSIsImdvRGV0YWlsIiwicm91dGVyIiwidXJpIiwicGFyYW1zIiwiZ29SZXBvcnQiLCJnb0Fib3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozt3QkFBQSxJQUFBQSxVQUFBQyx1QkFBQUMsZUFBQTt3QkFBcUMsU0FBQUQsdUJBQUFFLENBQUE7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