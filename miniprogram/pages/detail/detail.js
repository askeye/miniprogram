// pages/detail/detail.js
const db = wx.cloud.database();
const _ = db.command;

import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    id:null,
    banner:[],  //存轮播图地址
    title:null,
    price:null,
    zd:0,
    md:0,
    img_box:[],
  },
    // 购物车中某一条商品数量加1
    up(i){
      db.collection('cart').where({
          "good_id":i,
          "user": wx.getStorageSync("user")
      }).update({
        data:{
          "num":_.inc(1)
        }
      }).then(res=>{
        Toast.success('加入成功');
        this.setData({
          show:false
        })
      })
  },
    // 往购物车中插入一条数据
    insert(i){
      db.collection('cart').add({
        data: {
          "user": wx.getStorageSync("user"),
          "good_id": i,
          "num":1
        }
      }).then(res=>{
        Toast.success('加入成功');
        this.setData({
          show:false
        })
      })
    },
    add_cart(e){
      db.collection('cart').where({
        "good_id":e.currentTarget.dataset.id,
        "user": wx.getStorageSync("user")
      }).get().then(res=>{
        console.log(res);
        if(res.data==''){
          this.insert(e.currentTarget.dataset.id);
        }else{
          this.up(e.currentTarget.dataset.id)
        }
      })
    },
    quwei: function (name) {
      wx.setNavigationBarTitle({
        title: name 
      })
    },
  onLoad: function (options) {
    this.setData({
      id:Number(options.id)
    })
    // 请求数据
    db.collection('goods').where({
      "id":this.data.id
    }).get().then(res => {
      var arr = [];
      arr.push(res.data[0].banner1)
      arr.push(res.data[0].banner2)
      arr.push(res.data[0].banner3)
      this.setData({
        title:res.data[0].title,
        banner:arr,
        price:res.data[0].price,
        zd:Number(res.data[0].zd),
        md:Number(res.data[0].md),
      })
      this.quwei(res.data[0].title)
    })
    // 请求详情图
    db.collection('detail').where({
      "goods_id":this.data.id
    }).get().then(res => {
      var arrs=[]
      for(var i=0;i<res.data.length;i++){
        arrs.push(res.data[i].imgurl)
      }
      this.setData({
        img_box:arrs
      })
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