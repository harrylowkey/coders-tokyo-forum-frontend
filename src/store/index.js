import Vue from 'vue'
import Vuex from 'vuex'

import utils from './utils'
import getters from './getters.js';

import user from './user'
import post from './post'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user,
    post,
    utils
  },
  getters
})
