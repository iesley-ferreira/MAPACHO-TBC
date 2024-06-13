import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { fetchCartProductsRequest } from './ducks/cart/actions'
import rootReducer, { RootState } from './ducks/rootReducer'
import rootSaga from './ducks/rootSaga'
import { loadCartState } from './loadState'
import { localStorageMiddleware } from './middleware/localStorageMiddleware'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, localStorageMiddleware]

const preloadedState: Partial<RootState> = {
  cart: { items: loadCartState() || [], loading: false, error: false },
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true, serializableCheck: false }).concat(
      middlewares
    ),
  devTools: true,
  preloadedState,
})

sagaMiddleware.run(rootSaga)

store.dispatch(fetchCartProductsRequest())

export default store
