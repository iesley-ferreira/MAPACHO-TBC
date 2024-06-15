import { ActionType } from 'typesafe-actions'
import { IProduct, IProductId } from '../../../interfaces/Product'
import * as actions from './actions'

export enum ProductsActionTypes {
  FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST',
  FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE',
}

export enum ProductsByIdActionTypes {
  FETCH_PRODUCTS_BY_ID_REQUEST = 'FETCH_PRODUCTS_BY_ID_REQUEST',
  FETCH_PRODUCTS_BY_ID_SUCCESS = 'FETCH_PRODUCTS_BY_ID_SUCCESS',
  FETCH_PRODUCTS_BY_ID_FAILURE = 'FETCH_PRODUCTS_BY_ID_FAILURE',
}

export enum ProductActionTypes {
  FETCH_PRODUCT_ID_REQUEST = 'FETCH_PRODUCT_ID_REQUEST',
  FETCH_PRODUCT_ID_SUCCESS = 'FETCH_PRODUCT_ID_SUCCESS',
  FETCH_PRODUCT_ID_FAILURE = 'FETCH_PRODUCT_ID_FAILURE',
}

export interface ProductsState {
  readonly products: IProduct[]
  readonly filteredProducts: IProduct[]
  readonly product: IProductId
  readonly loading: boolean
  readonly error: boolean
}

export type ProductActions = ActionType<typeof actions>
