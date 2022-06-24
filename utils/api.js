// 所有界面的基地址
const BASE_URL="https://devapi.qweather.com/v7"
//公共的key
const KEY="78e8bae9e4284872821e0fab7c6a3c11"
/**
 * API请求的参数
 */
const requst=(url,method,data)=>{
    // 设置请求的key
    data.key=KEY;
    return new Promise((resolve,reject)=>{
        wx.request({
          url: url,
          method:method,
          data:data,
          header:{
              //严格application/json类型（MIME类型）
              'content-type':'application/json'//默认值
          },
          success(res){
              resolve(res.data)
          },
          fail(err){
              console.log('接口调用失败');
              reject(err)
          }
        })
    })
}
/**
 * 导出函数
 */
module.exports={
    threeday:(data)=>{
        return requst(BASE_URL+'/weather/3d','get',data)
    }
}