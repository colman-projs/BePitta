import { config } from '../globals';
import io from 'socket.io-client';

export const socket = io(config.serverHost);