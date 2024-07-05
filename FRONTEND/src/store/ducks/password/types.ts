import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export enum PasswordActionTypes {
  RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST',
  RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE',
}

export interface ResetPasswordRequestPayload {
  email: string;
}

export interface ResetPasswordSuccessPayload {
  message: string;
}

export interface PasswordState {
  readonly error: boolean;
  readonly errorMessage: string;
  readonly loading: boolean;
  readonly message: string;
}

export type PasswordActions = ActionType<typeof actions>;
