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

// ================= FIREBASE CONFIG =================

const firebaseConfig = {
apiKey: "AIzaSyA2Eb7HpVNE7yPKsYxNqdCNs78qCkov62U",
authDomain: "danz-tsuyoi.firebaseapp.com",
projectId: "danz-tsuyoi",
appId: "1:504620812619:web:02d66470fa3bed9fbfc0ce"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

// ================= UNLOCK PAGE =================

document.body.style.visibility = "visible"

window.addEventListener("load",()=>{
const gate=document.getElementById("boot") || document.getElementById("gate")
if(gate) gate.remove()
})

// ================= AUTH STATE =================

onAuthStateChanged(auth,user=>{

if(user){

// email login must verified
if(user.providerData[0]?.providerId !== "google.com"){
if(!user.emailVerified){
alert("Verifikasi email dulu!")
signOut(auth)
return
}
}

localStorage.setItem("logged","yes")

// redirect from login/register
if(location.pathname.includes("login") || location.pathname.includes("register")){
location.replace("/")
}

}else{
localStorage.removeItem("logged")
}

// always remove loader
const gate=document.getElementById("boot") || document.getElementById("gate")
if(gate) gate.remove()

})

// ================= LOGIN EMAIL =================

window.login = async ()=>{

const email=document.getElementById("email").value.trim()
const password=document.getElementById("password").value.trim()

if(!email||!password){
alert("Isi email & password")
return
}

try{

const res=await signInWithEmailAndPassword(auth,email,password)

if(!res.user.emailVerified){
alert("Email belum diverifikasi")
signOut(auth)
return
}

localStorage.setItem("logged","yes")
location.replace("/")

}catch(e){
alert(e.message)
}

}

// ================= REGISTER =================

window.register = async ()=>{

const email=document.getElementById("email").value.trim()
const password=document.getElementById("password").value.trim()

if(!email||!password){
alert("Lengkapi data")
return
}

if(password.length<6){
alert("Password minimal 6 karakter")
return
}

try{

const res=await createUserWithEmailAndPassword(auth,email,password)

await sendEmailVerification(res.user)

alert("OTP dikirim ke email (cek spam juga)")
location.replace("login.html")

}catch(e){
alert(e.message)
}

}

// ================= GOOGLE LOGIN =================

window.googleLogin = async ()=>{

try{

const provider=new GoogleAuthProvider()

await signInWithPopup(auth,provider)

localStorage.setItem("logged","yes")
location.replace("/")

}catch(e){
alert(e.message)
}

}

// ================= LOGOUT =================

window.logout = ()=>{

signOut(auth).then(()=>{
localStorage.removeItem("logged")
location.replace("login.html")
})

}