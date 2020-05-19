import axios from 'axios';

import { APIS } from '@/mixins/api-endpoints';

import { SET_PODCASTS, LOAD_MORE_PODCASTS } from '../../constants';

export default {
  namespaced: true,
  state: {
    podcasts: [],
    metadata: {},
  },
  mutations: {
    [SET_PODCASTS](state, payload) {
      state.podcasts = payload.data;
      state.metadata = payload.metadata;
    },
    [LOAD_MORE_PODCASTS](state, payload) {
      state.podcasts.push(...payload.data);
      state.metadata = payload.metadata;
    },
  },
  actions: {
    async getPodcasts({ commit }, data) {
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
          commit('SET_PODCASTS', { data: res.data, metadata: res.metadata });
          return res;
        })
        .catch(err => {
          if (err) {
            commit('utils/SET_ERROR', err.response.data.message, {
              root: true,
            });
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

    async loadMorePodcasts({ commit }, data) {
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
          commit('LOAD_MORE_PODCASTS', {
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
