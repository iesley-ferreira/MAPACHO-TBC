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

export const createPreference = async (): Promise<any[]> => {
  console.log('Creating Preference');
  const response = await axios.post('/mercado-pago/preference_id');
  console.log('RESPONSE: ', response.data.data);

  return response.data.data;
};

export const capturePayment = async (paymentId: string): Promise<any[]> => {
  console.log('Capturing Payment');
  const response = await axios.post(`/mercado-pago/capture_payment`, { paymentId });
  console.log('RESPONSE: ', response.data.data);

  return response.data.data;
};
