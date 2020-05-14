import axios from 'axios';

import { SET_MOVIE_REVIEWS, LOAD_MORE_MOVIE_REVIEWS } from '../constants';

export default {
  namespaced: true,
  state: {
    movieReviews: [],
    metadata: {},
  },
  mutations: {
    [SET_MOVIE_REVIEWS](state, payload) {
      state.movieReviews = payload.data;
      state.metadata = payload.metadata;
    },
    [LOAD_MORE_MOVIE_REVIEWS](state, payload) {
      state.movieReviews.push(...payload.data);
      state.metadata = payload.metadata;
    },
  },
  actions: {
    async getMovieReviews({ commit }, options = { limit: 5, page: 1 }) {
      commit('utils/SET_LOADING', true, { root: true });
      const res = await axios
        .get(`/posts?type=movie&limit=${options.limit}&page=${options.page}`)
        .then(res => {
          commit('SET_MOVIE_REVIEWS', {
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

    async loadMoreMovieReviews({ commit }, options = { limit: 5, page: 1 }) {
      commit('utils/SET_LOADMORE', true, { root: true });
      const res = await axios
        .get(`/posts?type=movie&limit=${options.limit}&page=${options.page}`)
        .then(res => {
          commit('LOAD_MORE_MOVIE_REVIEWS', { data: res.data, metadata: res.metadata });
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
