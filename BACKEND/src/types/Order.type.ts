import { ProductInputType, ProductType } from "./Products.type";
import { UserType } from "./User.type";

export interface OrderType {
  id: string;
  user_id: string;
  payment_id: number;
  total: number;
  status: 'processing' | 'approved' | 'pending';
  created_at: Date;
  updated_at: Date;
  products: ProductType;
}

export interface OrderInputType {
  userId: string;
  products: ProductInputType[];
  total: number;
  paymentId: number;
  status?: 'processing' | 'approved' | 'pending'
}

export interface OrderUpdateInputType {
  idOrder: string;
  status: 'processing' | 'approved' | 'pending'
}
