import { createReducer } from 'typesafe-actions'
import * as actions from './actions'
import { UserActions, UserState } from './types'

const initialState: UserState = {
  user: {
    id: '',
    token: '',
    nome: '',
    email: '',
    telefone: '',
    cep: '',
    endereco: '',
    cidade: '',
    estado: '',
    pedidos: [],
  },
  loading: false,
  error: false,
}

const userReducer = createReducer<UserState, UserActions>(initialState)
  .handleAction(actions.fetchUserRequest, (state) => ({
    ...state,
    loading: true,
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
  .handleAction(actions.createUserRequest, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.createUserSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    data: action.payload,
  }))
  .handleAction(actions.createUserFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))

export default userReducer
