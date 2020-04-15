export default {
  state: {
    user: null,
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