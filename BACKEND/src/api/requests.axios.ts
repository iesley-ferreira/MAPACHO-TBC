import axios from 'axios'
import dotenv from 'dotenv';

dotenv.config();

type AxiosRequestType = {
  method: 'get' | 'post' | 'put' | 'delete';
  BASE_URL: string;
  url: string;
  query?: string;
  data?: any;
  headers?: object
}
const axiosRequest = async ({ method, BASE_URL, url, data, headers  }: AxiosRequestType) => {
  const response = await axios({
    baseURL: BASE_URL,
    method,
    url,
    data,
    headers,
  })


  return response
} 

export default axiosRequest;
