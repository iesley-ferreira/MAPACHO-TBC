import { ActionType } from 'typesafe-actions';
import { insufficientStockItems } from '../../../interfaces/payment';
import { TransformedProduct } from '../../../interfaces/Product';
import * as actions from './actions';

export enum OrderActionTypes {
  CREATE_PREFERENCE_REQUEST = 'CREATE_PREFERENCE_REQUEST',
  CREATE_PREFERENCE_SUCCESS = 'CREATE_PREFERENCE_SUCCESS',
  CREATE_PREFERENCE_FAILURE = 'CREATE_PREFERENCE_FAILURE',
  PROCESS_PAYMENT_REQUEST = 'PROCESS_PAYMENT_REQUEST',
  PROCESS_PAYMENT_SUCCESS = 'PROCESS_PAYMENT_SUCCESS',
  PROCESS_PAYMENT_FAILURE = 'PROCESS_PAYMENT_FAILURE',
}
export type OrderActions = ActionType<typeof actions>;

export interface OrderState {
  readonly preferenceId: string | undefined;
  readonly paymentId: string | null;
  readonly paymentStatus: string | null;
  readonly paymentStatusDetails: string | null;
  readonly ticketUrl: string | null;
  readonly paymentDateOfExpiration: string | null;
  readonly loading: boolean;
  readonly error: boolean;
  readonly message: string;
  readonly insufficientStockItems: insufficientStockItems[] | null;
}

export type OrderInfo = {
  discountCode: string | null;
  discountValue: number | null;
  shippingMethod: string;
  shippingValue: number;
  totalAmount: number;
  customerId: number;
};

export interface createPreferenceData {
  items: TransformedProduct[];
  orderInfo: OrderInfo;
}

export type createPreferenceFailureType = {
  message: string;
  insufficientStockItems?: insufficientStockItems[];
};

export interface processPaymentResponse {
  payment_id: number;
  payment_status: statusString;
  payment_status_detail: string;
  ticket_url: string;
  date_of_expiration: string;
}

export type statusString =
  | 'pending'
  | 'approved'
  | 'in_process'
  | 'in_mediation'
  | 'rejected'
  | 'cancelled'
  | 'refunded';

export type preferenceId = string;
export type paymentId = string;

export interface formData {
  token: string;
  issuer_id: string;
  installments: number;
  payment_method_id: string;
  transaction_amount: number;
  description: string;
  payer: {
    email: string;
    first_name: string;
    last_name: string;
    identification: {
      number: string;
      type: string;
    };
  };
}
