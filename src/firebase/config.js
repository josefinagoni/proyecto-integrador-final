import app from 'firebase/app';
import firebase from 'firebase';

//import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACi2xoNyMbMClkVoEJBy_WXk5_pCQ1-m0",
  authDomain: "proyecto-integrador-2-5842a.firebaseapp.com",
  projectId: "proyecto-integrador-2-5842a",
  storageBucket: "proyecto-integrador-2-5842a.appspot.com",
  messagingSenderId: "1028979810641",
  appId: "1:1028979810641:web:0a16a2bc0913a85e95f370"
};

//cambie esta linea como la de la clase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = app.firestore();