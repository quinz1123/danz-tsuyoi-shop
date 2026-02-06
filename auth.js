import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import {
getAuth,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
onAuthStateChanged
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
onAuthStateChanged(auth,user=>{
if(user && location.pathname.includes("login")) location.href="/"
if(!user && !location.pathname.includes("login") && !location.pathname.includes("register"))
location.href="/login.html"
})

// LOGIN
window.login=()=>{
signInWithEmailAndPassword(auth,email.value,password.value)
.then(()=>location.href="/")
.catch(e=>alert(e.message))
}

// REGISTER
window.register=()=>{
createUserWithEmailAndPassword(auth,email.value,password.value)
.then(()=>{
alert("Daftar berhasil")
location.href="/login.html"
})
.catch(e=>alert(e.message))
}