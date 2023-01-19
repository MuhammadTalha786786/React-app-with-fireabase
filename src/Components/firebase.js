import firebase from 'firebase';
// Initialize Firebase
var firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCFXKzVi6DQN2GgPcp8AVVeCUl7jykwD3Y',
  authDomain: 'web-test-15be2.firebaseapp.com',
  projectId: 'web-test-15be2',
  storageBucket: 'web-test-15be2.appspot.com',
  messagingSenderId: '405396159520',
  appId: '1:405396159520:web:ff65b33308449bc9735045',
  measurementId: 'G-TYFRKSFCXW',
});

var db = firebaseApp.firestore();




export { db };
