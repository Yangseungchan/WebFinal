import { Router } from 'express';
import path from 'path';

const router = Router();
const viewPath = path.resolve() + '/views/';

router.get('/', function (req, res) {
  res.render(viewPath + 'index.html');
});

router.get('/login', function (req, res) {
  res.render(viewPath + 'login.html');
});

router.get('/signup', function (req, res) {
  res.render(viewPath + 'signup.html');
});

router.get('/detail/:id', function (req, res) {
  const { id } = req.params;
  console.log(id);
  res.render(viewPath + 'detail.html');
});

export default router;
