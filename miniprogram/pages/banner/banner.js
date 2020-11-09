// pages/banner/banner.js
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgbox:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = Number(options.id)
    var that = this
    db.collection('banners').where({
      "id":id
    }).get().then(res => {
      console.log(res.data);      
      that.data.imgbox.push(res.data[0].img1);
      that.data.imgbox.push(res.data[0].img2);
      that.data.imgbox.push(res.data[0].img3);
      that.data.imgbox.push(res.data[0].img4);
      that.data.imgbox.push(res.data[0].img5);
      that.data.imgbox.push(res.data[0].img6);
      that.data.imgbox.push(res.data[0].img7);
      that.data.imgbox.push(res.data[0].img8);
      that.data.imgbox.push(res.data[0].img9);
      that.data.imgbox.push(res.data[0].img0);
      that.setData({
        imgbox: that.data.imgbox
      });
    }).catch(err => {
      console.log(err); //如果更新数据失败则输出失败信息
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
