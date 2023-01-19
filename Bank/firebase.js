import firebase from '@react-native-firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyA-87LgdfNGt-Rlaye_OxXRCX2ayQdkVTs',
  authDomain: 'cardashboard-9db0c.firebaseapp.com',
  projectId: 'cardashboard-9db0c',
  storageBucket: 'cardashboard-9db0c.appspot.com',
  messagingSenderId: '1097120104346',
  appId: '1:1097120104346:web:8aeba453bc3014f0bb8423',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {db, auth};
