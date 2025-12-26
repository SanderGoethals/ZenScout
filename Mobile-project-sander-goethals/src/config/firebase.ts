import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_GW9KLRfyRH2akCElNw21IbQO-27Qeaw",
  authDomain: "spafinderauth.firebaseapp.com",
  projectId: "spafinderauth",
  storageBucket: "spafinderauth.firebasestorage.app",
  messagingSenderId: "351676000908",
  appId: "1:351676000908:web:c749000effdf4fcf9469a9"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const db = getFirestore(app);