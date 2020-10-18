import { RECEIVE_USER,
        RECEIVE_TOKEN,
        RESET_TOKEN,
        RESET_USER,
  } from "../mutation-types";
import { reqAutoLogin } from "@/api";
export default{
  state:{
    user:{},//用户信息
    token:localStorage.getItem('token_key')||'',//token信息
  },
  mutations:{
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
  },
  actions:{
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
  },
  getters:{},
}