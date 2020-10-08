/* 
包含n个接口请求函数的模块
*/
import ajax from './ajax'
//1、根据经纬度获取位置详情http://localhost:4000/position/:geohash 
//40.10038,116.36867 纬度，经度
export const reqAddress = (latitude, longitude) => ajax(`/position/${latitude},${longitude}`)
    //2、获取食品分类列表http://localhost:4000/index_category
export const reqCategorys = () => ajax('/index_category')
    //3、根据经纬度获取商铺列表
export const reqShops = ({ latitude, longitude }) => ajax('/shops', {
    params: {
        latitude,
        longitude
    }
})