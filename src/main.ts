import { createApp } from 'vue'
import axios from 'axios'
// 组件
import SvgIcon from '@/components/svg-icon.vue'
import Antd from 'ant-design-vue'

import router from './router'
import store from './store'
import App from './App.vue'

// css
import '@/assets/scss/main.scss'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
app.config.productionTip = false

app.config.globalProperties.$axios = axios
app.component(SvgIcon.name, SvgIcon)

app.use(store).use(router).use(Antd).mount('#app')
