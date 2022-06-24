// pages/home/index.js
// 引入高德地图
var amap = require('../../utils/amap-config');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listHeight: '50px',  
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
//   隐藏输入框
  hideInput: function () {
    this.setData({
      inputVal: "",
      listHeight: '50px',
      inputShowed: false
    });
  },
//   清除搜索框内容
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },

  keyword: function(keyword) {
    var that = this
    amap.map.getInputtips({
      keywords: keyword,
      location: that.data.longitude+','+that.data.latitude,
      success: function(data) {
        if (data && data.tips){
          console.log('tips', data)
          that.setData({
            tips: data.tips
          });
        }
      }
    })
  },

  inputTyping: function (e) {
    if (e.detail.value == "") {
      this.setData({
        listHeight: '50px',
        inputVal: ""
      });
    } else {
      this.setData({
        listHeight: '100vh',
        inputVal: e.detail.value
      });
    }
  
    this.keyword(e.detail.value)
  },

  // 跳转到地图导航页面
  goNav: function(e) {
    console.log('e', e.currentTarget.dataset.poilocation)
    if (e.currentTarget.dataset.poilocation != "") {
      // query.POIlongitude = query.poilocation.split(',')[0];
      // query.POIlatitude = query.poilocation.split(',')[1];
   
      // 小程序的导航函数（页面跳转）
      wx.navigateTo({
        url: `/pages/route/walk?poilocation=${e.currentTarget.dataset.poilocation}`,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    that.setData({
      'latitude': wx.getStorageSync('latitude'),
      'longitude': wx.getStorageSync('longitude')
    })

    // 逆地址解析
    amap.map.getRegeo({
      success: function(data) {
        console.log(data)
        data[0].iconPath = "../../static/images/marker.png"
        data[0].height = 30;
        data[0].width = 30;
        that.setData({
          markers: data,
          city: wx.getStorageSync('city')
        })
        //成功回调
      },
      fail: function(info) {
        //失败回调
        console.log(info)
      }
    })
  },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})