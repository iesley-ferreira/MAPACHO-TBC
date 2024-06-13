import { all } from 'redux-saga/effects'

import cartSagas from './cart/sagas'
import categoriesSagas from './categories/sagas'
import productSagas from './products/sagas'
import shippingSagas from './shipping/sagas'
import userSagas from './user/sagas'
// Importar outras sagas aqui

export default function* rootSaga() {
  yield all([
    productSagas(),
    categoriesSagas(),
    userSagas(),
    shippingSagas(),
    cartSagas(),
    // Incluir outras sagas aqui
  ])
}
