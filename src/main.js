import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { DateTime } from 'luxon'

Vue.config.productionTip = false
Vue.prototype.$date = DateTime

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
