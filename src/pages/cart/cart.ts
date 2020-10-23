import Vue from "vue";
import App from "./cart.vue";

import "@/styles/index.scss";
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
