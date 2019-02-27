// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let result;
  await db.collection('rabbit').where({ // 查询RB信息
    _openid: wxContext.OPENID
  }).get().then(res => {
    result = res.data
  })
  return {
    result,
    openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
  }
}