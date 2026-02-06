import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import {
getAuth,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"

const firebaseConfig = {
apiKey: "AIzaSyA2Eb7HpVNE7yPKsYxNqdCNs78qCkov62U",
authDomain: "danz-tsuyoi.firebaseapp.com",
projectId: "danz-tsuyoi",
appId: "1:504620812619:web:02d66470fa3bed9fbfc0ce"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

// AUTO LOGIN CHECK
onAuthStateChanged(auth,user=>{
if(user){
localStorage.setItem("logged","yes")
if(location.pathname.includes("login") || location.pathname.includes("register")){
setTimeout(()=>{
location.replace("/")
},300)
}
}else{
localStorage.removeItem("logged")
}
})

// LOGIN
window.login = function(){

const email = document.getElementById("email").value.trim()
const password = document.getElementById("password").value.trim()

if(!email || !password){
alert("Isi email dan password")
return
}

signInWithEmailAndPassword(auth,email,password)
.then(()=>{
localStorage.setItem("logged","yes")
setTimeout(()=>{
location.replace("/")
},300)
})
.catch(e=>alert(e.message))
}

// REGISTER
window.register = function(){

const email = document.getElementById("email").value.trim()
const password = document.getElementById("password").value.trim()

if(!email || !password){
alert("Lengkapi data")
return
}

if(password.length < 6){
alert("Password minimal 6 karakter")
return
}

createUserWithEmailAndPassword(auth,email,password)
.then(()=>{
alert("Daftar berhasil, silakan login")
location.replace("login.html")
})
.catch(e=>alert(e.message))
}

// LOGOUT
window.logout = function(){
signOut(auth).then(()=>{
localStorage.removeItem("logged")
location.replace("login.html")
})
}