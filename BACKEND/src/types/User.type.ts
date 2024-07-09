import { IOrder, OrderInputType } from './Order.type';

export type UserType = {
  id: string;
  name: string;
  email: string;
  cep?: string;
  address?: string;
  city?: string;
  country?: string;
  password?: string | null;
  img_profile?: string | null;
  google_id?: string | null;
  created_at: Date;
  updated_at: Date;
  isPending?: boolean;
  orders: IOrder[] | null;
};

export type UserLoginType = {
  email: string;
  password: string;
};

export type IUserGoogleLogin = {
  email: string;
  name: string;
  img_profile: string;
  google_id: string;
};

export type UserInputType = Omit<
  UserType,
  | 'id'
  | 'cep'
  | 'address'
  | 'city'
  | 'country'
  | 'isPending'
  | 'created_at'
  | 'updated_at'
  | 'orders'
>;
