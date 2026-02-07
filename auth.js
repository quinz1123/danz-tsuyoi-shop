
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

// ===== AUTO PROFILE =====

onAuthStateChanged(auth,user=>{

if(!user) return

let name=user.displayName
if(!name && user.email) name=user.email.split("@")[0]

// custom override
name=localStorage.getItem("customName")||name

const nameEl=document.getElementById("userName")
if(nameEl) nameEl.innerText=name||"User"

let photo=user.photoURL
photo=localStorage.getItem("customPhoto")||photo

const photoEl=document.getElementById("userPhoto")
if(photoEl){
photoEl.src=photo||`https://ui-avatars.com/api/?name=${name}`
}

})

// LOGIN
window.login=()=>{
signInWithEmailAndPassword(auth,email.value,password.value)
.then(()=>location.replace("/"))
.catch(e=>alert(e.message))
}

// REGISTER
window.register=()=>{
createUserWithEmailAndPassword(auth,email.value,password.value)
.then(r=>{
sendEmailVerification(r.user)
alert("Cek email verifikasi")
location.replace("login.html")
})
.catch(e=>alert(e.message))
}

// GOOGLE
window.googleLogin=()=>{
signInWithPopup(auth,new GoogleAuthProvider())
.then(()=>location.replace("/"))
.catch(e=>alert(e.message))
}

// LOGOUT
window.logout=()=>{
signOut(auth).then(()=>{
localStorage.clear()
location.replace("login.html")
})
}