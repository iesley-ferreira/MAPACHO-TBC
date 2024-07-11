import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export enum PasswordActionTypes {
  RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST',
  RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE',
  SET_NEW_PASSWORD_REQUEST = 'SET_NEW_PASSWORD_REQUEST',
  SET_NEW_PASSWORD_SUCCESS = 'SET_NEW_PASSWORD_SUCCESS',
  SET_NEW_PASSWORD_FAILURE = 'SET_NEW_PASSWORD_FAILURE',
}

export interface ResetPasswordRequestPayload {
  email: string;
}

export interface ResetPasswordSuccessPayload {
  message: string;
}

export interface ResetPasswordApiResponse {
  status: number;
  data: {
    message: string;
  };
}

export interface PasswordState {
  readonly loading: boolean;
  readonly message: string;
  readonly error: boolean;
}

export type PasswordActions = ActionType<typeof actions>;
