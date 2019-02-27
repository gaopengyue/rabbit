// miniprogram/pages/index/index.js
import { getUserInfo } from '../../utils/utils.js'
import api from '../../utils/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    rabbit: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    if (app.globalData.userInfo) {
      this.setData({ userInfo: app.globalData.userInfo })
      this.fetchRibbit()
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '分享',
      path: '/pages/index/index',
      // imageUrl: '', // 图片长宽比是 5:4
    }
  },
  feed() {
    console.log(11111)
  },
  
  onGetUserInfo(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({ userInfo: e.detail.userInfo })
      this.fetchRibbit()
    }
  },
  fetchRibbit() {
    api.fetchRB().then(res => {
      console.log(res, 111)
      if (res.result.result.length) {
        this.setRB(res.result.result[0])
      } else {
        this.initRibbit()
      }
    })
  },
  initRibbit() {
    api.initRB().then(res => {
      this.setRB(res.result.result)
    })
  },
  setRB(r) {
    let grade = r.grade
    r.needExp = grade * 2 + grade + 12
    this.setData({ rabbit: r }) 
  }
})