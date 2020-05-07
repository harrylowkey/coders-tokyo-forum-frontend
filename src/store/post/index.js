import axios from 'axios'
import { CREATE_DISCUSSION, SET_POST } from '../constants'

export default {
  namespaced: true,
  state: {
    discussions: [],
    discussion: {}
  },
  mutations: {
    [SET_POST](state, data) {
      state[data.type] = data
    }
  },
  actions: {
    async createDiscussion({ commit }, data) {
      commit('utils/SET_LOADING', true, { root: true })
      const discussion = await axios.post('/posts/discussions', data)
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
      return discussion
    },
    async getPostById({ commit }, data) {
      commit('utils/SET_LOADING', true, { root: true })
      const discussion = await axios.get(`/posts/${data.id}?type=${data.typeQuery}`)
        .then(res => {
          const { data, metadata } = res
          data.metadata = metadata
          commit('SET_POST', data)
          return res.data
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
      return discussion
    }
  }
}