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
                                alignItems: "center",
                                paddingTop: "10px",
                                paddingBottom: "10px"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "info-title"
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
                                    "heart-data-row"
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
                                    "score-row"
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
                                    "info-data"
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
                                    "data-unit"
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
                                    "score-tag"
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
                                    "score-tag"
                                ],
                                [
                                    0,
                                    "good"
                                ]
                            ],
                            {
                                color: "#f59e0b",
                                backgroundColor: "rgba(245, 158, 11, 0.15)"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "info-desc"
                                ]
                            ],
                            {
                                fontSize: "11px",
                                color: "#6b7280",
                                marginTop: "2px"
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
                                marginTop: "12px",
                                paddingTop: "12px",
                                paddingRight: "12px",
                                paddingBottom: "12px",
                                paddingLeft: "12px",
                                flexDirection: "column",
                                alignItems: "center"
                            }
                        ],
                        [
                            [
                                [
                                    0,
                                    "ai-title"
                                ]
                            ],
                            {
                                fontSize: "13px",
                                color: "#88d8a8",
                                fontWeight: 600
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
                                fontSize: "12px",
                                color: "#ffffff",
                                marginTop: "4px",
                                textAlign: "center",
                                lineHeight: "17px"
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
                                heartRate: 65,
                                steps: 0,
                                sleepDuration: 0,
                                sleepQuality: 0,
                                sportIntensity: "",
                                fatigueTip: "",
                                healthScore: 0,
                                aiSuggestion: "",
                                heartTimer: null
                            },
                            computed: {
                                heartStatus () {
                                    const rate = Number(this.heartRate) || 70;
                                    if (rate < 60) return 'slow';
                                    if (rate > 100) return 'fast';
                                    return 'normal';
                                },
                                heartStatusText () {
                                    const rate = Number(this.heartRate) || 70;
                                    if (rate < 60) return '偏慢';
                                    if (rate > 100) return '偏快';
                                    return '正常';
                                },
                                healthScoreLevel () {
                                    const score = Number(this.healthScore) || 0;
                                    if (score >= 85) return 'excellent';
                                    if (score >= 70) return 'good';
                                    return 'normal';
                                },
                                healthScoreLevelText () {
                                    const score = Number(this.healthScore) || 0;
                                    if (score >= 85) return '优秀';
                                    if (score >= 70) return '良好';
                                    return '一般';
                                }
                            },
                            onInit () {
                                let baseData = null;
                                try {
                                    baseData = _health.default.getCurrentData();
                                } catch (e) {
                                    baseData = null;
                                }
                                if (baseData && baseData.steps && 0 !== baseData.steps) {
                                    this.fillData(baseData);
                                    this.tryUsePageParams();
                                    this.startHeartBeat();
                                } else _health.default.initApp((data)=>{
                                    this.fillData(data);
                                    this.tryUsePageParams();
                                    this.startHeartBeat();
                                });
                            },
                            fillData (data) {
                                this.heartRate = Number(data.heartRate) || 65;
                                this.steps = Number(data.steps) || 0;
                                this.sleepDuration = Number(data.sleepDuration) || 0;
                                this.sleepQuality = Number(data.sleepQuality) || 0;
                                this.sportIntensity = data.sportIntensity || "";
                                this.fatigueTip = data.fatigueTip || "";
                                this.healthScore = Number(data.healthScore) || 0;
                                this.aiSuggestion = data.aiSuggestion || "";
                            },
                            tryUsePageParams () {
                                const paramsData = this.$page.params && this.$page.params.healthData;
                                if (!paramsData) return;
                                try {
                                    const pageData = JSON.parse(paramsData);
                                    const passHeart = Number(pageData.heartRate);
                                    if (!isNaN(passHeart) && passHeart > 50) this.heartRate = passHeart;
                                    const passSteps = Number(pageData.steps);
                                    if (!isNaN(passSteps) && passSteps > 0) this.steps = passSteps;
                                    const passSleep = Number(pageData.sleepDuration);
                                    if (!isNaN(passSleep) && passSleep > 0) this.sleepDuration = passSleep;
                                    if (pageData.sportIntensity && pageData.sportIntensity.length > 0) this.sportIntensity = pageData.sportIntensity;
                                    if (pageData.fatigueTip && pageData.fatigueTip.length > 0) this.fatigueTip = pageData.fatigueTip;
                                    const passScore = Number(pageData.healthScore);
                                    if (!isNaN(passScore) && passScore > 0) this.healthScore = passScore;
                                    if (pageData.aiSuggestion && pageData.aiSuggestion.length > 0) this.aiSuggestion = pageData.aiSuggestion;
                                } catch (e) {
                                    console.log("参数解析失败，使用本地数据");
                                }
                            },
                            onDestroy () {
                                if (this.heartTimer) {
                                    clearInterval(this.heartTimer);
                                    this.heartTimer = null;
                                }
                            },
                            startHeartBeat () {
                                if (this.heartTimer) clearInterval(this.heartTimer);
                                this.heartTimer = setInterval(()=>{
                                    let current = Number(this.heartRate);
                                    if (isNaN(current) || current <= 0) {
                                        this.heartRate = 65;
                                        current = 65;
                                    }
                                    let offset = Math.floor(5 * Math.random()) - 2;
                                    let newRate = current + offset;
                                    if (newRate < 60) newRate = 60;
                                    if (newRate > 100) newRate = 100;
                                    this.heartRate = newRate;
                                }, 2000);
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
                                        value: "健康详情"
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
                                                "info-title"
                                            ],
                                            value: "❤️ 心率监测"
                                        }
                                    }, []),
                                    aiot.__ce__("div", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "heart-data-row"
                                            ]
                                        }
                                    }, [
                                        aiot.__ce__("text", {
                                            __vm__: _vm_,
                                            __opts__: {
                                                classList: [
                                                    "info-data"
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
                                    ]),
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "info-desc"
                                            ],
                                            value: "实时监测中"
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
                                                "info-title"
                                            ],
                                            value: "🚶 运动步数"
                                        }
                                    }, []),
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "info-data"
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
                                    ]),
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "info-desc"
                                            ],
                                            value: "今日累计"
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
                                                "info-title"
                                            ],
                                            value: "😴 睡眠时长"
                                        }
                                    }, []),
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "info-data"
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
                                    ]),
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "info-desc"
                                            ],
                                            value: "昨晚睡眠"
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
                                                "info-title"
                                            ],
                                            value: "🏃 运动强度"
                                        }
                                    }, []),
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "info-data"
                                            ],
                                            value: function() {
                                                return _vm_.sportIntensity;
                                            }
                                        }
                                    }, []),
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "info-desc"
                                            ],
                                            value: function() {
                                                return _vm_.fatigueTip;
                                            }
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
                                                "info-title"
                                            ],
                                            value: "📊 健康评分"
                                        }
                                    }, []),
                                    aiot.__ce__("div", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "score-row"
                                            ]
                                        }
                                    }, [
                                        aiot.__ce__("text", {
                                            __vm__: _vm_,
                                            __opts__: {
                                                classList: [
                                                    "info-data"
                                                ]
                                            }
                                        }, [
                                            aiot.__ce__("span", {
                                                __vm__: _vm_,
                                                __opts__: {
                                                    value: function() {
                                                        return _vm_.healthScore;
                                                    }
                                                }
                                            }),
                                            aiot.__ce__("text", {
                                                __vm__: _vm_,
                                                __opts__: {
                                                    classList: [
                                                        "data-unit"
                                                    ],
                                                    value: "分"
                                                }
                                            }, [])
                                        ]),
                                        aiot.__ce__("text", {
                                            __vm__: _vm_,
                                            __opts__: {
                                                classList: function() {
                                                    const $classValue$ = "score-tag " + _vm_.healthScoreLevel;
                                                    if ('string' == typeof $classValue$) return $classValue$.split(' ').map((item)=>item.trim()).filter(Boolean);
                                                    return $classValue$;
                                                },
                                                value: function() {
                                                    return _vm_.healthScoreLevelText;
                                                }
                                            }
                                        }, [])
                                    ]),
                                    aiot.__ce__("text", {
                                        __vm__: _vm_,
                                        __opts__: {
                                            classList: [
                                                "info-desc"
                                            ],
                                            value: "综合状态评估"
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
                                                "ai-title"
                                            ],
                                            value: "🤖 AI健康建议"
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXNcXGRldGFpbFxcZGV0YWlsLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQUnlpJrkvKDmhJ/ono3lkIjlgaXlurfpmarkvLTmmbrog73miYvooagvc3JjL2NvbW1vbi9oZWFsdGguanMiLCJ3ZWJwYWNrOi8vQUnlpJrkvKDmhJ/ono3lkIjlgaXlurfpmarkvLTmmbrog73miYvooagvd2VicGFjay9ydW50aW1lL3JzcGFja192ZXJzaW9uIiwid2VicGFjazovL0FJ5aSa5Lyg5oSf6J6N5ZCI5YGl5bq36Zmq5Ly05pm66IO95omL6KGoL3dlYnBhY2svcnVudGltZS9yc3BhY2tfdW5pcXVlX2lkIiwid2VicGFjazovL0FJ5aSa5Lyg5oSf6J6N5ZCI5YGl5bq36Zmq5Ly05pm66IO95omL6KGoL3NyYy9wYWdlcy9kZXRhaWwvZGV0YWlsLnV4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdG9yYWdlIGZyb20gJ0BzeXN0ZW0uc3RvcmFnZSdcclxuXHJcbmxldCBoZWFsdGhEYXRhID0ge1xyXG4gIGhlYXJ0UmF0ZTogMCxcclxuICBzdGVwczogMCxcclxuICBoZWFsdGhTY29yZTogMCxcclxuICBhaVN1Z2dlc3Rpb246IFwiXCIsXHJcbiAgc2xlZXBEdXJhdGlvbjogMCxcclxuICBzbGVlcFF1YWxpdHk6IDAsXHJcbiAgc3BvcnRJbnRlbnNpdHk6IFwiXCIsXHJcbiAgZmF0aWd1ZVRpcDogXCJcIlxyXG59XHJcblxyXG5sZXQgaGVhbHRoSGlzdG9yeSA9IFtdXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVEYXRhKCkge1xyXG4gIGxldCBoZWFydFJhdGUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzMCArIDYwKVxyXG4gIGxldCBzdGVwcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUwMDAgKyAyMDAwKVxyXG5cclxuICBsZXQgc2xlZXBEdXJhdGlvbiA9XHJcbiAgICBwYXJzZUZsb2F0KChNYXRoLnJhbmRvbSgpICogNCArIDUpLnRvRml4ZWQoMSkpXHJcblxyXG4gIGxldCBzbGVlcFF1YWxpdHkgPSA1NVxyXG5cclxuICBpZiAoc2xlZXBEdXJhdGlvbiA+PSA3ICYmIHNsZWVwRHVyYXRpb24gPD0gOCkge1xyXG4gICAgc2xlZXBRdWFsaXR5ID0gOTBcclxuICB9IGVsc2UgaWYgKHNsZWVwRHVyYXRpb24gPj0gNikge1xyXG4gICAgc2xlZXBRdWFsaXR5ID0gNzVcclxuICB9XHJcblxyXG4gIGxldCBzY29yZSA9IDcwXHJcblxyXG4gIGlmIChoZWFydFJhdGUgPj0gNjAgJiYgaGVhcnRSYXRlIDw9IDEwMCkge1xyXG4gICAgc2NvcmUgKz0gMTBcclxuICB9XHJcblxyXG4gIGlmIChoZWFydFJhdGUgPiAxMDApIHtcclxuICAgIHNjb3JlIC09IDEwXHJcbiAgfVxyXG5cclxuICBpZiAoc3RlcHMgPiA1MDAwKSB7XHJcbiAgICBzY29yZSArPSAxMFxyXG4gIH1cclxuXHJcbiAgaWYgKHNsZWVwUXVhbGl0eSA+PSA4MCkge1xyXG4gICAgc2NvcmUgKz0gMTBcclxuICB9IGVsc2UgaWYgKHNsZWVwUXVhbGl0eSA8IDYwKSB7XHJcbiAgICBzY29yZSAtPSA1XHJcbiAgfVxyXG5cclxuICBpZiAoc2NvcmUgPiAxMDApIHtcclxuICAgIHNjb3JlID0gMTAwXHJcbiAgfVxyXG5cclxuICBpZiAoc2NvcmUgPCAwKSB7XHJcbiAgICBzY29yZSA9IDBcclxuICB9XHJcblxyXG4gIGxldCBzcG9ydEludGVuc2l0eSA9IFwiXCJcclxuXHJcbiAgaWYgKGhlYXJ0UmF0ZSA8IDc1ICYmIHN0ZXBzIDwgMTAwMCkge1xyXG4gICAgc3BvcnRJbnRlbnNpdHkgPSBcIumdmeaBr+eKtuaAgVwiXHJcbiAgfSBlbHNlIGlmIChoZWFydFJhdGUgPCA5MCAmJiBzdGVwcyA8IDMwMDApIHtcclxuICAgIHNwb3J0SW50ZW5zaXR5ID0gXCLovbvluqbmtLvliqhcIlxyXG4gIH0gZWxzZSBpZiAoaGVhcnRSYXRlIDwgMTEwICYmIHN0ZXBzIDwgNjAwMCkge1xyXG4gICAgc3BvcnRJbnRlbnNpdHkgPSBcIuS4reW6pui/kOWKqFwiXHJcbiAgfSBlbHNlIHtcclxuICAgIHNwb3J0SW50ZW5zaXR5ID0gXCLpq5jlvLrluqbov5DliqhcIlxyXG4gIH1cclxuXHJcbiAgbGV0IGZhdGlndWVUaXAgPSBcIlwiXHJcblxyXG4gIGlmIChoZWFydFJhdGUgPiAxMTAgJiYgc3RlcHMgPiA1MDAwKSB7XHJcbiAgICBmYXRpZ3VlVGlwID0gXCLov5Dliqjph4/ovoPlpKfvvIzlu7rorq7ooaXlhYXmsLTliIZcIlxyXG4gIH0gZWxzZSBpZiAoaGVhcnRSYXRlID4gMTAwKSB7XHJcbiAgICBmYXRpZ3VlVGlwID0gXCLlv4PnjoflgY/pq5jvvIzms6jmhI/osIPmlbTlkbzlkLhcIlxyXG4gIH0gZWxzZSBpZiAoc3RlcHMgPCAyMDAwKSB7XHJcbiAgICBmYXRpZ3VlVGlwID0gXCLmtLvliqjph4/kuI3otrPvvIzlu7rorq7otbfouqvmtLvliqhcIlxyXG4gIH0gZWxzZSB7XHJcbiAgICBmYXRpZ3VlVGlwID0gXCLov5DliqjlubPnqLPvvIzkv53mjIHlvZPliY3oioLlpY9cIlxyXG4gIH1cclxuXHJcbiAgbGV0IHN1Z2dlc3Rpb24gPVxyXG4gICAgc2NvcmUgPj0gODVcclxuICAgICAgPyBcIuS7iuaXpeeKtuaAgeiJr+Wlve+8jOe7p+e7reS/neaMgei/kOWKqFwiXHJcbiAgICAgIDogXCLlu7rorq7lop7liqDov5DliqjvvIzms6jmhI/kvJHmga9cIlxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGVhcnRSYXRlOiBoZWFydFJhdGUsXHJcbiAgICBzdGVwczogc3RlcHMsXHJcbiAgICBoZWFsdGhTY29yZTogc2NvcmUsXHJcbiAgICBhaVN1Z2dlc3Rpb246IHN1Z2dlc3Rpb24sXHJcbiAgICBzbGVlcER1cmF0aW9uOiBzbGVlcER1cmF0aW9uLFxyXG4gICAgc2xlZXBRdWFsaXR5OiBzbGVlcFF1YWxpdHksXHJcbiAgICBzcG9ydEludGVuc2l0eTogc3BvcnRJbnRlbnNpdHksXHJcbiAgICBmYXRpZ3VlVGlwOiBmYXRpZ3VlVGlwXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlRGF0YShkYXRhKSB7XHJcbiAgaGVhbHRoRGF0YSA9IGRhdGFcclxuXHJcbiAgc3RvcmFnZS5zZXQoe1xyXG4gICAga2V5OiBcInRvZGF5SGVhbHRoRGF0YVwiLFxyXG4gICAgdmFsdWU6IEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgfSlcclxuXHJcbiAgc3RvcmFnZS5zZXQoe1xyXG4gICAga2V5OiBcImhlYXJ0UmF0ZVwiLFxyXG4gICAgdmFsdWU6IFN0cmluZyhkYXRhLmhlYXJ0UmF0ZSlcclxuICB9KVxyXG5cclxuICBzdG9yYWdlLnNldCh7XHJcbiAgICBrZXk6IFwic3RlcHNcIixcclxuICAgIHZhbHVlOiBTdHJpbmcoZGF0YS5zdGVwcylcclxuICB9KVxyXG5cclxuICBzdG9yYWdlLnNldCh7XHJcbiAgICBrZXk6IFwiaGVhbHRoU2NvcmVcIixcclxuICAgIHZhbHVlOiBTdHJpbmcoZGF0YS5oZWFsdGhTY29yZSlcclxuICB9KVxyXG5cclxuICBzdG9yYWdlLnNldCh7XHJcbiAgICBrZXk6IFwiYWlTdWdnZXN0aW9uXCIsXHJcbiAgICB2YWx1ZTogZGF0YS5haVN1Z2dlc3Rpb25cclxuICB9KVxyXG5cclxuICBzdG9yYWdlLnNldCh7XHJcbiAgICBrZXk6IFwic2xlZXBEdXJhdGlvblwiLFxyXG4gICAgdmFsdWU6IFN0cmluZyhkYXRhLnNsZWVwRHVyYXRpb24pXHJcbiAgfSlcclxuXHJcbiAgc3RvcmFnZS5zZXQoe1xyXG4gICAga2V5OiBcInNsZWVwUXVhbGl0eVwiLFxyXG4gICAgdmFsdWU6IFN0cmluZyhkYXRhLnNsZWVwUXVhbGl0eSlcclxuICB9KVxyXG5cclxuICBzdG9yYWdlLnNldCh7XHJcbiAgICBrZXk6IFwic3BvcnRJbnRlbnNpdHlcIixcclxuICAgIHZhbHVlOiBkYXRhLnNwb3J0SW50ZW5zaXR5XHJcbiAgfSlcclxuXHJcbiAgc3RvcmFnZS5zZXQoe1xyXG4gICAga2V5OiBcImZhdGlndWVUaXBcIixcclxuICAgIHZhbHVlOiBkYXRhLmZhdGlndWVUaXBcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVIaXN0b3J5KCkge1xyXG4gIGxldCBoaXN0b3J5ID0gW11cclxuXHJcbiAgZm9yIChsZXQgaSA9IDY7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICBsZXQgZGF0YSA9IGNyZWF0ZURhdGEoKVxyXG5cclxuICAgIGhpc3RvcnkucHVzaCh7XHJcbiAgICAgIGRheTogXCLnrKxcIiArICg3IC0gaSkgKyBcIuWkqVwiLFxyXG4gICAgICBoZWFydFJhdGU6IGRhdGEuaGVhcnRSYXRlLFxyXG4gICAgICBzdGVwczogZGF0YS5zdGVwcyxcclxuICAgICAgc2xlZXBEdXJhdGlvbjogZGF0YS5zbGVlcER1cmF0aW9uLFxyXG4gICAgICBoZWFsdGhTY29yZTogZGF0YS5oZWFsdGhTY29yZVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHJldHVybiBoaXN0b3J5XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHJcbiAgaW5pdEFwcChjYWxsYmFjaykge1xyXG5cclxuICAgIHN0b3JhZ2UuZ2V0KHtcclxuICAgICAga2V5OiBcInRvZGF5SGVhbHRoRGF0YVwiLFxyXG5cclxuICAgICAgc3VjY2VzczogKHZhbHVlKSA9PiB7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG5cclxuICAgICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UodmFsdWUpXHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmhlYXJ0UmF0ZSA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgaGVhbHRoRGF0YSA9IGRhdGFcclxuXHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICBcIuivu+WPluW3suacieWBpeW6t+aVsOaNrjpcIixcclxuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgICAgICAgXCLor7vlj5blgaXlurfmlbDmja7lpLHotKU6XCIsXHJcbiAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkoZSlcclxuICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5rKh5pyJ5pyJ5pWI5pWw5o2u77yM55Sf5oiQ5paw55qE5YGl5bq35pWw5o2uXCIpXHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gY3JlYXRlRGF0YSgpXHJcblxyXG4gICAgICAgIHNhdmVEYXRhKGRhdGEpXHJcblxyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgY2FsbGJhY2soZGF0YSlcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBmYWlsOiAoKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6K+75Y+W5YGl5bq35pWw5o2u5aSx6LSl77yM6YeN5paw55Sf5oiQXCIpXHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gY3JlYXRlRGF0YSgpXHJcblxyXG4gICAgICAgIHNhdmVEYXRhKGRhdGEpXHJcblxyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgY2FsbGJhY2soZGF0YSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgdXBkYXRlRGF0YShjYWxsYmFjaykge1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09PSDlvIDlp4vliLfmlrDlgaXlurfmlbDmja4gPT09PT09PT09PVwiKVxyXG5cclxuICAgIGxldCBkYXRhID0gY3JlYXRlRGF0YSgpXHJcblxyXG4gICAgc2F2ZURhdGEoZGF0YSlcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgXCLmlrDnmoTlgaXlurfmlbDmja46XCIsXHJcbiAgICAgIEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICApXHJcblxyXG4gICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgIGNhbGxiYWNrKGRhdGEpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0RGF0YSgpIHtcclxuICAgIHJldHVybiBoZWFsdGhEYXRhXHJcbiAgfSxcclxuXHJcbiAgZ2V0V2Vla1JlcG9ydChjYWxsYmFjaykge1xyXG5cclxuICAgIGhlYWx0aEhpc3RvcnkgPSBjcmVhdGVIaXN0b3J5KClcclxuXHJcbiAgICBsZXQgdG90YWxIciA9IDBcclxuICAgIGxldCB0b3RhbFN0ZXBzID0gMFxyXG4gICAgbGV0IHRvdGFsU2NvcmUgPSAwXHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFsdGhIaXN0b3J5Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICB0b3RhbEhyICs9IGhlYWx0aEhpc3RvcnlbaV0uaGVhcnRSYXRlXHJcbiAgICAgIHRvdGFsU3RlcHMgKz0gaGVhbHRoSGlzdG9yeVtpXS5zdGVwc1xyXG4gICAgICB0b3RhbFNjb3JlICs9IGhlYWx0aEhpc3RvcnlbaV0uaGVhbHRoU2NvcmVcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYXZnSHIgPVxyXG4gICAgICBNYXRoLnJvdW5kKHRvdGFsSHIgLyBoZWFsdGhIaXN0b3J5Lmxlbmd0aClcclxuXHJcbiAgICBsZXQgYXZnU2NvcmUgPVxyXG4gICAgICBNYXRoLnJvdW5kKHRvdGFsU2NvcmUgLyBoZWFsdGhIaXN0b3J5Lmxlbmd0aClcclxuXHJcbiAgICBsZXQgc3VtbWFyeSA9IFwiXCJcclxuXHJcbiAgICBpZiAoYXZnU2NvcmUgPj0gODUpIHtcclxuXHJcbiAgICAgIHN1bW1hcnkgPVxyXG4gICAgICAgIFwi5pys5ZGo5pW05L2T5YGl5bq354q25oCB5LyY56eA77yM6L+Q5Yqo5LiO552h55yg6KeE5b6L77yM5bu66K6u57un57ut5L+d5oyB6Imv5aW955qE55Sf5rS75Lmg5oOv44CCXCJcclxuXHJcbiAgICB9IGVsc2UgaWYgKGF2Z1Njb3JlID49IDcwKSB7XHJcblxyXG4gICAgICBzdW1tYXJ5ID1cclxuICAgICAgICBcIuacrOWRqOWBpeW6t+eKtuaAgeiJr+Wlve+8jOmDqOWIhuaXpeacn+i/kOWKqOmHj+S4jei2s++8jOW7uuiuruWinuWKoOaXpeW4uOatpeihjOaXtumVv+OAglwiXHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIHN1bW1hcnkgPVxyXG4gICAgICAgIFwi5pys5ZGo5YGl5bq354q25oCB5LiA6Iis77yM552h55yg6LSo6YeP5rOi5Yqo6L6D5aSn77yM5bu66K6u6KeE5b6L5L2c5oGv77yM6YCC5b2T5aKe5Yqg6L+Q5Yqo44CCXCJcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2FsbGJhY2spIHtcclxuXHJcbiAgICAgIGNhbGxiYWNrKHtcclxuXHJcbiAgICAgICAgYXZnSGVhcnRSYXRlOiBhdmdIcixcclxuXHJcbiAgICAgICAgdG90YWxTdGVwczogdG90YWxTdGVwcyxcclxuXHJcbiAgICAgICAgYXZnSGVhbHRoU2NvcmU6IGF2Z1Njb3JlLFxyXG5cclxuICAgICAgICBkYXlDb3VudDogaGVhbHRoSGlzdG9yeS5sZW5ndGgsXHJcblxyXG4gICAgICAgIHN1bW1hcnk6IHN1bW1hcnlcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn0iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLnJ2ID0gKCkgPT4gKFwiMS43LjEyXCIpIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5ydWlkID0gXCJidW5kbGVyPXJzcGFja0AxLjcuMTJcIjsiLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJwYWdlXCI+XG4gICAgPHNjcm9sbCBjbGFzcz1cInNjcm9sbC1jb250ZW50XCIgc2Nyb2xsLXk9XCJ0cnVlXCI+XG4gICAgICA8dGV4dCBjbGFzcz1cInRpdGxlXCI+XG4gICAgICAgIOWBpeW6t+ivpuaDhVxuICAgICAgPC90ZXh0PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1jYXJkXCI+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwiaW5mby10aXRsZVwiPlxuICAgICAgICAgIOKdpO+4jyDlv4Pnjofnm5HmtYtcbiAgICAgICAgPC90ZXh0PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhcnQtZGF0YS1yb3dcIj5cbiAgICAgICAgICA8dGV4dCBjbGFzcz1cImluZm8tZGF0YVwiPlxuICAgICAgICAgICAge3toZWFydFJhdGV9fSA8dGV4dCBjbGFzcz1cImRhdGEtdW5pdFwiPmJwbTwvdGV4dD5cbiAgICAgICAgICA8L3RleHQ+XG4gICAgICAgICAgPHRleHQgY2xhc3M9XCJzdGF0dXMtdGFnIHt7aGVhcnRTdGF0dXN9fVwiPlxuICAgICAgICAgICAge3toZWFydFN0YXR1c1RleHR9fVxuICAgICAgICAgIDwvdGV4dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwiaW5mby1kZXNjXCI+XG4gICAgICAgICAg5a6e5pe255uR5rWL5LitXG4gICAgICAgIDwvdGV4dD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1jYXJkXCI+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwiaW5mby10aXRsZVwiPlxuICAgICAgICAgIPCfmrYg6L+Q5Yqo5q2l5pWwXG4gICAgICAgIDwvdGV4dD5cbiAgICAgICAgPHRleHQgY2xhc3M9XCJpbmZvLWRhdGFcIj5cbiAgICAgICAgICB7e3N0ZXBzfX0gPHRleHQgY2xhc3M9XCJkYXRhLXVuaXRcIj7mraU8L3RleHQ+XG4gICAgICAgIDwvdGV4dD5cbiAgICAgICAgPHRleHQgY2xhc3M9XCJpbmZvLWRlc2NcIj5cbiAgICAgICAgICDku4rml6XntK/orqFcbiAgICAgICAgPC90ZXh0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWNhcmRcIj5cbiAgICAgICAgPHRleHQgY2xhc3M9XCJpbmZvLXRpdGxlXCI+XG4gICAgICAgICAg8J+YtCDnnaHnnKDml7bplb9cbiAgICAgICAgPC90ZXh0PlxuICAgICAgICA8dGV4dCBjbGFzcz1cImluZm8tZGF0YVwiPlxuICAgICAgICAgIHt7c2xlZXBEdXJhdGlvbn19IDx0ZXh0IGNsYXNzPVwiZGF0YS11bml0XCI+5bCP5pe2PC90ZXh0PlxuICAgICAgICA8L3RleHQ+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwiaW5mby1kZXNjXCI+XG4gICAgICAgICAg5pio5pma552h55ygXG4gICAgICAgIDwvdGV4dD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1jYXJkXCI+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwiaW5mby10aXRsZVwiPlxuICAgICAgICAgIPCfj4Mg6L+Q5Yqo5by65bqmXG4gICAgICAgIDwvdGV4dD5cbiAgICAgICAgPHRleHQgY2xhc3M9XCJpbmZvLWRhdGFcIj5cbiAgICAgICAgICB7e3Nwb3J0SW50ZW5zaXR5fX1cbiAgICAgICAgPC90ZXh0PlxuICAgICAgICA8dGV4dCBjbGFzcz1cImluZm8tZGVzY1wiPlxuICAgICAgICAgIHt7ZmF0aWd1ZVRpcH19XG4gICAgICAgIDwvdGV4dD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1jYXJkXCI+XG4gICAgICAgIDx0ZXh0IGNsYXNzPVwiaW5mby10aXRsZVwiPlxuICAgICAgICAgIPCfk4og5YGl5bq36K+E5YiGXG4gICAgICAgIDwvdGV4dD5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNjb3JlLXJvd1wiPlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwiaW5mby1kYXRhXCI+XG4gICAgICAgICAgICB7e2hlYWx0aFNjb3JlfX0gPHRleHQgY2xhc3M9XCJkYXRhLXVuaXRcIj7liIY8L3RleHQ+XG4gICAgICAgICAgPC90ZXh0PlxuICAgICAgICAgIDx0ZXh0IGNsYXNzPVwic2NvcmUtdGFnIHt7aGVhbHRoU2NvcmVMZXZlbH19XCI+XG4gICAgICAgICAgICB7e2hlYWx0aFNjb3JlTGV2ZWxUZXh0fX1cbiAgICAgICAgICA8L3RleHQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8dGV4dCBjbGFzcz1cImluZm8tZGVzY1wiPlxuICAgICAgICAgIOe7vOWQiOeKtuaAgeivhOS8sFxuICAgICAgICA8L3RleHQ+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cImFpLWNhcmRcIj5cbiAgICAgICAgPHRleHQgY2xhc3M9XCJhaS10aXRsZVwiPlxuICAgICAgICAgIPCfpJYgQUnlgaXlurflu7rorq5cbiAgICAgICAgPC90ZXh0PlxuICAgICAgICA8dGV4dCBjbGFzcz1cImFpLXRleHRcIj5cbiAgICAgICAgICB7e2FpU3VnZ2VzdGlvbn19XG4gICAgICAgIDwvdGV4dD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiYmFjay1idXR0b25cIiBAY2xpY2s9XCJiYWNrSG9tZVwiPlxuICAgICAgICA8dGV4dCBjbGFzcz1cImJhY2stdGV4dFwiPlxuICAgICAgICAgIOi/lOWbnummlumhtVxuICAgICAgICA8L3RleHQ+XG4gICAgICA8L2Rpdj5cbiAgICA8L3Njcm9sbD5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHJvdXRlciBmcm9tICdAc3lzdGVtLnJvdXRlcidcbmltcG9ydCBoZWFsdGhNb2NrIGZyb20gJy4uLy4uL2NvbW1vbi9oZWFsdGguanMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YToge1xuICAgIGhlYXJ0UmF0ZTogNjUsXG4gICAgc3RlcHM6IDAsXG4gICAgc2xlZXBEdXJhdGlvbjogMCxcbiAgICBzbGVlcFF1YWxpdHk6IDAsXG4gICAgc3BvcnRJbnRlbnNpdHk6IFwiXCIsXG4gICAgZmF0aWd1ZVRpcDogXCJcIixcbiAgICBoZWFsdGhTY29yZTogMCxcbiAgICBhaVN1Z2dlc3Rpb246IFwiXCIsXG4gICAgaGVhcnRUaW1lcjogbnVsbFxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgaGVhcnRTdGF0dXMoKSB7XG4gICAgICBjb25zdCByYXRlID0gTnVtYmVyKHRoaXMuaGVhcnRSYXRlKSB8fCA3MFxuICAgICAgaWYgKHJhdGUgPCA2MCkgcmV0dXJuICdzbG93J1xuICAgICAgaWYgKHJhdGUgPiAxMDApIHJldHVybiAnZmFzdCdcbiAgICAgIHJldHVybiAnbm9ybWFsJ1xuICAgIH0sXG4gICAgaGVhcnRTdGF0dXNUZXh0KCkge1xuICAgICAgY29uc3QgcmF0ZSA9IE51bWJlcih0aGlzLmhlYXJ0UmF0ZSkgfHwgNzBcbiAgICAgIGlmIChyYXRlIDwgNjApIHJldHVybiAn5YGP5oWiJ1xuICAgICAgaWYgKHJhdGUgPiAxMDApIHJldHVybiAn5YGP5b+rJ1xuICAgICAgcmV0dXJuICfmraPluLgnXG4gICAgfSxcbiAgICBoZWFsdGhTY29yZUxldmVsKCkge1xuICAgICAgY29uc3Qgc2NvcmUgPSBOdW1iZXIodGhpcy5oZWFsdGhTY29yZSkgfHwgMFxuICAgICAgaWYgKHNjb3JlID49IDg1KSByZXR1cm4gJ2V4Y2VsbGVudCdcbiAgICAgIGlmIChzY29yZSA+PSA3MCkgcmV0dXJuICdnb29kJ1xuICAgICAgcmV0dXJuICdub3JtYWwnXG4gICAgfSxcbiAgICBoZWFsdGhTY29yZUxldmVsVGV4dCgpIHtcbiAgICAgIGNvbnN0IHNjb3JlID0gTnVtYmVyKHRoaXMuaGVhbHRoU2NvcmUpIHx8IDBcbiAgICAgIGlmIChzY29yZSA+PSA4NSkgcmV0dXJuICfkvJjnp4AnXG4gICAgICBpZiAoc2NvcmUgPj0gNzApIHJldHVybiAn6Imv5aW9J1xuICAgICAgcmV0dXJuICfkuIDoiKwnXG4gICAgfVxuICB9LFxuXG4gIG9uSW5pdCgpIHtcbiAgICAvLyDnrKzkuIDlsYLlhZzlupXvvJrlsJ3or5Xor7vlj5blhajlsYDmlbDmja5cbiAgICBsZXQgYmFzZURhdGEgPSBudWxsXG4gICAgdHJ5IHtcbiAgICAgIGJhc2VEYXRhID0gaGVhbHRoTW9jay5nZXRDdXJyZW50RGF0YSgpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgYmFzZURhdGEgPSBudWxsXG4gICAgfVxuXG4gICAgLy8g5YWo5bGA5pWw5o2u5peg5pWI77yM5YiZ6Ieq5Yqo5Yid5aeL5YyW5LiA5qyh77yM5L+d6K+B5pyJ5pWw5o2u5pi+56S6XG4gICAgaWYgKCFiYXNlRGF0YSB8fCAhYmFzZURhdGEuc3RlcHMgfHwgYmFzZURhdGEuc3RlcHMgPT09IDApIHtcbiAgICAgIGhlYWx0aE1vY2suaW5pdEFwcCgoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLmZpbGxEYXRhKGRhdGEpXG4gICAgICAgIHRoaXMudHJ5VXNlUGFnZVBhcmFtcygpXG4gICAgICAgIHRoaXMuc3RhcnRIZWFydEJlYXQoKVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5maWxsRGF0YShiYXNlRGF0YSlcbiAgICAgIHRoaXMudHJ5VXNlUGFnZVBhcmFtcygpXG4gICAgICB0aGlzLnN0YXJ0SGVhcnRCZWF0KClcbiAgICB9XG4gIH0sXG5cbiAgLy8g57uf5LiA5aGr5YWF5pWw5o2u55qE5pa55rOV77yM6YG/5YWN6YeN5aSN5Luj56CBXG4gIGZpbGxEYXRhKGRhdGEpIHtcbiAgICB0aGlzLmhlYXJ0UmF0ZSA9IE51bWJlcihkYXRhLmhlYXJ0UmF0ZSkgfHwgNjVcbiAgICB0aGlzLnN0ZXBzID0gTnVtYmVyKGRhdGEuc3RlcHMpIHx8IDBcbiAgICB0aGlzLnNsZWVwRHVyYXRpb24gPSBOdW1iZXIoZGF0YS5zbGVlcER1cmF0aW9uKSB8fCAwXG4gICAgdGhpcy5zbGVlcFF1YWxpdHkgPSBOdW1iZXIoZGF0YS5zbGVlcFF1YWxpdHkpIHx8IDBcbiAgICB0aGlzLnNwb3J0SW50ZW5zaXR5ID0gZGF0YS5zcG9ydEludGVuc2l0eSB8fCBcIlwiXG4gICAgdGhpcy5mYXRpZ3VlVGlwID0gZGF0YS5mYXRpZ3VlVGlwIHx8IFwiXCJcbiAgICB0aGlzLmhlYWx0aFNjb3JlID0gTnVtYmVyKGRhdGEuaGVhbHRoU2NvcmUpIHx8IDBcbiAgICB0aGlzLmFpU3VnZ2VzdGlvbiA9IGRhdGEuYWlTdWdnZXN0aW9uIHx8IFwiXCJcbiAgfSxcblxuICAvLyDlsJ3or5Xkvb/nlKjpppbpobXkvKDpgJLnmoTlj4LmlbDvvIzlj6rmnInlkIjms5XlgLzmiY3opobnm5ZcbiAgdHJ5VXNlUGFnZVBhcmFtcygpIHtcbiAgICBjb25zdCBwYXJhbXNEYXRhID0gdGhpcy4kcGFnZS5wYXJhbXMgJiYgdGhpcy4kcGFnZS5wYXJhbXMuaGVhbHRoRGF0YVxuICAgIGlmICghcGFyYW1zRGF0YSkgcmV0dXJuXG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcGFnZURhdGEgPSBKU09OLnBhcnNlKHBhcmFtc0RhdGEpXG5cbiAgICAgIGNvbnN0IHBhc3NIZWFydCA9IE51bWJlcihwYWdlRGF0YS5oZWFydFJhdGUpXG4gICAgICBpZiAoIWlzTmFOKHBhc3NIZWFydCkgJiYgcGFzc0hlYXJ0ID4gNTApIHtcbiAgICAgICAgdGhpcy5oZWFydFJhdGUgPSBwYXNzSGVhcnRcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBhc3NTdGVwcyA9IE51bWJlcihwYWdlRGF0YS5zdGVwcylcbiAgICAgIGlmICghaXNOYU4ocGFzc1N0ZXBzKSAmJiBwYXNzU3RlcHMgPiAwKSB7XG4gICAgICAgIHRoaXMuc3RlcHMgPSBwYXNzU3RlcHNcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBhc3NTbGVlcCA9IE51bWJlcihwYWdlRGF0YS5zbGVlcER1cmF0aW9uKVxuICAgICAgaWYgKCFpc05hTihwYXNzU2xlZXApICYmIHBhc3NTbGVlcCA+IDApIHtcbiAgICAgICAgdGhpcy5zbGVlcER1cmF0aW9uID0gcGFzc1NsZWVwXG4gICAgICB9XG4gICAgICBpZiAocGFnZURhdGEuc3BvcnRJbnRlbnNpdHkgJiYgcGFnZURhdGEuc3BvcnRJbnRlbnNpdHkubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnNwb3J0SW50ZW5zaXR5ID0gcGFnZURhdGEuc3BvcnRJbnRlbnNpdHlcbiAgICAgIH1cbiAgICAgIGlmIChwYWdlRGF0YS5mYXRpZ3VlVGlwICYmIHBhZ2VEYXRhLmZhdGlndWVUaXAubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmZhdGlndWVUaXAgPSBwYWdlRGF0YS5mYXRpZ3VlVGlwXG4gICAgICB9XG4gICAgICBjb25zdCBwYXNzU2NvcmUgPSBOdW1iZXIocGFnZURhdGEuaGVhbHRoU2NvcmUpXG4gICAgICBpZiAoIWlzTmFOKHBhc3NTY29yZSkgJiYgcGFzc1Njb3JlID4gMCkge1xuICAgICAgICB0aGlzLmhlYWx0aFNjb3JlID0gcGFzc1Njb3JlXG4gICAgICB9XG4gICAgICBpZiAocGFnZURhdGEuYWlTdWdnZXN0aW9uICYmIHBhZ2VEYXRhLmFpU3VnZ2VzdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuYWlTdWdnZXN0aW9uID0gcGFnZURhdGEuYWlTdWdnZXN0aW9uXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coXCLlj4LmlbDop6PmnpDlpLHotKXvvIzkvb/nlKjmnKzlnLDmlbDmja5cIilcbiAgICB9XG4gIH0sXG5cbiAgb25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmhlYXJ0VGltZXIpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5oZWFydFRpbWVyKVxuICAgICAgdGhpcy5oZWFydFRpbWVyID0gbnVsbFxuICAgIH1cbiAgfSxcblxuICBzdGFydEhlYXJ0QmVhdCgpIHtcbiAgICBpZiAodGhpcy5oZWFydFRpbWVyKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuaGVhcnRUaW1lcilcbiAgICB9XG4gICAgdGhpcy5oZWFydFRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgbGV0IGN1cnJlbnQgPSBOdW1iZXIodGhpcy5oZWFydFJhdGUpXG4gICAgICBpZiAoaXNOYU4oY3VycmVudCkgfHwgY3VycmVudCA8PSAwKSB7XG4gICAgICAgIHRoaXMuaGVhcnRSYXRlID0gNjVcbiAgICAgICAgY3VycmVudCA9IDY1XG4gICAgICB9XG4gICAgICBsZXQgb2Zmc2V0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSkgLSAyXG4gICAgICBsZXQgbmV3UmF0ZSA9IGN1cnJlbnQgKyBvZmZzZXRcbiAgICAgIGlmIChuZXdSYXRlIDwgNjApIG5ld1JhdGUgPSA2MFxuICAgICAgaWYgKG5ld1JhdGUgPiAxMDApIG5ld1JhdGUgPSAxMDBcbiAgICAgIHRoaXMuaGVhcnRSYXRlID0gbmV3UmF0ZVxuICAgIH0sIDIwMDApXG4gIH0sXG5cbiAgYmFja0hvbWUoKSB7XG4gICAgcm91dGVyLmJhY2soKVxuICB9XG59XG48L3NjcmlwdD5cblxuXG48c3R5bGU+XG4ucGFnZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG4gIHBhZGRpbmctbGVmdDogNTBjYXA7XG4gIHBhZGRpbmctcmlnaHQ6IDUwY2FwO1xufVxuXG4uc2Nyb2xsLWNvbnRlbnQge1xuICB3aWR0aDogMTAwJTtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZy10b3A6IDEycHg7XG4gIHBhZGRpbmctYm90dG9tOiAxNnB4O1xufVxuXG4udGl0bGUge1xuICBmb250LXNpemU6IDIycHg7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uaW5mby1jYXJkIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxYTFhMWE7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmctdG9wOiAxMHB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTBweDtcbn1cblxuLmluZm8tdGl0bGUge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiAjOWNhM2FmO1xufVxuXG4uaGVhcnQtZGF0YS1yb3csXG4uc2NvcmUtcm93IHtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogM3B4O1xufVxuXG4uaW5mby1kYXRhIHtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmRhdGEtdW5pdCB7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgY29sb3I6ICM2YjcyODA7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG59XG5cbi5zdGF0dXMtdGFnLFxuLnNjb3JlLXRhZyB7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgcGFkZGluZzogMnB4IDZweDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBtYXJnaW4tbGVmdDogNnB4O1xufVxuXG4uc3RhdHVzLXRhZy5ub3JtYWwge1xuICBjb2xvcjogIzIyYzU1ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgzNCwgMTk3LCA5NCwgMC4xNSk7XG59XG5cbi5zdGF0dXMtdGFnLmZhc3Qge1xuICBjb2xvcjogI2VmNDQ0NDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMzksIDY4LCA2OCwgMC4xNSk7XG59XG5cbi5zdGF0dXMtdGFnLnNsb3cge1xuICBjb2xvcjogIzNiODJmNjtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg1OSwgMTMwLCAyNDYsIDAuMTUpO1xufVxuXG4uc2NvcmUtdGFnLmdvb2Qge1xuICBjb2xvcjogI2Y1OWUwYjtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNDUsIDE1OCwgMTEsIDAuMTUpO1xufVxuXG4uc3RhdHVzLXRhZy5ub3JtYWwge1xuICBjb2xvcjogIzIyYzU1ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgzNCwgMTk3LCA5NCwgMC4xNSk7XG59XG5cblxuLmluZm8tZGVzYyB7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgY29sb3I6ICM2YjcyODA7XG4gIG1hcmdpbi10b3A6IDJweDtcbn1cblxuLmFpLWNhcmQge1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBmMmIxYTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgbWFyZ2luLXRvcDogMTJweDtcbiAgcGFkZGluZzogMTJweDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmFpLXRpdGxlIHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjb2xvcjogIzg4ZDhhODtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmFpLXRleHQge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBtYXJnaW4tdG9wOiA0cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbGluZS1oZWlnaHQ6IDE3cHg7XG59XG5cbi5iYWNrLWJ1dHRvbiB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDQycHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMzYjgyZjYsICMyNTYzZWIpO1xuICBib3JkZXItcmFkaXVzOiAyMXB4O1xuICBtYXJnaW4tdG9wOiAxNnB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmJhY2stdGV4dCB7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG48L3N0eWxlPlxuXG4iXSwibmFtZXMiOlsiX3N5c3RlbSIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCIkYXBwX3JlcXVpcmUkIiwiZSIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0IiwiaGVhbHRoRGF0YSIsImhlYXJ0UmF0ZSIsInN0ZXBzIiwiaGVhbHRoU2NvcmUiLCJhaVN1Z2dlc3Rpb24iLCJzbGVlcER1cmF0aW9uIiwic2xlZXBRdWFsaXR5Iiwic3BvcnRJbnRlbnNpdHkiLCJmYXRpZ3VlVGlwIiwiaGVhbHRoSGlzdG9yeSIsImNyZWF0ZURhdGEiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsInNjb3JlIiwic3VnZ2VzdGlvbiIsInNhdmVEYXRhIiwiZGF0YSIsInN0b3JhZ2UiLCJzZXQiLCJrZXkiLCJ2YWx1ZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJTdHJpbmciLCJjcmVhdGVIaXN0b3J5IiwiaGlzdG9yeSIsImkiLCJwdXNoIiwiZGF5IiwiX2RlZmF1bHQiLCJleHBvcnRzIiwiaW5pdEFwcCIsImNhbGxiYWNrIiwiZ2V0Iiwic3VjY2VzcyIsInBhcnNlIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiZmFpbCIsInVwZGF0ZURhdGEiLCJnZXREYXRhIiwiZ2V0V2Vla1JlcG9ydCIsInRvdGFsSHIiLCJ0b3RhbFN0ZXBzIiwidG90YWxTY29yZSIsImxlbmd0aCIsImF2Z0hyIiwicm91bmQiLCJhdmdTY29yZSIsInN1bW1hcnkiLCJhdmdIZWFydFJhdGUiLCJhdmdIZWFsdGhTY29yZSIsImRheUNvdW50IiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIl9oZWFsdGgiLCJyZXF1aXJlIiwiaGVhcnRUaW1lciIsImNvbXB1dGVkIiwiaGVhcnRTdGF0dXMiLCJyYXRlIiwiTnVtYmVyIiwiaGVhcnRTdGF0dXNUZXh0IiwiaGVhbHRoU2NvcmVMZXZlbCIsImhlYWx0aFNjb3JlTGV2ZWxUZXh0Iiwib25Jbml0IiwiYmFzZURhdGEiLCJoZWFsdGhNb2NrIiwiZ2V0Q3VycmVudERhdGEiLCJmaWxsRGF0YSIsInRyeVVzZVBhZ2VQYXJhbXMiLCJzdGFydEhlYXJ0QmVhdCIsInBhcmFtc0RhdGEiLCIkcGFnZSIsInBhcmFtcyIsInBhZ2VEYXRhIiwicGFzc0hlYXJ0IiwiaXNOYU4iLCJwYXNzU3RlcHMiLCJwYXNzU2xlZXAiLCJwYXNzU2NvcmUiLCJvbkRlc3Ryb3kiLCJjbGVhckludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjdXJyZW50Iiwib2Zmc2V0IiwibmV3UmF0ZSIsImJhY2tIb21lIiwicm91dGVyIiwiYmFjayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBQUEsSUFBQUEsVUFBQUMsdUJBQUFDLGVBQUE7d0JBQXFDLFNBQUFELHVCQUFBRSxDQUFBOzRCQUFBLE9BQUFBLEtBQUFBLEVBQUFDLFVBQUEsR0FBQUQsSUFBQTtnQ0FBQUUsU0FBQUY7NEJBQUE7d0JBQUE7d0JBRXJDLElBQUlHLGFBQWE7NEJBQ2ZDLFdBQVc7NEJBQ1hDLE9BQU87NEJBQ1BDLGFBQWE7NEJBQ2JDLGNBQWM7NEJBQ2RDLGVBQWU7NEJBQ2ZDLGNBQWM7NEJBQ2RDLGdCQUFnQjs0QkFDaEJDLFlBQVk7d0JBQ2Q7d0JBRUEsSUFBSUMsZ0JBQWdCLEVBQUU7d0JBRXRCLFNBQVNDOzRCQUNQLElBQUlULFlBQVlVLEtBQUtDLEtBQUssQ0FBQ0QsQUFBZ0IsS0FBaEJBLEtBQUtFLE1BQU0sS0FBVTs0QkFDaEQsSUFBSVgsUUFBUVMsS0FBS0MsS0FBSyxDQUFDRCxBQUFnQixPQUFoQkEsS0FBS0UsTUFBTSxLQUFZOzRCQUU5QyxJQUFJUixnQkFDRlMsV0FBVyxBQUFDSCxDQUFBQSxBQUFnQixJQUFoQkEsS0FBS0UsTUFBTSxLQUFTLEdBQUdFLE9BQU8sQ0FBQzs0QkFFN0MsSUFBSVQsZUFBZTs0QkFFbkIsSUFBSUQsaUJBQWlCLEtBQUtBLGlCQUFpQixHQUN6Q0MsZUFBZTtpQ0FDVixJQUFJRCxpQkFBaUIsR0FD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