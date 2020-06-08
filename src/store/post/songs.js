import axios from 'axios';

import { APIS } from '@/mixins/api-endpoints';

import { SET_SONGS, LOAD_MORE_SONGS } from '../constants';

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
    async getSongs({ commit }, options = { limit: 6, page: 1 }) {
      commit('utils/SET_LOADING', true, { root: true });
      const res = await axios
        .get(
          APIS.GET_POSTS({
            type: 'song',
            limit: options.limit,
            page: options.page,
          }),
        )
        .then(res => {
          commit('SET_SONGS', { data: res.data, metadata: res.metadata });
          return res;
        })
        .catch(err => {
          commit('utils/SET_ERROR', err.response.data.message, { root: true });
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return res;
    },

    async loadMoreSongs({ commit }, options = { limit: 6, page: 1 }) {
      commit('utils/SET_LOADMORE', true, { root: true });
      const res = await axios
        .get(
          APIS.GET_POSTS({
            type: 'song',
            limit: options.limit,
            page: options.page,
          }),
        )
        .then(res => {
          commit('LOAD_MORE_SONGS', { data: res.data, metadata: res.metadata });
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
