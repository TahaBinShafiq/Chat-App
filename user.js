import { signOut, onAuthStateChanged } from "./Auth.js";
import { auth } from "./config.js";


onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("ye woh user he jo is waqt login he", user)
        // ...
    } else {
        window.location.replace("./login.html")
        // User is signed out
        // ...
    }
});

function logOut() {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("sign-out")
    }).catch((error) => {
        // An error happened.
    });
}
document.getElementById("signOut").addEventListener("click", logOut);


