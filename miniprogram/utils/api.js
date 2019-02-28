export default {
  initRB() {  // 初始化
    return wx.cloud.callFunction({
      name: 'initRB'
    })
  },
  fetchRB() { // 获取仙兔数据
    return wx.cloud.callFunction({
      name: 'fetchRB'
    })
  },
  feedRB(_id) {  // 修炼真气
    return wx.cloud.callFunction({
      name: 'feedRB',
      data: { _id }
    })
  },
  upDateGrade(diff, grade, _id) { // 升级
    return wx.cloud.callFunction({
      name: 'upDateGrade',
      data: {
        diff,
        grade,
        _id
      }
    })
  }
  
}