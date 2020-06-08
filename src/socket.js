import io from 'socket.io-client';

import { SOCKET_URL } from './config';

const socket = io.connect(SOCKET_URL, {
  transports: ['websocket'],
  upgrade: false,
});

export default socket;
