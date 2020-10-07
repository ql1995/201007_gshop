import MSite from "@/pages/MSite/MSite.vue";
import Order from "@/pages/Order/Order.vue";
import Profile from "@/pages/Profile/Profile.vue";
import Search from "@/pages/Search/Search.vue";
import Login from "@/pages/Login/Login.vue";
export default [{
        path: '/msite',
        component: MSite,
        meta: {
            isshowFootGuide: true
        }
    },
    {
        path: '/order',
        component: Order,
        meta: {
            isshowFootGuide: true
        }
    },
    {
        path: '/profile',
        component: Profile,
        meta: {
            isshowFootGuide: true
        }
    },
    {
        path: '/search',
        component: Search,
        meta: {
            isshowFootGuide: true //暴露给了同一页面上的其他组件上的$route对象
        }
    },
    {
        path: '/',
        redirect: '/msite'
    },
    {
        path: '/login',
        component: Login
    }
]