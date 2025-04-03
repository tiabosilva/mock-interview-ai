// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAd_jrAIKRYq7wRaBLXmCXbvgtRiTYGesI",
  authDomain: "mock-interview-ai-dcb67.firebaseapp.com",
  projectId: "mock-interview-ai-dcb67",
  storageBucket: "mock-interview-ai-dcb67.firebasestorage.app",
  messagingSenderId: "1038162736360",
  appId: "1:1038162736360:web:541ca8ad802d404232455d",
  measurementId: "G-YY5WYX3WBH"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);