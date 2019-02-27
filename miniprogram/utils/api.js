export default {
  initRB() {
    return wx.cloud.callFunction({
      name: 'initRB'
    })
  },
  fetchRB() {
    return wx.cloud.callFunction({
      name: 'fetchRB'
    })
  },
  
}