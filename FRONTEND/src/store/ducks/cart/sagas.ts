import { call, delay, put, select, takeLatest } from 'redux-saga/effects'
import { fetchProduct } from '../../../api/productsApi'
import { ICartItem } from '../../../interfaces/Cart'
import { IProduct } from '../../../interfaces/Product'
import { RootState } from '../rootReducer'
import { fetchCartProductsFailure, fetchCartProductsSuccess } from './actions'
import { CartActionTypes } from './types'

function* fetchCartProductsSaga() {
  try {
    const cartItems: ICartItem[] = yield select(
      (state: RootState) => state.cart.items
    )

    const updatedCartItems: ICartItem[] = []
    for (const item of cartItems) {
      const product: IProduct = yield call(fetchProduct, item.id.toString())

      updatedCartItems.push({ ...product, quantidade: item.quantidade })

      yield delay(500)
    }

    yield put(fetchCartProductsSuccess(updatedCartItems))
  } catch (error: Error | unknown) {
    yield put(fetchCartProductsFailure((error as Error).message))
  }
}

export default function* cartSagas() {
  yield takeLatest(
    CartActionTypes.FETCH_CART_PRODUCTS_REQUEST,
    fetchCartProductsSaga
  )
}
