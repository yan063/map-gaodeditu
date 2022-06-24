// pages/route/bus.js
const amap = require('../../utils/amap-config');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectType: '最便捷',
        tabs: {
            activeTab: 'walk',
            routeTab: amap.routeTab
        },
        listHeight: "50px",
        listShowed: false,
    },
    // 文字显示    
    checkDetail(e) {
        var that = this;
        if (that.data.listShowed) {
            that.setData({
                listShowed: false,
                listHeight: "50px"
            })
        } else {
            that.setData({
                listShowed: true,
                listHeight: "80vh"
            });
        }
    },
    // 跳转到不同的导航页面
    changeNav: function (e) {
        console.log();
        wx.navigateTo({
            url: '/pages/route/' + e.currentTarget.dataset.type + '?poilocation=' + this.data.poilocation,
        })
    },
    /**
  * 切换公交出行方案
  * 
  * 0：最快捷模式
  * 1：最经济模式
  * 2：最少换乘模式
  * 3：最少步行模式
  * 5：不乘地铁模式
  */
    transferOpts: function () {
        var that = this;
        var itemList = ['最便捷', '最经济', '少换乘', '少步行', '不坐地铁'];
        wx.showActionSheet({
            itemList: itemList,
            success: function (res) {
                console.log(res);
                 // 不坐地铁的类型是 5（但数组索引是 4）
        var type = (res.tapIndex == 4) ? (res.tapIndex + 1) : res.tapIndex;
        that.getTransitRoute(type);
        that.setData({
          selectType: itemList[res.tapIndex]
        })
            }
        })
    },
    getTransitRoute(type){
        var that = this;
        amap.map.getTransitRoute({
          origin: wx.getStorageSync('longitude') + "," + wx.getStorageSync('latitude'),
          destination: that.data.poilocation,
          city: that.data.city,//所在城市
          strategy: type, // 出行策略
          success: function(data) {
              console.log(999,data);
              if(data&&data.transits){
                var transits = data.transits;
                for(let i=0;i<transits.length;i++){
                    var segments = transits[i].segments;
                    transits[i].transport = [];
                    for (var j = 0; j < segments.length; j++) {
                      if (
                        segments[j].bus 
                        && segments[j].bus.buslines 
                        && segments[j].bus.buslines[0] 
                        && segments[j].bus.buslines[0].name
                      ){
                        var name = segments[j].bus.buslines[0].name;
                        if(j!=0){
                            name="->"+name;
                        }
                        transits[i].transport.push(name);
                      }                     
                    }
                    transits[i].transportname = transits[i].transport.join('');
                    transits[i].minute = parseInt(transits[i].duration / 60); // 时间
                    transits[i].distance = parseFloat(transits[i].distance / 1000).toFixed(2); // 距离
                }               
              }
              that.setData({
                transits: transits
              });

              
          },
          faild:function(info){
              console.log(info);
          }
        })

    },
   /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log("options",options);
        var that = this;
        if (options.poilocation != "") {
            // 将poilocation设置到data中
            that.setData({
                poilocation: options.poilocation,
                city:wx.getStorageSync('city'),
                markers: [{
                    iconPath: "../../static/images/nav_s.png",
                    latitude: wx.getStorageSync('latitude'),
                    longitude: wx.getStorageSync('longitude'),
                }, {
                    iconPath: "../../static/images/nav_e.png",
                    latitude: parseFloat(options.poilocation.split(',')[1]),
                    longitude: parseFloat(options.poilocation.split(',')[0]),
                }]
            })
            const origin = wx.getStorageSync('longitude') + "," + wx.getStorageSync('latitude');
            amap.map.getWalkingRoute({
                origin: origin,
                destination: options.poilocation,
                success: function (data) {
                    console.log("data", data);
                    var points = [];
                    if (data.paths && data.paths[0] && data.paths[0].steps) {
                        var steps = data.paths[0].steps;
                        for (let i = 0; i < steps.length; i++) {
                            var poLen = steps[i].polyline.split(";");
                            for (let j = 0; j < poLen.length; j++) {
                                points.push({
                                    longitude: parseFloat(poLen[j].split(",")[0]),
                                    latitude: parseFloat(poLen[j].split(",")[1]),
                                })
                            }
                        }
                    }
                    that.setData({
                        polyline: [{
                            points: points,
                            color: "#0091ff",
                            width: 6
                        }],
                        steps: data.paths[0].steps
                    })
                    if (data.paths && data.paths[0] && data.paths[0].distance) {
                        that.setData({
                            distance: parseFloat(data.paths[0].distance / 1000).toFixed(2) + '公里'
                        })
                    }
                    if (data.paths && data.paths[0] && data.paths[0].duration) {
                        that.setData({
                            duration: parseFloat(data.paths[0].duration / 60).toFixed(1) + '分钟'
                        })
                    }
                },
                faild: function (err) { },
            })
            // 调用出行策略0：最便捷--默认
            that.getTransitRoute(0);

        } else {
            console.log("参数错误");
        }

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