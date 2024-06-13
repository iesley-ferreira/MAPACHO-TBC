import { ICartItem } from '../interfaces/Cart'

export const loadCartState = (): ICartItem[] => {
  try {
    const serializedState = localStorage.getItem('cart')
    if (serializedState === null) {
      return []
    }

    return JSON.parse(serializedState)
  } catch (err) {
    return []
  }
}
