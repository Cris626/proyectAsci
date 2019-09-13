import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyA3CTpYh5OCv5f8eXVRU4KIha8Y4ZfVB_w",
    authDomain: "asci-1f5d7.firebaseapp.com",
    projectId: "asci-1f5d7",
});

let db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

export default db;