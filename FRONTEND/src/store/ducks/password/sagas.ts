import { call, put, takeLatest } from 'redux-saga/effects';
import {
  resetPasswordSuccess,
  resetPasswordFailure,
  setNewPasswordFailure,
  setNewPasswordSuccess,
} from './actions';
import {
  PasswordActionTypes,
  ResetPasswordRequestPayload,
} from '../../ducks/password/types';
import * as resetPasswordApi from '../../../api/resetPasswordApi';

function* resetPasswordSaga(action: {
  type: string;
  payload: ResetPasswordRequestPayload;
}) {
  try {
    console.log('resetPassword saga:', action.payload);
    const { email } = action.payload;
    const response: { status: number; data: { message: string } } = yield call(
      resetPasswordApi.resetPassword,
      email,
    );

    if (response.status !== 200) {
      yield put(resetPasswordFailure(response.data.message));
      return;
    }

    yield put(resetPasswordSuccess(response.data.message));
  } catch (error: any) {
    yield put(resetPasswordFailure(error.message || 'Erro desconhecido'));
  }
}

function* setNewPasswordSaga(action: {
  type: string;
  payload: { token: string; newPassword: string };
}) {
  try {
    const { token, newPassword } = action.payload;
    const response: { status: number; data: { message: string } } = yield call(
      resetPasswordApi.setNewPassword,
      token,
      newPassword,
    );

    if (response.status !== 200) {
      yield put(setNewPasswordFailure(response.data.message));
      return;
    }

    yield put(setNewPasswordSuccess(response.data.message));
  } catch (error: any) {
    yield put(setNewPasswordFailure(error.message || 'Erro desconhecido'));
  }
}

export default function* watchUserSagas() {
  yield takeLatest(PasswordActionTypes.RESET_PASSWORD_REQUEST, resetPasswordSaga);
  yield takeLatest(PasswordActionTypes.SET_NEW_PASSWORD_REQUEST, setNewPasswordSaga);
}
