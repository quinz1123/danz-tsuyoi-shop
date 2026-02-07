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

// ================= AUTO LOGIN =================

onAuthStateChanged(auth,user=>{

if(!user){
localStorage.removeItem("logged")
return
}

// ambil nama
let name = user.displayName
if(!name && user.email) name = user.email.split("@")[0]

// ambil custom local
const customName = localStorage.getItem("customName")
const customPhoto = localStorage.getItem("customPhoto")

// SET UI
const nameEl = document.getElementById("userName")
if(nameEl) nameEl.innerText = customName || name || "User"

const photoEl = document.getElementById("userPhoto")
if(photoEl){
photoEl.src =
customPhoto ||
user.photoURL ||
"https://ui-avatars.com/api/?name="+(customName||name||"User")
}

// email verify (non google)
if(user.providerData[0]?.providerId !== "google.com"){
if(!user.emailVerified){
alert("Verifikasi email dulu bro")
signOut(auth)
return
}
}

localStorage.setItem("logged","yes")

if(location.pathname.includes("login") || location.pathname.includes("register")){
setTimeout(()=>location.replace("/"),300)
}

})

// ================= LOGIN =================

window.login = ()=>{

const email=document.getElementById("email").value.trim()
const pass=document.getElementById("password").value.trim()

if(!email||!pass) return alert("Lengkapi data")

signInWithEmailAndPassword(auth,email,pass)
.catch(e=>alert(e.message))

}

// ================= REGISTER =================

window.register = ()=>{

const email=document.getElementById("email").value.trim()
const pass=document.getElementById("password").value.trim()

if(pass.length<6) return alert("Password minimal 6")

createUserWithEmailAndPassword(auth,email,pass)
.then(async r=>{
await sendEmailVerification(r.user)
alert("Cek email verifikasi")
location.replace("login.html")
})
.catch(e=>alert(e.message))

}

// ================= GOOGLE =================

window.googleLogin = ()=>{

signInWithPopup(auth,new GoogleAuthProvider())
.catch(e=>alert(e.message))

}

// ================= LOGOUT =================

window.logout = ()=>{

signOut(auth).then(()=>{
localStorage.clear()
location.replace("login.html")
})

}

// ================= EDIT FOTO =================

const photoInput=document.getElementById("photoInput")

if(photoInput){
photoInput.onchange=e=>{
const f=e.target.files[0]
if(!f)return
const r=new FileReader()
r.onload=()=>{
localStorage.setItem("customPhoto",r.result)
document.getElementById("userPhoto").src=r.result
}
r.readAsDataURL(f)
}
}

window.pickPhoto=()=>{
document.getElementById("photoInput")?.click()
}

// ================= EDIT NAMA =================

window.editName=()=>{

const n=prompt("Masukkan nama baru:")
if(!n)return
localStorage.setItem("customName",n)
document.getElementById("userName").innerText=n

}