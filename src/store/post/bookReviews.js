import axios from 'axios';

import { APIS } from '@/mixins/api-endpoints';

import { SET_BOOK_REVIEWS, LOAD_MORE_BOOK_REVIEWS } from '../constants';

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
    async getBookReviews({ commit }, options = { limit: 5, page: 1 }) {
      commit('utils/SET_LOADING', true, { root: true });
      const res = await axios
        .get(
          APIS.GET_POSTS({
            type: 'book',
            limit: options.limit,
            page: options.page,
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
    async loadMoreBookReviews({ commit }, options = { limit: 10, page: 1 }) {
      commit('utils/SET_LOADMORE', true, { root: true });
      const res = await axios
        .get(
          APIS.GET_POSTS({
            type: 'book',
            limit: options.limit,
            page: options.page,
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
