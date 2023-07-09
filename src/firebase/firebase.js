import firebase from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAI3Vnbg85tkTYr8FkpwXxePv3SmIHM9dA",
  authDomain: "masters-games.firebaseapp.com",
  projectId: "masters-games",
  storageBucket: "masters-games.appspot.com",
  messagingSenderId: "138375400869",
  appId: "1:138375400869:web:d6a6cfc505749fd3626c4c"
};

firebase.initializeApp(firebaseConfig)

export const db = getFirestore();
export const auth = getAuth();
