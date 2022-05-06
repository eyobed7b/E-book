import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import firestore from "firebase/firestore";

import { getFirestore ,collection} from "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAJgty8t4B6TDiUnxSA4ZXqXhwQuxHlg9g",

  authDomain: "react-auth-51e28.firebaseapp.com",

  projectId: "react-auth-51e28",

  storageBucket: "react-auth-51e28.appspot.com",

  messagingSenderId: "167342321827",

  appId: "1:167342321827:web:13d515578b9b678a31cf16",

  measurementId: "G-7QCZ3KFNFQ",
});

export default app;
export const Auth = firebase.auth();
export const db = getFirestore(app);

export const colRef = collection(db, "collection_name");
 
