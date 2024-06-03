import { all } from 'redux-saga/effects'
import categorySaga from './categorySaga'
import productSaga from './productSaga'

export default function* rootSaga() {
  yield all([productSaga(), categorySaga()])
}
