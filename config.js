// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDTEiC9NtYqDcOWV1vZUaDY4xk5Cs3aaYg",
    authDomain: "chat-app-eb575.firebaseapp.com",
    projectId: "chat-app-eb575",
    storageBucket: "chat-app-eb575.firebasestorage.app",
    messagingSenderId: "298599806962",
    appId: "1:298599806962:web:c8a9753c1e9c0e089bdd6b",
    measurementId: "G-GHZWBPR833"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
//   const analytics = getAnalytics(app);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth , app , db
 }