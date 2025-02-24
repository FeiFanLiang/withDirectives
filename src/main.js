import './assets/main.css'
import * as buffer from 'buffer'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
window.Buffer  = buffer.Buffer;


createApp(App).use(router).mount('#app')
