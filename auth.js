
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import {
getAuth,
onAuthStateChanged,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
signOut
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"

const firebaseConfig = {
apiKey: "AIzaSyA2Eb7HpVNE7yPKsYxNqdCNs78qCkov62U",
authDomain: "danz-tsuyoi.firebaseapp.com",
projectId: "danz-tsuyoi",
appId: "1:504620812619:web:02d66470fa3bed9fbfc0ce"
}

initializeApp(firebaseConfig)
const auth = getAuth()

onAuthStateChanged(auth,user=>{
if(user){
sessionStorage.setItem("login","1")
}else{
sessionStorage.removeItem("login")
}
})

window.login=(e,p)=>{
signInWithEmailAndPassword(auth,e,p)
.then(()=>{
sessionStorage.setItem("login","1")
location.replace("/")
})
.catch(x=>alert(x.message))
}

window.register=(e,p)=>{
createUserWithEmailAndPassword(auth,e,p)
.then(()=>{
alert("Daftar berhasil")
})
.catch(x=>alert(x.message))
}

window.logout=()=>{
signOut(auth).then(()=>{
sessionStorage.clear()
location.replace("/login.html")
})
}