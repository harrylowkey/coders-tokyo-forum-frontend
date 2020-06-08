import Vue from 'vue';
import Vuex from 'vuex';

import socket from './socket';
import utils from './utils';
import getters from './getters.js';
import post from './post';
import user from './user';
import stream from './stream';
import discussions from './post/discussions';
import blogs from './post/blogs';
import bookReviews from './post/bookReviews';
import foodReviews from './post/foodReviews';
import movieReviews from './post/movieReviews';
import songs from './post/songs';
import podcasts from './post/podcasts';
import player from './player';
import userDiscussions from './user/post/userDiscussions';
import userBlogs from './user/post/userBlogs';
import userBookReviews from './user/post/userBookReviews';
import userMovieReviews from './user/post/userMovieReviews';
import userFoodReviews from './user/post/userFoodReviews';
import userSongs from './user/post/userSongs';
import userPodcasts from './user/post/userPodcasts';
import userSavedDiscussions from './user/savedPost/userSavedDiscussions';
import userSavedBlogs from './user/savedPost/userSavedBlogs';
import userSavedBookReviews from './user/savedPost/userSavedBookReviews';
import userSavedMovieReviews from './user/savedPost/userSavedMovieReviews';
import userSavedFoodReviews from './user/savedPost/userSavedFoodReviews';
import userSavedSongs from './user/savedPost/userSavedSongs';
import userSavedPodcasts from './user/savedPost/userSavedPodcasts';
import searchTag from './tag/SearchTag';
import notifications from './notification';

Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: {
    socket,
    user,
    notifications,
    userDiscussions,
    userBlogs,
    userBookReviews,
    userMovieReviews,
    userFoodReviews,
    userSongs,
    userPodcasts,
    userSavedDiscussions,
    userSavedBlogs,
    userSavedBookReviews,
    userSavedMovieReviews,
    userSavedFoodReviews,
    userSavedSongs,
    userSavedPodcasts,
    post,
    discussions,
    blogs,
    bookReviews,
    foodReviews,
    movieReviews,
    podcasts,
    songs,
    player,
    stream,
    utils,
    searchTag,
  },
  getters,
});
