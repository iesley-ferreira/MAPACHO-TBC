import { createAction } from 'typesafe-actions';
import { IFormattedCategory } from '../../../interfaces/Category';
import { CategoriesActionTypes } from './types';

export const fetchCategoriesRequest = createAction(
  CategoriesActionTypes.FETCH_CATEGORIES_REQUEST,
)<void>();

export const fetchCategoriesSuccess = createAction(
  CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS,
)<IFormattedCategory[]>();

export const fetchCategoriesFailure = createAction(
  CategoriesActionTypes.FETCH_CATEGORIES_FAILURE,
)<string>();
