// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCMUUrK20CBddTAUk9dRyJr_KuOcTwjn84",
    authDomain: "tournament-web.firebaseapp.com",
    projectId: "tournament-web",
    storageBucket: "tournament-web.appspot.com",
    messagingSenderId: "113842635864",
    appId: "1:113842635864:web:2229cf66b997bfd9b1762d",
    measurementId: "G-M63YRZLJYR",
    databaseURL: "https://tournament-web-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const db = getDatabase(app);
export default db;