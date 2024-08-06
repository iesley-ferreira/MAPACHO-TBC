import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { fetchProduct } from '../../../api/productsApi';
import { ICartItem } from '../../../interfaces/Cart';
import { IFullProduct } from '../../../interfaces/Product';
import { RootState } from '../rootReducer';
import { fetchCartProductsFailure, fetchCartProductsSuccess } from './actions';
import { CartActionTypes } from './types';

function* fetchCartProductsSaga() {
  try {
    const cartItems: ICartItem[] = yield select((state: RootState) => state.cart.items);

    const updatedCartItems: ICartItem[] = [];
    for (const item of cartItems) {
      const productId = item.variacao ? item.variacao.toString() : item.id.toString();
      const product: IFullProduct = yield call(fetchProduct, productId);
      const formattedName = product.nome.replace(/\s?\w+:.*/, '');

      const updatedItem = {
        id: product.id,
        nome: formattedName,
        preco: product.preco,
        imagemURL: product.midia.imagens.externas[0].link,
        quantidade: item.quantidade,
      };

      updatedCartItems.push({
        ...updatedItem,
        variacao: item.variacao,
        quantidade: item.quantidade,
      });

      yield delay(500);
    }

    yield put(fetchCartProductsSuccess(updatedCartItems));
  } catch (error: Error | unknown) {
    yield put(fetchCartProductsFailure((error as Error).message));
  }
}

export default function* cartSagas() {
  yield takeLatest(CartActionTypes.FETCH_CART_PRODUCTS_REQUEST, fetchCartProductsSaga);
}
