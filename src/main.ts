import { createApp } from 'vue'
import App from './App.vue'
import './style/main.css'
import router from './router/router'
import gsap from 'gsap'
import Flip from 'gsap/Flip'


const app = createApp(App)

app.use(router)

app.mount('#app')

gsap.registerPlugin(Flip)