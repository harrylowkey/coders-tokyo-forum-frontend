export default {
  state: {
    user: 1,
    authError: false,
    authLoading: false
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    user(state) {
      return state.user
    },
    error(state) {
      return state.authError
    },
    authLoading(state) {
      return state.authLoading
    }
  }

}