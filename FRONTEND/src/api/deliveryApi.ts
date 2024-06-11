import { IDeliveryOptionPrice } from '../store/ducks/shipping/types'
import axios from './axiosConfig'

export const fetchDeliveryOptions = async (
  zipCode: string
): Promise<IDeliveryOptionPrice[]> => {
  const response = await axios.get<IDeliveryOptionPrice[]>(
    `melhorEnvio?zipCode=${zipCode}`
  )

  return response.data
}
