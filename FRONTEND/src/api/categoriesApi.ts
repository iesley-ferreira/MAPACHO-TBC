import { ICategory } from '../interfaces/Category';
import axios from './axiosConfig';

export const fetchCategories = async (): Promise<ICategory[]> => {
  const response = await axios.get<{ data: ICategory[] }>('categories');
  return response.data.data;
};
