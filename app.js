import express from 'express';
import path from 'path';
import morgan from 'morgan';
import apiRouter from './routes/api/apiRouter.js';
import index from './routes/index/index.js';
import ejs from 'ejs';

// import {example} from './routes/firebase/login.js';

//firebase admin init part
// var admin = require("firebase-admin");

// var serviceAccount = require("/Users/jin/WEBproject/WebFinal/private/delivery-inquiry-firebase-adminsdk-uviu9-9b9554879f.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

const app = express();

app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(express.static('public'));
app.use(morgan('dev'));

// const viewPath = path.resolve() + '/views/';

app.use('/api', apiRouter); // api routing
app.use('/', index); // rest routing

app.listen(8001, function () {
  console.log('Example app listening on port 8001!');
  console.log('http://localhost:8001');
});
