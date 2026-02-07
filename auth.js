import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import {
getAuth,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
onAuthStateChanged,
signOut,
sendEmailVerification,
GoogleAuthProvider,
signInWithPopup,
updateProfile
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"

const firebaseConfig={
apiKey:"AIzaSyA2Eb7HpVNE7yPKsYxNqdCNs78qCkov62U",
authDomain:"danz-tsuyoi.firebaseapp.com",
projectId:"danz-tsuyoi",
appId:"1:504620812619:web:02d66470fa3bed9fbfc0ce"
}

const app=initializeApp(firebaseConfig)
const auth=getAuth(app)

onAuthStateChanged(auth,user=>{

if(user){

let name=user.displayName||user.email.split("@")[0]

document.getElementById("userName")?.innerText=name
document.getElementById("userPhoto")?.setAttribute(
"src",
user.photoURL||`https://ui-avatars.com/api/?name=${name}`
)

if(location.pathname.includes("login")){
location.replace("/")
}

}else{

if(!location.pathname.includes("login")){
location.replace("/login.html")
}

}

})

// LOGIN
window.login=async()=>{
const e=email.value.trim()
const p=password.value.trim()
if(!e||!p) return alert("Lengkapi")

await signInWithEmailAndPassword(auth,e,p)
}

// GOOGLE
window.googleLogin=async()=>{
await signInWithPopup(auth,new GoogleAuthProvider())
}

// REGISTER
window.register=async()=>{
const e=email.value.trim()
const p=password.value.trim()
if(p.length<6) return alert("Min 6")

const r=await createUserWithEmailAndPassword(auth,e,p)
await sendEmailVerification(r.user)
alert("Cek email verifikasi")
location.replace("login.html")
}

// LOGOUT
window.logout=async()=>{
await signOut(auth)
location.replace("login.html")
}

// EDIT PROFILE
window.saveProfile=async()=>{
const name=newName.value.trim()
const photo=newPhoto.value.trim()

await updateProfile(auth.currentUser,{
displayName:name||auth.currentUser.displayName,
photoURL:photo||auth.currentUser.photoURL
})

alert("Updated")
location.reload()
}