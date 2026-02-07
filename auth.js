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
projectId:"danz-tsuyoi",
appId:"1:504620812619:web:02d66470fa3bed9fbfc0ce"
}

const app=initializeApp(firebaseConfig)
const auth=getAuth(app)

const boot=document.getElementById("boot")
const appUI=document.getElementById("app")

// ================= AUTH CHECK =================

onAuthStateChanged(auth,user=>{

if(user){

if(user.providerData[0]?.providerId!=="google.com"){
if(!user.emailVerified){
signOut(auth)
unlock()
return
}
}

location.replace("/")
return
}

// not logged
unlock()

})

// ================= SHOW UI =================

function unlock(){
boot.remove()
appUI.style.display="block"
}

// ================= LOGIN =================

window.login=async()=>{

const email=emailInput()
const pass=passwordInput()

if(!email||!pass) return alert("Lengkapi")

try{

const res=await signInWithEmailAndPassword(auth,email,pass)

if(!res.user.emailVerified){
alert("Verifikasi email dulu")
signOut(auth)
return
}

location.replace("/")

}catch(e){alert(e.message)}

}

// ================= GOOGLE =================

window.googleLogin=async()=>{

try{

const p=new GoogleAuthProvider()
await signInWithPopup(auth,p)

location.replace("/")

}catch(e){alert(e.message)}

}

// ================= REGISTER =================

window.register=async()=>{

const email=emailInput()
const pass=passwordInput()

if(!email||!pass) return alert("Lengkapi")
if(pass.length<6) return alert("Min 6")

try{

const res=await createUserWithEmailAndPassword(auth,email,pass)
await sendEmailVerification(res.user)

alert("OTP dikirim")
location.replace("login.html")

}catch(e){alert(e.message)}

}

// ================= HELPERS =================

function emailInput(){
return document.getElementById("email")?.value.trim()
}

function passwordInput(){
return document.getElementById("password")?.value.trim()
}