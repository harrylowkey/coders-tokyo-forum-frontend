import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import utils from './utils'
import getters from './getters.js';

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user,
    utils
  },
  getters
})
