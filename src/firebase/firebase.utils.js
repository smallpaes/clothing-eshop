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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  // Get a new write batch
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    // generate a unique key
    const newDocRef = collectionRef.doc();
    // set the value to the key generated above
    batch.set(newDocRef, obj);
  });

  // commit batch
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });
  return transformCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection
    return acc
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
// always trigger the Google popup whenever using GoogleAuthProvider for authentication and sign in
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;