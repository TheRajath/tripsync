// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA71MR3TIR2nxMZMD3hWL4Ps_Yqo7_Zrn8",
  authDomain: "tripsync-c1625.firebaseapp.com",
  projectId: "tripsync-c1625",
  storageBucket: "tripsync-c1625.firebasestorage.app",
  messagingSenderId: "309412149060",
  appId: "1:309412149060:web:f3695775117583f6760911",
  measurementId: "G-YXF9VRY7K5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
