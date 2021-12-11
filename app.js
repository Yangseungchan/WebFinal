import express from 'express';
import path from 'path';
import morgan from 'morgan';
import api from './routes/api/customers.js';
import index from './routes/index/index.js';
import ejs from 'ejs';

const app = express();

app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

https: app.use(express.static('public'));
app.use(morgan('dev'));

const viewPath = path.resolve() + '/views/';

app.use('/api', api); // api routing
app.use('/', index); // rest routing

app.listen(8001, function () {
  console.log('Example app listening on port 8001!');
  console.log('http://localhost:8001');
});
