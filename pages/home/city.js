// pages/home/city.js
var city = require('../../utils/city')
var lineHeight = 0;
var endWords = "";
var isNum;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
  },

  // 触发全部开始选择
  chStart: function () {
    this.setData({
      trans: ".3",
      hidden: false
    })
  },

  // 触发结束选择
  chEnd: function () {
    this.setData({
      trans: "0",
      hidden: true,
      scrollTopId: this.endWords
    })
  },

  // 获取文字信息
  getWords: function (e) {
    var id = e.target.id;
    this.endWords = id;
    isNum = id;
    this.setData({
      showwords: this.endWords
    })
  },

  // 设置文字信息
  setWords: function (e) {
    var id = e.target.id;
    this.setData({
      scrollTopId: id
    })
  },
 
  // 滑动选择城市
  chMove: function (e) {
    var y = e.touches[0].clientY;
    var offsettop = e.currentTarget.offsetTop;
    var height = 0;
    var that = this;
    var cityarr = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]
    // 获取y轴最大值
    wx.getSystemInfo({
      success: function (res) {
        height = res.windowHeight - 10;
      }
    });
 
    // 判断选择区域,只有在选择区才会生效
    if (y > offsettop && y < height) {
      // console.log((y-offsettop)/lineHeight)
      var num = parseInt((y - offsettop) / lineHeight);
      endWords = cityarr[num];
      // 这里 把endWords 绑定到this 上，是为了手指离开事件获取值
      that.endWords = endWords;
    };
 
    // 去除重复，为了防止每次移动都赋值 ,这里限制值有变化后才会有赋值操作，
    // DOTO 这里暂时还有问题，还是比较卡，待优化
    if (isNum != num) {
      // console.log(isNum);
      isNum = num;
      that.setData({
        showwords: that.endWords
      })
    }
  },

  // 选择城市，并让选中的值显示在文本框里
  bindCity: function (e) {
    var cityName = e.currentTarget.dataset.city;
    wx.setStorageSync('city', cityName)

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    // 直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      city: cityName
    })
    
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 城市数据
    var cityChild = city.City[0];
    // console.log(cityChild)
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        lineHeight = (res.windowHeight - 100) / 22;
        that.setData({
          cityList: cityChild,
          winHeight: res.windowHeight - 40,
          lineHeight: lineHeight
        })
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