import { call, put, takeLatest } from 'redux-saga/effects';
import * as categoriesApi from '../../../api/categoriesApi';
import { ICategory } from '../../../interfaces/Category';
import { fetchCategoriesFailure, fetchCategoriesSuccess } from './actions';
import { formatCategories } from './helpers';
import { CategoriesActionTypes } from './types';

function* fetchCategoriesSaga() {
  try {
    const response: ICategory[] = yield call(categoriesApi.fetchCategories);
    const { categories } = formatCategories(response);

    yield put(fetchCategoriesSuccess(categories));
  } catch (error: Error | unknown) {
    yield put(fetchCategoriesFailure((error as Error).message));
  }
}

export default function* categoriesSagas() {
  yield takeLatest(CategoriesActionTypes.FETCH_CATEGORIES_REQUEST, fetchCategoriesSaga);
}
