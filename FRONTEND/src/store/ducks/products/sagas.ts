import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as productsApi from '../../../api/productsApi'
import { IProduct, IProductId } from '../../../interfaces/Product'
import {
  fetchProductSuccess,
  fetchProductsFailure,
  fetchProductsSuccess,
} from './actions'
import { ProductActionTypes, ProductsActionTypes } from './types'

function* fetchProductsSaga() {
  try {
    const products: IProduct[] = yield call(productsApi.fetchProducts)
    yield put(fetchProductsSuccess(products))
  } catch (error: Error | unknown) {
    yield put(fetchProductsFailure((error as Error).message))
  }
}

function* fetchProductSaga(action: {
  type: ProductActionTypes.FETCH_PRODUCT_ID_REQUEST
  payload: string
}) {
  try {
    console.log('ACTION', action)

    const product: IProductId = yield call(
      productsApi.fetchProduct,
      action.payload
    )
    yield put(fetchProductSuccess(product))
  } catch (error: Error | unknown) {
    yield put(fetchProductsFailure((error as Error).message))
  }
}

export default function* productSagas() {
  yield all([
    takeLatest(ProductsActionTypes.FETCH_PRODUCTS_REQUEST, fetchProductsSaga),
    takeLatest(ProductActionTypes.FETCH_PRODUCT_ID_REQUEST, fetchProductSaga),
  ])
}
