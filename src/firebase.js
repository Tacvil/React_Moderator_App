// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDtXvwoOWXqRLaJjs0AlnYBtTM5UoMbXWk",
    authDomain: "bulletin-board-cf5c2.firebaseapp.com",
    databaseURL: "https://bulletin-board-cf5c2-default-rtdb.firebaseio.com",
    projectId: "bulletin-board-cf5c2",
    storageBucket: "bulletin-board-cf5c2.appspot.com",
    messagingSenderId: "350331282707",
    appId: "1:350331282707:web:836c45fbecf4b85cafa6e6",
    measurementId: "G-YQL9KFVGFE"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export { auth, db };
