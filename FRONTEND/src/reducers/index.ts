import { combineReducers } from 'redux'
import categoryReducer from './categoryReducer'
import productReducer from './productReducer'

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
