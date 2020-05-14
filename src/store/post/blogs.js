import axios from 'axios';

import { SET_BLOGS, LOAD_MORE_BLOGS } from '../constants';

export default {
  namespaced: true,
  state: {
    blogs: [],
    metadata: {}
  },
  mutations: {
    [SET_BLOGS](state, payload) {
      state.blogs = payload.data;
      state.metadata = payload.metadata;
    },
    [LOAD_MORE_BLOGS](state, payload) {
      state.blogs.push(...payload.data);
      state.metadata = payload.metadata;
    }
  },
  actions: {
    async getBlogs({ commit }, options = { limit: 5, page: 1 }) {
      commit('utils/SET_LOADING', true, { root: true });
      const res = await axios
        .get(`/posts?type=blog&limit=${options.limit}&page=${options.page}`)
        .then(res => {
          commit('SET_BLOGS', { data: res.data, metadata: res.metadata });
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

    async loadMoreBlogs({ commit }, options = { limit: 10, page: 1 }) {
      commit('utils/SET_LOADMORE', true, { root: true });
      const res = await axios
        .get(
          `/posts?type=blog&limit=${options.limit}&page=${options.page}`
        )
        .then(res => {
          commit('LOAD_MORE_BLOGS', { data: res.data, metadata: res.metadata });
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
    }
  }
};
