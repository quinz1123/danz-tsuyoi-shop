
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import {
getAuth,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"

const firebaseConfig = {
apiKey: "ISI_APIKEY_KAMU",
authDomain: "ISI_AUTHDOMAIN",
projectId: "ISI_PROJECTID",
appId: "ISI_APPID"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

/* LOGIN */
window.login = function(){
let email = document.getElementById("email").value
let pass = document.getElementById("password").value

signInWithEmailAndPassword(auth,email,pass)
.then(()=>{
sessionStorage.setItem("login","true")
location.replace("/")
})
.catch(e=>alert(e.message))
}

/* REGISTER */
window.register = function(){
let email = document.getElementById("email").value
let pass = document.getElementById("password").value

createUserWithEmailAndPassword(auth,email,pass)
.then(()=>{
alert("Register sukses")
location.href="login.html"
})
.catch(e=>alert(e.message))
}

/* LOGOUT */
window.logout = function(){
signOut(auth)
.then(()=>{
sessionStorage.clear()
location.replace("login.html")
})
}

/* GUARD */
onAuthStateChanged(auth,user=>{
if(user){
sessionStorage.setItem("login","true")
}else{
sessionStorage.removeItem("login")
}
})