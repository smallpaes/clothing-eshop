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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// always trigger the Google popup whenever using GoogleAuthProvider for authentication and sign in
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;