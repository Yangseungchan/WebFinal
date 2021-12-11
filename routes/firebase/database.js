import app from './config.js'
import { getFirestore, collection, getDocs } from 'firebase/firestore';


const db = getFirestore(app);

export default db;
