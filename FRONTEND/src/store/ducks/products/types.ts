import { ActionType } from 'typesafe-actions';
import { IProduct, IProductId } from '../../../interfaces/Product';
import * as actions from './actions';

export enum ProductsActionTypes {
  FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST',
  FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE',
}

export enum ProductActionTypes {
  FETCH_PRODUCT_ID_REQUEST = 'FETCH_PRODUCT_ID_REQUEST',
  FETCH_PRODUCT_ID_SUCCESS = 'FETCH_PRODUCT_ID_SUCCESS',
  FETCH_PRODUCT_ID_FAILURE = 'FETCH_PRODUCT_ID_FAILURE',
}

export enum SetSelectedCategoryTypes {
  SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY',
  SET_NEW_CATEGORY_NAMES = 'SET_NEW_CATEGORY_NAMES',
}

export enum FilteredProductsTypes {
  CLEAR_FILTERED_PRODUCTS = 'CLEAR_FILTERED_PRODUCTS',
}

export enum SetPageType {
  SET_PAGE = 'SET_PAGE',
}

export enum SetSearchValue {
  SET_SEARCH_VALUE = 'SET_SEARCH_VALUE',
}

export enum DisableButtonShowMoreType {
  DISABLE_BUTTON_SHOW_MORE = 'DISABLE_BUTTON_SHOW_MORE',
}

export interface ProductsSuccessPayload {
  products: IProduct[];
  isFiltered: boolean;
}

export interface ProductsRequestPayload {
  page: number;
  limit: number;
  categoryId?: string | null;
  searchValue?: string | null;
}

export interface NewCategoryNamesPayload {
  newCategoryName: string | null;
  newSubCategoryName?: string | null;
}

export interface ProductsState {
  readonly products: IProduct[];
  readonly filteredProducts: IProduct[];
  readonly searchValue: string | null;
  readonly selectedCategoryId: string | null;
  readonly selectedCategoryName: string | null;
  readonly selectedSubCategoryName: string | null;
  readonly page: number;
  readonly disableButtonShowMore: boolean;
  readonly product: IProductId;
  readonly loading: boolean;
  readonly error: boolean;
}

export type ProductActions = ActionType<typeof actions>;
