import { call, put, takeLatest } from 'redux-saga/effects'
import * as productsApi from '../../../api/productsApi'
import { fetchProductsFailure, fetchProductsSuccess } from './actions'
import { Product, ProductActionTypes } from './types'

function* fetchProductsSaga() {
  try {
    const products: Product[] = yield call(productsApi.fetchProducts)
    yield put(fetchProductsSuccess(products))
  } catch (error: Error | unknown) {
    yield put(fetchProductsFailure((error as Error).message))
  }
}

export default function* productSagas() {
  yield takeLatest(ProductActionTypes.FETCH_PRODUCTS_REQUEST, fetchProductsSaga)
}
