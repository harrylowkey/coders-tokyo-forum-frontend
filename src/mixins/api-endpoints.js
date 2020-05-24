import { BACKEND_URL } from '../config';

export const APIS = {
  UPLOAD_BANNER: `${BACKEND_URL}/files/upload/cover?type=cover`,
  UPLOAD_AUDIO: `${BACKEND_URL}/files/upload/audio?type=audio`,
  UPLOAD_AVATAR: `${BACKEND_URL}/files/upload/avatar?type=avatar`,
  UPLOAD_FOOD_PHOTOS: '/files/upload/foodPhotos',
  UPLOAD_FILE(type) {
    return `/files/upload/${type}?type=${type}`;
  },
  GET_POSTS(queryParams = {}) {
    const queriesArray = Object.keys(queryParams).map(
      key => `${key}=${queryParams[key]}`,
    );
    return `/posts?${queriesArray.join('&')}`;
  },
  GET_POST({ id, queries = {} }) {
    if (!Object.keys(queries).length) {
      return `/posts/${id}`;
    } else {
      const queriesArray = Object.keys(queries).map(
        key => `${key}=${queries[key]}`,
      );
      return `/posts/${id}?${queriesArray.join('&')}`;
    }
  },
  GET_FILE({ id }) {
    return `/files/${id}`;
  },
  GET_USER_PROFILE({ username }) {
    return `/users/profile/${username}`;
  },
  GET_USER_POSTS({ userId, queries = {} }) {
    const queriesArray = Object.keys(queries).map(
      key => `${key}=${queries[key]}`,
    );
    return `/posts/users/${userId}?${queriesArray.join('&')}`;
  },
  GET_USER_SAVED_POSTS({ queries = {} }) {
    const queriesArray = Object.keys(queries).map(
      key => `${key}=${queries[key]}`,
    );
    return `/posts/savedPosts/user?${queriesArray.join('&')}`;
  },
  GET_RECOMMEND_POSTS({ userId, type, postId }) {
    return `/posts/recommend/users/${userId}?type=${type}&postId=${postId}`;
  },
  WRITE_POST(type) {
    return `/posts/${type}`;
  },
  EDIT_POST(id, type) {
    let typeParam = `${type}s`;
    if (type === 'food') typeParam = type;
    return `/posts/${typeParam}/${id}?type=${type}`;
  },
  LIKE_POST(postId) {
    return `/posts/${postId}/like`;
  },
  UNLIKE_POST(postId) {
    return `/posts/${postId}/unlike`;
  },
  SAVE_POST(postId) {
    return `/posts/${postId}/save`;
  },
  UNSAVE_POST(postId) {
    return `/posts/${postId}/unsave`;
  },
  CHANGE_PASSWORD: '/auth/change-password',
  FORGOT_PASSWORD: '/auth/forgot-password',
  GET_CODE: '/auth/send-verify-code',
  SEARCH_POSTS_BY_TAGS({ tagNames, pagination }) {
    const tagNameQueries = tagNames.reduce(
      (tagNameQueries, tagName) => [...tagNameQueries, `tag=${tagName}`],
      [],
    );
    const paginationQueries = Object.keys(pagination).map(
      key => `${key}=${pagination[key]}`,
    );
    return `/posts/tags?${tagNameQueries.join('&')}&${paginationQueries.join(
      '&',
    )}`;
  },
  GET_TOP_TAGS(limit) {
    return `/posts/tags/statics?limit=${limit}`;
  },
  GET_TOP_POSTS(limit) {
    return `/posts/topPosts/statics?limit=${limit}`;
  },
  GET_TRENDING_AUDIOS: '/posts/audios/trending',
  LOAD_MORE_COMMENTS({ postId, pagination }) {
    const paginationQueries = Object.keys(pagination).map(
      key => `${key}=${pagination[key]}`,
    );
    return `/comments/loadmore/${postId}?${paginationQueries.join('&')}`;
  },
  COMMENT_POST(postId) {
    return `/comments/${postId}`;
  },
  REPLY_COMMENT(commentId) {
    return `/comments/reply/${commentId}`;
  },
  THREAD_REPLY_COMMENT(parentId, commentId) {
    return `/comments/thread/reply/${parentId}/${commentId}`;
  },
  DELETE_COMMENT(commentId) {
    return `/comments/${commentId}`;
  },
  GET_FOLLOWERS(userId) {
    return `/users/${userId}/followers`;
  },
  GET_FOLLOWING(userId) {
    return `/users/${userId}/following`;
  },
};
