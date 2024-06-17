import { createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { calculateDiscount } from './helpers';
import { DiscountActions, DiscountState } from './types';

const initialState: DiscountState = {
  code: null,
  value: null,
  error: false,
};

const discountReducer = createReducer<DiscountState, DiscountActions>(
  initialState,
).handleAction(actions.applyDiscountCode, (state, action) => {
  const discountValue = calculateDiscount(action.payload);
  if (discountValue === null) {
    return {
      ...state,
      error: true,
    };
  } else {
    return {
      ...state,
      code: action.payload,
      value: discountValue,
      error: !discountValue,
    };
  }
});

export default discountReducer;
