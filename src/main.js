import Vue from 'vue';
import APlayer from '@moefe/vue-aplayer';
import AudioVisual from 'vue-audio-visual';
import VueFileAgent from 'vue-file-agent';
import axios from 'axios';
import PictureInput from 'vue-picture-input';
import VueClipboard from 'vue-clipboard2';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import Notifications from 'vue-notification';
import infiniteScroll from 'vue-infinite-scroll';
import VueScrollTo from 'vue-scrollto';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import { store } from './store';
import router from './router';
import _store from './store/user';
import DateFilter from './filters/date';
import DateTimeFilter from './filters/dateTime';
import MarkdownFilter from './filters/markdown';
import ReadTimeFilter from './filters/readTime';
import Banner from './components/Shared/Banner';

import './registerServiceWorker';
import 'vue-file-agent/dist/vue-file-agent.css';

// FIXME: Cannot set preselected tab when navigate URL
// FIXME: Cannot style canvas
axios.defaults.baseURL = 'http://localhost:3000/api/v1';
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

// TODO: change descripotion text-file to v-textareat with limit words
axios.defaults.baseURL = 'http://localhost:3000/api/v1';
axios.defaults.headers.get.Accepts = 'application/json';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.interceptors.request.use(
  config => {
    const token = _store.state.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error.response);
  },
);

axios.interceptors.response.use(
  response => {
    if (response.data.status === 200) {
      if (response.data.metadata) {
        response.metadata = response.data.metadata;
      }
      if (response.data.data) {
        response.data = response.data.data;
      }
      return response;
    }
    return response;
  },
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user'  );
      router.push('/signin');
      return Promise.reject(error);
    }

    if (error.response.status === 400) {
      Vue.notify({
        type: 'error',
        title: 'Not found',
      });

      router.push('/stream');
      return Promise.reject(error);
    }

    if (error.response.status === 500) {
      Vue.notify({
        type: 'error',
        title: error.response.data.message,
      });

      router.push('/stream');
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

Vue.config.productionTip = false;
Vue.filter('date', DateFilter);
Vue.filter('dateTime', DateTimeFilter);
Vue.filter('markdown', MarkdownFilter);
Vue.filter('readTime', ReadTimeFilter);

Vue.component('app-banner', Banner);
Vue.component('picture-input', PictureInput);

Vue.use(APlayer, {
  defaultCover:
    'https://res.cloudinary.com/hongquangraem/image/upload/v1589443283/Coders-Tokyo-Forum/posts/brveajqadnizkighglht.jpg',
  productionTip: true,
});
Vue.use(Notifications);
Vue.use(AudioVisual);

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

Vue.use(VueFileAgent);
Vue.use(infiniteScroll);
Vue.use(VueScrollTo);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
