import api from '../api/axios-config'
import { IUser, IUserCreateParams } from '../interfaces/User'

export const fetchUser = async (): Promise<IUser> => {
  try {
    const response = await api.get<IUser>(`/bling/user`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter dados da API:', error)
    throw error
  }
}

export const createUser = async (): Promise<IUserCreateParams> => {
  try {
    const response = await api.get<IUserCreateParams>(`/user`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter detalhes do produto:', error)
    throw error
  }
}
