import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';


Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(Vuetify, {
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
});

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
