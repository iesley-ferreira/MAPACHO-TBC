import { createAction } from 'typesafe-actions';
import { PasswordActionTypes } from './types';

export const resetPasswordRequest = createAction(
  PasswordActionTypes.RESET_PASSWORD_REQUEST,
)<{ email: string }>();

export const resetPasswordSuccess = createAction(
  PasswordActionTypes.RESET_PASSWORD_SUCCESS,
)<string>();

export const resetPasswordFailure = createAction(
  PasswordActionTypes.RESET_PASSWORD_FAILURE,
)<string>();

export const setNewPasswordRequest = createAction(
  PasswordActionTypes.SET_NEW_PASSWORD_REQUEST,
)<{ token: string; newPassword: string }>();

export const setNewPasswordSuccess = createAction(
  PasswordActionTypes.SET_NEW_PASSWORD_SUCCESS,
)<string>();

export const setNewPasswordFailure = createAction(
  PasswordActionTypes.SET_NEW_PASSWORD_FAILURE,
)<string>();
