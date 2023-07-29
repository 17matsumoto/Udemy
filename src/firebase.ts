import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBD3H8gdqDr3J0E6cZ9hD6dE6Sb01D2xnk",
  authDomain: "discord-clone-udemy-a0f3a.firebaseapp.com",
  projectId: "discord-clone-udemy-a0f3a",
  storageBucket: "discord-clone-udemy-a0f3a.appspot.com",
  messagingSenderId: "692608990154",
  appId: "1:692608990154:web:7432f5f81a811bcdbb2d33",
  measurementId: "G-P73P9BBEED",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
