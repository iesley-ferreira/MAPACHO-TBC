import axios from 'axios';
import { env } from '../env';

const dev_url = env.VITE_DEV_URL;

const api = axios.create({
  baseURL: dev_url,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
