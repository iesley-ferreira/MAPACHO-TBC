import { all } from 'redux-saga/effects';

import cartSagas from './cart/sagas';
import categoriesSagas from './categories/sagas';
<<<<<<< HEAD
import ordersSagas from './order/sagas';
import watchUserSagas from './password/sagas';
import productSagas from './products/sagas';
import shippingSagas from './shipping/sagas';
import userSagas from './user/sagas';
=======
import productSagas from './products/sagas';
import shippingSagas from './shipping/sagas';
import userSagas from './user/sagas';
import watchUserSagas from './password/sagas';
>>>>>>> 130354f5b3a0e5fb676c88177bca140bc0dd8377
// Importar outras sagas aqui

export default function* rootSaga() {
  yield all([
    productSagas(),
    categoriesSagas(),
    userSagas(),
    shippingSagas(),
    cartSagas(),
    watchUserSagas(),
<<<<<<< HEAD
    ordersSagas(),
=======
>>>>>>> 130354f5b3a0e5fb676c88177bca140bc0dd8377
    // Incluir outras sagas aqui
  ]);
}
