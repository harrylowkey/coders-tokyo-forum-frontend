import axios from 'axios';

import { APIS } from '@/mixins/api-endpoints';

export default {
  namespaced: true,
  state: {
    discussions: [],
  },
  mutations: {},
  actions: {
    async createPost({ commit }, data) {
      commit('utils/SET_LOADING', true, { root: true });
      const post = await axios
        .post(APIS.WRITE_POST(data.type), data)
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
      return post;
    },
    async getPostById({ commit }, data) {
      commit('utils/SET_LOADING', true, { root: true });
      const post = await axios
        .get(APIS.GET_POST({ id: data.id, queries: { type: data.typeQuery } }))
        .then(res => {
          const { data, metadata } = res;
          data.metadata = metadata;
          return data;
        })
        .catch(err => {
          if (err) {
            commit('utils/SET_ERROR', err.response.message, {
              root: true,
            });
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
      return post;
    },
    async deletePostById({ commit }, data) {
      commit('utils/SET_LOADING', true, { root: true });
      const response = await axios
        .delete(
          APIS.GET_POST({ id: data.id, queries: { type: data.typeQuery } }),
        )
        .catch(err => {
          commit('utils/SET_ERROR', err.response.message, { root: true });
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return response;
    },
    async editPost({ commit }, { _id, data }) {
      commit('utils/SET_LOADING', true, { root: true });
      const response = await axios
        .put(APIS.EDIT_POST(_id, data.type), data)
        .catch(err => {
          commit('utils/SET_ERROR', err.response.message, { root: true });
          return err;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADING', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return response;
    },
    async uploadFiles({ commit }, formData) {
      commit('utils/SET_LOADING_UPLOAD', true, { root: true });
      const response = await axios
        .post(APIS.UPLOAD_FOOD_PHOTOS, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .catch(err => {
          commit('utils/SET_ERROR', err.response.message, { root: true });
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
    async deleteFile({ commit }, { fileId }) {
      commit('utils/SET_LOADING_UPLOAD', true, { root: true });
      const response = await axios
        .delete(APIS.GET_FILE({ id: fileId }))
        .catch(err => {
          commit('utils/SET_ERROR', err.response.message, { root: true });
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
    async uploadFile({ commit }, { formData, fileType }) {
      commit('utils/SET_LOADING_UPLOAD', true, { root: true });
      const response = await axios
        .post(APIS.UPLOAD_FILE(fileType), formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .catch(err => {
          commit('utils/SET_ERROR', err.response.message, { root: true });
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
    async likePost({ commit }, postId) {
      commit('utils/SET_LOADING_API', true, { root: true });
      const response = await axios
        .post(APIS.LIKE_POST(postId))
        .catch(err => {
          commit('utils/SET_ERROR', err.response.message, { root: true });
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
    async unlikePost({ commit }, postId) {
      commit('utils/SET_LOADING_API', true, { root: true });
      const response = await axios
        .post(APIS.UNLIKE_POST(postId))
        .catch(err => {
          commit('utils/SET_ERROR', err.response.message, { root: true });
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
    async savePost({ commit }, postId) {
      commit('utils/SET_LOADING_API', true, { root: true });
      const response = await axios
        .post(APIS.SAVE_POST(postId))
        .catch(err => {
          commit('utils/SET_ERROR', err.response.message, { root: true });
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
    async unsavePost({ commit }, postId) {
      commit('utils/SET_LOADING_API', true, { root: true });
      const response = await axios
        .post(APIS.UNSAVE_POST(postId))
        .catch(err => {
          commit('utils/SET_ERROR', err.response.message, { root: true });
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
    async loadmoreComments({ commit }, data) {
      const limit = data.limit || 5;
      const page = data.page || 1;
      commit('utils/SET_LOADMORE', true, { root: true });
      const comments = await axios
        .get(
          APIS.LOAD_MORE_COMMENTS({
            postId: data.postId,
            pagination: {
              limit,
              page,
            },
          }),
        )
        .then(res => {
          res.data = res.data.comments;
          return res;
        })
        .catch(err => {
          if (err) {
            commit('utils/SET_ERROR', err.response.message, { root: true });
          }
          return err.response;
        })
        .then(res => {
          setTimeout(() => {
            commit('utils/SET_LOADMORE', false, { root: true });
            commit('utils/SET_ERROR', '', { root: true });
          }, 0);
          return res;
        });
      return comments;
    },
    async commentPost({ commit }, { postId, content }) {
      commit('utils/SET_LOADING_API', true, { root: true });
      const response = await axios
        .post(APIS.COMMENT_POST(postId), { content })
        .catch(err => {
          commit('utils/SET_ERROR', err.response.message, { root: true });
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
    async deleteComment({ commit }, commentId) {
      commit('utils/SET_LOADING_API', true, { root: true });
      const response = await axios
        .delete(APIS.DELETE_COMMENT(commentId))
        .catch(err => {
          if (err) {
            commit('utils/SET_ERROR', err.response.message, { root: true });
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
  },
};
