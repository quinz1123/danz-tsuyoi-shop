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

let uid=null

window.pickPhoto=()=>photoInput.click()

photoInput?.addEventListener("change",e=>{
const file=e.target.files[0]
if(!file||!uid)return

const reader=new FileReader()
reader.onload=()=>{
localStorage.setItem(uid+"_photo",reader.result)
photoEl.src=reader.result
}
reader.readAsDataURL(file)
})

window.editName=()=>{
if(!uid)return
const n=prompt("Nama baru?")
if(!n)return
localStorage.setItem(uid+"_name",n)
nameEl.innerText=n
}

onAuthStateChanged(auth,user=>{
if(!user)return

uid=user.uid

const savedName=localStorage.getItem(uid+"_name")
const savedPhoto=localStorage.getItem(uid+"_photo")

nameEl.innerText=
savedName||
user.displayName||
user.email.split("@")[0]

photoEl.src=
savedPhoto||
user.photoURL||
`https://ui-avatars.com/api/?name=${nameEl.innerText}`
})

// LOGIN
window.login=async()=>{
const email=document.getElementById("email").value.trim()
const pass=document.getElementById("password").value.trim()
await signInWithEmailAndPassword(auth,email,pass)
location.replace("/")
}

// GOOGLE
window.googleLogin=async()=>{
await signInWithPopup(auth,new GoogleAuthProvider())
location.replace("/")
}

// REGISTER
window.register=async()=>{
const email=document.getElementById("email").value.trim()
const pass=document.getElementById("password").value.trim()
const r=await createUserWithEmailAndPassword(auth,email,pass)
await sendEmailVerification(r.user)
alert("Cek email")
location.replace("login.html")
}

// LOGOUT
window.logout=()=>{
signOut(auth).then(()=>{
location.replace("login.html")
})
}