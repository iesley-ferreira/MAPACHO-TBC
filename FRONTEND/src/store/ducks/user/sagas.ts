import { jwtDecode } from 'jwt-decode';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as userApi from '../../../api/userApi';
import {
  IUser,
  IUserCreateParams,
  IUserCreateResponse,
  IUserGoogleLogin,
  IUserGoogleLoginResponse,
  IUserLogin,
  IUserLoginResponse,
  IVerifyAuthCodeResponse,
} from '../../../interfaces/User';
import {
  createUserFailure,
  createUserSuccess,
  fetchUserFailure,
  fetchUserSuccess,
  googleLoginSuccess,
  loginUserFailure,
  loginUserSuccess,
  loginUserUnauthorized,
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
    const response: { data: IUserLoginResponse; status: number } = yield call(
      userApi.loginUser,
      action.payload,
    );

    if (response.data.user?.isPending) {
      yield put(loginUserUnauthorized(response.data.user));
      return;
    }

    if (response.status !== 200) {
      yield put(
        loginUserFailure({
          message: response.data.message,
        }),
      );
      return;
    }

    if (response.data.token && response.data.user) {
      localStorage.setItem('token', response.data.token);
      yield put(loginUserSuccess(response.data.user));
    }
  } catch (error: any) {
    yield put(
      loginUserFailure({
        message: error.message,
      }),
    );
  }
}

function* googleLoginUserSaga(action: { type: string; payload: IUserGoogleLogin }) {
  try {
    const response: IUserGoogleLoginResponse = yield call(
      userApi.googleLogin,
      action.payload,
    );

    // if (response.user?.isPending) {
    //   yield put(loginUserUnauthorized(response.user));
    //   return;
    // }

    if (response.data.status === 200 && !response.data.user?.email) {
      yield put(
        loginUserFailure({
          message: response.data.message,
        }),
      );
      return;
    }

    if (response.data.status === 200 || response.data.status === 201) {
      localStorage.setItem('token', response.data.token!);
      yield put(googleLoginSuccess(response.data.user!));
      return;
    }

    if (response.data.status !== 200) {
      yield put(
        loginUserFailure({
          message: response.data.message,
        }),
      );
      return;
    }
  } catch (error: any) {
    yield put(
      loginUserFailure({
        message: error.message,
      }),
    );
  }
}

function* createUserSaga(action: { type: string; payload: IUserCreateParams }) {
  try {
    const response: IUserCreateResponse = yield call(userApi.createUser, action.payload);

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

    localStorage.setItem('token', response.token);

    yield put(verifyAuthCodeSuccess(response.token));
  } catch (error: Error | unknown) {
    yield put(verifyAuthCodeFailure((error as Error).message));
  }
}

function* setUserFromTokenSaga(action: { type: string; payload: string }) {
  try {
    const decodedToken: {
      id: number;
      name: string;
      email: string;
      img_profile: string;
      cell_phone: string;
      created_at: string;
      orders: [];
    } = jwtDecode(action.payload);

    const user: IUser = {
      id: decodedToken.id,
      name: decodedToken.name,
      email: decodedToken.email,
      img_profile: decodedToken.img_profile,
      cell_phone: decodedToken.cell_phone,
      created_at: decodedToken.created_at,
      orders: decodedToken.orders,
    };
    yield put(loginUserSuccess(user));
  } catch (error: any) {
    yield put(loginUserFailure({ message: error.message }));
  }
}

export default function* userSagas() {
  yield takeLatest(UserActionTypes.FETCH_USER_REQUEST, fetchUserSaga);
  yield takeLatest(UserActionTypes.LOGIN_USER_REQUEST, loginUserSaga);
  yield takeLatest(UserActionTypes.CREATE_USER_REQUEST, createUserSaga);
  yield takeLatest(UserActionTypes.VERIFY_AUTH_CODE_REQUEST, verifyAuthCodeSaga);
  yield takeLatest(UserActionTypes.SET_USER_FROM_TOKEN_REQUEST, setUserFromTokenSaga);
  yield takeLatest(UserActionTypes.GOOGLE_LOGIN_REQUEST, googleLoginUserSaga);
}
