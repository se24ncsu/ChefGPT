// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtqwh_-5t2ZMLi2zYQ-6s5glQfMcgaY9A",
  authDomain: "cooksmart-5d74c.firebaseapp.com",
  projectId: "cooksmart-5d74c",
  storageBucket: "cooksmart-5d74c.appspot.com",
  messagingSenderId: "661468581186",
  appId: "1:661468581186:web:a6df4707e024ea38334cdb",
  measurementId: "G-KFGPF5K1L5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app, auth};