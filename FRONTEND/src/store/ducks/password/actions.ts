// actions.ts
import { createAction } from 'typesafe-actions';
import { PasswordActionTypes } from './types';

export const resetPasswordRequest = createAction(
  PasswordActionTypes.RESET_PASSWORD_REQUEST,
)<{ email: string }>();

export const resetPasswordSuccess = createAction(
  PasswordActionTypes.RESET_PASSWORD_SUCCESS,
)<{ message: string }>();

export const resetPasswordFailure = createAction(
  PasswordActionTypes.RESET_PASSWORD_FAILURE,
)<string>();
