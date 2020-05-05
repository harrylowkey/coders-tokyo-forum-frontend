import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import utils from './utils'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth,
    utils
  }
})
