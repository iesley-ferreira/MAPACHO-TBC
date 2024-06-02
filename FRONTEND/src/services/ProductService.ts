import api from '../api/axios-config'
import { IProduct, ProductResponse } from '../interfaces/Product'

export const fetchProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await api.get<ProductResponse>(`/bling/produtos`)
    return response.data.data
  } catch (error) {
    console.error('Erro ao obter dados da API:', error)
    throw error
  }
}

export const fetchProductsById = async (
  productId: string
): Promise<IProduct> => {
  try {
    const response = await api.get<IProduct>(`/bling/produtos/${productId}`)
    return response.data
  } catch (error) {
    console.error('Erro ao obter detalhes do produto:', error)
    throw error
  }
}
