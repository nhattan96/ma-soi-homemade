// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getDatabase } from 'firebase/database'


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOfk9C32PRUxTIumr1iNDJ5eaFY2pnOVc",
  authDomain: "ma-soi-7b80f.firebaseapp.com",
  databaseURL: "https://ma-soi-7b80f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ma-soi-7b80f",
  storageBucket: "ma-soi-7b80f.appspot.com",
  messagingSenderId: "678662370688",
  appId: "1:678662370688:web:9009a5915ffbbeb962bd65",
  measurementId: "G-4RSYM63XX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);