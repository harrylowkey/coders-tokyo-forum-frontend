import axios from 'axios';

import { APIS } from '@/mixins/api-endpoints';

import { SET_FOOD_REVIEWS, LOAD_MORE_FOOD_REVIEWS } from '../../constants';

export default {
  namespaced: true,
  state: {
    foodReviews: [],
    metadata: {},
  },
  mutations: {
    [SET_FOOD_REVIEWS](state, payload) {
      state.foodReviews = payload.data;
      state.metadata = payload.metadata;
    },
    [LOAD_MORE_FOOD_REVIEWS](state, payload) {
      state.foodReviews.push(...payload.data);
      state.metadata = payload.metadata;
    },
  },
  actions: {
    async getFoodReviews({ commit }, data) {
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
          commit('SET_FOOD_REVIEWS', {
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

    async loadMoreFoodReviews({ commit }, data) {
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
          commit('LOAD_MORE_FOOD_REVIEWS', {
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
