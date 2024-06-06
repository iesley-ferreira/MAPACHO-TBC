import { createAction } from 'typesafe-actions'
import { IUser, IUserCreateParams } from '../../../interfaces/User'
import { UserActionTypes } from './types'

export const fetchUserRequest = createAction(
  UserActionTypes.FETCH_USER_REQUEST
)<void>()

export const fetchUserSuccess = createAction(
  UserActionTypes.FETCH_USER_SUCCESS
)<IUser>()

export const fetchUserFailure = createAction(
  UserActionTypes.FETCH_USER_FAILURE
)<string>()

export const loginUserRequest = createAction(
  UserActionTypes.LOGIN_USER_REQUEST
)<IUser>()

export const loginUserSuccess = createAction(
  UserActionTypes.LOGIN_USER_SUCCESS
)<IUser>()

export const loginUserFailure = createAction(
  UserActionTypes.LOGIN_USER_FAILURE
)<string>()

export const logoutUser = createAction(UserActionTypes.LOGOUT_USER)<void>()

export const createUserRequest = createAction(
  UserActionTypes.CREATE_USER_REQUEST
)<IUserCreateParams>()

export const createUserSuccess = createAction(
  UserActionTypes.CREATE_USER_SUCCESS
)<IUser>()

export const createUserFailure = createAction(
  UserActionTypes.CREATE_USER_FAILURE
)<string>()

export const updateUserRequest = createAction(
  UserActionTypes.UPDATE_USER_REQUEST
)<IUser>()

export const updateUserSuccess = createAction(
  UserActionTypes.UPDATE_USER_SUCCESS
)<IUser>()

export const updateUserFailure = createAction(
  UserActionTypes.UPDATE_USER_FAILURE
)<string>()

export type UserAction = (request: IUser) => void
