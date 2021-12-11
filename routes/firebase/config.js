// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const firebase = require("firebase");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAUwI0WuJD8_AST8Ae7M3zUk0cZQNjtiXA",
  authDomain: "delivery-inquiry.firebaseapp.com",
  databaseURL: "https://delivery-inquiry-default-rtdb.firebaseio.com",
  projectId: "delivery-inquiry",
  storageBucket: "delivery-inquiry.appspot.com",
  messagingSenderId: "92801542570",
  appId: "1:92801542570:web:3d096da7100f2862caa3d3",
  measurementId: "${config.measurementId}"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;



