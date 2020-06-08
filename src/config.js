const path = require('path');

const mode = process.env.NODE_ENV || 'local';
const _path = `${path.join(__dirname, '../../.env')}.${mode}`;
require('dotenv').config({ path: _path });


const BACKEND_URL = `http://${process.env.BACKEND_IP}:3000/api/v1`;
const SOCKET_URL = `http://${process.env.SOCKET_IP}:8888`;



export { BACKEND_URL, SOCKET_URL };
