import { IUser, IUserCreateParams, IUserUpdate } from '../interfaces/User'
import axios from './axiosConfig'

export const fetchUser = async (): Promise<IUser> => {
  const response = await axios.get<IUser>('user')
  console.log(response.data)
  return response.data
}

export const createUser = async (user: IUserCreateParams): Promise<IUser> => {
  const response = await axios.post<IUser>('user', user)
  return response.data
}

export const updateUser = async (user: IUserUpdate) => {
  const response = await axios.put<IUserUpdate>('user', user)
  console.log(response.data)
  return response.data
}
