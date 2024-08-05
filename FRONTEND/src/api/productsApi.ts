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
<<<<<<< HEAD
  console.log(response.data);

=======
>>>>>>> 130354f5b3a0e5fb676c88177bca140bc0dd8377
  return response.data;
};

export const fetchProduct = async (id: string): Promise<IProduct> => {
  const response = await axios.get<{ data: IProduct }>(`products/${id}`);
<<<<<<< HEAD
  console.log(response.data.data);

=======
>>>>>>> 130354f5b3a0e5fb676c88177bca140bc0dd8377
  return response.data.data;
};
