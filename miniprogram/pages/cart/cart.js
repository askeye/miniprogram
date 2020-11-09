const db = wx.cloud.database();
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    lists: [],
    goods_id: [],
    get: '请求失败',
    receive_name: '',
    receive_phone: '',
    adress: '',
    nums: [],
    ads: [],
    areaList: {
      province_list: {
        410000: '河南省',
      },
      city_list: {
        410100: '郑州市',
      },
      county_list: {
        410102: '中原区',
        410103: '二七区',
        410104: '管城回族区',
        410105: '金水区',
        410106: '上街区',
        410108: '惠济区',
        410122: '中牟县',
        410181: '巩义市',
        410182: '荥阳市',
        410183: '新密市',
        410184: '新郑市',
        410185: '登封市',
        410190: '高新技术开发区',
        410191: '经济技术开发区',
      }
    },
  },
  submit() {
    var that = this
    if (this.data.receive_phone != '' && this.data.receive_name != '' && this.data.adress != '') {
      Toast.success(`购买成功!测试商品不发货`);
      wx.cloud.callFunction({
        name: 'delall',
        data: {
          user:this.data.user
        }
      }).then(res => {
      }).catch(err => {
      })
      that.getCart()
    } else {
      Toast.fail(`请输入收货信息`);
    }
  },
  down(e) {
    wx: wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  index() {
    wx: wx.reLaunch({
      url: `../index/index`,
    })
  },
  buy() {
    wx: wx.reLaunch({
      url: `../cake/cake`,
    })
  },
  del(e) {
    db.collection('cart').where({
      "good_id": e.currentTarget.dataset.id,
      "user":wx.getStorageSync('user')
    }).remove().then(res => {
      this.getCart()
    })
    this.setData({
      nums:[]
    })
  },
  getCart() {
  //先拿到数据
  this.setData({
    goods_id:[],
    nums:[],
    lists:[]
  })
  db.collection('cart').where({
    "user": wx.getStorageSync('user')
  }).get().then(res => {
    for (let i = 0; i < res.data.length; i++) {
      this.data.goods_id.push(res.data[i].good_id),
      this.data.nums.push(res.data[i].num)
    }
    this.setData({
      goods_id: this.data.goods_id,
      get: '请求成功',
      nums: this.data.nums
    })
    if (this.data.get == '请求成功') {
      for (let k = 0; k < this.data.goods_id.length; k++) {
        db.collection('goods').where({
          "id": this.data.goods_id[k]
        }).get().then(res => {
          this.data.lists.push(...res.data)
          this.data.lists[k].num = this.data.nums[k]
          this.setData({
            lists: this.data.lists
          })
        })
      }
    }
  })
},
  onLoad: function () {
    this.setData({
      user:wx.getStorageSync("user")
    })
    // 购物车为空时，显示的推荐商品
    db.collection('goods').where({
      "other": "give"
    }).get().then(res => {
      this.setData({
        ads: res.data
      })
    })
  },
  
  onChange(e) {
    this.setData({
      receive_name: e.detail
    })
  },
  onTel(e) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (myreg.test(e.detail.value)) {
      this.setData({
        receive_phone: e.detail.value
      })
    } else {
      Toast.fail('请输入正确的手机号');
      this.setData({
        receive_phone: ''
      })
    }
  },
  onAddress(e) {
    if (e.detail != '') {
      this.setData({
        adress: e.detail.value
      })
    }
  },
  onReady: function () {},
  onShow: function () {
    this.getCart();
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})