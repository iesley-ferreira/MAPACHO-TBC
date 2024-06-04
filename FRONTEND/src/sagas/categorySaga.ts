import axios, { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import myIp from '../../devConfig.json'
import {
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
} from '../actions/actionTypes'
import { CategoryResponse } from '../interfaces/Category'

function* fetchCategories() {
  try {
    const response: AxiosResponse<CategoryResponse> = yield call(() =>
      axios.get<CategoryResponse>(`http://${myIp}:3001/bling/categorias`)
    )
    yield put({ type: FETCH_CATEGORIES_SUCCESS, payload: response.data })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put({ type: FETCH_CATEGORIES_FAILURE, payload: error.message })
    } else {
      yield put({
        type: FETCH_CATEGORIES_FAILURE,
        payload: 'An unknown error occurred',
      })
    }
  }
}

function* categorySaga() {
  yield takeLatest(FETCH_CATEGORIES_REQUEST, fetchCategories)
}

export default categorySaga
