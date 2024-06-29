import axios from 'axios';
import { env } from '../env';

const API_KEY = env.API_KEY_META;
const API_URL = env.API_URL_META;

export async function fetchPosts() {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
}
