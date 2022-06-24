// pages/pweather/map.js
// 引入高德地图
const amap = require("../../utils/amap-config")
var markersData = [];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        markers: "",
        longitude: 116.407387,
        latitude: 39.904179,
    },
    // 展示第一个点的文字信息
    showMarkerInfo(data, i) {
        var that = this;
        that.setData({
            textData: {
                name: data[i].name,
                address: data[i].address,
                location: data[i].longitude + "," + data[i].latitude
            }
        })
    },
    // 高亮第一个点
    changeMarkerColor(data, i) {
        var that = this;
        let markers = [];
        for (let j = 0; j < markersData.length; j++) {
            if (j == i) {
                data[j].iconPath = "../../static/images/marker_checked.png";
            } else {
                data[j].iconPath = "../../static/images/marker.png";
            }
            markers.push({
                id: data[j].id,
                latitude: data[j].latitude,
                longitude: data[j].longitude,
                iconPath: data[j].iconPath,
                width: data[j].width,
                height: data[j].height
            })
        }
        that.setData({
            markers: markers,
        })

    },
    // 高亮点击的点
    markertap(e) {
        const that = this;
        const id = e.detail.markerId
        console.log("id", id);
        this.showMarkerInfo(markersData, id);
this.changeMarkerColor(markersData,id);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this;
        // console.log(options.keyword);
        // 将页面标体设置为返回的值
        wx.setNavigationBarTitle({
            title: '周边' + options.keyword,
        })
        // 使用高德地图Api查找周围兴趣点
        amap.map.getPoiAround({
            queryKeywords: options.keyword,
            success: function (data) {
                console.log(1111, data);
                //  将获得数据赋值给全局变量
                markersData = data.markers;
                if (markersData.length > 0) {
                    that.setData({
                        markers: markersData,
                        // city: poisData[0].cityname || '',
                        latitude: wx.getStorageSync('latitude'),
                        longitude: wx.getStorageSync('longitude')
                    });

                    // 高亮第一个点
                    that.showMarkerInfo(markersData, 0);
                    that.changeMarkerColor(markersData, 0);
                } else {
                    that.setData({
                        textData: {
                            name: '抱歉，未找到结果',
                            address: '',
                            location: wx.getStorageSync('longitude') + "," + wx.getStorageSync('latitude')
                        }
                    });
                }
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