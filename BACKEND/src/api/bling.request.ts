import { QueryType } from '../types/Query.type';
import axiosRequest from './requests.axios';

const BASE_URL = 'https://www.bling.com.br';

type BlingRequestTypes = {
  url: '/Api/v3/oauth/token' | '/Api/v3/produtos' | '/Api/v3/produtos/variacoes' | string;
  credentials?: string;
  method: 'post' | 'get' | 'delete' | 'put';
  data?:
    | {
        grant_type: 'authorization_code';
        code: string;
      }
    | {
        grant_type: 'refresh_token';
        refresh_token: string;
      };
  token?: string;
  query?: QueryType;
};

const blingRequestAxios = async ({
  url,
  credentials,
  data,
  token,
  method,
  query,
}: BlingRequestTypes) =>
  axiosRequest({
    BASE_URL,
    method,
    url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token ? `Bearer ${token}` : `Basic ${credentials}`,
      Accept: 'application/json',
    },
    data,
    query,
  });

// ================== BLING_TOKEN =============================== //

const getToken = async (credentials: string, AUTHORIZATION_CODE: string) =>
  blingRequestAxios({
    url: '/Api/v3/oauth/token',
    method: 'post',
    credentials,
    data: { code: AUTHORIZATION_CODE, grant_type: 'authorization_code' },
  });
const refreshToken = async (credentials: string, refresh_token: string) =>
  blingRequestAxios({
    url: '/Api/v3/oauth/token',
    method: 'post',
    credentials,
    data: { refresh_token, grant_type: 'refresh_token' },
  });

// ================== BLING_PRODUCTS =========================== //

const getAllProducts = async (token: string, query?: QueryType) =>
  blingRequestAxios({
    url: '/Api/v3/produtos',
    method: 'get',
    token,
    query: { criterio: '1', tipo: 'P', limite: '28' },
  });

// ================== BLING_PRODUCTS_CATEGORY_ID =========================== //

const getProductsByCategoryId = async (token: string, categoryId: string) => {
  return blingRequestAxios({
    url: `/Api/v3/produtos`,
    method: 'get',
    token,
    query: { criterio: '1', tipo: 'P', limite: '28', idCategoria: categoryId },
  });
};

// ================== BLING_PRODUCTS_VARIATIONS =========================== //
const getProductsByVariation = async (token: string, fatherProduct: string) => {
  return blingRequestAxios({
    url: `Api/v3/produtos/${fatherProduct}`,
    method: 'get',
    token,
  });
};

// ================== BLING_CATEGORIES =========================== //

const getAllCategories = async (token: string, query?: QueryType) =>
  blingRequestAxios({
    url: '/Api/v3/categorias/produtos',
    method: 'get',
    token,
    query,
  });

const bling_request = {
  getToken,
  refreshToken,
  getAllProducts,
  getProductsByVariation,
  getAllCategories,
  getProductsByCategoryId,
};

export default bling_request;
