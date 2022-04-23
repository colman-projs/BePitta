import axios from 'axios';
import { config } from '../globals';


export default axios.create({
    baseURL: `${config.serverHost}/restaurant/images`,
    withCredentials: true,
});

