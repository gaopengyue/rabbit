//app.js
import { getUserInfo } from './utils/utils.js'
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
    // 获取用户基本信息
    getUserInfo().then(res => {
      this.globalData.userInfo = res.userInfo
    })
  }
})
