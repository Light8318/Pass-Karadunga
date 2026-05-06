import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWjFFtaQ_cV-FpDeXTNwQr05-M9J3xSPg",
  authDomain: "pass-karadunga.firebaseapp.com",
  projectId: "pass-karadunga",
  storageBucket: "pass-karadunga.firebasestorage.app",
  messagingSenderId: "592569018652",
  appId: "1:592569018652:web:ea7b3059175af3e7e572d9",
  measurementId: "G-EXFZ4QM3TF"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);