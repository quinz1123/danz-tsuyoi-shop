import {auth} from "/firebase.js"
import {
signInWithEmailAndPassword,
createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"

window.login=async()=>{
await signInWithEmailAndPassword(auth,email.value,password.value)
location.href="/index.html"
}

window.register=async()=>{
await createUserWithEmailAndPassword(auth,email.value,password.value)
location.href="/index.html"
}