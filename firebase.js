// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXpPdDEdUrjNFDu7GAHQiAABKpPb9YwHA",
  authDomain: "challenge-4e24b.firebaseapp.com",
  projectId: "challenge-4e24b",
  storageBucket: "challenge-4e24b.appspot.com",
  messagingSenderId: "31599289632",
  appId: "1:31599289632:web:2f801aa15260e1ca256345",
  measurementId: "G-614SHWJFDJ"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth }; 