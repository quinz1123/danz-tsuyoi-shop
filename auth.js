
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

// AUTO GUARD
onAuthStateChanged(auth,user=>{
const path = location.pathname

if(user){
if(path.includes("login") || path.includes("register")){
location.href="/"
}
}else{
if(!path.includes("login") && !path.includes("register")){
location.href="/login.html"
}
}
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
alert("Daftar berhasil, silakan login")
signOut(auth)
location.href="/login.html"
})
.catch(e=>alert(e.message))
}