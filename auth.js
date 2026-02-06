import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import {
getAuth,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
onAuthStateChanged,
signOut,
updateProfile,
GoogleAuthProvider,
signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"

// FIREBASE CONFIG
const firebaseConfig = {
apiKey: "AIzaSyA2Eb7HpVNE7yPKsYxNqdCNs78qCkov62U",
authDomain: "danz-tsuyoi.firebaseapp.com",
projectId: "danz-tsuyoi",
appId: "1:504620812619:web:02d66470fa3bed9fbfc0ce"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

// ================= AUTO LOGIN CHECK + SYNC PROFILE =================

onAuthStateChanged(auth,user=>{
if(user){

localStorage.setItem("logged","yes")

// SYNC NAME + AVATAR IF EXISTS
const name=document.getElementById("name")
const avatar=document.getElementById("avatar")

if(name) name.innerText=user.displayName || "User"
if(avatar) avatar.src=user.photoURL || "https://i.imgur.com/6VBx3io.png"

// AUTO REDIRECT FROM LOGIN / REGISTER
if(location.pathname.includes("login") || location.pathname.includes("register")){
location.replace("/")
}

}else{
localStorage.removeItem("logged")
}
})

// ================= LOGIN EMAIL =================

window.login = function(){

const email=document.getElementById("email")?.value.trim()
const password=document.getElementById("password")?.value.trim()

if(!email||!password){
alert("Isi email dan password")
return
}

signInWithEmailAndPassword(auth,email,password)
.then(()=>{
localStorage.setItem("logged","yes")
location.replace("/")
})
.catch(e=>alert(e.message))
}

// ================= REGISTER + NICKNAME =================

window.register = async function(){

const nickname=document.getElementById("nickname")?.value.trim()
const email=document.getElementById("email")?.value.trim()
const password=document.getElementById("password")?.value.trim()

if(!nickname||!email||!password){
alert("Lengkapi semua data")
return
}

if(password.length<6){
alert("Password minimal 6 karakter")
return
}

try{

const cred=await createUserWithEmailAndPassword(auth,email,password)

// SAVE DISPLAY NAME
await updateProfile(cred.user,{
displayName:nickname,
photoURL:"https://files.catbox.moe/gi1xx7.jpeg" // DEFAULT AVATAR
})

alert("Daftar berhasil")
location.replace("login.html")

}catch(e){
alert(e.message)
}
}

// ================= GOOGLE LOGIN =================

window.googleLogin = function(){
signInWithPopup(auth,provider)
.then(()=>{
location.replace("/")
})
.catch(e=>alert(e.message))
}

// ================= LOGOUT =================

window.logout = function(){
signOut(auth).then(()=>{
localStorage.removeItem("logged")
location.replace("/login.html")
})
}