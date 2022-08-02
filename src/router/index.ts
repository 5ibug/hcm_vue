import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: 'home'
    },{
        path: '/home',
        name: 'home',
        component: () => import("../view/index/index.vue"),
        meta: {
            title: "首页"
        }
    },{
        path: '/log',
        name: 'log',
        component: () => import("../view/log/index.vue"),
        meta: {
            title: "日志",
            back: true
        }
    }, {
        path: '/login',
        name: 'login',
        component: () => import("../view/login/index.vue"),
        meta: {
            title: "登录"
        }
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 全局路由守护
router.beforeEach((to, from, next) => {
    // 判断有没有登录
    if (!localStorage.getItem('token')) {
        if (to.name == "login") {
            next();
        } else {
            router.push('login')
        }
    } else {
        // 如果已登录则跳转到首页
        if (to.name == "login") {
            router.push('home')
        }
        next();
    }
})

export default router
