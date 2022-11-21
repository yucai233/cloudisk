import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../src/components/Login.vue'
import axios from 'axios'

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/regist',
        name: 'regist',
        component: () => import('../src/components/Regist.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../src/components/AfterLogin.vue'),
        meta: { requireAuth: true }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requireAuth) {
        if(localStorage.getItem('user_info')) {
            axios.post('http://localhost:80/loginUp', 
            JSON.parse(localStorage.getItem('user_info')))
            next()
        }else {
            // if(to.path === '/') {
            //     if(localStorage.getItem('user_info')) {
            //         next({ path: from.fullPath })
            //     }
            // }else {
                alert('请先进行登录')
                next({ path: '/' })
            
        }
    }
    else {
        if(to.fullPath == "/") {
            console.log(from.fullPath);
            if(localStorage.getItem('user_info')) {
                next({ path: '/home' })
            }else {
                next()
            }
        }else {
            next()
        }
    }

    // if(to.fullPath == "/") {
    //     console.log(from.fullPath);
    //     if(localStorage.getItem('user_info')) {
    //         next({ path: from.fullPath })
    //     }
    // }else {
    //     next()
    // }
})


export default router