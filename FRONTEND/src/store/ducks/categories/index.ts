import { createReducer } from 'typesafe-actions'
import * as actions from './actions'
import { CategoriesActions, CategoriesState, Category } from './types'

const initialState: CategoriesState = {
  categories: [],
  subCategories: [],
  loading: false,
  error: false,
}

const categoryReducer = createReducer<CategoriesState, CategoriesActions>(
  initialState
)
  .handleAction(actions.fetchCategoriesRequest, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.fetchCategoriesSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    categories: action.payload.filter(
      (category: Category) => category.categoriaPai.id === 0
    ),
    subCategories: action.payload.filter(
      (category: Category) => category.categoriaPai.id !== 0
    ),
  }))
  .handleAction(actions.fetchCategoriesFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))

export default categoryReducer
