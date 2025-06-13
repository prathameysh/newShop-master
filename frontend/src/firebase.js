// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEgmP3P6oWxRpB6FUjEyR-90XTDhhBDCE",
  authDomain: "shop-8024d.firebaseapp.com",
  projectId: "shop-8024d",
  storageBucket: "shop-8024d.firebasestorage.app",
  messagingSenderId: "595826208057",
  appId: "1:595826208057:web:4ebec01d3230e3c0a10ce8",
  measurementId: "G-XDESLY90LL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }; 