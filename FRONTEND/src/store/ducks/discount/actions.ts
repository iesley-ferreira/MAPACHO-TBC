import { createAction } from 'typesafe-actions';
import { DiscountActionTypes } from './types';

export const applyDiscountCode = createAction(
  DiscountActionTypes.APPLY_DISCOUNT_CODE,
)<string>();
