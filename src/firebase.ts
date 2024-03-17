import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyDCw2S4xKuW9cy7irwb0qTQ3CO-k7kttEs",
   authDomain: "nwitter-reloaded-d42f4.firebaseapp.com",
   projectId: "nwitter-reloaded-d42f4",
   storageBucket: "nwitter-reloaded-d42f4.appspot.com",
   messagingSenderId: "912769767867",
   appId: "1:912769767867:web:1f19d1c01c739daff4cc9e",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
