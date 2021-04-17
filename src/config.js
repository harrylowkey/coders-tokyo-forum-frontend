require('dotenv').config();

let BACKEND_URL = 'https://api.hongquangraem.cf/api/v1';
let SOCKET_URL = 'https://api.hongquangraem.cf';

if (process.env.VUE_APP_ENV === 'production') {
  BACKEND_URL = 'http://172.31.40.8/api/v1';
  SOCKET_URL = 'http://172.31.40.8';
}

export { BACKEND_URL, SOCKET_URL };
