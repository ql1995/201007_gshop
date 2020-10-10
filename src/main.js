import Vue from 'vue'
import App from './App' // 引入自定义组件
import 'lib-flexible/flexible'
import router from "./router";
import Header from "./components/Header/Header.vue"
import store from './vuex/store'
import './validate'
Vue.component('Header', Header)
new Vue({

    // 注册局部组件
    // components: { // 注册组件(后面才能写组件标签)
    //   App: App
    // },
    // template: '<App/>',
    render: h => h(App),
    router,
    store


}).$mount('#app')