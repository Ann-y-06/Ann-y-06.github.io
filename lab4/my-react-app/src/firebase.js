import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAeDkfaN9uqTxcjdb62UFpr6eJO2lcVK7M",
  authDomain: "recipes-app-lab4.firebaseapp.com",
  databaseURL: "https://recipes-app-lab4-default-rtdb.europe-west1.firebasedatabase.app", 
  projectId: "recipes-app-lab4",
  storageBucket: "recipes-app-lab4.firebasestorage.app",
  messagingSenderId: "848380944927",
  appId: "1:848380944927:web:a2eedf567834cb784c6b2a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);