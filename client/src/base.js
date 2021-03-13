import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "bachelorproef-2020-2021.firebaseapp.com",
  databaseURL:
    "https://bachelorproef-2020-2021-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bachelorproef-2020-2021",
  storageBucket: "bachelorproef-2020-2021.appspot.com",
  messagingSenderId: "731134136111",
  appId: "1:731134136111:web:3631db23f90227002d1bda",
};

// export const firebase.initializeApp(firebaseConfig);
export const app = firebase.initializeApp(firebaseConfig);
