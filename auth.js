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

// ================= AUTO LOGIN CHECK =================

document.body.style.opacity="0"

onAuthStateChanged(auth,user=>{

if(user){

// kalau login google → auto verified
if(user.providerData[0]?.providerId!=="google.com"){
if(!user.emailVerified){
alert("Verifikasi email dulu bro")
signOut(auth)
return
}
}

localStorage.setItem("logged","yes")

setTimeout(()=>{
location.replace("/")
},200)

}else{
document.body.style.opacity="1"
localStorage.removeItem("logged")
}

})

// ================= LOGIN EMAIL =================

window.login = function(){

const email=document.getElementById("email").value.trim()
const password=document.getElementById("password").value.trim()

if(!email||!password){
alert("Isi email dan password")
return
}

signInWithEmailAndPassword(auth,email,password)
.then(res=>{

if(res.user.providerData[0]?.providerId!=="google.com"){
if(!res.user.emailVerified){
alert("Email belum diverifikasi")
signOut(auth)
return
}
}

localStorage.setItem("logged","yes")
location.replace("/")

})
.catch(e=>alert(e.message))

}

// ================= REGISTER + OTP =================

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

window.googleLogin = async function(){

const provider=new GoogleAuthProvider()

provider.setCustomParameters({
prompt:"select_account"
})

try{
await signInWithPopup(auth,provider)
location.replace("/")
}catch(e){
alert(e.message)
}

}

// ================= LOGOUT =================

window.logout=function(){
signOut(auth).then(()=>{
localStorage.removeItem("logged")
location.replace("login.html")
})
}