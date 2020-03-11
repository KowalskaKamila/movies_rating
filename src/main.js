import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import App from "./App.vue";
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(Vuetify, {
  inconfont: "md"
});

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
