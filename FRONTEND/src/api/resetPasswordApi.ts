import { ResetPasswordApiResponse } from '../store/ducks/password/types';
import axios from './axiosConfig';

export const resetPassword = async (email: string): Promise<ResetPasswordApiResponse> => {
  console.log('resetPassword: ', email);

  try {
    const response = await axios.post<ResetPasswordApiResponse, any>(
      `/reset-password/request/${email}`,
    );
    console.log('API-RESPONSE : ', response);
    return response;
  } catch (error: any) {
    if (error.response) {
      console.log('resetPassword error: ', error.response);
      return error.response;
    } else {
      return { status: 500, data: { message: 'Erro desconhecido' } };
    }
  }
};
