import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
