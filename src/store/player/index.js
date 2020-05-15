import {
  ADD_TO_PLAYLIST,
  SET_PLAYLIST,
  UPDATE_STATUS,
  UPDATE_PLAYING_PAUSE,
  TOGGLE_SHOW_PLAYER,
  SWITCH_AUDIO,
} from '../constants';

export default {
  namespaced: true,
  state: {
    playlist: [],
    isPlaying: false,
    isShowPlayer: false,
    currentAudioPlaying: {},
    isSwitch: false,
    audioSwitchIndex: -1
  },
  mutations: {
    [ADD_TO_PLAYLIST](state, payload) {
      state.playlist.push(payload);
      if (state.playlist.length > 10) {
        state.playlist.shift()
      }
    },
    [SET_PLAYLIST](state, payload) {
      state.playlist = payload;
    },
    [UPDATE_STATUS](state, payload) {
      state.status = payload;
    },
    [UPDATE_PLAYING_PAUSE](state, payload) {
      if (payload.status === true) {
        const audioToPlay = state.playlist.find(audio => audio._id === payload.audio._id);
        audioToPlay.isPlaying = true;
        state.currentAudioPlaying = audioToPlay;
      }

      if (payload.status === false) {
        const audioToPause = state.playlist.find(audio => audio._id === payload.audio._id);
        audioToPause.isPlaying = false;
        state.currentAudioPlaying.isPlaying = false;
      }
      state.isPlaying = payload.status;
    },
    [TOGGLE_SHOW_PLAYER](state, payload = true) {
      state.isShowPlayer = payload;
    },
    [SWITCH_AUDIO](state, payload) {
      state.isPlaying = false;
      setTimeout(() => {
        state.isSwitch = payload.status;
        state.currentAudioPlaying = payload.audio;
        const audioToSwitchIndex = state.playlist.findIndex(audio => audio._id === payload.audio._id);
        state.audioSwitchIndex = audioToSwitchIndex;
      }, 0);

      // reset switchStatus
      setTimeout(() => {
        state.isSwitch = false;
      });
    },
  },
  actions: {
    updatePlaying({ commit, state }, payload) {
      if (payload.status) {
        if (!state.playlist.length) {
          commit('ADD_TO_PLAYLIST', payload.audio);
        } else {
          const audioToPlay = state.playlist.find(_audio => _audio._id === payload.audio._id);
          if (!audioToPlay) {
            commit('ADD_TO_PLAYLIST', payload.audio);
          }
        }
      }
      commit('UPDATE_PLAYING_PAUSE', payload);
      return state.currentAudioPlaying;
    },

    toggleShowPlayer({ commit }, payload) {
      commit('TOGGLE_SHOW_PLAYER', payload);
    },
    getAudioState({ state }, _id) {
      const audio = state.playlist.find(audio => audio._id === _id);
      if (!audio) return false;
      return audio.isPlaying;
    },
    switchAudio({ commit, state }, payload) {
      const audioToSwitch = state.playlist.find(_audio => _audio._id === payload.audio._id);
      if (!audioToSwitch) {
        commit('ADD_TO_PLAYLIST', payload.audio);
      }
      commit('SWITCH_AUDIO', payload);
    },
  },
};
