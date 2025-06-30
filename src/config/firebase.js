import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase projenin konfigürasyon bilgileri
const firebaseConfig = {
  apiKey: "AIzaSyDKCgA9h7Z1TbTa2MmvNQgITsq3R2zVquw",
  authDomain: "randevuapp-ec5db.firebaseapp.com",
  projectId: "randevuapp-ec5db",
  storageBucket: "randevuapp-ec5db.firebasestorage.app",
  messagingSenderId: "871209690310",
  appId: "1:871209690310:web:b487757945eb878aeca3c7",
  measurementId: "G-477T1V1DW5",
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth ve Firestore'u dışa aktar
export const auth = getAuth(app);
export const db = getFirestore(app);
