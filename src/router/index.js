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


Vue.use(VueRouter)

const routes = [
  {
    path: '/stream', component: Stream
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
