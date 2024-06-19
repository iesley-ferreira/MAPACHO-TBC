import { createAction } from 'typesafe-actions';
import { IProductId } from '../../../interfaces/Product';
import {
  DisableButtonShowMoreType,
  FilteredProductsTypes,
  NewCategoryNamesPayload,
  ProductActionTypes,
  ProductsActionTypes,
  ProductsRequestPayload,
  ProductsSuccessPayload,
  SetPageType,
  SetSearchValue,
  SetSelectedCategoryTypes,
} from './types';

// actions de products

export const fetchProductsRequest = createAction(
  ProductsActionTypes.FETCH_PRODUCTS_REQUEST,
)<ProductsRequestPayload>();

export const fetchProductsSuccess = createAction(
  ProductsActionTypes.FETCH_PRODUCTS_SUCCESS,
)<ProductsSuccessPayload>();

export const fetchProductsFailure = createAction(
  ProductsActionTypes.FETCH_PRODUCTS_FAILURE,
)<string>();

// actions de product

export const fetchProductRequest = createAction(
  ProductActionTypes.FETCH_PRODUCT_ID_REQUEST,
)<string>();

export const fetchProductSuccess = createAction(
  ProductActionTypes.FETCH_PRODUCT_ID_SUCCESS,
)<IProductId>();

export const fetchProductFailure = createAction(
  ProductActionTypes.FETCH_PRODUCT_ID_FAILURE,
)<string>();

// actions de selectedCategory

export const setSelectedCategory = createAction(
  SetSelectedCategoryTypes.SET_SELECTED_CATEGORY,
)<string | null>();

export const setNewCategoryNames = createAction(
  SetSelectedCategoryTypes.SET_NEW_CATEGORY_NAMES,
)<NewCategoryNamesPayload>();

// actions de filteredProducts

export const clearFilteredProducts = createAction(
  FilteredProductsTypes.CLEAR_FILTERED_PRODUCTS,
)<void>();

// actions de page

export const setPage = createAction(SetPageType.SET_PAGE)<number>();

export const setDisableButtonShowMore = createAction(
  DisableButtonShowMoreType.DISABLE_BUTTON_SHOW_MORE,
)<boolean>();

export const setSearchValue = createAction(SetSearchValue.SET_SEARCH_VALUE)<
  string | null
>();
