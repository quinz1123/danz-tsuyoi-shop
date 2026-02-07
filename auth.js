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

const firebaseConfig = {
apiKey: "AIzaSyA2Eb7HpVNE7yPKsYxNqdCNs78qCkov62U",
authDomain: "danz-tsuyoi.firebaseapp.com",
projectId: "danz-tsuyoi",
appId: "1:504620812619:web:02d66470fa3bed9fbfc0ce"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

// ================= AUTH CHECK =================

onAuthStateChanged(auth,user=>{

if(user){

// cek email verified kalau bukan google
if(user.providerData[0]?.providerId!=="google.com"){
if(!user.emailVerified){
alert("Verifikasi email dulu bro")
signOut(auth)
}
}

}

})

// ================= LOGIN EMAIL =================

window.login=function(){

const email=document.getElementById("email").value.trim()
const password=document.getElementById("password").value.trim()

if(!email||!password){
alert("Isi email dan password")
return
}

signInWithEmailAndPassword(auth,email,password)
.catch(e=>alert(e.message))

}

// ================= REGISTER =================

window.register=function(){

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

createUserWithEmailAndPassword(auth,email,password)
.then(async(res)=>{
await sendEmailVerification(res.user)
alert("OTP sudah dikirim ke email!")
location.replace("login.html")
})
.catch(e=>alert(e.message))

}

// ================= GOOGLE LOGIN =================

window.googleLogin=function(){

const provider=new GoogleAuthProvider()

signInWithPopup(auth,provider)
.catch(e=>alert(e.message))

}

// ================= LOGOUT =================

window.logout=function(){
signOut(auth).then(()=>{
location.replace("login.html")
})
}