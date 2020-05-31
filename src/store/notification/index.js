import axios from 'axios';

import { APIS } from '@/mixins/api-endpoints';

import {
  SET_NOTIFICATIONS,
  LOADMORE_NOTIFICATIONS,
  DELETE_ALL_NOTIFICATIONS,
  TOGGLE_SHOW_NOTIF_LIST,
  UPDATE_NOTIFICATIONS,
} from '../constants';

export default {
  namespaced: true,
  state: {
    notifications: [],
    metadata: {},
    isShowNotifList: false,
    isNewNotif: true,
  },
  mutations: {
    [SET_NOTIFICATIONS](state, payload) {
      state.notifications = payload.data;
      state.metadata = payload.metadata;
    },
    [LOADMORE_NOTIFICATIONS](state, payload) {
      state.notifications.push(...payload.data);
      state.metadata = payload.metadata;
    },
    [DELETE_ALL_NOTIFICATIONS](state) {
      state.notifications = [];
      state.metadata = {};
    },
    [TOGGLE_SHOW_NOTIF_LIST](state, payload = false) {
      state.isShowNotifList = payload;
      if (state.isShowNotifList === true) {
        state.isNewNotif = false;
      }
    },
    [UPDATE_NOTIFICATIONS](state, payload) {
      state.notifications.unshift(payload);
      state.isNewNotif = true;
    },
  },
  actions: {
    async getNotifs({ commit }, options = { limit: 20, page: 1 }) {
      commit('utils/SET_LOADING', true, { root: true });
      const res = await axios
        .get(
          APIS.GET_NOTIFS({
            limit: options.limit,
            page: options.page,
          }),
        )
        .then(res => {
          commit('SET_NOTIFICATIONS', {
            data: res.data,
            metadata: res.metadata,
          });
          return res;
        })
        .catch(err => {
          commit('utils/SET_ERROR', err.response.data.message, { root: true });
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return res;
    },

    async loadMoreNotifs({ commit }, options = { limit: 20, page: 1 }) {
      commit('utils/SET_LOADMORE', true, { root: true });
      const res = await axios
        .get(
          APIS.GET_NOTIFS({
            limit: options.limit,
            page: options.page,
          }),
        )
        .then(res => {
          commit('LOADMORE_NOTIFICATIONS', {
            data: res.data,
            metadata: res.metadata,
          });
          return res;
        })
        .catch(err => {
          commit('utils/SET_ERROR', err.response.data.message, { root: true });
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
    toggleShowNotifList({ commit }, payload) {
      commit('TOGGLE_SHOW_NOTIF_LIST', payload);
    },
    updateNotifications({ commit }, payload) {
      commit('UPDATE_NOTIFICATIONS', payload);
    },
  },
};
