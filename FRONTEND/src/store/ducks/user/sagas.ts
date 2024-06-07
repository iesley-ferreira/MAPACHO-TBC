import { call, put, takeLatest } from 'redux-saga/effects'
import * as userApi from '../../../api/userApi'
import { IUser, IUserCreateParams } from '../../../interfaces/User'
import {
  createUserFailure,
  createUserSuccess,
  fetchUserFailure,
  fetchUserSuccess,
} from './actions'
import { UserActionTypes } from './types'

function* fetchUserSaga() {
  try {
    const response: IUser = yield call(userApi.fetchUser)
    yield put(fetchUserSuccess(response))
  } catch (error: Error | unknown) {
    yield put(fetchUserFailure((error as Error).message))
  }
}

function* createUserSaga(action: { type: string; payload: IUserCreateParams }) {
  try {
    const response: IUser = yield call(userApi.createUser, action.payload)
    yield put(createUserSuccess(response))
  } catch (error: Error | unknown) {
    yield put(createUserFailure((error as Error).message))
  }
}

export default function* userSagas() {
  yield takeLatest(UserActionTypes.FETCH_USER_REQUEST, fetchUserSaga)
  yield takeLatest(UserActionTypes.CREATE_USER_REQUEST, createUserSaga)
}
