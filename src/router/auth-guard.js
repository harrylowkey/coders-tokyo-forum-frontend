import { store } from '../store'

export default (to, from, next) => {
  if (store.getters.user) {
    return next()
  } else {
    return next('/signin')
  }
}