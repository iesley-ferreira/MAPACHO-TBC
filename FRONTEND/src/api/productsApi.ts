import { IProduct } from '../interfaces/Product'
import axios from './axiosConfig'

export const fetchProducts = async (): Promise<IProduct[]> => {
  const response = await axios.get<IProduct[]>('products')
  return response.data
}

export const fetchProductsByCategoryId = async (
  categoryId: string
): Promise<IProduct[]> => {
  console.log('categoryId', categoryId)
  const response = await axios.get<IProduct[]>(
    `products/category/${categoryId}`
  )
  return response.data
}

export const fetchProduct = async (id: string): Promise<IProduct> => {
  const response = await axios.get<{ data: IProduct }>(`products/${id}`)
  return response.data.data
}
