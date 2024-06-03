import {
  CategoryActionTypes,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
} from '../actions/actionTypes'
import { ICategory, ISubCategory } from '../interfaces/Category'

export interface CategoryState {
  allCategories: ICategory[]
  allSubCategories: ISubCategory[]
  isLoading: boolean
  error: string | null
}

const initialState: CategoryState = {
  allCategories: [],
  allSubCategories: [],
  isLoading: false,
  error: null,
}

const categoryReducer = (
  state = initialState,
  action: CategoryActionTypes
): CategoryState => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, isLoading: true, error: null }
    case FETCH_CATEGORIES_SUCCESS: {
      const allCategories = action.payload.filter(
        (category: ICategory) => category.categoriaPai.id === 0
      )
      const allSubCategories = action.payload.filter(
        (category: ICategory) => category.categoriaPai.id !== 0
      )
      return {
        ...state,
        isLoading: false,
        allCategories,
        allSubCategories,
        error: null,
      }
    }
    case FETCH_CATEGORIES_FAILURE:
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
}

export default categoryReducer
