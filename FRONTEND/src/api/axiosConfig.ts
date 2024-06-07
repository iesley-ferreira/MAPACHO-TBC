import axios from 'axios'
import { base_url } from '../../devConfig.json'

const api = axios.create({
  baseURL: `http://${base_url}:3001/bling`, // http ou https? Substituir pela URL do backend
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
