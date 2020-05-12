import Vue from 'vue'
import Vuex from 'vuex'

import utils from './utils'
import getters from './getters.js';

import user from './user'
import post from './post'
import stream from './stream'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user,
    post,
    stream,
    utils
  },
  getters
})
