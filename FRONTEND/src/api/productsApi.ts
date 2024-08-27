import qs from 'qs';
import { IProduct, ProductQueryType } from '../interfaces/Product';
import axios from './axiosConfig';

export const fetchProducts = async (query: ProductQueryType): Promise<IProduct[]> => {
  const response = await axios.get<IProduct[]>(`products?${qs.stringify(query)}`);
  console.log('fetchProducts response:', response.data);

  return response.data;
};

export const fetchProduct = async (id: string): Promise<IProduct> => {
  const response = await axios.get<{ data: IProduct }>(`products/${id}`);
  console.log('fetchProductID response:', response.data.data);

  return response.data.data;
};
