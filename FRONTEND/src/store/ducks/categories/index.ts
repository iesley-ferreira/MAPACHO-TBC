import { createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { CategoriesActions, CategoriesState } from './types';

const initialState: CategoriesState = {
  categories: [],
  formattedCategories: [],
  subCategories: [],
  loading: false,
  error: false,
};

const categoryReducer = createReducer<CategoriesState, CategoriesActions>(initialState)
  .handleAction(actions.fetchCategoriesRequest, (state) => ({
    ...state,
    error: false,
    loading: true,
  }))
  .handleAction(actions.fetchCategoriesSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    formattedCategories: action.payload,
  }))
  .handleAction(actions.fetchCategoriesFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }));

export default categoryReducer;
