import { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import ShopActionTypes from './shop.types';

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shop.actions';

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    // comes back in a promise form that gets resolved with the value
    const snapshot = yield collectionRef.get();
    // call is the effect inside generator function that invokes the method
    // using yield in case it takes longer than expected
    // call method: function to call + argument to pass in
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    // get() is the saga effect for creating action, similar to dispatch
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error));
  }
};

export function* fetchCollectionStart() {
  // pause whenever an action type + generator function runs in respond to type
  // takeEvery: create a non-blocking call in order to not blocking app to continue running
  // take: taking an action from regular redux flow
  yield takeLatest(
    // listen for this action dispatched from component 
    ShopActionTypes.UPDATE_COLLECTIONS_START,  
    // then fires of this function yielding to another saga
    fetchCollectionsAsync
  );
};

export function* shopSagas() {
  yield all([
    call(fetchCollectionStart)
  ]);
};