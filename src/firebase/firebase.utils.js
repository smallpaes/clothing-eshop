import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBR5ylLqCGpp3poEfdfk7No6Zw7ns4mw2c",
  authDomain: "crwn-db-81054.firebaseapp.com",
  projectId: "crwn-db-81054",
  storageBucket: "crwn-db-81054.appspot.com",
  messagingSenderId: "268361712659",
  appId: "1:268361712659:web:45d11db6664b7e32326be6"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  // for signing out, null will be returned and passed in
  if (!userAuth) return;

  // receiving a queryReference object representing the current place in the db
  // using documentRef object to perform CRUD method
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // using the reference to get the real data
  const snapShot = await userRef.get();

  // check if user already exist
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // creat user document
    try {
      await userRef.set({
        displayName, 
        email,
        createdAt,
        ...additionalData
      })

    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config); 

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// always trigger the Google popup whenever using GoogleAuthProvider for authentication and sign in
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;