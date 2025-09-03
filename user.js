import { auth, db } from "./config.js";
import { signOut, onAuthStateChanged } from "./Auth.js";
import {getDocs , collection ,} from "./firestore.js"


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


async function getAllUsers() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        console.log(doc.data())
        let {fullName} = doc.data();
        let userContainer = document.getElementById("user-container")

        userContainer.innerHTML += `<li class="user">
        <div class="user-info">
          <div class="avatar">A</div>
          <span class="user-name">${fullName}</span>
        </div>
        <a href=""><button class="chat-btn">Chat</button></a>
      </li>`
        
    });
}


getAllUsers()


