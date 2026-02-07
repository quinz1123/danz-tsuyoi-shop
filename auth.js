import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import {
getAuth,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
onAuthStateChanged,
signOut,
GoogleAuthProvider,
signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"

const firebaseConfig = {
apiKey: "AIzaSyA2Eb7HpVNE7yPKsYxNqdCNs78qCkov62U",
authDomain: "danz-tsuyoi.firebaseapp.com",
projectId: "danz-tsuyoi",
appId: "1:504620812619:web:02d66470fa3bed9fbfc0ce"
}

initializeApp(firebaseConfig)
const auth = getAuth()

const gate = document.getElementById("gate")

// HARD BLOCK SCREEN
document.body.style.visibility="hidden"

// ================= CORE =================

onAuthStateChanged(auth,user=>{

if(user){

if(location.pathname.includes("login")){
location.replace("/")
return
}

}else{

if(!location.pathname.includes("login")){
location.replace("/login.html")
return
}

}

// SHOW PAGE
gate.remove()
document.body.style.visibility="visible"

})

// ================= LOGIN =================

window.login = async function(){

const email = document.getElementById("email").value
const password = document.getElementById("password").value

if(!email||!password) return alert("Isi semua")

await signInWithEmailAndPassword(auth,email,password)

}

// ================= GOOGLE =================

window.googleLogin = async function(){

const provider = new GoogleAuthProvider()
await signInWithPopup(auth,provider)

}

// ================= REGISTER =================

window.register = async function(){

const email = document.getElementById("email").value
const password = document.getElementById("password").value

if(password.length<6) return alert("Min 6 char")

await createUserWithEmailAndPassword(auth,email,password)

location.replace("login.html")

}

// ================= LOGOUT =================

window.logout = function(){

signOut(auth)

}