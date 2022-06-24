// pages/pweather/index.js
const API = require('../../utils/api')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        threedays: [],
        latitude: "",
        longitude: "",
        markers: [],
        icon:"../../static/images/marker.png",
    },
// 跳转相关界面
doSeach(e){
    if(e.currentTarget.dataset.keyword!=""){
        wx.navigateTo({
          url: '/pages/pweather/map?keyword='+e.currentTarget.dataset.keyword,
        })
    }

},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const that = this;
        // 实时获取当前的经维度
        wx.getLocation({
            type: 'wg84',
            success: (res) => {
                that.setData({
                    longitude: res.longitude,
                    latitude: res.latitude,
                    markers: [{
                        id: '0',
                        latitude: res.latitude,
                        longitude: res.longitude,
                        iconPath: "/static/images/location.png",
                        width: 40,
                        height: 40,
                        callout: {
                            'display': 'ALWAYS',
                            'fontSize': '30rpx',
                            'content': '我在这',
                            'padding': '8rpx',
                            'boxShadow': '0 0 5rpx #333',
                            'borderRadius': '4rpx'
                        }
                    }]
                })
            }
        })
        let data = {
            location: '116.41,39.92'
        };
        API.threeday(data).then((res) => {
           
            that.setData({
                threedays: res.daily,
            })
        }, (err) => {
            console.log(err);
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