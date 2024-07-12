import { IMercadoPagoCreatePixRequest } from '../interfaces/mercadoPago';
import axios from './axiosConfig';

export const createPixOrder = async (
  orderData: IMercadoPagoCreatePixRequest,
): Promise<any[]> => {
  console.log('Creating Pix Order');
  const response = await axios.post('/mercado-pago/pix', orderData);
  console.log('RESPONSE: ', response.data.data);

  return response.data.data;
};
