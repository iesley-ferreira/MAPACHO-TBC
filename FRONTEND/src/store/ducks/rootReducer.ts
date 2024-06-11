import { combineReducers } from '@reduxjs/toolkit'
import cartReducer from './cart/reducer'
import categoryReducer from './categories'
import productReducer from './products'
import shippingReducer from './shipping'
import userReducer from './user'

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  user: userReducer,
  shipping: shippingReducer,
  cart: cartReducer,
  // checkout: checkoutReducer,
  // order: orderReducer,
  // payment: paymentReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
