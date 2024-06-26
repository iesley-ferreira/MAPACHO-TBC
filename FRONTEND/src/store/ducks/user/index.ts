import { createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { UserActions, UserState } from './types';

const initialUser = {
  id: 0,
  name: '',
  email: '',
  cell_phone: '',
  address: {
    zip_code: '',
    street: '',
    city: '',
    number: '',
    state: '',
    neighborhood: '',
    complement: '',
  },
  orders: [],
  isPending: null,
  created_at: '',
};

const initialState: UserState = {
  user: initialUser,
  isCodeSent: false,
  loading: false,
  error: false,
  message: '',
  errorMessage: '',
};

const userReducer = createReducer<UserState, UserActions>(initialState)
  .handleAction(actions.fetchUserRequest, (state) => ({
    ...state,
    loading: true,
    error: false,
  }))
  .handleAction(actions.fetchUserSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    data: action.payload,
  }))
  .handleAction(actions.fetchUserFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))
  .handleAction(actions.loginUserRequest, (state) => ({
    ...state,
    loading: true,
    error: false,
    errorMessage: '',
    user: initialUser,
  }))
  .handleAction(actions.loginUserSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    user: action.payload,
  }))
  .handleAction(actions.loginUserUnauthorized, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    user: action.payload,
  }))
  .handleAction(actions.loginUserFailure, (state, action) => ({
    ...state,
    loading: false,
    error: true,
    errorMessage: action.payload.message,
  }))
  .handleAction(actions.createUserRequest, (state) => ({
    ...state,
    loading: true,
    error: false,
  }))
  .handleAction(actions.createUserSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    user: {
      ...state.user,
      id: action.payload.id,
      name: action.payload.name,
      email: action.payload.email,
      // created_at: action.payload.created_at,
    },
  }))
  .handleAction(actions.createUserFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))
  .handleAction(actions.setIsCodeSent, (state, action) => ({
    ...state,
    isCodeSent: action.payload,
  }))
  .handleAction(actions.verifyAuthCodeRequest, (state) => ({
    ...state,
    loading: true,
    error: false,
  }))
  .handleAction(actions.verifyAuthCodeSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    user: {
      ...state.user,
      token: action.payload,
      isPending: false,
    },
  }))
  .handleAction(actions.verifyAuthCodeFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }));

export default userReducer;
