import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export enum ProductActionTypes {
  FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST',
  FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE',
}

export interface Product {
  id: number
  idProdutoPai: number
  nome: string
  codigo: string
  preco: number
  tipo: string
  situacao: string
  formato: string
  descricaoCurta: string
  imagemURL: string
}

export interface ProductsState {
  readonly products: Product[]
  readonly loading: boolean
  readonly error: boolean
}

export type ProductActions = ActionType<typeof actions>
