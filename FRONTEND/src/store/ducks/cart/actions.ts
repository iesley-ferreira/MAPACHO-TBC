import { createAction } from 'typesafe-actions'
import { Product } from '../products/types'
import { CartActionTypes } from './types'

export const addProductToCart = createAction(
  CartActionTypes.ADD_PRODUCT_TO_CART
)<Product>()

export const incrementProductQuantity = createAction(
  CartActionTypes.INCREMENT_PRODUCT_QUANTITY
)<number>() // product id

export const decrementProductQuantity = createAction(
  CartActionTypes.DECREMENT_PRODUCT_QUANTITY
)<number>() // product id

export const removeProductFromCart = createAction(
  CartActionTypes.REMOVE_PRODUCT_FROM_CART
)<number>() // product id
