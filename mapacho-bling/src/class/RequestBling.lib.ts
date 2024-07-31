import axios, { AxiosRequestConfig } from 'axios';
import { IGetFistToken, IRefreshToken } from '../interfaces/instance.interface';

class RequestBling {
  private axios = axios.create({
    baseURL: 'https://bling.com.br/Api/v3',
  });

  private request(request: AxiosRequestConfig) {
    try {
      return this.axios(request);
    } catch (error) {
      console.error(error);
      return {
        data: {
          message: 'Erro na requisição',
        },
        status: 500,
      };
    }
  }

  public async getFistToken(data: IGetFistToken) {
    const credentials = Buffer.from(`${data.clientId}:${data.clientSecret}`).toString('base64');

    const response = await this.request({
      url: '/oauth/token',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
        'Accept': 'application/json',
      },
      data: {
        code: data.authCode,
        grant_type: 'authorization_code',
      },
    });

    return response.data;
  }

  public async refreshToken(data: IRefreshToken) {
    const credentials = Buffer.from(`${data.clientId}:${data.clientSecret}`).toString('base64');

    const response = await this.request({
      url: '/oauth/token',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
        'Accept': 'application/json',
      },
      data: {
        refresh_token: data.refreshToken,
        grant_type: 'refresh_token',
      },
    });

    return response.data;
  }
}

export default RequestBling;
