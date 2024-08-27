import { createPreferenceResponse } from '../interfaces/payment';
import { createPreferenceData } from '../interfaces/Product';
import { formData, processPaymentResponse } from '../store/ducks/order/types';
import axios from './axiosConfig';

export const createPreference = async (
  data: createPreferenceData,
): Promise<createPreferenceResponse> => {
  try {
    const response = await axios.post<createPreferenceResponse>(
      `/payments/create_preference`,
      data,
    );
    console.log('RESPONSE CREATE PREFERENCE:', response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log('ERROR RESPONSE:', error.response);

      return {
        status: error.response.status,
        message: error.response.data.result.data.message,
      };
    } else {
      return {
        status: 500,
        message: 'Erro no servidor. Tente novamente mais tarde.',
      };
    }
  }
};

export const processPayment = async (
  formData: formData,
): Promise<{ data: processPaymentResponse }> => {
  const response = await axios.post('/payments/process_payment', formData);

  return response.data;
};

export const capturePayment = async (paymentId: string): Promise<any[]> => {
  console.log('Capturing Payment: ', paymentId);
  const response = await axios.post(`/payments/capture_payment`, { paymentId });
  console.log('Capturing Payment RESPONSE: ', response.data.data);

  return response.data.data;
};
