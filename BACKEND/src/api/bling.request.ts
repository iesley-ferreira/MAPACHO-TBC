import axiosRequest from "./requests.axios";

const BASE_URL = 'https://www.bling.com.br'

type BlingRequestTypes = {
  url: '/Api/v3/oauth/token'
  credentials: string
}

const blingRequestAxios = async ({ url,  credentials, AUTHORIZATION_CODE }: BlingRequestTypes & { AUTHORIZATION_CODE: string | undefined }) => axiosRequest({
  BASE_URL,
  method: 'post',
  url,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": `Basic ${credentials}`,
  },
  data: {
    grant_type: "authorization_code",
    code: AUTHORIZATION_CODE,
  }
});

// ================== REFRESH_TOKEN ===============================//


const refreshToken = async (credentials: string, AUTHORIZATION_CODE: string | undefined) => blingRequestAxios({ url: "/Api/v3/oauth/token", credentials, AUTHORIZATION_CODE })


const bling_request = {
  refreshToken,
}

export default bling_request;