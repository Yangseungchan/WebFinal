import express, { Router } from 'express';

const app = express();

app.use(express.static('public'));

const path = __dirname + '/views/';
const customers = [];

const api = require('./routes/api/customers');
app.use('/api', api);

app.get('/', function (req, res) {
  res.sendFile(path + 'index.html');
});

app.get('/login', function (req, res) {
  res.sendFile(path + 'login.html');
});

app.get('/signup', function (req, res) {
  res.sendFile(path + 'signup.html');
});

app.get('/detail/:id', function (req, res) {
  res.sendFile(path + 'detail.html');
});

app.use('*', function (req, res) {
  res.sendFile(path + '404.html');
});

app.listen(8081, function () {
  console.log('Example app listening on port 8081!');
  console.log('http://localhost:8081');
});
