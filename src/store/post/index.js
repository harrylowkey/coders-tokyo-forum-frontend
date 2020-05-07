import axios from 'axios'
import { CREATE_DISCUSSION } from '../constants'

export default {
  namespaced: true,
  state: {
    discussions: []
  },
  mutation: {
    [CREATE_DISCUSSION](state, data) {
      state.discussions.push(data)
    }
  },
  actions: {
    async CREATE_DISCUSSION({ commit }, data) {
      commit('utils/SET_LOADING', true, { root: true })
      const discussion = await axios.post('/posts/discussions', data, {
        headers: {
          Authorization: `Bearer ${getters.accessToken}`
        }
      }).then(res => {
        const { data: { data } } = res
        data.avatar = avatar
        localStorage.setItem('user', JSON.stringify(data))
        commit('UPDATE_PROFILE', data)
        return res
      })
        .catch(err => {
          commit('utils/SET_ERROR', err, { root: true })
          return err.response
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING', false, { root: true })
            commit('utils/SET_ERROR', '', { root: true })
          }, 0)
          return res
        })
      return dataU
    }
  }
}