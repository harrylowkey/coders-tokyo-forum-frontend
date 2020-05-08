import axios from 'axios'
import { SIGN_IN, SIGN_OUT, UPLOAD_AVATAR, UPDATE_PROFILE } from '../constants'
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
    },
    [UPLOAD_AVATAR](state, { data }) {
      state.user.avatar = data
    },
    [UPDATE_PROFILE](state, data) {
      state.user = data
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
          const { data: { user, access_token } } = res
          localStorage.setItem('accessToken', access_token)
          localStorage.setItem('user', JSON.stringify(user))
          commit('SIGN_IN', { user, accessToken: access_token })
        })
        .catch(err => {
          commit('utils/SET_ERROR', err, { root: true })
        })
        .then(() => {
          setTimeout(() => {
            commit('utils/SET_LOADING', false, { root: true })
            commit('utils/SET_ERROR', '', { root: true })
          }, 0)
        })
    },
    async signOut({ commit }) {
      commit('utils/SET_LOADING', true, { root: true })
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
    },
    async uploadAvatar({ commit }, { avatar }) {
      commit('utils/SET_LOADING', true, { root: true })
      const response = await axios.post('/users/avatars', { avatar })
        .then(res => {
          let user = localStorage.getItem('user')
          user = JSON.parse(user)
          user.avatar = res.data
          localStorage.setItem('user', JSON.stringify(user))
          commit('UPLOAD_AVATAR', { data: res.data })
          return res
        })
        .catch(err => {
          commit('utils/SET_ERROR', err, { root: true })
          return err
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING', false, { root: true })
            commit('utils/SET_ERROR', '', { root: true })
          }, 0)
          return res
        })
        console.log(response)
      return response
    },
    async updateProfile({ commit, getters }, data) {
      commit('utils/SET_LOADING', true, { root: true })
      let avatar = getters.user.avatar
      let dataUpdated = await axios.put(`/users`, data)
        .then(res => {
          const { data } = res
          data.avatar = avatar
          localStorage.setItem('user', JSON.stringify(data))
          commit('UPDATE_PROFILE', data)
          return res
        })
        .catch(err => {
          commit('utils/SET_ERROR', err, { root: true })
          return err
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING', false, { root: true })
            commit('utils/SET_ERROR', '', { root: true })
          }, 0)
          return res
        })
      return dataUpdated
    },
    async follow({ commit }, userToFollowId) {
      commit('utils/SET_LOADING', true, { root: true })
      let response = await axios.post(`/users/${userToFollowId}/follow`)
        .catch(err => {
          commit('utils/SET_ERROR', err, { root: true })
          return err.response
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING', false, { root: true })
            commit('utils/SET_ERROR', '', { root: true })
          }, 0)
          return res
        })
      return response
    },
    async unfollow({ commit }, userToUnFollowId) {
      commit('utils/SET_LOADING', true, { root: true })
      let response = await axios.post(`/users/${userToUnFollowId}/unfollow`)
        .catch(err => {
          commit('utils/SET_ERROR', err, { root: true })
          return err.response
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING', false, { root: true })
            commit('utils/SET_ERROR', '', { root: true })
          }, 0)
          return res
        })
      return response
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    accessToken(state) {
      return state.accessToken
    }
  }
}