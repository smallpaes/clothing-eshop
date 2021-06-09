/* 
  Root-saga: used to run all of the sagas at once once the app starts up in one large saga
  Benefit: Add all saga to this root-saga instead of adding lots of 'sagaMiddleware.run()' in store.js
*/

import { all, call } from 'redux-saga/effects';

import { shopSagas } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga() {
  // all([]): allows to call multiple saga and initialize all on separate task streams--concurrently
  yield all([
    call(shopSagas),
    call(userSagas),
    call(cartSagas)
  ]);
};