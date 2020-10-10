/* 
对axio进行2次封装一个能发ajax请求的函数
1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对请求体参数进行urlencode处理, 而不使用默认的json方式(后台接口不支持)
4. 配置请求超时的时间
5. 通过请求头携带token数据
6. 请求loading
*/
import axios from 'axios'
import qs from 'qs'
import { Indicator } from 'mint-ui'

const instance = axios.create({
        baseURL: '/api',
        timeout: 2000 //4. 配置请求超时的时间
    }

);
/* 请求拦截器 */
instance.interceptors.request.use((config) => {
        Indicator.open();
        console.log('request interceptors');
        const data = config.data
            // 3. 对请求体参数进行urlencode处理, 而不使用默认的json方式(后台接口不支持)
        if (data instanceof Object) {
            config.data = qs.stringify(data)
        }
        return config
    })
    /* 响应拦截器 */
instance.interceptors.response.use(response => {
        Indicator.close();
        console.log('response interceptors');

        return response.data
    },
    error => {
        Indicator.close();
        alert(error.message)
        return new Promise(() => {}) // 返回一个pending状态的promise => 中断promie链
    }
)
export default instance