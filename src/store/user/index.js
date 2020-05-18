/* eslint-disable camelcase */
import axios from 'axios';

import { APIS } from '@/mixins/api-endpoints';

import { SIGN_IN, SIGN_OUT, UPLOAD_AVATAR, UPDATE_PROFILE } from '../constants';

export default {
  namespaced: true,
  state: {
    user: {},
    isAuthenticated: false,
    accessToken: '',
  },
  mutations: {
    [SIGN_IN](state, data) {
      state.user = data.user;
      state.accessToken = data.accessToken;
      state.isAuthenticated = true;
    },
    [SIGN_OUT](state) {
      state.user = {};
      state.accessToken = '';
      state.isAuthenticated = false;
    },
    [UPLOAD_AVATAR](state, { data }) {
      state.user.avatar = data;
    },
    [UPDATE_PROFILE](state, data) {
      state.user = data;
    },
  },
  actions: {
    async signIn({ commit }, authData) {
      commit('utils/SET_LOADING', true, { root: true });
      axios
        .post('/auth/signin', {
          email: authData.email,
          password: authData.password,
        })
        .then(res => {
          const {
            data: { user, access_token },
          } = res;
          localStorage.setItem('accessToken', access_token);
          localStorage.setItem('user', JSON.stringify(user));
          commit('SIGN_IN', { user, accessToken: access_token });
        })
        .catch(err => {
          if (err) {
            commit('utils/SET_ERROR', err, { root: true });
          }
        })
        .then(() => {
          setTimeout(() => {
            commit('utils/SET_LOADING', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
        });
    },
    async signOut({ commit }) {
      commit('utils/SET_LOADING', true, { root: true });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      commit('SIGN_OUT');
      setTimeout(() => {
        commit('utils/SET_LOADING', false, { root: true });
      });
    },
    tryAutoSignIn({ commit }) {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        return;
      }
      const user = localStorage.getItem('user');
      commit('SIGN_IN', { user: JSON.parse(user), accessToken });
    },
    async uploadAvatar({ commit }, { avatar }) {
      commit('utils/SET_LOADING_UPLOAD', true, { root: true });
      const response = await axios
        .post('/users/avatars', { avatar })
        .then(res => {
          let user = localStorage.getItem('user');
          user = JSON.parse(user);
          user.avatar = res.data;
          localStorage.setItem('user', JSON.stringify(user));
          commit('UPLOAD_AVATAR', { data: res.data });
          return res;
        })
        .catch(err => {
          if (err) {
            commit('utils/SET_ERROR', err, { root: true });
          }
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING_UPLOAD', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return response;
    },
    async updateProfile({ commit, getters }, data) {
      commit('utils/SET_LOADING_API', true, { root: true });
      const avatar = getters.user.avatar;
      const dataUpdated = await axios
        .put('/users', data)
        .then(res => {
          const { data } = res;
          data.avatar = avatar;
          localStorage.setItem('user', JSON.stringify(data));
          commit('UPDATE_PROFILE', data);
          return res;
        })
        .catch(err => {
          if (err) {
            commit('utils/SET_ERROR', err, { root: true });
          }
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING_API', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return dataUpdated;
    },
    async follow({ commit }, userToFollowId) {
      commit('utils/SET_LOADING_API', true, { root: true });
      const response = await axios
        .post(`/users/${userToFollowId}/follow`)
        .catch(err => {
          if (err) {
            commit('utils/SET_ERROR', err, { root: true });
          }
          return err.response;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING_API', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return response;
    },
    async unfollow({ commit }, userToUnFollowId) {
      commit('utils/SET_LOADING_API', true, { root: true });
      const response = await axios
        .post(`/users/${userToUnFollowId}/unfollow`)
        .catch(err => {
          if (err) {
            commit('utils/SET_ERROR', err, { root: true });
          }
          return err.response;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING_API', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return response;
    },
    async getByUsername({ commit }, { username }) {
      commit('utils/SET_LOADING', true, { root: true });
      const userProfile = await axios
        .get(APIS.GET_USER_PROFILE({ username }))
        .then(res => {
          return res.data;
        })
        .catch(err => {
          if (err) {
            commit('utils/SET_ERROR', err, { root: true });
          }
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return userProfile;
    },
    async getUserPosts(
      { commit },
      { userId, typeQuery, options = { limit: 5, page: 1 } },
    ) {
      commit('utils/SET_LOADING_GET_POSTS', true, { root: true });
      const posts = await axios
        .get(
          APIS.GET_USER_POSTS({
            userId,
            queries: {
              type: typeQuery,
              limit: options.limit,
              page: options.page,
            },
          }),
        )
        .catch(err => {
          if (err) {
            commit('utils/SET_ERROR', err, { root: true });
          }
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING_GET_POSTS', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return posts;
    },
    async loadmoreUserPosts(
      { commit },
      { userId, typeQuery, options = { limit: 5, page: 1 } },
    ) {
      commit('utils/SET_LOADMORE', true, { root: true });
      const res = await axios
        .get(
          APIS.GET_USER_POSTS({
            userId,
            queries: {
              type: typeQuery,
              limit: options.limit,
              page: options.page,
            },
          }),
        )
        .catch(err => {
          commit('utils/SET_ERROR', err, { root: true });
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADMORE', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return res;
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    accessToken(state) {
      return state.accessToken;
    },
  },
};
