/* 
包含n个用于直接更新状态数据的方法的对象
方法不可以包含异步和逻辑处理代码
*/
import Vue from 'vue'
import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS,
     RECEIVE_SHOPS,RECEIVE_USER,RECEIVE_TOKEN,
     RESET_TOKEN,
     RESET_USER,
     RECEIVE_GOODS,
     RECEIVE_RATINGS,
     RECEIVE_INFO,
     ADD_FOOD_COUNT,
     REDUCE_FOOD_COUNT
     } from "./mutation-types";


export default {
    [RECEIVE_ADDRESS](state, address) {
        
        state.address = address
    },
    [RECEIVE_CATEGORYS](state, categorys) {
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state, shops) {
        state.shops = shops
    },
    [RECEIVE_USER](state, {user}) {
        state.user = user
    },
    [RECEIVE_TOKEN](state, {token}) {
        state.token = token
    },
    [RESET_TOKEN](state) {
        state.token = ''
    },
    [RESET_USER](state) {
        state.user = {}
    },
    [RECEIVE_GOODS](state,{goods}) {
        state.goods = goods
    },
    [RECEIVE_RATINGS](state,{ratings}) {
        // console.log({ratings});//对象
        // console.log(ratings);//数组
        state.ratings = ratings
    },
    [RECEIVE_INFO](state,{info}) {
        state.info = info
    },
    [ADD_FOOD_COUNT](state,{food}) {//state不能省略
        if(food.count){
            food.count++
        }else{
            Vue.set(food,'count',1)
        }
    },
    [REDUCE_FOOD_COUNT](state,{food}) {
        if(food.count>0){
            food.count--
        }
    },

}