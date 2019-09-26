import firebase from 'firebase';

/*const firebaseConfig = {
  apiKey: "AIzaSyBGwdNXL0kD5eJ723QOM62Oc4VfO3sPlhw",
  authDomain: "asci01-52972.firebaseapp.com",
  databaseURL: "https://asci01-52972.firebaseio.com",
  projectId: "asci01-52972",
  storageBucket: "asci01-52972.appspot.com",
  messagingSenderId: "454330407570",
  appId: "1:454330407570:web:864235ccc3a3d82128a44b"
}*/
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
//firebase.firestore().settings({timestampsInSnapshots: true})

export const myFirebase = firebase;
export const myFirestore = firebase.firestore();
export const myStorage = firebase.storage();