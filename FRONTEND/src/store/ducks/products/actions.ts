import { createAction } from 'typesafe-actions'
import { Product, ProductActionTypes } from './types'

export const fetchProductsRequest = createAction(
  ProductActionTypes.FETCH_PRODUCTS_REQUEST
)<void>()

export const fetchProductsSuccess = createAction(
  ProductActionTypes.FETCH_PRODUCTS_SUCCESS
)<Product[]>()

export const fetchProductsFailure = createAction(
  ProductActionTypes.FETCH_PRODUCTS_FAILURE
)<string>()
