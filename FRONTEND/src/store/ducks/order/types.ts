import { ActionType } from 'typesafe-actions';
import { IMercadoPagoCreatePixRequest } from '../../../interfaces/mercadoPago';
import * as actions from './actions';

export enum OrderActionTypes {
  GENERATE_ORDER_BY_PIX_REQUEST = 'GENERATE_ORDER_BY_PIX_REQUEST',
  GENERATE_ORDER_BY_PIX_SUCCESS = 'GENERATE_ORDER_BY_PIX_SUCCESS',
  GENERATE_ORDER_BY_PIX_FAILURE = 'GENERATE_ORDER_BY_PIX_FAILURE',
}
export type OrderActions = ActionType<typeof actions>;

export interface OrderState {
  readonly order: IMercadoPagoCreatePixRequest;
  readonly ticketUrl: string;
  readonly loading: boolean;
  readonly error: boolean;
  readonly message: string;
}
