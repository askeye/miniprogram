const app = getApp()
const db = wx.cloud.database();

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    banners: [{
        id: 1,
        img: "https://images.ebeecake.com/images/hd/200520/mb.jpg",
      },
      {
        id: 2,
        img: "https://images.ebeecake.com/images/hd/200415/mb.jpg",
      },
      {
        id: 3,
        img: "https://images.ebeecake.com/img/4467.jpg",
      },
      {
        id: 4,
        img: "https://images.ebeecake.com/images/hd/190830/mb.jpg",
      },
      {
        id: 5,
        img: "https://images.ebeecake.com/images/hd/180906/mb.jpg",
      }
    ],
    recommonds: [],
    birs: [],
    foods: [],
  },
  banne(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../banner/banner?id=' + id + '',
    })
  },
  go_food() {
    wx.navigateTo({
      url: '../fdetail/fdetail',
    })
  },
  go_detail(e) {
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      wx.setStorageSync('img',e.detail.userInfo.avatarUrl);
      wx.setStorageSync('name',e.detail.userInfo.nickName);
      this.getInfo();
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  getInfo(){
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              wx.login({
                success: res => {
                  wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx379f7044e1123f2e&secret=90644c0c115c1406cec347f34e895d03&js_code=' + res.code + '&grant_type=authorization_code',
                    success: res => {
                      wx.setStorageSync("user", res.data.openid)
                    }
                  });
                }
              });
            }
          });
        } else {
          that.setData({
            isHide: true
          });
        }
      }
    });
  },
  onLoad: function (options) {
    this.getInfo();
    db.collection('goods').where({
      "other": "recommend"
    }).get().then(res => {
      this.setData({
        recommonds: res.data
      })
    })
    db.collection('goods').where({
      "other": "bir"
    }).get().then(res => {
      this.setData({
        birs: res.data
      })
    })
    db.collection('foods').where({
      "_openid": "ozjeN5QRRv9C54OtId0QABGWSiaI"
    }).get().then(res => {
      this.setData({
        foods: res.data
      })
    })
  },
})
