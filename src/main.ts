import { createApp } from 'vue'
import axios from 'axios'
// 组件
import SvgIcon from '@/components/svg-icon.vue'

import router from './router'
import store from './store'
import App from './App.vue'

// css
import '@/assets/scss/main.scss'

const app = createApp(App)

app.config.globalProperties.$axios = axios
app.component(SvgIcon.name, SvgIcon)

app.use(store).use(router).mount('#app')
