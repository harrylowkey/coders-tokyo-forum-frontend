import Vue from 'vue'
import VueRouter from 'vue-router'
const Stream = resolve => {
  require.ensure(['../components/Stream/Stream.vue'], () => {
    resolve(require('../components/Stream/Stream.vue'));
  }, 'stream');
};

const Profile = resolve => {
  require.ensure(['../components/User/Profile.vue'], () => {
    resolve(require('../components/User/Profile.vue'));
  }, 'stream');
};

const AudioPlaylist = resolve => {
  require.ensure(['../components/Stream/AudioPlaylist.vue'], () => {
    resolve(require('../components/Stream/AudioPlaylist.vue'));
  }, 'audio-playlist');
};


Vue.use(VueRouter)

const routes = [
  {
    path: '/stream',
    name: 'stream',
    components: {
      default: Stream,
      'audio-playlist': AudioPlaylist
    }
  },
  {
    path: '/profile', component: Profile
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
