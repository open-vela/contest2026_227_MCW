import storage from '@system.storage'

let healthData = {
  heartRate: 0,
  steps: 0,
  healthScore: 0,
  aiSuggestion: "",
  sleepDuration: 0,
  sleepQuality: 0,
  sportIntensity: "",
  fatigueTip: ""
}

let healthHistory = []

function createData() {
  let heartRate = Math.floor(Math.random() * 30 + 60)
  let steps = Math.floor(Math.random() * 5000 + 2000)

  let sleepDuration =
    parseFloat((Math.random() * 4 + 5).toFixed(1))

  let sleepQuality = 55

  if (sleepDuration >= 7 && sleepDuration <= 8) {
    sleepQuality = 90
  } else if (sleepDuration >= 6) {
    sleepQuality = 75
  }

  let score = 70

  if (heartRate >= 60 && heartRate <= 100) {
    score += 10
  }

  if (heartRate > 100) {
    score -= 10
  }

  if (steps > 5000) {
    score += 10
  }

  if (sleepQuality >= 80) {
    score += 10
  } else if (sleepQuality < 60) {
    score -= 5
  }

  if (score > 100) {
    score = 100
  }

  if (score < 0) {
    score = 0
  }

  let sportIntensity = ""

  if (heartRate < 75 && steps < 1000) {
    sportIntensity = "静息状态"
  } else if (heartRate < 90 && steps < 3000) {
    sportIntensity = "轻度活动"
  } else if (heartRate < 110 && steps < 6000) {
    sportIntensity = "中度运动"
  } else {
    sportIntensity = "高强度运动"
  }

  let fatigueTip = ""

  if (heartRate > 110 && steps > 5000) {
    fatigueTip = "运动量较大，建议补充水分"
  } else if (heartRate > 100) {
    fatigueTip = "心率偏高，注意调整呼吸"
  } else if (steps < 2000) {
    fatigueTip = "活动量不足，建议起身活动"
  } else {
    fatigueTip = "运动平稳，保持当前节奏"
  }

  let suggestion =
    score >= 85
      ? "今日状态良好，继续保持运动"
      : "建议增加运动，注意休息"

  return {
    heartRate: heartRate,
    steps: steps,
    healthScore: score,
    aiSuggestion: suggestion,
    sleepDuration: sleepDuration,
    sleepQuality: sleepQuality,
    sportIntensity: sportIntensity,
    fatigueTip: fatigueTip
  }
}

function saveData(data) {
  healthData = data

  storage.set({
    key: "todayHealthData",
    value: JSON.stringify(data)
  })

  storage.set({
    key: "heartRate",
    value: String(data.heartRate)
  })

  storage.set({
    key: "steps",
    value: String(data.steps)
  })

  storage.set({
    key: "healthScore",
    value: String(data.healthScore)
  })

  storage.set({
    key: "aiSuggestion",
    value: data.aiSuggestion
  })

  storage.set({
    key: "sleepDuration",
    value: String(data.sleepDuration)
  })

  storage.set({
    key: "sleepQuality",
    value: String(data.sleepQuality)
  })

  storage.set({
    key: "sportIntensity",
    value: data.sportIntensity
  })

  storage.set({
    key: "fatigueTip",
    value: data.fatigueTip
  })
}

function createHistory() {
  let history = []

  for (let i = 6; i >= 0; i--) {
    let data = createData()

    history.push({
      day: "第" + (7 - i) + "天",
      heartRate: data.heartRate,
      steps: data.steps,
      sleepDuration: data.sleepDuration,
      healthScore: data.healthScore
    })
  }

  return history
}

export default {

  initApp(callback) {

    storage.get({
      key: "todayHealthData",

      success: (value) => {

        if (value) {

          try {

            let data = JSON.parse(value)

            if (data && data.heartRate > 0) {

              healthData = data

              console.log(
                "读取已有健康数据:",
                JSON.stringify(data)
              )

              if (callback) {
                callback(data)
              }

              return
            }

          } catch (e) {

            console.error(
              "读取健康数据失败:",
              JSON.stringify(e)
            )

          }
        }

        console.log("没有有效数据，生成新的健康数据")

        let data = createData()

        saveData(data)

        if (callback) {
          callback(data)
        }
      },

      fail: () => {

        console.log("读取健康数据失败，重新生成")

        let data = createData()

        saveData(data)

        if (callback) {
          callback(data)
        }
      }
    })
  },

  updateData(callback) {

    console.log("========== 开始刷新健康数据 ==========")

    let data = createData()

    saveData(data)

    console.log(
      "新的健康数据:",
      JSON.stringify(data)
    )

    if (callback) {
      callback(data)
    }
  },

  getData() {
    return healthData
  },

  getWeekReport(callback) {

    healthHistory = createHistory()

    let totalHr = 0
    let totalSteps = 0
    let totalScore = 0

    for (let i = 0; i < healthHistory.length; i++) {

      totalHr += healthHistory[i].heartRate
      totalSteps += healthHistory[i].steps
      totalScore += healthHistory[i].healthScore
    }

    let avgHr =
      Math.round(totalHr / healthHistory.length)

    let avgScore =
      Math.round(totalScore / healthHistory.length)

    let summary = ""

    if (avgScore >= 85) {

      summary =
        "本周整体健康状态优秀，运动与睡眠规律，建议继续保持良好的生活习惯。"

    } else if (avgScore >= 70) {

      summary =
        "本周健康状态良好，部分日期运动量不足，建议增加日常步行时长。"

    } else {

      summary =
        "本周健康状态一般，睡眠质量波动较大，建议规律作息，适当增加运动。"
    }

    if (callback) {

      callback({

        avgHeartRate: avgHr,

        totalSteps: totalSteps,

        avgHealthScore: avgScore,

        dayCount: healthHistory.length,

        summary: summary
      })
    }
  }
}