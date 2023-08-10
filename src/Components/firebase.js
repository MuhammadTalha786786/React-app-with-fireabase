import firebase from 'firebase';
// Initialize Firebase
var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCDjZfOPANsU4OS1nCXwQH32HCrkY9h4cY",
  authDomain: "praticeapp-10164.firebaseapp.com",
  databaseURL: "https://praticeapp-10164-default-rtdb.firebaseio.com",
  projectId: "praticeapp-10164",
  storageBucket: "praticeapp-10164.appspot.com",
  messagingSenderId: "135769240823",
  appId: "1:135769240823:web:fb1c3c92c1412992d80ff2",
  measurementId: "G-S44FLBEH8Q"
});

var db = firebaseApp.firestore();




export { db };
