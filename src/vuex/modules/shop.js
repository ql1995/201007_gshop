import { 
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT
  } from "../mutation-types";
  import Vue from 'vue'
  import {reqGoods,reqRatings,reqInfo } from "@/api";
export default{
  state:{
    goods:[],
    ratings:[],
    info:{}
  },
  mutations:{
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
  },
  actions:{
      async getShopGoods({commit}){
        const result=await reqGoods();
        if(result.code===0){
            const goods=result.data
            commit(RECEIVE_GOODS,{goods})
        }
    },
    async getShopRatings({commit}){
        const result=await reqRatings();
        console.log(result);
        if(result.code===0){
            const ratings=result.data
            // console.log(ratings);//此处传过去的就是数组
            // console.log({ratings});//此处传过去的是一个包含数组的对象
            commit(RECEIVE_RATINGS,{ratings})
        }
    },
    async getShopInfo({commit}){
        const result=await reqInfo();
        if(result.code===0){
            const info=result.data
            commit(RECEIVE_INFO,{info})
        }
    },
    updateFoodCount({commit},{isAdd,food}){
        if(isAdd){
            commit(ADD_FOOD_COUNT,{food})
        }else{
            commit(REDUCE_FOOD_COUNT,{food})
        }
    }
  },
  getters:{}
}