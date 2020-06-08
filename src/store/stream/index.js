import axios from 'axios';

import { APIS } from '@/mixins/api-endpoints';

import { SET_STREAM, SET_TRENDING_AUDIOS } from '../constants';

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
    trendingAudios: [],
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
    [SET_TRENDING_AUDIOS](state, payload) {
      state.trendingAudios = payload;
    },
  },
  actions: {
    async getStream({ commit }, data = {}) {
      commit('utils/SET_LOADING', true, { root: true });
      const limitTopPosts = (data && data.limitTopPosts) || 10;
      const limitTopTags = (data && data.limitTopTags) || 10;
      const [topPosts, topTags, trendingAudios] = await Promise.all([
        axios.get(APIS.GET_TOP_POSTS(limitTopPosts)),
        axios.get(APIS.GET_TOP_TAGS(limitTopTags)),
        axios.get(APIS.GET_TRENDING_AUDIOS),
      ]);

      commit('SET_STREAM', { topPosts: topPosts.data, topTags: topTags.data });
      commit('SET_TRENDING_AUDIOS', trendingAudios.data);
      commit('utils/SET_LOADING', false, { root: true });
    },
  },
};
