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
      grade: _.inc(1),
      exp: event.diff,
      needExp: event.grade * 2 + event.grade + 12
    }
  })
  return await db.collection('rabbit').doc(event._id).get()
}