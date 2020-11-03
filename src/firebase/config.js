// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "AIzaSyDZ9Lrnh4PCsJ3BA8JNZ--ANv_pEkdg6bE",
  authDomain: "agriculture-e3485.firebaseapp.com",
  databaseURL: "https://agriculture-e3485.firebaseio.com",
  projectId: "agriculture-e3485",
  storageBucket: "gs://agriculture-e3485.appspot.com/",
  messagingSenderId: "217895315521",
  appId: "1:217895315521:web:9982e8301cd373b6b97ec0",
  measurementId: "G-Q9MBY65E37",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
