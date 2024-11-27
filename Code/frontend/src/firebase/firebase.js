/* istanbul ignore file */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJSvYFu_p4DqC1g667Ry9kthOQtysFlKM",
  authDomain: "chefgpt-736fa.firebaseapp.com",
  projectId: "chefgpt-736fa",
  storageBucket: "chefgpt-736fa.appspot.com",
  messagingSenderId: "365266888390",
  appId: "1:365266888390:web:f56c9948502186779f59c7",
  measurementId: "G-LR8JFK1FFE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };