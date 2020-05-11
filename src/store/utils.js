import { SET_ERROR, SET_LOADING } from './constants'

const utils = {
  namespaced: true,
  state: {
    isLoading: false,
    errorMes: ''
  },
  mutations: {
    [SET_LOADING](state, payload = false) {
      state.isLoading = payload
    },
    [SET_ERROR](state, payload = '') {
      state.errorMes = payload
    }
  },
  actions: {
    setLoading({ commit }, payload) {
      commit('SET_LOADING', payload)
    }
  }
}

export default utils