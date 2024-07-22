import { createAction } from 'typesafe-actions';
import {
  IUser,
  IUserCreateParams,
  IUserGoogleLogin,
  IUserLogin,
  IVerifyAuthCodeParams,
} from '../../../interfaces/User';
import { UserActionTypes } from './types';

export const fetchUserRequest = createAction(UserActionTypes.FETCH_USER_REQUEST)<void>();

export const fetchUserSuccess = createAction(UserActionTypes.FETCH_USER_SUCCESS)<IUser>();

export const fetchUserFailure = createAction(
  UserActionTypes.FETCH_USER_FAILURE,
)<string>();

export const loginUserRequest = createAction(
  UserActionTypes.LOGIN_USER_REQUEST,
)<IUserLogin>();

export const loginUserSuccess = createAction(UserActionTypes.LOGIN_USER_SUCCESS)<IUser>();

export const loginUserFailure = createAction(UserActionTypes.LOGIN_USER_FAILURE)<{
  message: string;
}>();

export const loginUserUnauthorized = createAction(
  UserActionTypes.LOGIN_USER_UNAUTHORIZED,
)<IUser>();

export const googleLoginRequest = createAction(
  UserActionTypes.GOOGLE_LOGIN_REQUEST,
)<IUserGoogleLogin>();

export const googleLoginSuccess = createAction(
  UserActionTypes.GOOGLE_LOGIN_SUCCESS,
)<IUser>();

export const googleLoginFailure = createAction(
  UserActionTypes.GOOGLE_LOGIN_FAILURE,
)<string>();

export const logoutUser = createAction(UserActionTypes.LOGOUT_USER)<void>();

export const createUserRequest = createAction(
  UserActionTypes.CREATE_USER_REQUEST,
)<IUserCreateParams>();

export const createUserSuccess = createAction(
  UserActionTypes.CREATE_USER_SUCCESS,
)<IUser>();

export const createUserFailure = createAction(
  UserActionTypes.CREATE_USER_FAILURE,
)<string>();

export const verifyAuthCodeRequest = createAction(
  UserActionTypes.VERIFY_AUTH_CODE_REQUEST,
)<IVerifyAuthCodeParams>();

export const verifyAuthCodeSuccess = createAction(
  UserActionTypes.VERIFY_AUTH_CODE_SUCCESS,
)<string>();

export const verifyAuthCodeFailure = createAction(
  UserActionTypes.VERIFY_AUTH_CODE_FAILURE,
)<string>();

export const resendAuthCodeRequest = createAction(
  UserActionTypes.RESEND_AUTH_CODE_REQUEST,
)<string>();

export const resendAuthCodeSuccess = createAction(
  UserActionTypes.RESEND_AUTH_CODE_SUCCESS,
)<string>();

export const resendAuthCodeFailure = createAction(
  UserActionTypes.RESEND_AUTH_CODE_FAILURE,
)<string>();

export const updateUserRequest = createAction(
  UserActionTypes.UPDATE_USER_REQUEST,
)<IUser>();

export const updateUserSuccess = createAction(
  UserActionTypes.UPDATE_USER_SUCCESS,
)<IUser>();

export const updateUserFailure = createAction(
  UserActionTypes.UPDATE_USER_FAILURE,
)<string>();

export const setUserFromTokenRequest = createAction(
  UserActionTypes.SET_USER_FROM_TOKEN_REQUEST,
)<string>();

export const setUserFromTokenSuccess = createAction(
  UserActionTypes.SET_USER_FROM_TOKEN_SUCCESS,
)<IUser>();

export const setUserFromTokenFailure = createAction(
  UserActionTypes.SET_USER_FROM_TOKEN_FAILURE,
)<string>();

export const setIsCodeSent = createAction(UserActionTypes.SET_IS_CODE_SENT)<boolean>();

export type UserAction = (request: IUser) => void;
