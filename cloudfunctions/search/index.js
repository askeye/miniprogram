// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}

// getCart() {
//   //先拿到数据
//   this.setData({
//     goods_id:[],
//     nums:[],
//     lists:[]
//   })
//   db.collection('cart').where({
//     "user": wx.getStorageSync('user')
//   }).get().then(res => {
//     for (let i = 0; i < res.data.length; i++) {
//       this.data.goods_id.push(res.data[i].good_id),
//         this.data.nums.push(res.data[i].num)
//     }
//     var that = this
//     that.setData({
//       goods_id: that.data.goods_id,
//       get: '请求成功',
//       nums: that.data.nums
//     })
//     if (that.data.get == '请求成功') {
//       for (let k = 0; k < that.data.goods_id.length; k++) {
//         db.collection('goods').where({
//           "id": that.data.goods_id[k]
//         }).get().then(res => {
//           that.data.lists.push(...res.data)
//           that.data.lists[k]['num'] = this.data.nums[k]
//           that.setData({
//             lists: that.data.lists
//           })
//         })
//       }
//     }
//   }).catch(err => {})
// }