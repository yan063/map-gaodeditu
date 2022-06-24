const amapfile=require("amap-wx.130.js");

// 实例化高德地图
const map=new amapfile.AMapWX({
    key:"07489d22adaac26f1d0cd3734ad3bf03"
})
// 导出
module.exports={
    map
}