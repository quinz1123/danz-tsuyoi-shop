import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import {
getAuth,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
onAuthStateChanged,
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

// ==== LOGIN PAGE ONLY ====

onAuthStateChanged(auth,user=>{

if(user){
location.replace("/")
return
}

// show login
boot.remove()
appUI.style.display="block"

})

// ================= LOGIN =================

window.login=async()=>{

const email=document.getElementById("email").value.trim()
const pass=document.getElementById("password").value.trim()

if(!email||!pass) return alert("Lengkapi")

try{
await signInWithEmailAndPassword(auth,email,pass)
}catch(e){alert(e.message)}

}

// ================= GOOGLE =================

window.googleLogin=async()=>{

try{
await signInWithPopup(auth,new GoogleAuthProvider())
}catch(e){alert(e.message)}

}

// ================= REGISTER =================

window.register=async()=>{

const email=document.getElementById("email").value.trim()
const pass=document.getElementById("password").value.trim()

if(pass.length<6) return alert("Min 6")

try{
const r=await createUserWithEmailAndPassword(auth,email,pass)
await sendEmailVerification(r.user)
alert("Cek email")
location.replace("login.html")
}catch(e){alert(e.message)}

}