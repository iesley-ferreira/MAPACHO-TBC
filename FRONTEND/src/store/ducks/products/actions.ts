import { createAction } from 'typesafe-actions'
import { IProduct, IProductId } from '../../../interfaces/Product'
import {
  ProductsByIdActionTypes,
  ProductActionTypes,
  ProductsActionTypes,
} from './types'

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

// actions de filteredProducts

export const fetchProductsByIdRequest = createAction(
  ProductsByIdActionTypes.FETCH_PRODUCTS_BY_ID_REQUEST
)<string>()

export const fetchProductsByIdSuccess = createAction(
  ProductsByIdActionTypes.FETCH_PRODUCTS_BY_ID_SUCCESS
)<IProduct[]>()

export const fetchProductsByIdFailure = createAction(
  ProductsByIdActionTypes.FETCH_PRODUCTS_BY_ID_FAILURE
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
