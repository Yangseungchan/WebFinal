import { Router } from 'express';
import path from 'path';

const router = Router();
const viewPath = path.resolve() + '/views/';

router.get('/', function (req, res) {
  res.sendFile(viewPath + 'index.html');
});

router.get('/login', function (req, res) {
  res.sendFile(viewPath + 'login.html');
});

router.get('/signup', function (req, res) {
  res.sendFile(viewPath + 'signup.html');
});

router.get('/detail/:id', function (req, res) {
  const { id } = req.params;
  console.log(id);
  res.sendFile(viewPath + 'detail.html');
});

export default router;
