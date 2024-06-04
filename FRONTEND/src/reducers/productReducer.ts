import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  ProductActionTypes,
} from '../actions/actionTypes'
import { IProduct } from '../interfaces/Product'

interface ProductState {
  products: IProduct[]
  isLoading: boolean
  error: string | null
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
}

const productReducer = (
  state = initialState,
  action: ProductActionTypes
): ProductState => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, isLoading: true, error: null }
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, isLoading: false, products: action.payload }
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
}

export default productReducer
