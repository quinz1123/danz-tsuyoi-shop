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

// UNHIDE HTML
document.documentElement.style.display="block"
document.body.style.display="block"

// AUTH GATE
onAuthStateChanged(auth,user=>{

// remove loader
const boot=document.getElementById("boot")
if(boot) boot.remove()

const path=location.pathname

if(user){

// email login must verified
if(user.providerData[0]?.providerId!=="google.com" && !user.emailVerified){
alert("Verifikasi email dulu")
signOut(auth)
return
}

if(path.includes("login")||path.includes("register")){
location.replace("/")
}

}else{

if(!path.includes("login")&&!path.includes("register")){
location.replace("login.html")
}

}

})

// LOGIN
window.login=()=>{
signInWithEmailAndPassword(auth,email.value,password.value)
.catch(e=>alert(e.message))
}

// REGISTER (OTP)
window.register=()=>{
createUserWithEmailAndPassword(auth,email.value,password.value)
.then(r=>{
sendEmailVerification(r.user)
alert("OTP dikirim ke email")
location.replace("login.html")
}).catch(e=>alert(e.message))
}

// GOOGLE
window.googleLogin=()=>{
signInWithPopup(auth,new GoogleAuthProvider())
.catch(e=>alert(e.message))
}

// LOGOUT
window.logout=()=>{
signOut(auth)
}