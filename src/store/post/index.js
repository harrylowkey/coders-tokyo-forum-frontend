import axios from 'axios';

import { APIS } from '@/mixins/api-endpoints';

export default {
  namespaced: true,
  state: {
    discussions: [],
  },
  mutations: {},
  actions: {
    async createPost({ commit }, data) {
      commit('utils/SET_LOADING', true, { root: true });
      const post = await axios
        .post(APIS.WRITE_POST(data.type), data)
        .catch(err => {
          commit('utils/SET_ERROR', err, { root: true });
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return post;
    },
    async getPostById({ commit }, data) {
      commit('utils/SET_LOADING', true, { root: true });
      const post = await axios
        .get(APIS.GET_POST({ id: data.id, queries: { type: data.typeQuery } }))
        .then(res => {
          const { data, metadata } = res;
          data.metadata = metadata;
          return data;
        })
        .catch(err => {
          commit('utils/SET_ERROR', err, { root: true });
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return post;
    },
    async deletePostById({ commit }, data) {
      commit('utils/SET_LOADING', true, { root: true });
      const response = await axios
        .delete(
          APIS.GET_POST({ id: data.id, queries: { type: data.typeQuery } }),
        )
        .catch(err => {
          commit('utils/SET_ERROR', err, { root: true });
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return response;
    },
    async editPost({ commit }, {_id, data}) {
      commit('utils/SET_LOADING', true, { root: true });
      const response = await axios
        .put(APIS.EDIT_POST(_id, data.type), data)
        .catch(err => {
          commit('utils/SET_ERROR', err, { root: true });
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return response;
    },
    async uploadFiles({ commit }, formData) {
      commit('utils/SET_LOADING_UPLOAD', true, { root: true });
      const response = await axios
        .post(APIS.UPLOAD_FOOD_PHOTOS, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .catch(err => {
          commit('utils/SET_ERROR', err, { root: true });
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING_UPLOAD', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });

      return response;
    },
    async deleteFile({ commit }, { fileId }) {
      commit('utils/SET_LOADING_UPLOAD', true, { root: true });
      const response = await axios
        .delete(APIS.GET_FILE({ id: fileId }))
        .catch(err => {
          commit('utils/SET_ERROR', err, { root: true });
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING_UPLOAD', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return response;
    },
    async uploadPhoto({ commit }, formData) {
      commit('utils/SET_LOADING_UPLOAD', true, { root: true });
      const response = await axios
        .post(APIS.UPLOAD_FILE('photo'), formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .catch(err => {
          commit('utils/SET_ERROR', err, { root: true });
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING_UPLOAD', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });

      return response;
    },
    async uploadAudio({ commit }, formData) {
      commit('utils/SET_LOADING_UPLOAD', true, { root: true });
      const response = await axios
        .post(APIS.UPLOAD_FILE('audio'), formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .catch(err => {
          commit('utils/SET_ERROR', err, { root: true });
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING_UPLOAD', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });

      return response;
    },
  },
};
