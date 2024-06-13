import { IProduct } from '../interfaces/Product'
import axios from './axiosConfig'

export const fetchProducts = async (): Promise<IProduct[]> => {
  const response = await axios.get<IProduct[]>('products')
  return response.data
}

export const fetchProduct = async (id: string): Promise<IProduct> => {
  const response = await axios.get<{ data: IProduct }>(
    `produtos?idProduto=${id}`
  )
  return response.data.data
}
