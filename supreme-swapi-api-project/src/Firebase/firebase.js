import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import firebaseConfig from './firebaseConfig';

console.log("Firebase Config (before init):", firebaseConfig); 
const app = initializeApp(firebaseConfig);
console.log("App Initialized:", app); 
console.log("App Options:", app.options); 
const database = getDatabase(app); 

export { database }; 

