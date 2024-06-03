import { QueryType } from "../types/Query.type";
import axiosRequest from "./requests.axios";

const BASE_URL = 'https://www.bling.com.br'

type BlingRequestTypes = {
  url: '/Api/v3/oauth/token' | '/Api/v3/produtos'
  credentials?: string,
  method: 'post' | 'get' | 'delete' | 'put'
  data?: {
    grant_type: "authorization_code",
    code: string | undefined,
  } | {
    grant_type: "refresh_token",
    refresh_token: string | undefined,
  }
  token?: string
  query?: QueryType
}

const blingRequestAxios = async ({ url,  credentials, data, token, method, query, }: BlingRequestTypes) => axiosRequest({
  BASE_URL,
  method,
  url,
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": token ? `Bearer ${token}` : `Basic ${credentials}`,
    "Accept": "application/json",
  },
  data,
  query,
});

// ================== BLING_TOKEN =============================== //

const getToken = async (credentials: string, AUTHORIZATION_CODE: string | undefined) => blingRequestAxios({ url: "/Api/v3/oauth/token", method: 'post', credentials, data: { code: AUTHORIZATION_CODE, grant_type: 'authorization_code' } })
const refreshToken = async (credentials: string, refresh_token: string) => blingRequestAxios({ url: "/Api/v3/oauth/token", method: 'post', credentials, data: { refresh_token, grant_type: "refresh_token" } })

// ================== BLING_PRODUCTS =========================== //

const getAllProducts = async (token: string, query?: any) => blingRequestAxios({ url: "/Api/v3/produtos", method: 'get', token, query })

const bling_request = {
  getToken,
  refreshToken,
  getAllProducts,
}

export default bling_request;