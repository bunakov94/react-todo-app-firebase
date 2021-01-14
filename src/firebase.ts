import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCU1CRxGBvT3BM4xnuFql2__BUYbp3aaYE',
  authDomain: 'react-todo-app-efdc8.firebaseapp.com',
  projectId: 'react-todo-app-efdc8',
  storageBucket: 'react-todo-app-efdc8.appspot.com',
  messagingSenderId: '144349304673',
  appId: '1:144349304673:web:9937c0e4ccff0a5fc09720',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
