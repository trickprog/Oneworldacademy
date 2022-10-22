// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkCpBboOqjV3ncOEezFo8upNfTw9hj480",
  authDomain: "courses-80987.firebaseapp.com",
  projectId: "courses-80987",
  storageBucket: "courses-80987.appspot.com",
  messagingSenderId: "472964160683",
  appId: "1:472964160683:web:d0bdbe7a76c1b20c48abee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth}