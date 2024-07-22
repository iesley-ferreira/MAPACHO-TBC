import { createAction } from 'typesafe-actions';
import {
  IMercadoPagoCreatePixRequest,
  IMercadoPagoCreatePixResponse,
} from '../../../interfaces/mercadoPago';
import { OrderActionTypes } from './types';

export const generateOrderByPixRequest = createAction(
  OrderActionTypes.GENERATE_ORDER_BY_PIX_REQUEST,
)<IMercadoPagoCreatePixRequest>();

export const generateOrderByPixSuccess = createAction(
  OrderActionTypes.GENERATE_ORDER_BY_PIX_SUCCESS,
)<IMercadoPagoCreatePixResponse>();

export const generateOrderByPixFailure = createAction(
  OrderActionTypes.GENERATE_ORDER_BY_PIX_FAILURE,
)<string>();
