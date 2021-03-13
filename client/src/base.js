import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "bap-nmd-2020-2021.firebaseapp.com",
  projectId: "bap-nmd-2020-2021",
  storageBucket: "bap-nmd-2020-2021.appspot.com",
  messagingSenderId: "620456887133",
  appId: "1:620456887133:web:0e83220c5c768d9c899eb4",
};

export const app = firebase.initializeApp(firebaseConfig);
