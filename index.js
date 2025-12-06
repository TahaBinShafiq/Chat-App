import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "./Auth.js";
import { auth, db } from "./config.js";
import { doc, getDoc, setDoc } from "./firestore.js";

let loading = false;

function registerUser(event) {
  event.preventDefault();
  loading = true;
  if (loading === true) {
    document.getElementById("registerBtn").innerText = "Creating...";
  }
  let userName = document.getElementById("username");
  let userEmail = document.getElementById("email");
  let userPassword = document.getElementById("password");
  createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
    .then((userCredential) => {
      // Signed up
      loading = false;
      if (loading === false) {
        document.getElementById("registerBtn").innerHTML = "Register";
      }
      Toastify({
        text: "Account Created Successfully!",
        duration: 3000,
      }).showToast();
      const user = userCredential.user;
      console.log(user);
      addUserToDb(userName.value, userEmail.value, user.uid).then(() => {
        userName.value = "";
        userEmail.value = "";
        userPassword.value = "";
        window.location.href = "./user.html";
      });
    })
    .catch((error) => {
      loading = false;
      if (loading === false) {
        document.getElementById("registerBtn").innerText = "Register";
      }
      Toastify({
        text: error,
        duration: 3000,
      }).showToast();
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
    });
    console.log("user db me add ho chuka he");
  } catch (e) {
    console.error("Error adding user", e);
  }
}

document.getElementById("registerBtn")?.addEventListener("click", registerUser);

function loginUser(event) {
  event.preventDefault();
  loading = true;
  if (loading === true) {
    document.getElementById("loginBtn").innerText = "Loging...";
  }
  let loginEmail = document.getElementById("login-email");
  let loginPassword = document.getElementById("login-password");
  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
      loading = false;
      if (loading === false) {
        document.getElementById("loginBtn").innerText = "Login";
      }
      Toastify({
        text: "Login Successfull!",
        duration: 3000,
      }).showToast();
      // Signed in
      const user = userCredential.user;
      // ...
      console.log("user Login ====>", user);
    })
    .catch((error) => {
      loading = false;
      if (loading === false) {
        document.getElementById("loginBtn").innerText = "Login";
      }
      Toastify({
        text: error,
        duration: 3000,
      }).showToast();
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

document.getElementById("loginBtn")?.addEventListener("click", loginUser);

function checkCurrentUser() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      console.log("ye woh user he jo is waqt login he", user);

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      console.log(userSnap);
      if (userSnap.exists() && uid) {
        window.location.href = "user.html";
      }
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}

checkCurrentUser();

export { checkCurrentUser };
