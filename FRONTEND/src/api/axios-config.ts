import axios from 'axios'
import { myIp } from '../../devConfig.json'

const api = axios.create({
  baseURL: myIp,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Implementar lógica específica de erro, se necessário
    return Promise.reject(error)
  }
)

export default api
