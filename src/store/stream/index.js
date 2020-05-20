import axios from 'axios';

import { APIS } from '@/mixins/api-endpoints';

import { SET_STREAM } from '../constants';

export default {
  namespaced: true,
  state: {
    topDiscussions: [],
    topBlogs: [],
    topBookReviews: [],
    topMovieReviews: [],
    topFoodReviews: [],
    topSongs: [],
    topPodcasts: [],
    topTags: [],
  },
  mutations: {
    [SET_STREAM](state, payload) {
      state.topDiscussions = payload.topPosts.discussion;
      state.topBlogs = payload.topPosts.blog;
      state.topBookReviews = payload.topPosts.book;
      state.topMovieReviews = payload.topPosts.movie;
      state.topFoodReviews = payload.topPosts.food;
      state.topSongs = payload.topPosts.song;
      state.topPodcasts = payload.topPosts.podcast;
      state.topTags = payload.topTags;
    },
  },
  actions: {
    async getStream({ commit }, data = {}) {
      commit('utils/SET_LOADING', true, { root: true });
      const limitTopPosts = (data && data.limitTopPosts) || 10;
      const limitTopTags = (data && data.limitTopTags) || 10;
      const [topPosts, topTags] = await Promise.all([
        axios.get(APIS.GET_TOP_POSTS(limitTopPosts)),
        axios.get(APIS.GET_TOP_TAGS(limitTopTags)),
      ]);

      commit('SET_STREAM', { topPosts: topPosts.data, topTags: topTags.data });
      commit('utils/SET_LOADING', false, { root: true });
    },
  },
};
