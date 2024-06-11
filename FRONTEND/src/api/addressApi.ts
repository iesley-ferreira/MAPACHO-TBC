import { IAddress } from '../store/ducks/shipping/types'
import axios from './axiosConfig'

export const fetchAddress = async (zipCode: string): Promise<IAddress> => {
  const response = await axios.get<IAddress>(`endereco?zipCode=${zipCode}`)
  return response.data
}
