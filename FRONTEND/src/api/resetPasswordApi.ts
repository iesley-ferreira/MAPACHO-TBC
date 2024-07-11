import { ResetPasswordApiResponse } from '../store/ducks/password/types';
import axios from './axiosConfig';

export const resetPassword = async (email: string): Promise<ResetPasswordApiResponse> => {
  console.log('resetPassword: ', email);

  try {
    const response = await axios.post<ResetPasswordApiResponse, any>(
      `/reset-password/request/${email}`,
    );
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

export const setNewPassword = async (
  token: string,
  newPassword: string,
): Promise<ResetPasswordApiResponse> => {
  try {
    const url = `/reset-password/${token}`;

    const response = await axios.post(url, { newPassword });

    return response;
  } catch (error: any) {
    if (error.response) {
      console.error('Erro na resposta da API:', error.response);
      return error.response;
    } else if (error.request) {
      console.error('Erro na requisição:', error.request);
      return { status: 500, data: { message: 'Erro na requisição' } };
    } else {
      console.error('Erro desconhecido:', error.message);
      return { status: 500, data: { message: 'Erro desconhecido' } };
    }
  }
};
