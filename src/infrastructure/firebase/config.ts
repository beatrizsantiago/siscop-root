import {
  getApp, getApps, initializeApp, type FirebaseApp,
} from 'firebase/app';
import {
  getAuth, initializeAuth, type Auth,
} from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app);
  firestore = getFirestore(app);
} else {
  app = getApp();
  auth = getAuth(app);
  firestore = getFirestore(app);
};

export { app, auth, firestore };
