import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// function returning an action(the object)
export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS_FAILURE,
  payload: errorMessage
});

// using thunk: action creator that returns a function that gets the dispatch
// thunk enabled: function returning a function that gets dispatch in it: used to fire multi-process
export const fetchCollectionsAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());

    // get fetch back data associated to this collection
    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error)));
  };
};