import { createReducer } from 'typesafe-actions'
import * as actions from './actions'
import { CartActions, CartState } from './types'

const initialState: CartState = {
  items: [],
  loading: false,
  error: false,
}

const cartReducer = createReducer<CartState, CartActions>(initialState)
  .handleAction(actions.addProductToCart, (state, action) => {
    const product = action.payload
    const existingProduct = state.items.find((item) => item.id === product.id)

    if (existingProduct) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        ),
      }
    }

    return {
      ...state,
      items: [...state.items, { ...product, quantidade: 1 }],
    }
  })
  .handleAction(actions.incrementProductQuantity, (state, action) => ({
    ...state,
    items: state.items.map((item) =>
      item.id === action.payload
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
    ),
  }))
  .handleAction(actions.decrementProductQuantity, (state, action) => {
    const updatedItems = state.items
      .map((item) =>
        item.id === action.payload
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
      .filter((item) => item.quantidade > 0)

    return {
      ...state,
      items: updatedItems,
    }
  })
  .handleAction(actions.removeProductFromCart, (state, action) => ({
    ...state,
    items: state.items.filter((item) => item.id !== action.payload),
  }))

export default cartReducer
