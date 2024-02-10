import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import "./scss/style.scss"

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!localStorage.getItem('loggedIn') == true) {
            next({ path: '/' })
        } else {
            next()
        }
    } else {
        next()
    }
})





axios.defaults.withCredentials = true;
createApp(App).use(router).mount('#app');





