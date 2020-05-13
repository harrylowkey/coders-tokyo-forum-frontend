import Vue from 'vue';
import Vuex from 'vuex';

import utils from './utils';
import getters from './getters.js';
import user from './user';
import post from './post';
import stream from './stream';


Vue.use(Vuex);

import user from './user';
import post from './post';
import stream from './stream';
import discussions from './post/discussions';
import blogs from './post/blogs';
import bookReviews from './post/bookReviews';
import foodReviews from './post/foodReviews';
import movieReviews from './post/movieReviews';
import songs from './post/songs';
import podcasts from './post/podcasts';



export const store = new Vuex.Store({
  modules: {
    user,
    post,
    discussions,
    blogs,
    bookReviews,
    foodReviews,
    movieReviews,
    podcasts,
    songs,
    stream,
    utils,
  },
  getters,
});
