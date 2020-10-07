const path = require('path');

const px2rem = require('postcss-px2rem')
    // const postcss = px2rem({
    //         remUnit: 37.5 //设计稿等分后的值
    //     })
    // vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    px2rem({
                        remUnit: 37.5 //设计稿等分后的值
                    })
                ]
            }
        }
    },
    configureWebpack: { //webpack原生配置
        // 引入模块的解析
        resolve: {
            extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
            alias: { // 路径别名(简写方式)
                // 'vue$': 'vue/dist/vue.esm.js', // 表示精准匹配   带vue编译器
                '@': path.resolve(__dirname, 'src'),
                '@components': path.resolve(__dirname, 'src/components'),
            }
        }
    },
    devServer: {
        proxy: {
            // 处理以/api开头路径的请求
            // '/api': 'http://localhost:4000'   // http://localhost:4000/api/search/users
            '/api': {
                target: 'http://localhost:4000', // 转发的目标地址
                pathRewrite: {
                    '^/api': '' // 转发请求时去除路径前面的/api
                },
            },
            '/gh': {
                target: 'https://api.github.com', // 转发的目标地址
                pathRewrite: {
                    '^/gh': '' // 转发请求时去除路径前面的/api
                },
                changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
            }
        },
    }
}