// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM6reS3JbXE3bHILELAHhqnXWVp0mI8u8",
  authDomain: "pantry-tracker-8eff4.firebaseapp.com",
  projectId: "pantry-tracker-8eff4",
  storageBucket: "pantry-tracker-8eff4.appspot.com",
  messagingSenderId: "150882886029",
  appId: "1:150882886029:web:0a8cb1b9ce0bb959dbddc4",
  measurementId: "G-5EJ7GM9HB1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}