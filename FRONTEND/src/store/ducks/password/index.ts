// reducer.ts
import { createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { PasswordActions, PasswordState } from './types';

const initialState: PasswordState = {
  error: false,
  errorMessage: '',
  loading: false,
  message: '',
};

const passwordReducer = createReducer<PasswordState, PasswordActions>(initialState)
  .handleAction(actions.resetPasswordRequest, (state) => ({
    ...state,
    loading: true,
    error: false,
    errorMessage: '',
  }))
  .handleAction(actions.resetPasswordSuccess, (state, action) => ({
    ...state,
    loading: false,
    message: action.payload.message,
    error: false,
  }))
  .handleAction(actions.resetPasswordFailure, (state, action) => ({
    ...state,
    error: true,
    loading: false,
    errorMessage: action.payload,
  }));

export default passwordReducer;
