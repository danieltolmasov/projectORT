import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBB5izpOmON99JMekO_oaa6gjxPW-__3ZY",
  authDomain: "jobcenter-9451d.firebaseapp.com",
  projectId: "jobcenter-9451d",
  storageBucket: "jobcenter-9451d.appspot.com",
  messagingSenderId: "1082502604961",
  appId: "1:1082502604961:web:972a80ab6e95b0ac32e8e0",
  measurementId: "G-DX5D2DVLM4",
  storageBucket: 'gs://jobcenter-9451d.appspot.com'
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app, 'gs://jobcenter-9451d.appspot.com');