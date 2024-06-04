import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import myIp from '../../devConfig.json'
import { IProduct } from '../interfaces/Product'
import { RootState } from '../store'
import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  ProductActionTypes,
} from './actionTypes'

export const fetchProducts =
  (
    query: string = ''
  ): ThunkAction<void, RootState, unknown, ProductActionTypes> =>
  async (dispatch) => {
    console.log('query', query)

    dispatch({ type: FETCH_PRODUCTS_REQUEST })
    try {
      const response = await axios.get(
        `http://${myIp.myIp}:3001/bling/produtos`,
        {
          params: { search: query },
        }
      )
      console.log('response', response.data.data)

      const products: IProduct[] = response.data.data
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: products })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message })
      } else {
        dispatch({
          type: FETCH_PRODUCTS_FAILURE,
          payload: 'An unknown error occurred',
        })
      }
    }
  }
