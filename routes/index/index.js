import { Router } from 'express';
import path from 'path';
import { firebaseConfig } from '../firebase/config.js';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase, ref, set} from "firebase/database";


// import firebabe from 'firebase';

const router = Router();
const viewPath = path.resolve() + '/views/';

const app = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth();

router.get('/', function (req, res) {
  res.render(viewPath + 'index.html');
  //로그인 안되어있으면 로그인 함수로 튕겨
  //redirect 이용
});

// router.get('/auth', function (req, res) {
//   res.render(viewPath + 'login.html');
//   //여기에서 이 경로로 들어올시 로그인파일로 가기
// });

router.get('/login', (req, res) => {
  res.render(viewPath + 'login.html');
});

//api to deal with login request

router.get('/signup', function (req, res) {
  res.render(viewPath + 'signup.html');
  //여기서 회원가입 코드 파일로 가기
});

router.post('/register', function (req, res) {
  var user_info = {
    email: req.get('email'),
    passwd: req.get('passwd'),
  };
  createUserWithEmailAndPassword(auth, user_info.email, user_info.passwd)
    .then(userCredential => {
      // Signed in
      console.log('then');
      const user = userCredential.user;
      res.render(viewPath + 'login.html');

      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      res.render(viewPath + 'login.html');
      // ..
    });
  res.render(viewPath + 'index.html');
});

router.get('/detail/:id', function (req, res) {
  //리스트에서 아이템 별로 순서대로 1 2 3 4 아이디 부여
  const { id } = req.params;
  console.log(id);
  res.render(viewPath + 'detail.html');
});

export default router;
