import qs from 'qs';
import { IProduct } from '../interfaces/Product';
import axios from './axiosConfig';

type ProductQueryType = {
  pagina: number;
  limite: number;
  idCategoria?: string;
  nome?: string;
};

export const fetchProducts = async (query: ProductQueryType): Promise<IProduct[]> => {
  const response = await axios.get<IProduct[]>(`products?${qs.stringify(query)}`);
  console.log(response.data);

  return response.data;
};

export const fetchProduct = async (id: string): Promise<IProduct> => {
  const response = await axios.get<{ data: IProduct }>(`products/${id}`);
  console.log(response.data.data);

  return response.data.data;
};
