import axios from 'axios';

import { APIS } from '@/mixins/api-endpoints';

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
    async getMovieReviews({ commit }, data) {
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
          commit('SET_MOVIE_REVIEWS', {
            data: res.data,
            metadata: res.metadata,
          });
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

    async loadMoreMovieReviews({ commit }, data) {
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
          commit('LOAD_MORE_MOVIE_REVIEWS', {
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
