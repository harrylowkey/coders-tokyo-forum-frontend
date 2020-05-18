import Vue from 'vue';
import Vuex from 'vuex';

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
import userDiscussions from './user/userDiscussions';
import userBlogs from './user/userBlogs';
import userBookReviews from './user/userBookReviews';
import userMovieReviews from './user/userMovieReviews';
import userFoodReviews from './user/userFoodReviews';
import userSongs from './user/userSongs';
import userPodcasts from './user/userPodcasts';

Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: {
    user,
    userDiscussions,
    userBlogs,
    userBookReviews,
    userMovieReviews,
    userFoodReviews,
    userSongs,
    userPodcasts,
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
  },
  getters,
});
