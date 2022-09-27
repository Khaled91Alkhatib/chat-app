import firebase from "firebase/compat/app";
import "firebase/compat/auth";


/* We need to export the auth created by the firebase */
export const auth = firebase.initializeApp({
  apiKey: "AIzaSyA07wORBvNAOpScj2mCKOW2UZtfnKXXmzY",
  authDomain: "worldnect-d9c70.firebaseapp.com",
  projectId: "worldnect-d9c70",
  storageBucket: "worldnect-d9c70.appspot.com",
  messagingSenderId: "1085461876345",
  appId: "1:1085461876345:web:738e88b606729510b10ea8"
}).auth();