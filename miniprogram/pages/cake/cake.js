// pages/cake/cake.js
const db = wx.cloud.database();
const _ = db.command;
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    to_scroll:'',
    menus: [
      {
        id: 1,
        img: "https://m.ebeecake.com/dist/images/ico_ny.jpg",
        name: "奶油蛋糕",
      },
      {
        id: 2,
        img: "https://m.ebeecake.com/dist/images/ico_qkl.jpg",
        name: "巧克力蛋糕",
      },
      {
        id: 3,
        img: "https://m.ebeecake.com/dist/images/ico_bjl.jpg",
        name: "冰激凌蛋糕",
      },
      {
        id: 4,
        img: "https://m.ebeecake.com/dist/images/ico_zs.jpg",
        name: "芝士蛋糕",
      },
      {
        id: 5,
        img: "https://m.ebeecake.com/dist/images/ico_xwc.jpg",
        name: "咖啡下午茶",
      },
      {
        id: 6,
        img: "https://m.ebeecake.com/dist/images/ico_rq.jpg",
        name: "人气热销",
      },
      {
        id: 7,
        img: "https://m.ebeecake.com/dist/images/ico_hp.jpg",
        name: "生日蛋糕",
      },
      {
        id: 8,
        img: "https://m.ebeecake.com/dist/images/ico_sr.jpg",
        name: "馈赠推荐",
      },
    ],
    show:false,//控制遮罩层
    good:[],//遮罩层上显示的商品信息
    ice:[],
    chocolates:[],
    creams:[],
    ice:[],
    cheese:[],
    tea:[],
  },
  goAnchor(e){
    this.setData({
      to_scroll:`case${e.currentTarget.dataset.id}`
    })
  },
  down(e){
    wx:wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  // 点击商品列表上的+号时，提取对应的数据
  add(e){
    db.collection('goods').where({
      "id":e.currentTarget.dataset.id
    }).get().then(res => {
      console.log(res);
      this.setData({
        show:true,
        good:res.data
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
  // 购物车中某一条商品数量加1
  up(i){
      db.collection('cart').where({
          "good_id":i,
          "user":wx.getStorageSync('user')
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
  add_cart(e){
    console.log(wx.getStorageSync('user'));
    db.collection('cart').where({
      "good_id":e.currentTarget.dataset.id,
      "user":wx.getStorageSync('user')
    }).get().then(res=>{
      console.log(2333,res);
      if(res.data==''){
        this.insert(e.currentTarget.dataset.id);
      }else{
        console.log('走了这里');
        
        this.up(e.currentTarget.dataset.id)
      }
    })
  },
  onClose(){
    this.setData({
      show:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求奶油蛋糕
    db.collection('goods').where({
      "type":"cream"
    }).get().then(res => {
      this.setData({
        creams:res.data
      })
    })
    // 请求巧克力蛋糕
    db.collection('goods').where({
      "type":"chocolates"
    }).get().then(res => {
      this.setData({
        chocolates:res.data
      })
    })
    // 请求冰激凌蛋糕
    db.collection('goods').where({
      "type":"ice"
    }).get().then(res => {
      this.setData({
        ice:res.data
      })
    })
    // 请求芝士蛋糕
    db.collection('goods').where({
      "type":"Cheese"
    }).get().then(res => {
      this.setData({
        cheese:res.data
      })
    })
    // 请求下午茶
    db.collection('goods').where({
      "type":"tea"
    }).get().then(res => {
      this.setData({
        tea:res.data
      })
    })
    // 请求人气热销
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