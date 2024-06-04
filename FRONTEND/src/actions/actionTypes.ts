import { ICategory } from '../interfaces/Category'
import { IProduct } from '../interfaces/Product'

export const SET_PRODUCTS = 'SET_PRODUCTS'
export const START_LOADING = 'START_LOADING'
export const END_LOADING = 'END_LOADING'
export const SET_ERROR = 'SET_ERROR'

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST'
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE'

interface FetchProductsRequestAction {
  type: typeof FETCH_PRODUCTS_REQUEST
}

interface FetchProductsSuccessAction {
  type: typeof FETCH_PRODUCTS_SUCCESS
  payload: IProduct[]
}

interface FetchProductsFailureAction {
  type: typeof FETCH_PRODUCTS_FAILURE
  payload: string
}

interface FetchCategoriesRequestAction {
  type: typeof FETCH_CATEGORIES_REQUEST
}

interface FetchCategoriesSuccessAction {
  type: typeof FETCH_CATEGORIES_SUCCESS
  payload: ICategory[]
}

interface FetchCategoriesFailureAction {
  type: typeof FETCH_CATEGORIES_FAILURE
  payload: string
}

export type ProductActionTypes =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailureAction

export type CategoryActionTypes =
  | FetchCategoriesRequestAction
  | FetchCategoriesSuccessAction
  | FetchCategoriesFailureAction

export const fetchProductsRequest = (): ProductActionTypes => ({
  type: FETCH_PRODUCTS_REQUEST,
})

export const fetchProductsSuccess = (
  products: IProduct[]
): ProductActionTypes => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
})

export const fetchProductsFailure = (error: string): ProductActionTypes => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
})
