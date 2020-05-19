import axios from 'axios';

import { APIS } from '@/mixins/api-endpoints';

import { SET_SONGS, LOAD_MORE_SONGS } from '../../constants';

export default {
  namespaced: true,
  state: {
    songs: [],
    metadata: {},
  },
  mutations: {
    [SET_SONGS](state, payload) {
      state.songs = payload.data;
      state.metadata = payload.metadata;
    },
    [LOAD_MORE_SONGS](state, payload) {
      state.songs.push(...payload.data);
      state.metadata = payload.metadata;
    },
  },
  actions: {
    async getSongs({ commit }, data) {
      commit('utils/SET_LOADING_GET_POSTS', true, { root: true });
      const posts = await axios
        .get(
          APIS.GET_USER_POSTS({
            userId: data.userId,
            queries: {
              type: data.typeQuery,
              limit: data.options.limit,
              page: data.options.page,
            },
          }),
        )
        .then(res => {
          commit('SET_SONGS', { data: res.data, metadata: res.metadata });
          return res;
        })
        .catch(err => {
          if (err) {
            commit('utils/SET_ERROR', err, { root: true });
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

    async loadMoreSongs({ commit }, data) {
      commit('utils/SET_LOADMORE', true, { root: true });
      const res = await axios
        .get(
          APIS.GET_USER_POSTS({
            userId: data.userId,
            queries: {
              type: data.typeQuery,
              limit: data.options.limit,
              page: data.options.page,
            },
          }),
        )
        .then(res => {
          commit('LOAD_MORE_SONGS', {
            data: res.data,
            metadata: res.metadata,
          });
          return res;
        })
        .catch(err => {
          commit('utils/SET_ERROR', err, { root: true });
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
