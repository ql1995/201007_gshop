/* 
包含n个用于间接更新状态数据的方法的对象
方法可以包含异步和逻辑处理代码
*/
import { RECEIVE_ADDRESS, RECEIVE_SHOPS, RECEIVE_CATEGORYS } from './mutation-types'
import { reqAddress, reqCategorys, reqShops } from "@/api";
export default {
    //获取当前位置的地址信息

    async getAddress({ state, commit }) {
        const { latitude, longitude } = state;
        //发送异步请求
        const result = await reqAddress(latitude, longitude);

        console.log(result.data.code == 0);
        if (result.data.code == 0) {
            console.log(1);
            //请求成功后，提交给mutation
            commit(RECEIVE_ADDRESS, result.data)
        }
    },
    //获取当前位置的食品分类信息
    async getCategorys({ commit }) {
        //发送异步请求
        const result = await reqCategorys();
        if (result.code == 0) {
            //请求成功后，提交给mutation
            commit(RECEIVE_CATEGORYS, result.data)
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
}