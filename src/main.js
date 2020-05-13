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
import PictureInput from 'vue-picture-input'
import VueClipboard from 'vue-clipboard2'
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import Notifications from 'vue-notification';
import _store from './store/user'
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';

//TODO: change descripotion text-file to v-textareat with limit words
//FIXME: Cannot set preselected tab when navigate URL
// FIXME: Cannot style canvas
//FIXME: Cannot access lyricWrapper ref
//FIXME: Play song from dashboard not sync to audioplaylist
axios.defaults.baseURL = 'http://localhost:3000/api/v1'
axios.defaults.headers.get['Accepts'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(
  config => {
    const token = _store.state.accessToken
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error.response)
  });

axios.interceptors.response.use(response => {
  if (response.data.status === 200) {
    if (response.data.metadata) {
      response.metadata = response.data.metadata
    }
    if (response.data.data) {
      response.data = response.data.data
    }
    return response
  }
  return response
}, function (error) {
  if (error.response.status === 401) {
    _store.dispatch('signOut')
    router.push('/signin');
    return Promise.reject(error);
  }

  if (error.response.status === 400) {
    Vue.notify({
      type: "error",
      title: 'Not found resource',
    });
    
    router.push('/stream')
    return Promise.reject(error);
  }

  if (error.response.status === 500) {
    Vue.notify({
      type: "error",
      title: error.response.data.message,
    });
    
    router.push('/stream')
    return Promise.reject(error);
  }
  return Promise.reject(error);
});


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
Vue.component('picture-input', PictureInput)


Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
})
Vue.use(Notifications);
Vue.use(AudioVisual)

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

Vue.use(VueFileAgent);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')