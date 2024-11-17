import { createApp } from 'vue'
import App from './App.vue'
import './style/main.css'
import router from './router/router'
import gsap from 'gsap'
import Flip from 'gsap/Flip'
import { createPinia } from 'pinia'




const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')

gsap.registerPlugin(Flip)