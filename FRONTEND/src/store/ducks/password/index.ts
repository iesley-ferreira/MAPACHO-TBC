import { createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { PasswordActions, PasswordState } from './types';

const initialState: PasswordState = {
  error: false,
  loading: false,
  message: '',
};

const passwordReducer = createReducer<PasswordState, PasswordActions>(initialState)
  .handleAction(actions.resetPasswordRequest, (state) => ({
    ...state,
    loading: true,
    message: '',
    error: false,
  }))
  .handleAction(actions.resetPasswordSuccess, (state, action) => ({
    ...state,
    loading: false,
    message: action.payload,
    error: false,
  }))
  .handleAction(actions.resetPasswordFailure, (state, action) => ({
    ...state,
    loading: false,
    message: action.payload,
    error: true,
  }))
  .handleAction(actions.setNewPasswordRequest, (state) => ({
    ...state,
    loading: true,
    message: '',
    error: false,
  }))
  .handleAction(actions.setNewPasswordSuccess, (state, action) => ({
    ...state,
    loading: false,
    message: action.payload,
    error: false,
  }))
  .handleAction(actions.setNewPasswordFailure, (state, action) => ({
    ...state,
    loading: false,
    message: action.payload,
    error: true,
  }));

export default passwordReducer;
