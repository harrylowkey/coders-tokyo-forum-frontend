import getters from '../store/getters'

export default (to, from, next) => {
  if (getters.user) {
    return next()
  } else {
    return next('/signin')
  }
}