import axiosRequest from "./requests.axios";

const BASE_URL = 'https://www.bling.com.br'

type BlingRequestTypes = {
  url: '/Api/v3/oauth/token'
  credentials: string,
  data?: {
    grant_type: "authorization_code",
    code: string | undefined,
  } | {
    grant_type: "refresh_token",
    refresh_token: string | undefined,
  }
}

const blingRequestAxios = async ({ url,  credentials, data }: BlingRequestTypes) => axiosRequest({
  BASE_URL,
  method: 'post',
  url,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": `Basic ${credentials}`,
  },
  data,
});

// ================== REFRESH_TOKEN ===============================//


const getToken = async (credentials: string, AUTHORIZATION_CODE: string | undefined) => blingRequestAxios({ url: "/Api/v3/oauth/token", credentials, data: { code: AUTHORIZATION_CODE, grant_type: 'authorization_code' } })
const refreshToken = async (credentials: string, refresh_token: string) => blingRequestAxios({ url: "/Api/v3/oauth/token", credentials, data: { refresh_token, grant_type: "refresh_token" } })

const bling_request = {
  getToken,
  refreshToken,
}

export default bling_request;