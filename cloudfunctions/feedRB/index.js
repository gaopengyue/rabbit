// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  await db.collection('rabbit').doc(event._id).update({
    data: {
      exp: _.inc(3),
      lb: _.inc(-1)
    }
  })
  return await db.collection('rabbit').doc(event._id).get()
}