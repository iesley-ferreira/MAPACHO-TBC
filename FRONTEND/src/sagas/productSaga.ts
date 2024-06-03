import axios, { AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import myIp from '../../devConfig.json'
import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
} from '../actions/actionTypes'
import { ProductResponse } from '../interfaces/Product'

function* fetchProducts() {
  try {
    const response: AxiosResponse<ProductResponse> = yield call(
      axios.get,
      `http://${myIp}:3001/bling/produtos`
    )

    yield put({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data.data })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put({ type: FETCH_PRODUCTS_FAILURE, payload: error.message })
    } else {
      yield put({
        type: FETCH_PRODUCTS_FAILURE,
        payload: 'An unknown error occurred',
      })
    }
  }
}

function* productSaga() {
  yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchProducts)
}

export default productSaga
