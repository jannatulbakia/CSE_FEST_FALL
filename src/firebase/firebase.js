// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6LWV_aaR8k4bN2dv_b58q345aI_sxgm8",
  authDomain: "smart-health-de98f.firebaseapp.com",
  projectId: "smart-health-de98f",
  storageBucket: "smart-health-de98f.firebasestorage.app",
  messagingSenderId: "979797755671",
  appId: "1:979797755671:web:1c69b79e34523ae1b3d952",
  measurementId: "G-ZBHLZMWE11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);