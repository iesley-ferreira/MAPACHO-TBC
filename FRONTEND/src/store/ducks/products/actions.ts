import { createAction } from 'typesafe-actions'
import { IProduct, IProductId } from '../../../interfaces/Product'
import { ProductActionTypes, ProductsActionTypes } from './types'

// actions de products

export const fetchProductsRequest = createAction(
  ProductsActionTypes.FETCH_PRODUCTS_REQUEST
)<void>()

export const fetchProductsSuccess = createAction(
  ProductsActionTypes.FETCH_PRODUCTS_SUCCESS
)<IProduct[]>()

export const fetchProductsFailure = createAction(
  ProductsActionTypes.FETCH_PRODUCTS_FAILURE
)<string>()

// actions de product

export const fetchProductRequest = createAction(
  ProductActionTypes.FETCH_PRODUCT_ID_REQUEST
)<string>()

export const fetchProductSuccess = createAction(
  ProductActionTypes.FETCH_PRODUCT_ID_SUCCESS
)<IProductId>()

export const fetchProductFailure = createAction(
  ProductActionTypes.FETCH_PRODUCT_ID_FAILURE
)<string>()
