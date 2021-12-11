import { Router } from 'express';
import path from 'path';

const router = Router();
const viewPath = path.resolve() + '/views/';

router.get('/', function (req, res) {
  res.sendFile(viewPath + 'index.html');
  //로그인 안되어있으면 로그인 함수로 튕겨
});

router.get('/auth', function (req, res) {
  res.sendFile(viewPath + 'login.html');
  //여기에서 이 경로로 들어올시 로그인파일로 가기
});

//api to deal with login request
router.get('/login', function (req, res) {
  //TODO://로그인 요청을 받는 api를 만들어야됨
});

router.get('/signup', function (req, res) {
  res.sendFile(viewPath + 'signup.html');
  //여기서 회원가입 코드 파일로 가기
});

router.post('/register', function (req, res) {
  //TODO://회원가입 요청을 받는 api를 만들어야됨
});

router.get('/detail/:id', function (req, res) {
  //리스트에서 아이템 별로 순서대로 1 2 3 4 아이디 부여
  const { id } = req.params;
  console.log(id);
  res.sendFile(viewPath + 'detail.html');
});

export default router;
