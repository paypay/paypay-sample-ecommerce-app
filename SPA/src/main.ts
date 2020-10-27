import Vue from 'vue'
//import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import store from './store'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'
import '@/styles/index.scss' // global css

Vue.use(VueToast)
Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: (h) => h(App),
}).$mount('#app')
