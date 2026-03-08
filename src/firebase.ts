import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8XxTaJdWjk3z_TOsyv4VjeeD2xAdApSw",
  authDomain: "mech-48488.firebaseapp.com",
  projectId: "mech-48488",
  storageBucket: "mech-48488.firebasestorage.app",
  messagingSenderId: "309821495622",
  appId: "1:309821495622:web:82899dee2b4b4431a2ed47",
  measurementId: "G-HXW5YKZ876"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
