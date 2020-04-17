import Vue from 'vue'
import VueRouter from 'vue-router'

const Profile = () => import('@/components/User/Profile')
const Stream = () => import('@/components/Stream/Stream')
const Discussions = () => import('@/components/Post/Discussion/Discussions')
const Songs = () => import('@/components/Post/Audio/Song/SongList')
const Podcasts = () => import('@/components/Post/Audio/Podcast/PodcastList')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Stream,
  },
  {
    path: '/stream',
    name: 'stream',
    component: Stream,
  },
  {
    path: '/stream/discussions',
    name: 'discussion',
    component: Discussions,
  },
  {
    path: '/stream/songs',
    name: 'song',
    component: Songs,
  },
  {
    path: '/stream/podcasts',
    name: 'podcast',
    component: Podcasts,
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
