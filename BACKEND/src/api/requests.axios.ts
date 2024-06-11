import axios from 'axios'
import qs from 'qs';
import { QueryType } from '../types/Query.type';


type AxiosRequestType = {
  method: 'get' | 'post' | 'put' | 'delete';
  BASE_URL: string;
  url: string;
  query?: QueryType;
  data?: any;
  headers?: object
}

const axiosRequest = async ({ method, BASE_URL, url, data, headers, query }: AxiosRequestType) => {  
  const response = await axios({
    baseURL: BASE_URL,
    method,
    url,
    data,
    headers,
    params: query
  });  

  return response
} 

export default axiosRequest;
