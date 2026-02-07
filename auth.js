import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import {
getAuth,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
onAuthStateChanged,
signOut,
sendEmailVerification,
GoogleAuthProvider,
signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"

const firebaseConfig={
apiKey:"AIzaSyA2Eb7HpVNE7yPKsYxNqdCNs78qCkov62U",
authDomain:"danz-tsuyoi.firebaseapp.com",
projectId:"danz-tsuyoi"
}

const app=initializeApp(firebaseConfig)
const auth=getAuth(app)

/* ================= UI GATE ================= */

document.body.style.opacity="0"
document.body.style.visibility="hidden"

/* ================= AUTH LISTENER ================= */

onAuthStateChanged(auth,user=>{

document.body.style.opacity="1"
document.body.style.visibility="visible"

const gate=document.getElementById("gate")
if(gate) gate.remove()

const path=location.pathname

if(user){

// Email wajib verified
if(user.providerData[0]?.providerId!=="google.com" && !user.emailVerified){
alert("Verifikasi email dulu")
signOut(auth)
return
}

// sudah login tapi masih di login/register
if(path.includes("login")||path.includes("register")){
location.replace("/")
}

}else{

// belum login tapi buka halaman private
if(!path.includes("login")&&!path.includes("register")){
location.replace("login.html")
}

}

})

/* ================= LOGIN EMAIL ================= */

window.login=()=>{
signInWithEmailAndPassword(
auth,
email.value.trim(),
password.value.trim()
).catch(e=>alert(e.message))
}

/* ================= REGISTER + OTP ================= */

window.register=()=>{

createUserWithEmailAndPassword(
auth,
email.value.trim(),
password.value.trim()
).then(r=>{
sendEmailVerification(r.user)
alert("OTP dikirim ke email")
location.replace("login.html")
}).catch(e=>alert(e.message))

}

/* ================= GOOGLE LOGIN ================= */

window.googleLogin=()=>{
signInWithPopup(auth,new GoogleAuthProvider())
.catch(e=>alert(e.message))
}

/* ================= LOGOUT ================= */

window.logout=()=>{
signOut(auth)
}