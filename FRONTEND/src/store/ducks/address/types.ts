import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export enum AddressActionTypes {
  FETCH_ADDRESS_REQUEST = 'FETCH_ADDRESS_REQUEST',
  FETCH_ADDRESS_SUCCESS = 'FETCH_ADDRESS_SUCCESS',
  FETCH_ADDRESS_FAILURE = 'FETCH_ADDRESS_FAILURE',
}

export interface IZipCode {
  zipCode: string
}

export interface IAddress {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ddd: string
  ibge: string
  gia: string
  siafi: string
}

export interface AddressState {
  address: IAddress
  loading: boolean
  error: boolean
}

export type AddressActions = ActionType<typeof actions>
