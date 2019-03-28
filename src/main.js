import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/css/reset.css'
import '@/css/iconfont.css'
import 'element-ui/lib/theme-chalk/display.css'
import dayjs from 'dayjs'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.filter('dateFormat', function (value, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(value).format(format)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
