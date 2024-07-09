import { ActionType } from 'typesafe-actions';
import { ICategory, IFormattedCategory } from '../../../interfaces/Category';
import * as actions from './actions';

export enum CategoriesActionTypes {
  FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST',
  FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE',
}
export type CategoriesActions = ActionType<typeof actions>;

export interface CategoriesState {
  readonly categories: ICategory[];
  readonly formattedCategories: IFormattedCategory[];
  readonly subCategories: ICategory[];
  readonly loading: boolean;
  readonly error: boolean;
}
