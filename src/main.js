import Vue from 'vue'
import App from './App' // 引入自定义组件
import 'lib-flexible/flexible'
import router from "./router";
new Vue({

    // 注册局部组件
    // components: { // 注册组件(后面才能写组件标签)
    //   App: App
    // },
    // template: '<App/>',
    render: h => h(App),
    router


}).$mount('#app')