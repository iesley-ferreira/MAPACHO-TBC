import axios from 'axios'
// import { base_url } from '../../devConfig.json'

const api = axios.create({
  baseURL: `http://localhost:3333/`, //  Substituir pela URL do backend
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
