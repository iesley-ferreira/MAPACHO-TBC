import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export enum DiscountActionTypes {
  APPLY_DISCOUNT_CODE = 'APPLY_DISCOUNT_CODE',
}

export type DiscountActions = ActionType<typeof actions>;

export interface DiscountState {
  readonly code: string | null;
  readonly value: number | null;
  readonly error: boolean;
}
