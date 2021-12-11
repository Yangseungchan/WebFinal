import { Router } from 'express';
import path from 'path';
import { firebaseConfig } from '../firebase/config.js';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';
import { signup, login } from '../firebase/service.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const router = Router();
const viewPath = path.resolve() + '/views/';

const app = initializeApp(firebaseConfig);
let database = getFirestore(app);
const auth = getAuth();

router.get('/login', (req, res) => {
  const user_info = {
    email: req.get('email'),
    passwd: req.get('passwd'),
  };
  console.log(user_info);
  signInWithEmailAndPassword(auth, user_info.email, user_info.passwd)
    .then(userCredential => {
      // Signed in
      console.log('login success');
      const user = userCredential.user;
      //TODO: 로그인
      //   res.render(viewPath + 'signup.html');
      // ...
      res.json({ success: true });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      //TODO: 다시 로그인 창으로 가야함.
      //   res.render(viewPath + 'login.html');
      res.status(406).json({ success: false });
    });
});

export default router;
