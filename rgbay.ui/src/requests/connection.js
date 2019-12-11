import firebase from 'firebase/app';
import firebaseConfig from './config.js';

const firebaseApp = () => {
  firebase.initializeApp(firebaseConfig);
};

export default firebaseApp;
