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

// ===== UI GATE (ANTI FLICKER) =====
document.body.style.opacity="0"

// ===== GLOBAL AUTH LISTENER =====
onAuthStateChanged(auth,user=>{

// remove gate
document.body.style.opacity="1"
const g=document.getElementById("gate")
if(g) g.remove()

const path=location.pathname

if(user){

// email login wajib verified
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

// ===== LOGIN EMAIL =====
window.login=function(){

signInWithEmailAndPassword(
auth,
email.value.trim(),
password.value.trim()
).catch(e=>alert(e.message))

}

// ===== REGISTER + OTP =====
window.register=function(){

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

// ===== GOOGLE LOGIN =====
window.googleLogin=function(){
signInWithPopup(auth,new GoogleAuthProvider())
.catch(e=>alert(e.message))
}

// ===== LOGOUT =====
window.logout=function(){
signOut(auth)
}