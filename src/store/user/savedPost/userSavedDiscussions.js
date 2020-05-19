import axios from 'axios';

import { APIS } from '@/mixins/api-endpoints';

import { SET_DISCUSSIONS, LOAD_MORE_DISCUSSIONS } from '../../constants';

export default {
  namespaced: true,
  state: {
    savedDiscussions: [],
    metadata: {},
  },
  mutations: {
    [SET_DISCUSSIONS](state, payload) {
      state.savedDiscussions = payload.data;
      state.metadata = payload.metadata;
    },
    [LOAD_MORE_DISCUSSIONS](state, payload) {
      state.savedDiscussions.push(...payload.data);
      state.metadata = payload.metadata;
    },
  },
  actions: {
    async getDiscussions({ commit }, data) {
      commit('utils/SET_LOADING_GET_POSTS', true, { root: true });
      const posts = await axios
        .get(
          APIS.GET_USER_SAVED_POSTS({
            queries: {
              type: data.typeQuery,
              limit: data.options.limit,
              page: data.options.page,
            },
          }),
        )
        .then(res => {
          commit('SET_DISCUSSIONS', { data: res.data, metadata: res.metadata });
          return res;
        })
        .catch(err => {
          if (err) {
            commit('utils/SET_ERROR', err.response.data.message, { root: true });
          }
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING_GET_POSTS', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return posts;
    },

    async loadMoreDiscussions({ commit }, data) {
      commit('utils/SET_LOADMORE', true, { root: true });
      const res = await axios
        .get(
          APIS.GET_USER_SAVED_POSTS({
            queries: {
              type: data.typeQuery,
              limit: data.options.limit,
              page: data.options.page,
            },
          }),
        )
        .then(res => {
          commit('LOAD_MORE_DISCUSSIONS', {
            data: res.data,
            metadata: res.metadata,
          });
          return res;
        })
        .catch(err => {
          commit('utils/SET_ERROR', err.response.data.message, { root: true });
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADMORE', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return res;
    },
  },
};
