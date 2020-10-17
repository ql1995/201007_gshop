/* 
包含n个用于间接更新状态数据的方法的对象
方法可以包含异步和逻辑处理代码
*/
import { RECEIVE_ADDRESS, RECEIVE_SHOPS, RECEIVE_CATEGORYS,
    RECEIVE_USER,RECEIVE_TOKEN,
    RESET_TOKEN,
    RESET_USER,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    ADD_FOOD_COUNT,
    REDUCE_FOOD_COUNT
 } from './mutation-types'
import { reqAddress, reqCategorys, reqShops,reqAutoLogin,reqGoods,reqRatings,reqInfo } from "@/api";
export default {
    //获取当前位置的地址信息

    async getAddress({ state, commit }) {
        // console.log(commit);
        const { latitude, longitude } = state;
        //发送异步请求
        const result = await reqAddress(latitude, longitude);
        

        if (result.code == 0) {
          
            //请求成功后，提交给mutation
            commit(RECEIVE_ADDRESS, result.data)
        }
    },
    //获取当前位置的食品分类信息
    async getCategorys({ commit }, callback) {
        //发送异步请求
        const result = await reqCategorys();
        if (result.code == 0) {
            //请求成功后，提交给mutation
            commit(RECEIVE_CATEGORYS, result.data)
            typeof callback === 'function' && callback()
        }
    },
    //获取当前位置的商家信息
    async getShops({ commit, state }) {
        const { latitude, longitude } = state;
        //发送异步请求
        const result = await reqShops({ latitude, longitude });
        if (result.code == 0) {
            //请求成功后，提交给mutation
            commit(RECEIVE_SHOPS, result.data)
        }
    },
    //保存用户信息到vuex中
    saveUser({commit},user){
        const token=user.token
        localStorage.setItem('token_key',token);
        delete user.token
        commit(RECEIVE_TOKEN,{token})
        commit(RECEIVE_USER,{user})
        
    },
    async autoLogin({commit,state}){
       if(state.token && !state.user._id){
        const result=await reqAutoLogin();
        if(result.code===0){//发送成功
            const user =result.data
            commit(RECEIVE_USER,{user})
        }
       }
    },
    logout({commit}){
        localStorage.removeItem('token_key')
        commit(RESET_TOKEN)
        commit(RESET_USER)
    },
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
}