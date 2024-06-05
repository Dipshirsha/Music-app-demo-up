import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyALxwFOLvUB362izjPktFA2W1Pa9D065AU",
  authDomain: "music-e2292.firebaseapp.com",
  projectId: "music-e2292",
  storageBucket: "music-e2292.appspot.com",
  messagingSenderId: "584924526116",
  appId: "1:584924526116:web:a42712112e4a25bf0bcab1"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const DB = getStorage(app)
const txtDB = getFirestore(app)
 const auth=getAuth();

export {DB,txtDB,auth};