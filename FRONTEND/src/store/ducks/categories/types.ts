import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export enum CategoriesActionTypes {
  FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST',
  FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE',
}
export type CategoriesActions = ActionType<typeof actions>

export interface Category {
  id: number
  descricao: string
  categoriaPai: {
    id: number
  }
}

export interface CategoriesState {
  readonly categories: Category[]
  readonly subCategories: Category[]
  readonly loading: boolean
  readonly error: boolean
}
