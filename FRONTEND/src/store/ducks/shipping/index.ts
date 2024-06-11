import { createReducer } from 'typesafe-actions'
import * as actions from './actions'
import { ShippingActions, ShippingState } from './types'

const initialState: ShippingState = {
  completeAddress: {
    postalCode: '',
    address: '',
    houseNumber: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  },
  deliveryOptions: [],
  distance: 0,
  loading: false,
  error: false,
}

const shippingReducer = createReducer<ShippingState, ShippingActions>(
  initialState
)
  .handleAction(actions.fetchAddressRequest, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.fetchAddressSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    completeAddress: {
      ...state.completeAddress,
      ...action.payload,
    },
  }))
  .handleAction(actions.fetchAddressFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))
  .handleAction(actions.addHouseNumber, (state, action) => ({
    ...state,
    completeAddress: {
      ...state.completeAddress,
      houseNumber: action.payload,
    },
  }))
  // Delivery actions
  .handleAction(actions.fetchDeliveryOptionPricesRequest, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.fetchDeliveryOptionPricesSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    deliveryOptions: action.payload,
  }))
  .handleAction(actions.fetchDeliveryOptionPricesFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))
  // Distance actions
  .handleAction(actions.fetchDeliveryDistanceRequest, (state) => ({
    ...state,
    loading: true,
  }))
  .handleAction(actions.fetchDeliveryDistanceSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: false,
    distance: action.payload.distance,
  }))
  .handleAction(actions.fetchDeliveryDistanceFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))

export default shippingReducer