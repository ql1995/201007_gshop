import { RECEIVE_ADDRESS, 
          RECEIVE_CATEGORYS,
          RECEIVE_SHOPS
      } from "../mutation-types";
  import { reqAddress, reqCategorys, reqShops } from "@/api";
export default{
    state:{
      latitude: 40.10038, // 纬度
      longitude: 116.36867, // 经度
      address: {}, // 地址信息对象
      categorys: [], // 分类数组
      shops: [], // 商家数组
    },
    mutations:{
      [RECEIVE_ADDRESS](state, address) {
        
        state.address = address
    },
    [RECEIVE_CATEGORYS](state, categorys) {
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state, shops) {
        state.shops = shops
    },
    },
    actions:{
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
  },
  getters:{
    
  },
}