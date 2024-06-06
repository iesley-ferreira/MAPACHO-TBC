import { createReducer } from 'typesafe-actions'
import * as actions from './actions'
import { AddressActions, AddressState } from './types'

const initialState: AddressState = {
  address: {
    bairro: '',
    cep: '',
    complemento: '',
    ddd: '',
    gia: '',
    localidade: '',
    logradouro: '',
    uf: '',
    ibge: '',
    siafi: '',
  },
  loading: false,
  error: false,
}

const addressReducer = createReducer<AddressState, AddressActions>(initialState)
  .handleAction(actions.fetchAddressRequest, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.fetchAddressSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    address: action.payload,
  }))
  .handleAction(actions.fetchAddressFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))

export default addressReducer
