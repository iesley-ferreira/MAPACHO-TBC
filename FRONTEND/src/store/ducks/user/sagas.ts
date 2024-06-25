import { call, put, takeLatest } from 'redux-saga/effects';
import * as userApi from '../../../api/userApi';
import {
  IUser,
  IUserCreateParams,
  IUserCreateResponse,
  IUserLogin,
  IVerifyAuthCodeResponse,
} from '../../../interfaces/User';
import {
  createUserFailure,
  createUserSuccess,
  fetchUserFailure,
  fetchUserSuccess,
  loginUserFailure,
  loginUserSuccess,
  setIsCodeSent,
  verifyAuthCodeFailure,
  verifyAuthCodeSuccess,
} from './actions';
import { UserActionTypes } from './types';

function* fetchUserSaga() {
  try {
    const response: IUser = yield call(userApi.fetchUser);
    yield put(fetchUserSuccess(response));
  } catch (error: Error | unknown) {
    yield put(fetchUserFailure((error as Error).message));
  }
}

function* loginUserSaga(action: { type: string; payload: IUserLogin }) {
  try {
    const response: IUser = yield call(userApi.loginUser, action.payload);
    yield put(loginUserSuccess(response));
  } catch (error: Error | unknown) {
    yield put(loginUserFailure((error as Error).message));
  }
}

function* createUserSaga(action: { type: string; payload: IUserCreateParams }) {
  try {
    const response: IUserCreateResponse = yield call(userApi.createUser, action.payload);
    console.log('CREATE USER SAGA', response);

    if (response.status === 201) {
      yield put(setIsCodeSent(true));
    }
    yield put(createUserSuccess(response.data.user));
  } catch (error: Error | unknown) {
    yield put(createUserFailure((error as Error).message));
  }
}

function* verifyAuthCodeSaga(action: {
  type: string;
  payload: { email: string; code: string };
}) {
  try {
    const response: IVerifyAuthCodeResponse = yield call(
      userApi.verifyAuthCode,
      action.payload.email,
      action.payload.code,
    );
    yield put(verifyAuthCodeSuccess(response.token));
  } catch (error: Error | unknown) {
    yield put(verifyAuthCodeFailure((error as Error).message));
  }
}

export default function* userSagas() {
  yield takeLatest(UserActionTypes.FETCH_USER_REQUEST, fetchUserSaga);
  yield takeLatest(UserActionTypes.LOGIN_USER_REQUEST, loginUserSaga);
  yield takeLatest(UserActionTypes.CREATE_USER_REQUEST, createUserSaga);
  yield takeLatest(UserActionTypes.VERIFY_AUTH_CODE_REQUEST, verifyAuthCodeSaga);
}
