import { createAction } from 'typesafe-actions'
import { CategoriesActionTypes, Category } from './types'

export const fetchCategoriesRequest = createAction(
  CategoriesActionTypes.FETCH_CATEGORIES_REQUEST
)<void>()

export const fetchCategoriesSuccess = createAction(
  CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS
)<Category[]>()

export const fetchCategoriesFailure = createAction(
  CategoriesActionTypes.FETCH_CATEGORIES_FAILURE
)<string>()
