import axios from 'axios';

import { APIS } from '@/mixins/api-endpoints';

import { SET_POSTS_BY_TAGS, LOAD_MORE_POST_BY_TAGS } from '../constants';

export default {
  namespaced: true,
  state: {
    postsMatchedTags: [],
    metadata: {},
  },
  mutations: {
    [SET_POSTS_BY_TAGS](state, payload) {
      state.postsMatchedTags = payload.data;
      state.metadata = payload.metadata;
    },
    [LOAD_MORE_POST_BY_TAGS](state, payload) {
      state.postsMatchedTags.push(...payload.data);
      state.metadata = payload.metadata;
    },
  },
  actions: {
    async searchPostsByTags(
      { commit },
      { tagNames, options = { limit: 5, page: 1 } },
    ) {
      commit('utils/SET_LOADING', true, { root: true });
      const res = await axios
        .get(
          APIS.SEARCH_POSTS_BY_TAGS({
            tagNames,
            pagination: options,
          }),
        )
        .then(res => {
          commit('SET_POSTS_BY_TAGS', {
            data: res.data,
            metadata: res.metadata,
          });
          return res;
        })
        .catch(err => {
          if (err) {
            commit('utils/SET_ERROR', err.response.data.message, {
              root: true,
            });
          }
          return err.response;
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

    async loadMorePosts(
      { commit },
      { tagNames, options = { limit: 5, page: 1 } },
    ) {
      commit('utils/SET_LOADMORE', true, { root: true });
      const res = await axios
        .get(
          APIS.SEARCH_POSTS_BY_TAGS({
            tagNames,
            pagination: options,
          }),
        )
        .then(res => {
          commit('LOAD_MORE_POST_BY_TAGS', {
            data: res.data,
            metadata: res.metadata,
          });
          return res;
        })
        .catch(err => {
          if (err) {
            commit('utils/SET_ERROR', err.response.data.message, {
              root: true,
            });
          }
          return err.response;
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
