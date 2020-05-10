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
    async createPost({ commit }, data) {
      commit('utils/SET_LOADING', true, { root: true })
      const post = await axios.post(`/posts/${data.type}`, data)
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
      return post
    },
    async getPostById({ commit }, data) {
      commit('utils/SET_LOADING', true, { root: true })
      const post = await axios.get(`/posts/${data.id}?type=${data.typeQuery}`)
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
      return post
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
    },
    async uploadFiles({ commit }, formData) {
      commit('utils/SET_LOADING', true, { root: true })
      const response = await axios.post('/files/upload/foodPhotos', formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
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

      return response
    },
    async deleteFile({ commit }, { fileId }) {
      commit('utils/SET_LOADING', true, { root: true })
      const response = await axios.delete(`/files/${fileId}`)
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
    },
    async uploadPhoto({ commit }, formData) {
      commit('utils/SET_LOADING', true, { root: true })
      const response = await axios.post('/files/upload/photo?type=photo', formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
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

      return response
    },
  }
}