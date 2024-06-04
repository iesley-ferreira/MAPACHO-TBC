import axios from 'axios'
import { Dispatch } from 'redux'
import myIp from '../../devConfig.json'

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST'
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE'

export const fetchCategories = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_CATEGORIES_REQUEST })
  try {
    const response = await axios.get(
      `http://${myIp.myIp}:3001/bling/categorias`
    )
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: response.data.data })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: error.message })
    } else {
      dispatch({
        type: FETCH_CATEGORIES_FAILURE,
        payload: 'An unknown error occurred',
      })
    }
  }
}
