/* 
包含n个接口请求函数的模块
*/
import ajax from './ajax'
//1、根据经纬度获取位置详情http://localhost:4000/position/:geohash 
//40.10038,116.36867 纬度，经度
export const reqAddress = (latitude, longitude) => ajax(`/position/${latitude},${longitude}`)
    //2、获取食品分类列表http://localhost:4000/index_category
export const reqCategorys = () => ajax('/index_category',{
    headers:{
        needCheck:true
    }
})
    //3、根据经纬度获取商铺列表
export const reqShops = ({ latitude, longitude }) => ajax('/shops', {
    params: {
        latitude,
        longitude
    },headers:{
        needCheck:true
    }
})
//4.发送短信验证码
export const reqSendCode=(phone)=>ajax('/sendcode',{
    params:{
        phone
    }
})
// 用户名密码登陆
export const reqPwdLogin=({name,pwd,captcha})=>ajax.post('/login_pwd',{name,pwd,captcha})
// 手机号验证码登陆
export const reqSmsLogin=({phone,code})=>ajax.post('/login_sms',{phone,code})
// 9、自动登陆
export const reqAutoLogin=()=>ajax.get('/auto_login')
//获取商家goods
export const reqGoods=()=>ajax.get('/goods')
//获取商家评价
export const reqRatings=()=>ajax.get('/ratings')
//获取商家详情
export const reqInfo=()=>ajax.get('/info')