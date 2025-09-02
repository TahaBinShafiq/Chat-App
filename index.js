import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "./Auth.js";
import { auth, db } from "./config.js";
import { doc, setDoc } from "./firestore.js"



function registerUser(event) {
    event.preventDefault();
    let userName = document.getElementById("username");
    let userEmail = document.getElementById("email");
    let userPassword = document.getElementById("password");
    createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            addUserToDb(userName.value, userEmail.value, user.uid).then(() => {
                userName.value = "";
                userEmail.value = "";
                userPassword.value = "";
                window.location.replace("./user.html")
            })

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}

async function addUserToDb(name, email, userId) {
    try {
        await setDoc(doc(db, "users", userId), {
            fullName: name,
            email: email,
            id: userId,
        })
    } catch (e) {
        console.error("Error adding user", e);
    }
}

document.getElementById("registerBtn")?.addEventListener("click", registerUser);



function loginUser(event) {
    event.preventDefault();
    let loginEmail = document.getElementById("email");
    let loginPassword = document.getElementById("password");
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log("user Login ====>", user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

document.getElementById("loginBtn").addEventListener("click", loginUser)




function checkCurrentUser() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            console.log("ye woh user he jo is waqt login he"  , user)
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
}

checkCurrentUser();