export const APIS = {
  UPLOAD_BANNER: 'http://localhost:3000/api/v1/files/upload/cover?type=cover',
  UPLOAD_AUDIO: 'http://localhost:3000/api/v1/files/upload/audio?type=audio',
  UPLOAD_AVATAR: 'http://localhost:3000/api/v1/files/upload/avatar?type=avatar',
  UPLOAD_FOOD_PHOTOS: '/files/upload/foodPhotos',
  UPLOAD_FILE(type) {
    return `/file/upload/${type}?type=${type}`;
  },
  GET_POSTS({ type, limit, page, queries = {} }) {
    if (!Object.keys(queries).length) {
      return `/posts?type=${type}&limit=${limit}&page=${page}`;
    } else {
      const queriesArray = Object.keys(queries).map(
        key => `${key}=${queries[key]}`,
      );
      return `/posts?type=${type}&limit=${limit}&page=${page}?${queriesArray.join(
        '&',
      )}`;
    }
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
  WRITE_POST(type) {
    return `/posts/${type}`;
  },
  EDIT_POST(id, type) {
    return `/posts/${type}s/${id}?type=${type}`;
  }
};
