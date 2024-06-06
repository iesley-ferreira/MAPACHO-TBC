import { Product } from '../store/ducks/products/types'
import axios from './axiosConfig'

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<{ data: Product[] }>('produtos')
  return response.data.data
}
