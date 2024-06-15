import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as productsApi from '../../../api/productsApi'
import { IProduct, IProductId } from '../../../interfaces/Product'
import {
  fetchProductSuccess,
  fetchProductsByIdSuccess,
  fetchProductsFailure,
  fetchProductsSuccess,
} from './actions'
import {
  ProductActionTypes,
  ProductsActionTypes,
  ProductsByIdActionTypes,
} from './types'

function* fetchProductsSaga() {
  try {
    const products: IProduct[] = yield call(productsApi.fetchProducts)
    yield put(fetchProductsSuccess(products))
  } catch (error: Error | unknown) {
    yield put(fetchProductsFailure((error as Error).message))
  }
}

function* fetchProductsByIdSaga(action: {
  type: ProductsByIdActionTypes.FETCH_PRODUCTS_BY_ID_REQUEST
  payload: string
}) {
  try {
    const productsByCategory: IProduct[] = yield call(
      productsApi.fetchProductsByCategoryId,
      action.payload
    )
    yield put(fetchProductsByIdSuccess(productsByCategory))
  } catch (error: Error | unknown) {
    yield put(fetchProductsFailure((error as Error).message))
  }
}

function* fetchProductSaga(action: {
  type: ProductActionTypes.FETCH_PRODUCT_ID_REQUEST
  payload: string
}) {
  try {
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
    takeLatest(
      ProductsByIdActionTypes.FETCH_PRODUCTS_BY_ID_REQUEST,
      fetchProductsByIdSaga
    ),
    takeLatest(ProductActionTypes.FETCH_PRODUCT_ID_REQUEST, fetchProductSaga),
  ])
}
