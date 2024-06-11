import { ActionType } from 'typesafe-actions'
import { IProduct } from '../../../interfaces/Product'
import * as actions from './actions'

export enum ProductActionTypes {
  FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST',
  FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE',
}

export interface ProductsState {
  readonly products: IProduct[]
  readonly loading: boolean
  readonly error: boolean
}

export type ProductActions = ActionType<typeof actions>
