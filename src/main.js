import Vue from 'vue'
import App from './App' // 引入自定义组件
import 'lib-flexible/flexible'
import router from "./router";
import Header from "./components/Header/Header.vue"
import Star from "./components/Star/Star.vue";
import store from './vuex/store'
import * as API from "./api";
import './validate'
import {Button} from 'mint-ui'
import ShopHeader from '@/components/ShopHeader/ShopHeader'
import CartControl from '@/components/CartControl/CartControl'
import i18n from './i18n'
import './mock/mock-server'
// 将API对象挂载到Vue的原型对象上
Vue.prototype.$API=API;
//注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component(Button.name,Button)
Vue.component('ShopHeader',ShopHeader)
Vue.component('CartControl',CartControl)
new Vue({
    // 注册局部组件
    // components: { // 注册组件(后面才能写组件标签)
    //   App: App
    // },
    // template: '<App/>',
    render: h => h(App),
    // 所有组件都能看到 $router和$route  <router-link> 和 <router-view/>
    router,
    i18n,
    // 所有组件都能看到: $store
    store
}).$mount('#app')