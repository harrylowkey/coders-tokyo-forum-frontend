require('dotenv').config();

let BACKEND_URL = 'http://localhost:3000/api/v1';
let SOCKET_URL = 'http://localhost:8888';

if (process.env.VUE_APP_ENV === 'production') {
  BACKEND_URL = 'http://34.87.169.3:3000/api/v1'
  SOCKET_URL = 'http://34.87.169.3:8888'
}

export { BACKEND_URL, SOCKET_URL };
