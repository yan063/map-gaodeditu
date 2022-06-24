// pages/route/bike.js
const amap = require('../../utils/amap-config');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: {
            activeTab: 'walk',
            routeTab: amap.routeTab
          },
          listHeight: "50px",
          listShowed: false,
    },
    // 文字显示    
    checkDetail(e){
       var that=this;
       if(that.data.listShowed){
           that.setData({
               listShowed:false,
               listHeight:"50px"
           })
       }else{
           that.setData({
               listShowed:true,
               listHeight:"80vh"
           });
       }
    },
    // 跳转到不同的导航页面
    changeNav: function(e) {  
        console.log("000",e.currentTarget.dataset.type,this.data.poilocation);     
        wx.navigateTo({
          url: '/pages/route/'+e.currentTarget.dataset.type+'?poilocation=' + this.data.poilocation,
        })
      },
   /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // console.log("options",options);
        var that=this;
        if(options.poilocation!=""){
            // 将poilocation设置到data中
            that.setData({
                poilocation: options.poilocation,
                markers: [{
                  iconPath: "../../static/images/nav_s.png",
                  latitude: wx.getStorageSync('latitude'),
                  longitude: wx.getStorageSync('longitude'),
                },{
                  iconPath: "../../static/images/nav_e.png",
                  latitude: parseFloat(options.poilocation.split(',')[1]),
                  longitude: parseFloat(options.poilocation.split(',')[0]),
                }]
              })
              const origin=wx.getStorageSync('longitude')+","+wx.getStorageSync('latitude');
            //   调用骑行导航接口
              amap.map.getRidingRoute({
                origin: origin,
                destination: options.poilocation,
                success: function(data) {
                    console.log("data",data);
                    var points=[];
                    if(data.paths&&data.paths[0]&&data.paths[0].steps){
                        var steps=data.paths[0].steps;
                        for(let i=0;i<steps.length;i++){
                            var poLen=steps[i].polyline.split(";");
                            for(let j=0;j<poLen.length;j++){
                                points.push({
                                    longitude:parseFloat(poLen[j].split(",")[0]),
                                    latitude:parseFloat(poLen[j].split(",")[1]),
                                })
                            }
                        }
                    }
                    that.setData({
                        polyline:[{
                            points:points,
                            color:"#0091ff",
                            width:6
                        }],
                        steps:data.paths[0].steps
                    })
                    if(data.paths&&data.paths[0]&&data.paths[0].distance){
                      that.setData({
                          distance:parseFloat(data.paths[0].distance/1000).toFixed(2)+'公里'
                      })
                    }
                    if(data.paths&&data.paths[0]&&data.paths[0].duration){
                        that.setData({
                            duration:parseFloat(data.paths[0].duration/60).toFixed(1)+'分钟'
                        })
                      }                               
                },
                faild:function(err){},
            })

        }else{
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