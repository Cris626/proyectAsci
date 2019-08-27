import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';

firebase.initializeApp({
    apiKey: "AIzaSyA3CTpYh5OCv5f8eXVRU4KIha8Y4ZfVB_w",
    authDomain: "asci-1f5d7.firebaseapp.com",
    databaseURL: "https://asci-1f5d7.firebaseio.com",
    projectId: "asci-1f5d7",
    storageBucket: "",
    messagingSenderId: "651730027523",
    appId: "1:651730027523:web:bccadba2e9915423"
})

ReactDOM.render(<App />, document.getElementById('root'));

