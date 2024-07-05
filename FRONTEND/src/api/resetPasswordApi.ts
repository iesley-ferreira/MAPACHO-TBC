import axios from './axiosConfig';

export const resetPassword = async (email: string): Promise<string> => {
  console.log('resetPassword: ', email);

  const response = await axios.post<string>(`/reset-password/request/${email}`);

  console.log('resetPassword response: ', response.data);
  return response.data;
};
