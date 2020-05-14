import axios from 'axios';

import { SET_STREAM } from '../constants';

export default {
  namespaced: true,
  state: {
    newestBlogs: [],
    newestDiscussions: [],
    newestBookReviews: [],
    newestMovieReviews: [],
    newestFoodReviews: [],
    newestSongs: [],
    newestPodcast: [],
    metadata: {},
  },
  mutations: {
    [SET_STREAM](state, payload) {
      state.newestBlogs = payload.data.newestBlogs;
      state.newestDiscussions = payload.data.newestDiscussions;
      state.newestBookReviews = payload.data.newestBookReviews;
      state.newestMovieReviews = payload.data.newestMovieReviews;
      state.newestFoodReviews = payload.data.newestFoodReviews;
      state.newestSongs = payload.data.newestSongs;
      state.newestPodcasts = payload.data.newestPodcasts;

      state.metadata = payload.metadata;
    },
  },
  actions: {
    async getStream({ commit }) {
      commit('utils/SET_LOADING', true, { root: true });
      const res = await axios
        .get('/stream')
        .then(res => {
          commit('SET_STREAM', { data: res.data, metadata: res.metadata });
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
