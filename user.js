import { auth, db } from "./config.js";
import { signOut, onAuthStateChanged } from "./Auth.js";
import { getDocs, collection, } from "./firestore.js"

let currentUser = null;
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        currentUser = user.uid
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

        let userData = doc.data();
        if (currentUser === userData.id) {
            return;
        }
        let { fullName, id: userId } = doc.data();
        let userContainer = document.getElementById("user-container")
        userContainer.innerHTML += `<li class="user">
        <div class="user-info">
          <div class="avatar"></div>
          <span class="user-name">${fullName}</span>
        </div>
        <button onclick="checkRoom(event)" class="chat-btn" id="roomButton" data-id=${userId}>Chat</button>
      </li>`

    });
}

getAllUsers()


window.checkRoom = (event) => {
    var friendId = event.target.dataset.id
    console.log(friendId)
}


// function checkRoom(event){
//     var friendId = event.target.dataset.id
//     console.log(friendId)
// }


