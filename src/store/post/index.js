import axios from 'axios'
import { CREATE_DISCUSSION, SET_POST } from '../constants'

export default {
  namespaced: true,
  state: {
    discussions: [],
  },
  mutations: {
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
          return data
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
    },
    async deletePostById({ commit }, data) {
      commit('utils/SET_LOADING', true, { root: true })
      const response = await axios.delete(`/posts/${data.id}?type=${data.typeQuery}`)
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
      return response
    }
  }
}