// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //获取经纬度
    wx.getLocation({
        type: 'gcj02',
        success: (res) => {
            wx.setStorageSync('latitude', res.latitude);
            wx.setStorageSync('longitude', res.longitude);           
        }
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
        // 设置当前城市名
        wx.setStorageSync('city', "成都市")
  },
  globalData: {
    userInfo: null
  }
})
