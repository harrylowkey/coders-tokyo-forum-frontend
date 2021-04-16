require('dotenv').config();

let BACKEND_URL = 'https://54.151.207.118/api/v1';
let SOCKET_URL = 'https://54.151.207.118:8888';

if (process.env.VUE_APP_ENV === 'production') {
  BACKEND_URL = 'http://172.31.40.8/api/v1';
  SOCKET_URL = 'http://172.31.40.8:8888';
}

export { BACKEND_URL, SOCKET_URL };
