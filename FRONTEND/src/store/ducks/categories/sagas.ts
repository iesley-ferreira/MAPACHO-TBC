import { call, put, takeLatest } from 'redux-saga/effects'
import * as categoriesApi from '../../../api/categoriesApi'
import { fetchCategoriesFailure, fetchCategoriesSuccess } from './actions'
import { CategoriesActionTypes, Category } from './types'

function* fetchCategoriesSaga() {
  try {
    const categories: Category[] = yield call(categoriesApi.fetchCategories)
    yield put(fetchCategoriesSuccess(categories))
  } catch (error: Error | unknown) {
    yield put(fetchCategoriesFailure((error as Error).message))
  }
}

export default function* categoriesSagas() {
  yield takeLatest(
    CategoriesActionTypes.FETCH_CATEGORIES_REQUEST,
    fetchCategoriesSaga
  )
}
