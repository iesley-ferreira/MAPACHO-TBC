import { createReducer } from 'typesafe-actions';
import { IProductId } from '../../../interfaces/Product';
import * as actions from './actions';
import { ProductActions, ProductsState } from './types';

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  selectedCategoryId: null,
  selectedCategoryName: null,
  searchValue: null,
  selectedSubCategoryName: null,
  disableButtonShowMore: false,
  page: 1,
  product: {} as IProductId,
  loading: false,
  error: false,
};

const productReducer = createReducer<ProductsState, ProductActions>(initialState)
  .handleAction(actions.fetchProductsRequest, (state, action) => {
    if (
      action.payload.categoryId !== state.selectedCategoryId ||
      (action.payload.searchValue && state.page === 1)
    ) {
      return {
        ...state,
        selectedCategoryId: action.payload.categoryId || null,
        filteredProducts: [],
      };
    } else {
      return {
        ...state,
        loading: true,
      };
    }
  })
  .handleAction(actions.fetchProductsSuccess, (state, action) => {
    const { products, isFiltered } = action.payload;

    return {
      ...state,
      loading: false,
      error: false,
      products: isFiltered ? state.products : [...state.products, ...products],
      filteredProducts: isFiltered
        ? [...state.filteredProducts, ...products]
        : state.filteredProducts,
    };
  })
  .handleAction(actions.fetchProductsFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))
  .handleAction(actions.fetchProductRequest, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.fetchProductSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    product: action.payload,
  }))
  .handleAction(actions.fetchProductFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))
  .handleAction(actions.setSelectedCategory, (state, action) => ({
    ...state,
    selectedCategoryId: action.payload,
  }))
  .handleAction(actions.clearFilteredProducts, (state) => ({
    ...state,
    filteredProducts: [],
  }))
  .handleAction(actions.setPage, (state, action) => {
    return { ...state, page: action.payload };
  })
  .handleAction(actions.setDisableButtonShowMore, (state, action) => ({
    ...state,
    disableButtonShowMore: action.payload,
  }))
  .handleAction(actions.setNewCategoryNames, (state, action) => ({
    ...state,
    selectedCategoryName: action.payload.newCategoryName,
    selectedSubCategoryName: action.payload.newSubCategoryName ?? null,
  }))
  .handleAction(actions.setSearchValue, (state, action) => ({
    ...state,
    searchValue: action.payload,
  }));

export default productReducer;
