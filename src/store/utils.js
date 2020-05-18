import {
  SET_ERROR,
  SET_LOADING,
  SET_LOADMORE,
  SET_LOADING_UPLOAD,
  SET_LOADING_API,
  SET_LOADING_GET_POSTS,
} from './constants';

const utils = {
  namespaced: true,
  state: {
    isLoading: false,
    errorMes: '',
    isLoadmore: false,
    isLoadingUpload: false,
    isLoadingAPI: false,
    isLoadingGetPosts: false,
  },
  mutations: {
    [SET_LOADING](state, payload = false) {
      state.isLoading = payload;
    },
    [SET_LOADING_UPLOAD](state, payload = false) {
      state.isLoadingUpload = payload;
    },
    [SET_LOADING_API](state, payload = false) {
      state.isLoadingAPI = payload;
    },
    [SET_ERROR](state, payload = '') {
      state.errorMes = payload;
    },
    [SET_LOADMORE](state, payload = false) {
      state.isLoadmore = payload;
    },
    [SET_LOADING_GET_POSTS](state, payload = false) {
      state.isLoadingGetPosts = payload;
    },
  },
  actions: {
    setLoading({ commit }, payload) {
      commit('SET_LOADING', payload);
    },
  },
};

export default utils;
