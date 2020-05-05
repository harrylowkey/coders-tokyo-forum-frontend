import axios from 'axios'
import { SIGN_IN, SIGN_OUT } from '../constants'
export default {
  namespaced: true,
  state: {
    user: {},
    isAuthenticated: false,
    accessToken: '',
  },
  mutations: {
    [SIGN_IN](state, data) {
      state.user = data.user
      state.accessToken = data.accessToken
      state.isAuthenticated = true
    },
    [SIGN_OUT](state) {
      state.user = {}
      state.accessToken = ''
      state.isAuthenticated = false
    }
  },
  actions: {
    async signIn({ commit }, authData) {
      commit('utils/SET_LOADING', true, { root: true })
      axios.post('/auth/signin', {
        email: authData.email,
        password: authData.password,
      })
        .then(res => {
          const { data: { user, access_token } } = res.data
          localStorage.setItem('accessToken', access_token)
          localStorage.setItem('user', JSON.stringify(user))
          commit('SIGN_IN', { user, accessToken: access_token })
        })
        .catch(() => {
          commit('utils/SET_ERROR', 'Invalid email or password', { root: true })
        })
        .then(() => {
          setTimeout(() => {
            commit('utils/SET_LOADING', false, { root: true })
            commit('utils/SET_ERROR', '', { root: true })
          }, 0)
        })
    },
    async signOut({ commit }) {
      commit('utils/SET_LOADING', false, { root: true })
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      commit('SIGN_OUT')
      setTimeout(() => {
        commit('utils/SET_LOADING', false, { root: true })
      })
    },
    tryAutoSignIn({ commit }) {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) {
        return
      }
      let user = localStorage.getItem('user')
      commit('SIGN_IN', { user: JSON.parse(user), accessToken })
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  }
}