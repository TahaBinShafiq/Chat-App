import { db } from "./config.js";
import { collection, doc, query, setDoc } from "./firestore.js";
import { checkCurrentUser } from "./index.js";

const params = new URLSearchParams(window.location.search)
const roomId = params.get("roomId")
console.log(roomId)

let messagesCon = document.getElementById("message-con");

function getRealTimeData() {
    const q = query(collection(db, "chatrooms", roomId, "messeges"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
            messages.push(doc.data());

        });
        messagesContainer.innerHTML = ''
        messages.map((message) => {
            const { message: userMessage, userId: senderId } = message
            messagesCon.innerHTML += ``
        })
    })
}



document.getElementById("msg-send-btn").addEventListener("click" , async() =>{
    let messegeId = roomId + new Date()
    console.log(messegeId)
    let messageText = document.getElementById("message-text");

    const getLoginUser = null
    await checkCurrentUser((user) =>{
        getLoginUser = user

        if(!getLoginUser){
            window.location.href = "./login.html"
        }else{
            console.log(getLoginUser)
        }
    })


    // const messageRef = doc(db, "chatrooms" , roomId , "messeges" , messegeId);
    // setDoc(messageRef ,{
    //     createdAt : new Date().toISOString(),
    //     msg : messageText.value,
    //     userId: userId
    // })

})

