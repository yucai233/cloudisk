import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../src/components/Login.vue'

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
        component: () => import('../src/components/AfterLogin.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})


export default router