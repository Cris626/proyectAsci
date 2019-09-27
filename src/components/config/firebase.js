import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA3CTpYh5OCv5f8eXVRU4KIha8Y4ZfVB_w",
    authDomain: "asci-1f5d7.firebaseapp.com",
    databaseURL: "https://asci-1f5d7.firebaseio.com",
    projectId: "asci-1f5d7",
    storageBucket: "gs://asci-1f5d7.appspot.com",
    messagingSenderId: "651730027523",
    appId: "1:651730027523:web:bccadba2e9915423"
  };
firebase.initializeApp(firebaseConfig);

export const myFirebase = firebase;
export const myFirestore = firebase.firestore();
export const myStorage = firebase.storage();