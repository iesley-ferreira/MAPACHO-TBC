import { IProduct } from './Product';

export interface IOrder {
  id: number;
  date: string;
  total: number;
  status: string;
  products: IProduct[] | [];
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  data: {
    message: string;
    token: string;
    user: IUser;
  };
}

export interface IUser {
  id: number;
  token?: string;
  name: string;
  email: string;
  img_profile?: string;
  cell_phone?: string;
  address?: IUserAddress;
  orders?: IOrder[] | [];
  created_at?: string;
}

export interface IUserAddress {
  zip_code: string;
  street: string;
  city: string;
  number: string;
  state: string;
  neighborhood: string;
  complement: string;
}

export interface IUserUpdate {
  id: string;
  name?: string;
  email?: string;
  cell_phone?: string;
  endereco?: IUserAddress;
}

export interface IUserCreateParams {
  name: string;
  email: string;
  password: string;
}

export interface IVerifyAuthCodeParams {
  email: string;
  code: string;
}

export interface IVerifyAuthCodeResponse {
  token: string;
}

export interface IUserCreateResponse {
  data: {
    message: string;
    user: IUser;
  };
  status: number;
}
