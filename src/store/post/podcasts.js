import axios from 'axios';

import { SET_PODCASTS } from '../constants';

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
  },
  actions: {
    async getPodcasts({ commit }, options = { limit: 6, page: 1 }) {
      commit('utils/SET_LOADING', true, { root: true });
      const res = await axios
        .get(`/posts?type=song&limit=${options.limit}&page=${options.page}`)
        .then(res => {
          commit('SET_PODCASTS', { data: res.data, metadata: res.metadata });
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
