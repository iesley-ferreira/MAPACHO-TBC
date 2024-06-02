import api from '../api/axios'

export const fetchUser = async () => {
  return api.get('/users').then((response) => response.data)
}
