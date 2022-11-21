import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '../router/index'
import eventBus from 'vue3-eventbus'


createApp(App)
    .use(router)
    .use(eventBus)
    .mount('#app')
