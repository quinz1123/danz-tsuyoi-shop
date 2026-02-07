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

const photo=document.getElementById("userPhoto")
const photoInput=document.getElementById("photoInput")
const nameEl=document.getElementById("userName")

let currentUID=null

// ================= LOAD USER =================

onAuthStateChanged(auth,user=>{
if(!user) return

currentUID=user.uid

const nameKey="name_"+currentUID
const photoKey="photo_"+currentUID

let savedName=localStorage.getItem(nameKey)
let savedPhoto=localStorage.getItem(photoKey)

let name=savedName || user.displayName || user.email.split("@")[0]

nameEl.innerText=name

photo.src = savedPhoto || user.photoURL ||
`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0e0f13&color=fff`
})

// ================= CHANGE PHOTO =================

window.pickPhoto=()=>photoInput.click()

photoInput?.addEventListener("change",e=>{
const f=e.target.files[0]
if(!f || !currentUID) return

const r=new FileReader()
r.onload=()=>{
localStorage.setItem("photo_"+currentUID,r.result)
photo.src=r.result
}
r.readAsDataURL(f)
})

// ================= CHANGE NAME =================

window.editName=()=>{
if(!currentUID) return

const n=prompt("Nama baru?")
if(!n) return

localStorage.setItem("name_"+currentUID,n)
nameEl.innerText=n
}

// ================= LOGIN =================

window.login=async()=>{
const email=document.getElementById("email").value.trim()
const pass=document.getElementById("password").value.trim()
if(!email||!pass)return alert("Lengkapi")

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
const email=document.getElementById("email").value.trim()
const pass=document.getElementById("password").value.trim()

if(pass.length<6)return alert("Min 6 karakter")

try{
const r=await createUserWithEmailAndPassword(auth,email,pass)
await sendEmailVerification(r.user)
alert("Cek email")
location.replace("login.html")
}catch(e){alert(e.message)}
}

// ================= LOGOUT =================

window.logout=()=>{
signOut(auth).then(()=>{
location.replace("login.html")
})
}