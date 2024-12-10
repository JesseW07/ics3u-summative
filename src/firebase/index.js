import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyCqiuHq1Fze1rn0xd4fLwBVkRqiNG9nfBU",
    authDomain: "summative-fd1fa.firebaseapp.com",
    projectId: "summative-fd1fa",
    storageBucket: "summative-fd1fa.firebasestorage.app",
    messagingSenderId: "321460457820",
    appId: "1:321460457820:web:feca993d28521c7ec1f199"
  };

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };