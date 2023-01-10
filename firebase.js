import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { getDatabase, ref, set, child, get, onValue } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-Ve2uL9cpWfFBzkW8feLQRIAtkPbNR3A",
    authDomain: "birthdayapp-6f6fc.firebaseapp.com",
    projectId: "birthdayapp-6f6fc",
    storageBucket: "birthdayapp-6f6fc.appspot.com",
    messagingSenderId: "549046520032",
    appId: "1:549046520032:web:7d261525cce7703bf16885"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);
export {
    auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
    db, ref, set, child, get
};
