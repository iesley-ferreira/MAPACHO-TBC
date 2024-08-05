import { createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { CartActions, CartState } from './types';

const initialState: CartState = {
  items: [],
  loading: false,
  error: false,
};

const cartReducer = createReducer<CartState, CartActions>(initialState)
  .handleAction(actions.addProductToCart, (state, action) => {
    const { product, quantidade } = action.payload;
    const existingProduct = state.items.find(
      (item) =>
        item.id === product.id &&
        item.variacao?.variationId === product.variacao?.variationId,
    );

    if (existingProduct) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === product.id &&
          item.variacao?.variationId === product.variacao?.variationId
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item,
        ),
      };
    }

    return {
      ...state,
      items: [...state.items, { ...product, quantidade }],
    };
  })
  .handleAction(actions.incrementProductQuantity, (state, action) => ({
    ...state,
    items: state.items.map((item) =>
      item.id === action.payload ? { ...item, quantidade: item.quantidade + 1 } : item,
    ),
  }))
  .handleAction(actions.decrementProductQuantity, (state, action) => {
    const updatedItems = state.items
      .map((item) =>
        item.id === action.payload ? { ...item, quantidade: item.quantidade - 1 } : item,
      )
      .filter((item) => item.quantidade > 0);

    return {
      ...state,
      items: updatedItems,
    };
  })
  .handleAction(actions.removeProductFromCart, (state, action) => ({
    ...state,
    items: state.items.filter((item) => item.id !== action.payload),
  }))
  .handleAction(actions.fetchCartProductsRequest, (state) => ({
    ...state,
    loading: true,
    error: false,
  }))
  .handleAction(actions.fetchCartProductsSuccess, (state, action) => ({
    ...state,
    items: action.payload,
    loading: false,
    error: false,
  }))
  .handleAction(actions.fetchCartProductsFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }));

export default cartReducer;
