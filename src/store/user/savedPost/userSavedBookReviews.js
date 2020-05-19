import axios from 'axios';

import { APIS } from '@/mixins/api-endpoints';

import { SET_BOOK_REVIEWS, LOAD_MORE_BOOK_REVIEWS } from '../../constants';

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
    [LOAD_MORE_BOOK_REVIEWS](state, payload) {
      state.bookReviews.push(...payload.data);
      state.metadata = payload.metadata;
    },
  },
  actions: {
    async getBookReviews({ commit }, data) {
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
          commit('SET_BOOK_REVIEWS', {
            data: res.data,
            metadata: res.metadata,
          });
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

    async loadMoreBookReviews({ commit }, data) {
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
          commit('LOAD_MORE_BOOK_REVIEWS', {
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
