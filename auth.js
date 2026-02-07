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

let currentUID=null

window.pickPhoto=()=>photoInput.click()

photoInput?.addEventListener("change",e=>{
const f=e.target.files[0]
if(!f||!currentUID)return

const r=new FileReader()
r.onload=()=>{
localStorage.setItem(currentUID+"_photo",r.result)
photoEl.src=r.result
}
r.readAsDataURL(f)
})

window.editName=()=>{
if(!currentUID)return
const n=prompt("Nama baru?")
if(!n)return
localStorage.setItem(currentUID+"_name",n)
nameEl.innerText=n
}

onAuthStateChanged(auth,user=>{
if(!user)return

currentUID=user.uid

const savedName=localStorage.getItem(currentUID+"_name")
const savedPhoto=localStorage.getItem(currentUID+"_photo")

nameEl.innerText=savedName||user.displayName||user.email.split("@")[0]

photoEl.src=savedPhoto||user.photoURL||
`https://ui-avatars.com/api/?name=${nameEl.innerText}`
})

// LOGIN
window.login=async()=>{
const email=document.getElementById("email").value.trim()
const pass=document.getElementById("password").value.trim()
if(!email||!pass)return alert("Lengkapi")

try{
await signInWithEmailAndPassword(auth,email,pass)
location.replace("/")
}catch(e){alert(e.message)}
}

// GOOGLE
window.googleLogin=async()=>{
try{
await signInWithPopup(auth,new GoogleAuthProvider())
location.replace("/")
}catch(e){alert(e.message)}
}

// REGISTER
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

// LOGOUT
window.logout=()=>{
signOut(auth).then(()=>{
location.replace("login.html")
})
}