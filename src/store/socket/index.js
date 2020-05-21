import { SET_TOTAL_ONLINE_MEMBERS, SOCKET_MESSAGECHANNEL } from '../constants';

export default {
  namespaced: true,
  state: {
    online: 0,
    socketMessage: ''
  },
  mutations: {
    SET_TOTAL_ONLINE_MEMBERS(state, payload) {
      state.online = payload;
    },
    SOCKET_MESSAGECHANNEL(state, message) {
      state.socketMessage = message;
    }
  },
  actions: {
    setOnlineMembers({ commit }, total) {
      commit('SET_TOTAL_ONLINE_MEMBERS', total)
    }
  }
};