import { IProduct } from '../interfaces/Product'
import axios from './axiosConfig'

export const fetchProducts = async (): Promise<IProduct[]> => {
  const response = await axios.get<{ data: IProduct[] }>('produtos')
  return response.data.data
}

export const fetchProduct = async (id: string): Promise<IProduct> => {
  console.log('ID', id)

  const response = await axios.get<{ data: IProduct }>(
    `produtos?idProduto=${id}`
  )
  return response.data.data
}
