import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDJZqU6FPKF9ndSvIKCzTcvj9NURtrdGnw",
  authDomain: "finanzhawara-26669.firebaseapp.com",
  projectId: "finanzhawara-26669",
  storageBucket: "finanzhawara-26669.appspot.com",
  messagingSenderId: "519615544758",
  appId: "1:519615544758:web:6fd96e3315e821ac0cd517",
  measurementId: "G-TY0C2PH3YM",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Define the auth object

export { auth };
