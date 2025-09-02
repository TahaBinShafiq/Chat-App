import { createUserWithEmailAndPassword } from "./Auth.js";
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

document.getElementById("registerBtn").addEventListener("click", registerUser);