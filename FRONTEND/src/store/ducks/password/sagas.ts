import { call, put, takeLatest } from 'redux-saga/effects';
import { resetPasswordSuccess, resetPasswordFailure } from './actions';
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
    const response: { message: string } = yield call(
      resetPasswordApi.resetPassword,
      email,
    );

    yield put(resetPasswordSuccess(response));
  } catch (error: any) {
    yield put(resetPasswordFailure(error.message || 'Erro desconhecido'));
  }
}

export default function* watchUserSagas() {
  yield takeLatest(PasswordActionTypes.RESET_PASSWORD_REQUEST, resetPasswordSaga);
}
