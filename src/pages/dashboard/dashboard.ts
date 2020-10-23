import Vue from "vue";
import App from "./dashboard.vue";
import i18n from "../../i18n";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import "@/styles/index.scss";

Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  i18n,
}).$mount("#app");
