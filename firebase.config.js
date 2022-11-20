// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOg7gyAGZDi3SoEcLIo-WJAMeW3Bgoa-g",
  authDomain: "blog-store-9fb28.firebaseapp.com",
  projectId: "blog-store-9fb28",
  storageBucket: "blog-store-9fb28.appspot.com",
  messagingSenderId: "353989106816",
  appId: "1:353989106816:web:e73cd5320b0288fce4da65",
  measurementId: "G-5YJ9WSTES0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app);
export const initFirebase = () =>{
    return app;
}