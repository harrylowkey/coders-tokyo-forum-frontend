import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import DateFilter from './filters/date'
import DateTimeFilter from './filters/dateTime'
import MarkdownFilter from './filters/markdown'
import ReadTimeFilter from './filters/readTime'

import AlertCmp from './components/Shared/Alert.vue'
import Banner from './components/Shared/Banner'

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.filter('dateTime', DateTimeFilter)
Vue.filter('markdown', MarkdownFilter)
Vue.filter('readTime', ReadTimeFilter)

Vue.component('app-alert', AlertCmp)
Vue.component('app-banner', Banner)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
