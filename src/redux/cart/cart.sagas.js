import { put, takeLatest, all, call } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.actions';

export function* clearCartOnSignPut() {
  yield put(clearCart());
};

export function* onSignOutSuccess() {
  yield takeLatest(
    UserActionTypes.SIGN_OUT_SUCCESS,
    clearCartOnSignPut
  );
};

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess)
  ]);
};