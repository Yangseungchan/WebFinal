import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import {admin} from "firebase-admin"
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../firebase/config.js';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// let database = getFirestore(app);
// const auth = getAuth();

export function signup(user_info){
  console.log("signup func entered")
  
  console.log("signup start")

  createUserWithEmailAndPassword(auth, user_info.email, user_info.passwd)
    .then((userCredential) => {
      // Signed in
      console.log("then")
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    //   console.log(errorMessage);
      console.log(error)
      // ..
    });
}
export function login(user_info){
    const auth = getAuth();
    
}

