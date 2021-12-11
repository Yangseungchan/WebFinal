import { Router } from 'express';
import path from 'path';
import { firebaseConfig } from '../firebase/config.js';
import db from '../firebase/database.js';
import { getFirestore, collection, getDocs, query, orderBy, where, setDoc, doc} from 'firebase/firestore';
// import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';


const router = Router();
const viewPath = path.resolve() + '/views/';

// const app = initializeApp(firebaseConfig);
// let database = getFirestore(app);
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
      // userCredential.user.reloadUserInfo.localId,
      res.cookie('UId', userCredential.user.reloadUserInfo.localId);
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

//route "/api/init" for handle the initializing the main page
router.get('/init', async (req, res) =>{

  //response에 담을 (json 객체를 담는) 리스트
  var item_list = [];

  // parse the UId from the req header Cookie
  var user_ID = req.headers.cookie;
  user_ID = user_ID.slice(4, user_ID.length - 1);

  //get the instance for specific collection in DB
  const list_collection = collection(db, "list");

  //search for all the documents which are matching with USER ID
  const q = query(list_collection, where("UId", "==", user_ID));
  const querySnapshot = await getDocs(q);

  //parse the all documents to make response JSON object list
  querySnapshot.forEach((doc) => {
    var item_data = doc.data()
    var item = {
      item_id: item_data.item_id,
      UId: user_ID,
      courier: item_data.courier,
      invoice_num: item_data.invoice_num,
      item_name: item_data.item_name,
      last_update: item_data.last_update
    };
    item_list.push(item);
    console.log(item);
    // console.log(req.headers.cookie);
    // doc.data() is never undefined for query doc snapshots
    // doc.id = document's name
    // console.log(doc.id, " => ", item_data.item_id);
  });

  //return the JSON as response
  res.contentType('application/json');
  res.send(JSON.stringify(item_list));

  //TODO:
  // // Add a new document in collection "list"
  // await setDoc(
    //TODO: doc()의 3번째 인자가 doc의 새로 지어줄 id(=document이름)인데, 랜덤하고 유니크한 이름으로 하면 좋을 것 같음
  //   doc(db, "list", "e0yGMFbLPl820UpTXoDr"), {
  //     UId: "pBUI0fRoSWc6dcrmaLH8EhN5Sf73",
  //     item_name: "롱코트사고싶다",
  //     courier: "04",
  //     invoice_num: "555327458603"
  //TODO: timestamp 기록해서 추가 필요
  //     });
});
export default router;