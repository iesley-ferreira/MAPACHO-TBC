import { Middleware } from 'redux'
import { RootState } from '../ducks/rootReducer'

export const localStorageMiddleware: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action)
    const state: RootState = getState()
    localStorage.setItem('cart', JSON.stringify(state.cart.items))
    return result
  }
}
