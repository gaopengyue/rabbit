// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let initData = {
    grade: 1, // 等级
    exp: 0,   // 经验
    lb: 10,   // 萝卜数量
    _openid: wxContext.OPENID
  }
  
  await db.collection('rabbit').add({
    data: initData
  })
  return {
    result: initData,
    openid: wxContext.OPENID,
  }
}