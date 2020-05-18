import axios from 'axios';

import { APIS } from '@/mixins/api-endpoints';

import { SET_BLOGS, LOAD_MORE_BLOGS } from '../constants';

export default {
  namespaced: true,
  state: {
    blogs: [],
    metadata: {},
  },
  mutations: {
    [SET_BLOGS](state, payload) {
      state.blogs = payload.data;
      state.metadata = payload.metadata;
    },
    [LOAD_MORE_BLOGS](state, payload) {
      state.blogs.push(...payload.data);
      state.metadata = payload.metadata;
    },
  },
  actions: {
    async getBlogs({ commit }, data) {
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
          commit('SET_BLOGS', { data: res.data, metadata: res.metadata });
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

    async loadMoreBlogs({ commit }, data) {
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
          commit('LOAD_MORE_BLOGS', {
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
