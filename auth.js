import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"

const firebaseConfig = {
 apiKey: "AIzaSyA2Eb7HpVNE7yPKsYxNqdCNs78qCkov62U",
 authDomain: "danz-tsuyoi.firebaseapp.com",
 projectId: "danz-tsuyoi",
 appId: "1:504620812619:web:02d66470fa3bed9fbfc0ce"
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