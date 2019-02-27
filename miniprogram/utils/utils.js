export function getUserInfo() {
  return new Promise((resolve, reject) => {
    let res = wx.getStorageSync('userInfo')
    if (res) {
      resolve(res)
      return
    }
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              wx.setStorage({
                key: 'userInfo',
                data: res
              })
              resolve(res.userInfo)
            }
          })
        }
      }
    })
  })
}

export function onGetUserInfo(e) {
  if (e.detail.userInfo) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({ userInfo: e.detail.userInfo })
  }
}
function onGetOpenid() {
  if (app.globalData.openid) {
    wx.navigateTo({ url: '/pages/scheduling/scheduling' })
    return
  }
  //
  let openid;
  try {
    openid = wx.getStorageSync('scheduleOpenId')
  } catch (e) {
    console.log(e)
  }
  if (openid) {
    app.globalData.openid = openid
    wx.navigateTo({ url: '/pages/scheduling/scheduling' })
    return
  }
  // 调用云函数
  wx.showLoading({ title: '稍等哈~', })
  wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: res => {
      wx.hideLoading()
      wx.setStorage({ // openid存在本地
        key: 'scheduleOpenId',
        data: res.result.openid
      })
      app.globalData.openid = res.result.openid
      wx.navigateTo({ url: '/pages/scheduling/scheduling' })
    }
  })
}