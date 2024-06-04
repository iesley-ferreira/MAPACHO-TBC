import { all } from 'redux-saga/effects'
import categorySaga from './categorySaga'
import { watchFetchProducts } from './productSaga'

export default function* rootSaga() {
  yield all([watchFetchProducts(), categorySaga()])
}
