/* 
vuex最核心的管理对象store
*/
import Vue from 'vue'
import Vuex from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import msite from "@/vuex/modules/msite"
import user from "@/vuex/modules/user"
import shop from "@/vuex/modules/shop"
Vue.use(Vuex)
export default new Vuex.Store({
    mutations,
    actions,
    getters,
    modules:{
        msite,
        user,
        shop
    }
    /* 
    总的state的结构:
    {
    msite: {},
    user: {},
    shop: {}
    }
    */
});