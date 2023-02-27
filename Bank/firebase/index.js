import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyA-87LgdfNGt-Rlaye_OxXRCX2ayQdkVTs',
  authDomain: 'cardashboard-9db0c.firebaseapp.com',
  databaseURL: 'https://cardashboard-9db0c-default-rtdb.firebaseio.com',
  projectId: 'cardashboard-9db0c',
  storageBucket: 'cardashboard-9db0c.appspot.com',
  messagingSenderId: '1097120104346',
  appId: '1:1097120104346:web:8aeba453bc3014f0bb8423',
  storageBucket: 'gs://cardashboard-9db0c.appspot.com',
};

const app = initializeApp(firebaseConfig);
export {app};
