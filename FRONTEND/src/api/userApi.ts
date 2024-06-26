import { AxiosResponse } from 'axios';
import {
  IUser,
  IUserCreateParams,
  IUserCreateResponse,
  IUserLogin,
  IUserLoginResponse,
  IUserUpdate,
  IVerifyAuthCodeResponse,
} from '../interfaces/User';
import axios from './axiosConfig';

export const fetchUser = async (): Promise<IUser> => {
  const response = await axios.get<IUser>('user');
  console.log(response.data);
  return response.data;
};

export const loginUser = async (user: IUserLogin): Promise<IUserLoginResponse> => {
  try {
    console.log('loginAPI');

    const response = await axios.post<IUserLoginResponse>('user/login', user);
    console.log('loginAPIRESPONSE', response.data);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log('error.response', error.response);
      return {
        status: error.response.status,
        message: error.response.data.result.data.message,
        user: error.response.data.result.data.user,
      };
    } else {
      return {
        status: 500,
        message: 'Erro no servidor. Tente novamente mais tarde.',
        user: null,
      };
    }
  }
};

export const createUser = async (
  user: IUserCreateParams,
): Promise<AxiosResponse<IUserCreateResponse>> => {
  const response = await axios.post<IUserCreateResponse>('user/signUp', user);

  return response;
};

export const verifyAuthCode = async (
  email: string,
  code: string,
): Promise<IVerifyAuthCodeResponse> => {
  const response = await axios.post<IVerifyAuthCodeResponse>('auth/verifyAuthCode', {
    email,
    code,
  });

  return response.data;
};

export const updateUser = async (user: IUserUpdate) => {
  const response = await axios.put<IUserUpdate>('user', user);
  console.log(response.data);
  return response.data;
};
