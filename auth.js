
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyA2Eb7HpVNE7yPKsYxNqdCNs78qCkov62U",
  authDomain: "danz-tsuyoi.firebaseapp.com",
  projectId: "danz-tsuyoi",
  appId: "1:504620812619:web:02d66470fa3bed9fbfc0ce"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

// AUTO REDIRECT
onAuthStateChanged(auth, user => {
  if (user && location.pathname.includes("login")) location.href = "/"
  if (!user && !location.pathname.includes("login")) location.href = "/login.html"
})

// LOGIN
window.login = function () {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  signInWithEmailAndPassword(auth, email, password)
    .catch(err => alert(err.message))
}

// REGISTER
window.register = function () {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Daftar berhasil, silakan login"))
    .catch(err => alert(err.message))
}

// LOGOUT
window.logout = function () {
  signOut(auth)
}