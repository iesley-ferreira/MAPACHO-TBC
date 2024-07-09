import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cart/reducer';
import categoryReducer from './categories';
import discountReducer from './discount/reducer';
import productReducer from './products';
import shippingReducer from './shipping';
import userReducer from './user';
import passwordReducer from './password';

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  user: userReducer,
  shipping: shippingReducer,
  cart: cartReducer,
  discount: discountReducer,
  // checkout: checkoutReducer,
  // order: orderReducer,
  // payment: paymentReducer,
  password: passwordReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
