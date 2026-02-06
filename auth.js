import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"

const firebaseConfig = {
 apiKey: "ISI_API_KEY",
 authDomain: "ISI_AUTH_DOMAIN",
 projectId: "ISI_PROJECT_ID",
 appId: "ISI_APP_ID"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

// AUTO REDIRECT IF LOGIN
onAuthStateChanged(auth,user=>{
if(user && location.pathname.includes("login")){
location.href="/"
}
})

window.login = function(){
signInWithEmailAndPassword(auth,email.value,password.value)
.then(()=>location.href="/")
.catch(e=>alert(e.message))
}

window.logout = function(){
signOut(auth).then(()=>location.href="login.html")
}