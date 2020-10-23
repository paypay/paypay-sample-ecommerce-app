import Vue from "vue";
import App from "./orderReview.vue";
import i18n from "../../i18n";

import "@/styles/index.scss";
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  i18n,
}).$mount("#app");
