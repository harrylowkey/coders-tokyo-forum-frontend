import { SET_ERROR, SET_LOADING, SET_LOADMORE } from './constants';

const utils = {
  namespaced: true,
  state: {
    isLoading: false,
    errorMes: '',
    isLoadmore: false,
  },
  mutations: {
    [SET_LOADING](state, payload = false) {
      state.isLoading = payload;
    },
    [SET_ERROR](state, payload = '') {
      state.errorMes = payload;
    },
    [SET_LOADMORE](state, payload = false) {
      state.isLoadmore = payload;
    }
  },
  actions: {
    setLoading({ commit }, payload) {
      commit('SET_LOADING', payload);
    },
  },
};

export default utils;
