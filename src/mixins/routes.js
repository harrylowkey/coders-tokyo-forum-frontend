export const ROUTES = {
  HOME: '/',
  LOGIN: '/signin',
  LOGOUT: '/singout',
  REGISTER: '/signup',
  STREAM(type = '') {
    return `/stream${type}`;
  },
  WRITE_POST(type = '') {
    return `/writePost${type}`;
  },
  USER_PROFILE({ id, username }) {
    if (id) return `/users/${id}`;
    if (username) return `/users/${username}`;
  },
  PODCAST(id) {
    return `/podcasts/${id}?type=podcast`;
  },
  SONG(id) {
    return `/songs/${id}?type=song`;
  },
  BLOG(id) {
    return `/blogs/${id}?type=blog`;
  },
  DISCUSSION(id) {
    return `/discussions/${id}?type=discussion`;
  },
  BOOK_REVIEWS(id) {
    return `/bookReviews/${id}?type=book`;
  },
  MOVIE_REVIEWS(id) {
    return `/movieReviews/${id}?type=movie`;
  },
  FOOD_REVIEWS(id) {
    return `/foodReviews/${id}?type=food`;
  },
  SEARCH_ARTIST({ name, type }) {
    return `/posts?artist=${name}&type=${type}`;
  },
  SEARCH_TAG({ tagName, postType }) {
    return `/posts?tag=${tagName.slice(1)}&type=${postType}`;
  },
};
