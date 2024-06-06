import { createReducer } from 'typesafe-actions'
import * as actions from './actions'
import { ProductActions, ProductsState } from './types'

const initialState: ProductsState = {
  products: [],
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

export default productReducer
