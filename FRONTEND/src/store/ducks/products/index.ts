import { createReducer } from 'typesafe-actions'
import { IProductId } from '../../../interfaces/Product'
import * as actions from './actions'
import { ProductActions, ProductsState } from './types'

const initialState: ProductsState = {
  products: [],
  product: {} as IProductId,
  loading: false,
  error: false,
}

const productReducer = createReducer<ProductsState, ProductActions>(
  initialState
)
  .handleAction(actions.fetchProductsRequest, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.fetchProductsSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    products: action.payload,
  }))
  .handleAction(actions.fetchProductsFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))
  .handleAction(actions.fetchProductRequest, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.fetchProductSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    product: action.payload,
  }))
  .handleAction(actions.fetchProductFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))

export default productReducer
