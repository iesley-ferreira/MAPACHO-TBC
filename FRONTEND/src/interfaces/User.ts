import { IProduct } from './Product';

export interface IOrder {
  id: string;
  total: number;
  status: string;
  products: IProduct[] | [];
  created_at: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserGoogleLogin {
  email: string;
  name: string;
  img_profile: string;
  google_id: string;
}

export interface IUserLoginResponse {
  status: number;
  message: string;
  user: IUser | null;
  token?: string | null;
}

export interface IUserGoogleLoginResponse {
  data: {
    status: number;
    message: string;
    user: IUser | null;
    token?: string | null;
  };
}

export interface IUser {
  id: number;
  name?: string;
  email: string;
  img_profile?: string;
  cell_phone?: string;
  address?: IUserAddress;
  orders?: IOrder[] | [];
  isPending?: boolean | null;
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
