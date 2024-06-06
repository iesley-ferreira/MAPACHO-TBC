import { all } from 'redux-saga/effects'

import categoriesSagas from './categories/sagas'
import productSagas from './products/sagas'
import userSagas from './user/sagas'
// Importar outras sagas aqui

export default function* rootSaga() {
  yield all([
    productSagas(),
    categoriesSagas(),
    userSagas(),
    // Incluir outras sagas aqui
  ])
}
