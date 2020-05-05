import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store } from './store'
import vuetify from './plugins/vuetify';
import APlayer from '@moefe/vue-aplayer';
import AudioVisual from 'vue-audio-visual'
import VueFileAgent from 'vue-file-agent';
import axios from 'axios'
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import Notifications from 'vue-notification';

//TODO: change descripotion text-file to v-textareat with limit words

axios.defaults.baseURL = 'http://localhost:3000/api/v1'
axios.defaults.headers.get['Accepts'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

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

Vue.use(Notifications);

Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
})

Vue.use(AudioVisual)

Vue.use(VueFileAgent);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')