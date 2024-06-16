import axios from 'axios';
import { QueryType } from '../types/Query.type';

type AxiosRequestType = {
  method: 'get' | 'post' | 'put' | 'delete';
  BASE_URL?: string;
  url: string;
  query?: QueryType;
  data?: any;
  headers?: object;
};

const axiosRequest = async ({
  method,
  BASE_URL,
  url,
  data,
  headers,
  query,
}: AxiosRequestType) => {
  // axiosRetry(axios, {
  //   retries: 3, // Número de tentativas
  //   retryDelay: (retryCount) => {
  //     return Math.pow(2, retryCount) * 1000; // Exponential backoff: 1000ms, 2000ms, 4000ms
  //   },
  //   retryCondition: (error) => {
  //     return error.response?.status === 429; // Tentar novamente apenas em caso de erro 429
  //   },
  // });

  try {
    const response = await axios({
      baseURL: BASE_URL,
      method,
      url,
      data,
      headers,
      params: query,
    });
    return response as any;
  } catch (error) {
    throw error;
  }
};

export default axiosRequest;
