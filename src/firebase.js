import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyC5E8BGWWqU7K38SbBBHzRPqGTLSzv_zns",
    authDomain: "app-dev-71b50.firebaseapp.com",
    databaseURL: "https://app-dev-71b50.firebaseio.com",
    projectId: "app-dev-71b50",
    storageBucket: "app-dev-71b50.appspot.com",
    messagingSenderId: "952625117792",
    appId: "1:952625117792:web:9b036aa2ed09334706a105",
    measurementId: "G-Z2GK7RW7G7"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);

  export const db = fb.firestore();