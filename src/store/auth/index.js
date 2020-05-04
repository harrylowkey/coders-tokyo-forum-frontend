import axios from 'axios'
import router from '../../router'
export default {
  state: {
    user: null,
    accessToken: '',
    authError: false,
    error: {},
    authLoading: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user
      state.accessToken = payload.accessToken
    },
    setAuthError(state, payload) {
      state.authError = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setAuthLoading(state, payload) {
      state.authLoading = payload
    },
    clearAuthError(state) {
      state.authError = null
    },
    clearAuthData (state) {
      state.user = null
      state.accessToken = null
    }
  },
  actions: {
    signIn({ commit, getters }, authData) {
      commit('setAuthLoading', true)
      axios.post('/auth/signin', {
        email: authData.email,
        password: authData.password,
      })
        .then(res => {
          const { data: { user, access_token } } = res.data
          localStorage.setItem('accessToken', access_token)
          localStorage.setItem('user', JSON.stringify(user))
          commit('setUser', { user, accessToken: access_token })
          commit('setAuthLoading', false)
          router.replace('/stream')
        })
        .catch(error => {
          commit('setAuthError', true)
          commit('setError', error)
          commit('setAuthLoading', false)
        })
    },
    tryAutoSignin({ commit }) {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        return
      }
      let user = localStorage.getItem('user')
      commit('setUser', { user: JSON.parse(user), accessToken })
    },
    logout ({commit}) {
      commit('clearAuthData')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      router.replace('/signin')
    },
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