import { Category } from '../store/ducks/categories/types'
import axios from './axiosConfig'

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get<{ data: Category[] }>('categorias')
  return response.data.data
}
