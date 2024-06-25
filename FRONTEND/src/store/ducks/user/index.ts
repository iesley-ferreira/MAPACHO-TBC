import { createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { UserActions, UserState } from './types';

const initialState: UserState = {
  user: {
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
  },
  isCodeSent: false,
  loading: false,
  error: false,
  message: '',
  error_message: '',
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
  }))
  .handleAction(actions.loginUserSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    user: {
      ...state.user,
      id: action.payload.id,
      name: action.payload.name,
      email: action.payload.email,
      isPending: action.payload.isPending,
      created_at: action.payload.created_at,
    },
  }))
  .handleAction(actions.loginUserFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
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
