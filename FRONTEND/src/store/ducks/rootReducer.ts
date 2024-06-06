import { combineReducers } from '@reduxjs/toolkit'
import addressReducer from './address'
import categoryReducer from './categories'
import productReducer from './products'
import userReducer from './user'

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  user: userReducer,
  address: addressReducer,
  // cart: cartReducer,
  // checkout: checkoutReducer,
  // order: orderReducer,
  // payment: paymentReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
