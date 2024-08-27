import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as productsApi from '../../../api/productsApi';
import { IProduct, IProductVariation } from '../../../interfaces/Product';
import {
  fetchProductSuccess,
  fetchProductsFailure,
  fetchProductsSuccess,
  setDisableButtonShowMore,
} from './actions';
import { ProductActionTypes, ProductsActionTypes } from './types';

function* fetchProductsSaga(action: {
  type: ProductsActionTypes.FETCH_PRODUCTS_REQUEST;
  payload: { page: number; limit: number; categoryId?: string; searchValue?: string };
}) {
  try {
    const query = {
      pagina: action.payload.page,
      criterio: 1,
      tipo: 'P',
      idCategoria: action.payload.categoryId,
      limite: action.payload.limit,
      nome: action.payload.searchValue,
    };
    const products: IProduct[] = yield call(productsApi.fetchProducts, query);

    if (products.length < action.payload.limit) {
      yield put(setDisableButtonShowMore(true));
    }

    yield put(
      fetchProductsSuccess({
        products,
        isFiltered: !!action.payload.categoryId || !!action.payload.searchValue,
      }),
    );
  } catch (error: Error | unknown) {
    yield put(fetchProductsFailure((error as Error).message));
  }
}
function* fetchProductSaga(action: {
  type: ProductActionTypes.FETCH_PRODUCT_ID_REQUEST;
  payload: string;
}) {
  try {
    const product: IProductVariation = yield call(
      productsApi.fetchProduct,
      action.payload,
    );
    yield put(fetchProductSuccess(product));
  } catch (error: Error | unknown) {
    yield put(fetchProductsFailure((error as Error).message));
  }
}

export default function* productSagas() {
  yield all([
    takeLatest(ProductsActionTypes.FETCH_PRODUCTS_REQUEST, fetchProductsSaga),
    takeLatest(ProductActionTypes.FETCH_PRODUCT_ID_REQUEST, fetchProductSaga),
  ]);
}
