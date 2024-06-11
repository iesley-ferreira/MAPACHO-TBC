import { ActionType } from 'typesafe-actions'
import { ICartItem } from '../../../interfaces/Cart'
import * as actions from './actions'

export enum CartActionTypes {
  ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART',
  INCREMENT_PRODUCT_QUANTITY = 'INCREMENT_PRODUCT_QUANTITY',
  DECREMENT_PRODUCT_QUANTITY = 'DECREMENT_PRODUCT_QUANTITY',
  REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART',
}
export type CartActions = ActionType<typeof actions>

export interface CartState {
  readonly items: ICartItem[]
  readonly loading: boolean
  readonly error: boolean
}
