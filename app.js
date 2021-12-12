import express from 'express';
import path from 'path';
import morgan from 'morgan';
import apiRouter from './routes/api/apiRouter.js';
import index from './routes/index/index.js';
import ejs from 'ejs';
import cookieParser from 'cookie-parser';

const app = express();

app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(express.static('public')); // public path for js, css files
app.use(morgan('dev')); // logger
app.use(cookieParser()); // cookie parser

app.use('/api', apiRouter); // api routing
app.use('/', index); // rest routing

app.listen(8001, function () {
  console.log('Example app listening on port 8001!');
  console.log('http://localhost:8001');
});
