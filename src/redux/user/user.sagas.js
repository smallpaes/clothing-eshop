import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
  auth, 
  googleProvider, 
  createUserProfileDocument,
  getCurrentUser
} from '../../firebase/firebase.utils';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure
} from './user.actions';

// reusable generator function
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    // store the data to the database
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    // when code got executed, return a snapshot obj
    // representing the data currently stored in the db
    const userSnapshot = yield userRef.get();
    // trigger success
    yield put(signInSuccess({
      id: userSnapshot.id,
      // get actual properties on the obj
      ...userSnapshot.data()
    }));
  } catch (error) {
    yield put(signInFailure(error));
  }
};

export function* signInWithGoogle() {
  try {
    // pull of user object from userRef
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
};

export function* onGoogleSignInStart() {
  yield takeLatest(
    UserActionTypes.GOOGLE_SIGN_IN_START,
    signInWithGoogle
  );
};

export function* SignInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
};

export function* onEmailSignInStart() {
  yield takeLatest(
    UserActionTypes.EMAIL_SIGN_IN_START,
    SignInWithEmail
  );
};

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    // if user never sign in: no session found
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error))
  }
};

export function* onCheckUserSession() {
  yield takeLatest(
    UserActionTypes.CHECK_USER_SESSION,
    isUserAuthenticated
  );
};

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
};

export function* onSignOutStart() {
  yield takeLatest(
    UserActionTypes.SIGN_OUT_START,
    signOut
  );
};

export function* signUp({ payload: { displayName, email, password } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
};

export function* onSignUpStart() {
  yield takeLatest(
    UserActionTypes.SIGN_UP_START,
    signUp
  );
};

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
};

export function* onSignUpSuccess() {
  yield takeLatest(
    UserActionTypes.SIGN_UP_SUCCESS,
    signInAfterSignUp
  );
};

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
};
