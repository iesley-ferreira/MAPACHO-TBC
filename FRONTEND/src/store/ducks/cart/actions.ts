import { createAction } from 'typesafe-actions'
import { ICartItem } from '../../../interfaces/Cart'
import { IProduct } from '../../../interfaces/Product'
import { CartActionTypes } from './types'

export const addProductToCart = createAction(
  CartActionTypes.ADD_PRODUCT_TO_CART
)<{ product: IProduct; quantidade: number }>()

export const incrementProductQuantity = createAction(
  CartActionTypes.INCREMENT_PRODUCT_QUANTITY
)<number>() // product id

export const decrementProductQuantity = createAction(
  CartActionTypes.DECREMENT_PRODUCT_QUANTITY
)<number>() // product id

export const removeProductFromCart = createAction(
  CartActionTypes.REMOVE_PRODUCT_FROM_CART
)<number>() // product id

export const fetchCartProductsRequest = createAction(
  CartActionTypes.FETCH_CART_PRODUCTS_REQUEST
)<void>()

export const fetchCartProductsSuccess = createAction(
  CartActionTypes.FETCH_CART_PRODUCTS_SUCCESS
)<ICartItem[]>()

export const fetchCartProductsFailure = createAction(
  CartActionTypes.FETCH_CART_PRODUCTS_FAILURE
)<string>()
