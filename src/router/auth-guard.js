import auth from '../store/auth'

export default (to, from, next) => {
  if (auth.getters.user) {
    return next()
  } else {
    return next('/signin')
  }
}