import Vue from 'vue'
import vuetify from './plugins/vuetify';
import App from './App.vue'
import router from './router'
import { store } from './store/store'

Vue.config.productionTip = false
Vue.config.devtools = false;

new Vue({
  router,
  vuetify,
  store: store,
  render: h => h(App)
}).$mount('#app')
