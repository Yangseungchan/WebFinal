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
import axios from 'axios';

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
  // console.log(req.header.cookie);
  signInWithEmailAndPassword(auth, user_info.email, user_info.passwd)
    .then(userCredential => {
      // Signed in
      console.log('login success');
      const user = userCredential.user;
      res.cookie('UId', userCredential.user.reloadUserInfo.localId);
      res.json({
        success: true,
        UId: userCredential.user.reloadUserInfo.localId,
      });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      res.status(400).json({ success: false });
    });
});

router.post('/signup', (req, res) => {
  const user_info = {
    email: req.get('email'),
    passwd: req.get('passwd'),
  };
  console.log(user_info);
  createUserWithEmailAndPassword(auth, user_info.email, user_info.passwd)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // res.render(viewPath + 'login.html');
      res.json({ success: true });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // res.render(viewPath + 'login.html');
      res.status(400).json({ success: false });
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
      UId: user_ID,
      courier: item_data.courier,
      invoice_num: item_data.invoice_num,
      item_name: item_data.item_name,
      last_update: item_data.last_update,
      level: item_data.level
      //TODO: level도 줘야함
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
});

//api for adding item to track list
router.post('/addItem', async (req, res) => {
  
  const docId = Math.random().toString(36).substr(2, 16);
  const itemID = Math.random().toString(36).substr(2, 16);

  // parse the UId from the req header Cookie
  var user_ID = req.headers.cookie;
  user_ID = user_ID.slice(4, user_ID.length - 1);

  try {
  // Add a new document in collection "list"
    await setDoc(

    // TODO: doc()의 3번째 인자가 doc의 새로 지어줄 id(=document이름)인데, 랜덤하고 유니크한 이름으로 하면 좋을 것 같음
    // doc(db, "list", "e0yGMFbLPl820UpTXoDr"), {
    //   UId: "pBUI0fRoSWc6dcrmaLH8EhN5Sf73",
    //   item_name: "롱코트사고싶다",
    //   courier: "04",
    //   invoice_num: "555327458603",
    //   last_update: new Date()
    //   });

      doc(db, "list", docId), {
        UId: user_ID, //string
        item_name: req.get('item_name'), //string
        courier: req.get('courier'), //string
        invoice_num: req.get('invoice_num'), //string
        last_update: new Date()//timestamp type
      }
    );
    //TODO: item 추가 했으니, 다시 메인페이지로 가야함.
    res.json({ success: true });
  } catch (error) {
      //TODO: 다시 추가할 item 정보 입력 창으로 가야함
      //   res.render(viewPath + 'login.html');
      res.status(406).json({ 
        success: false, 
        ErrorMsg: error
      });
  }
});


const GETRequst = (req) => {
    try {
      // var address = "https://info.sweettracker.co.kr/api/v1/trackingInfo";
      // address = address + "?t_key=" + "LWPd5pDTIOygHVnt2eBohQ" + "&t_code=" + req.query.courier+ "&t_invoice=" + req.query.invoice_num;
      // console.log(address);
      return axios.get('https://info.sweettracker.co.kr/api/v1/trackingInfo',{
        params: {
          t_key: 'LWPd5pDTIOygHVnt2eBohQ',
          t_code: req.query.courier,
          t_invoice: req.query.invoice_num
        }
      });
    } catch (error) {
      console.error(error)
    }
};

router.get('/trackingInfo', (req, res) => {
  try {
    // var returnObject = [];
    GETRequst(req).then(response => {
    // console.log(response.data.trackingDetails)
    var tmp = {
      invoice_num: response.data.invoiceNo,
      level: response.data.level,
      trackingDetails: response.data.trackingDetails
    };
    // returnObject.push(tmp);
    res.contentType('application/json');
    res.send(JSON.stringify(tmp));
    // res.send(JSON.stringify(returnObject));
  });
  } catch (error) {
    console.error(error);
    res.status(400).json({ 
      success: false,
      ErrorMsg: error
    });
  }
});
export default router;
