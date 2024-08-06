import axios, { AxiosRequestConfig } from 'axios';
import { IGetFistToken, IRefreshToken } from '../interfaces/instance.interface';
import { IReturnToken } from '../interfaces/bling.interface';
import { AuthBlingModel } from '../models/authBling.model';
import cacheControll from '../cache/cache.controll';
import { CategoriesBlingType } from '../interfaces/Category.interface';

class RequestBling {
  private authBlingModel: AuthBlingModel = new AuthBlingModel();

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

  public async getFistToken(data: IGetFistToken): Promise<IReturnToken> {
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
        'Accept': '1.0',
      },
      data: {
        'refresh_token': data.refreshToken,
        'grant_type': 'refresh_token',
      },
    });

    return response.data;
  }

  public async getProducts() {

    const { data } = await this.request({
      url: '/produtos',
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': `Bearer ${cacheControll.token.get()}`,
      },
    });

    return data;
  }

  public async getAllCategories(): Promise<CategoriesBlingType[]> {

    console.log(cacheControll.token.get());

    const { data } = await this.request({
      url: '/categorias/produtos',
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': `Bearer ${cacheControll.token.get()}`,
      },
    });

    return data.data;
  }

  public async getProductsByVariation(fatherProduct: string) {

    const { data } = await this.request({
      url: `/produtos/${fatherProduct}`,
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': `Bearer ${cacheControll.token.get()}`,
      },
    });

    return data;
  }

  public async getProductsByCategory(category: number) {
      const { data } = await this.request({
        url: `/produtos`,
        method: 'get',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Authorization': `Bearer ${cacheControll.token.get()}`,
        },
        params: {
          'categoria': category,
        },
      });

      return data.data
  }
}

export default RequestBling;
