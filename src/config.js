const path = require('path');

const mode = process.env.NODE_ENV || 'local';
const _path = `${path.join(__dirname, '../../.env')}.${mode}`;
require('dotenv').config({ path: _path });

const BACKEND_URL = `${process.env.BACKEND_URL}`;
const SOCKET_URL = `${process.env.SOCKET_URL}`;

export { BACKEND_URL, SOCKET_URL };
