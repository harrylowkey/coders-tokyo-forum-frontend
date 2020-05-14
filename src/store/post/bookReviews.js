import axios from 'axios';

import { SET_BOOK_REVIEWS } from '../constants';

export default {
  namespaced: true,
  state: {
    bookReviews: [],
    metadata: {},
  },
  mutations: {
    [SET_BOOK_REVIEWS](state, payload) {
      state.bookReviews = payload.data;
      state.metadata = payload.metadata;
    },
  },
  actions: {
    async getBookReviews({ commit }, options = { limit: 5, page: 1 }) {
      commit('utils/SET_LOADING', true, { root: true });
      const res = await axios
        .get(`/posts?type=book&limit=${options.limit}&page=${options.page}`)
        .then(res => {
          commit('SET_BOOK_REVIEWS', {
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
            commit('utils/SET_LOADING', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return res;
    },
  },
};
