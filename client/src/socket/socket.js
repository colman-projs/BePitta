import { config } from '../globals';
import io from 'socket.io';

export const socket = io.connect(config.serverHost);