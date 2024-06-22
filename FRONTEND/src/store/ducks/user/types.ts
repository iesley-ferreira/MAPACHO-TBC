import { ActionType } from 'typesafe-actions';
import { IUser } from '../../../interfaces/User';
import * as actions from './actions';

export enum UserActionTypes {
  FETCH_USER_REQUEST = 'FETCH_USER_REQUEST',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_FAILURE = 'FETCH_USER_FAILURE',
  LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE',
  LOGOUT_USER = 'LOGOUT_USER',
  CREATE_USER_REQUEST = 'CREATE_USER_REQUEST',
  CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS',
  CREATE_USER_FAILURE = 'CREATE_USER_FAILURE',
  UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE',
}

export interface UserState {
  readonly user: IUser;
  readonly loading: boolean;
  readonly error: boolean;
}

export type UserActions = ActionType<typeof actions>;
