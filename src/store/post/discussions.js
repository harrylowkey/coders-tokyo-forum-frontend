import axios from 'axios';

import { SET_DISCUSSIONS } from '../constants';

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
  },
  actions: {
    async getDiscussions({ commit }, options = { limit: 10, page: 1 }) {
      commit('utils/SET_LOADING', true, { root: true });
      const res = await axios
        .get(
          `/posts?type=discussion&limit=${options.limit}&page=${options.page}`,
        )
        .then(res => {
          commit('SET_DISCUSSIONS', { data: res.data, metadata: res.metadata });
          return res;
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
      return res;
    },
  },
};
