import { combineReducers } from '@reduxjs/toolkit'
import categoryReducer from './categories'
import productReducer from './products'
import userReducer from './user'

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
