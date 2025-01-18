// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import{getAuth} from 'firebase/auth'
import {getDatabase} from 'firebase/database'
// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfe7EdMo_ZZ7OxXYFF87EE16kF1GS6Vzg",
  authDomain: "nomnom-b0c14.firebaseapp.com",
  databaseURL: "https://nomnom-b0c14-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nomnom-b0c14",
  storageBucket: "nomnom-b0c14.firebasestorage.app",
  messagingSenderId: "274649174121",
  appId: "1:274649174121:web:f10b3f9f6834e84a38d2f8"
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(firebase_app);
export const db = getDatabase(firebase_app)