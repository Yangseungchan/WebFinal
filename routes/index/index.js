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
import { getDatabase, ref, set } from 'firebase/database';

// import firebabe from 'firebase';

const router = Router();
const viewPath = path.resolve() + '/views/';

const app = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth();

router.get('/', function (req, res) {
  if (!req.cookies['UId']) {
    res.redirect('/login');
  }
  res.render(viewPath + 'index.html');
});

router.get('/login', (req, res) => {
  if (req.cookies['UId']) {
    res.redirect('/');
  }
  res.render(viewPath + 'login.html');
});

router.get('/signup', function (req, res) {
  if (req.cookies['UId']) {
    res.redirect('/');
  }
  res.render(viewPath + 'signup.html');
});

router.get('/detail', function (req, res) {
  console.log(req.query.id);
  console.log(req.query.courier);
  res.render(viewPath + 'detail.html');
});

router.get('/logout', function (req, res) {
  console.log('logout has been reached');
  res.clearCookie('UId', { path: '/' });
  res.redirect('/login');
});

export default router;
