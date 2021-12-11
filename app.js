import express from 'express';
import path from 'path';
import morgan from 'morgan';
import api from './routes/api/customers.js';
import index from './routes/index/index.js';

const app = express();

app.use(express.static('public'));
app.use(morgan('combined'));

const viewPath = path.resolve() + '/views/';

app.use('/api', api); // api routing
app.use('/', index); // rest routing

app.listen(8001, function () {
  console.log('Example app listening on port 8001!');
  console.log('http://localhost:8001');
});
