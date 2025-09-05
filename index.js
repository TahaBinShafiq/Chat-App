import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "./Auth.js";
import { auth, db } from "./config.js";
import { doc, getDoc, setDoc } from "./firestore.js"



function registerUser(event) {
    event.preventDefault();
    let userName = document.getElementById("username");
    let userEmail = document.getElementById("email");
    let userPassword = document.getElementById("password");
    createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            addUserToDb(userName.value, userEmail.value, user.uid).then(() => {
                userName.value = "";
                userEmail.value = "";
                userPassword.value = "";
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
        console.log("user db me add ho chuka he")
        window.location.href = "./user.html"
    } catch (e) {
        console.error("Error adding user", e);
    }
}

document.getElementById("registerBtn")?.addEventListener("click", registerUser);



function loginUser(event) {
    event.preventDefault();
    let loginEmail = document.getElementById("login-email");
    let loginPassword = document.getElementById("login-password");
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
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

document.getElementById("loginBtn")?.addEventListener("click", loginUser)


function checkCurrentUser() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            console.log("ye woh user he jo is waqt login he", user)

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            console.log(userSnap)
            if (userSnap.exists() && uid) {
                window.location.href = "user.html"; // redirect
            }
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
}

checkCurrentUser()



