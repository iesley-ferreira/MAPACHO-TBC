import axios, { AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import myIp from '../../devConfig.json'
import {
  FETCH_PRODUCTS_REQUEST,
  fetchProductsFailure,
  fetchProductsSuccess,
} from '../actions/actionTypes'
import { IProduct } from '../interfaces/Product'

function* fetchProductsSaga() {
  try {
    const response: AxiosResponse<{ data: IProduct[] }> = (yield call(
      axios.get,
      `http://${myIp.myIp}:3001/bling/produtos`
    )) as AxiosResponse<{ data: IProduct[] }>

    const products: IProduct[] = response.data.data
    yield put(fetchProductsSuccess(products))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(fetchProductsFailure(error.message))
    } else {
      yield put(fetchProductsFailure('An unknown error occurred'))
    }
  }
}

export function* watchFetchProducts() {
  yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchProductsSaga)
}
