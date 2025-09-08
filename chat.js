import { onAuthStateChanged } from "./Auth.js";
import { auth, db } from "./config.js";
import { collection, doc, query, setDoc, onSnapshot } from "./firestore.js";

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


const params = new URLSearchParams(window.location.search)
const roomId = params.get("roomId")
console.log(roomId)


function getRealTimeData() {
    const q = query(collection(db, "chatrooms", roomId, "messeges"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
            messages.push(doc.data());

        });
        let messagesCon = document.getElementById("message-con");
        if (messagesCon) {
            messagesCon.innerHTML = ''
            messages.map((message) => {
                console.log(message)
                const { msg, userId } = message
                const chatItemClass = (userId === currentUser) ? "Chat_item_r" : "Chat_item_l";
                messagesCon.innerHTML += `
                  <li class="Chat_item ${chatItemClass}">
                <div class="Chat_msgs">
                    <div class="msg">
                        <div class="msg-content">
                            ${msg}
                        </div>
                    </div>
                </div>
            </li>
                `
            })
        }
    })
}

getRealTimeData()



document.getElementById("msg-send-btn").addEventListener("click", async () => {
    let messegeId = roomId + new Date()
    console.log(messegeId)
    let messageText = document.getElementById("message-text");


    const messageRef = doc(db, "chatrooms", roomId, "messeges", messegeId);
    setDoc(messageRef, {
        createdAt: new Date().toISOString(),
        msg: messageText.value,
        userId: currentUser
    })

})

