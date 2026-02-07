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

const photoInput=document.getElementById("photoInput")
const photoEl=document.getElementById("userPhoto")
const nameEl=document.getElementById("userName")

// ================= PROFILE =================

window.pickPhoto=()=>photoInput.click()

photoInput?.addEventListener("change",e=>{
const file=e.target.files[0]
if(!file) return

const reader=new FileReader()
reader.onload=()=>{
const uid=auth.currentUser.uid
localStorage.setItem(uid+"_photo",reader.result)
photoEl.src=reader.result
}
reader.readAsDataURL(file)
})

window.editName=()=>{
const n=prompt("Nama baru?")
if(!n) return
const uid=auth.currentUser.uid
localStorage.setItem(uid+"_name",n)
nameEl.innerText=n
}

// ================= AUTO LOAD USER =================

onAuthStateChanged(auth,user=>{
if(!user) return

const uid=user.uid

// NAME
let savedName=localStorage.getItem(uid+"_name")
let name=savedName || user.displayName || user.email.split("@")[0]
if(nameEl) nameEl.innerText=name

// PHOTO
let savedPhoto=localStorage.getItem(uid+"_photo")
if(photoEl){
photoEl.src=savedPhoto || user.photoURL ||
"https://ui-avatars.com/api/?name="+name
}
})

// ================= LOGIN =================

window.login=async()=>{
const email=document.getElementById("email")?.value.trim()
const pass=document.getElementById("password")?.value.trim()

if(!email||!pass) return alert("Lengkapi")

try{
await signInWithEmailAndPassword(auth,email,pass)
location.replace("/")
}catch(e){alert(e.message)}
}

// ================= GOOGLE =================

window.googleLogin=async()=>{
try{
await signInWithPopup(auth,new GoogleAuthProvider())
location.replace("/")
}catch(e){alert(e.message)}
}

// ================= REGISTER =================

window.register=async()=>{
const email=document.getElementById("email")?.value.trim()
const pass=document.getElementById("password")?.value.trim()

if(pass.length<6) return alert("Min 6 karakter")

try{
const r=await createUserWithEmailAndPassword(auth,email,pass)
await sendEmailVerification(r.user)
alert("Cek email verifikasi")
location.replace("login.html")
}catch(e){alert(e.message)}
}

// ================= LOGOUT =================

window.logout=()=>{
signOut(auth).then(()=>{
location.replace("login.html")
})
}