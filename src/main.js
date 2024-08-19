import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { SpeedInsights } from "@vercel/speed-insights/vue"


.use(SpeedInsights)

createApp(App).use(store).use(router).use(SpeedInsights).mount('#app')
