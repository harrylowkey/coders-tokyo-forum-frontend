import axios from 'axios';

import { APIS } from '@/mixins/api-endpoints';

import { SET_DISCUSSIONS, LOAD_MORE_DISCUSSIONS } from '../constants';

export default {
  namespaced: true,
  state: {
    discussions: [],
    metadata: {},
  },
  mutations: {
    [SET_DISCUSSIONS](state, payload) {
      state.discussions = payload.data;
      state.metadata = payload.metadata;
    },
    [LOAD_MORE_DISCUSSIONS](state, payload) {
      state.discussions.push(...payload.data);
      state.metadata = payload.metadata;
    },
  },
  actions: {
    async getDiscussions({ commit }, options = { limit: 10, page: 1 }) {
      commit('utils/SET_LOADING', true, { root: true });
      const res = await axios
        .get(
          APIS.GET_POSTS({
            type: 'discussion',
            limit: options.limit,
            page: options.page,
          }),
        )
        .then(res => {
          commit('SET_DISCUSSIONS', { data: res.data, metadata: res.metadata });
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

    async loadMoreDiscussions({ commit }, options = { limit: 10, page: 1 }) {
      commit('utils/SET_LOADMORE', true, { root: true });
      const res = await axios
        .get(
          APIS.GET_POSTS({
            type: 'discussion',
            limit: options.limit,
            page: options.page,
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
