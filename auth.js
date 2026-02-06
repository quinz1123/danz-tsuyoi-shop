
import { getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { app } from "./firebase.js";

const auth = getAuth(app);

window.register = () => {

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

if(!email || !password) return alert("Lengkapi data");

createUserWithEmailAndPassword(auth,email,password)
.then(()=>{
alert("Register berhasil");
location.href="/login.html";
})
.catch(e=>alert(e.message));

};

window.login = () => {

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

signInWithEmailAndPassword(auth,email,password)
.then(()=>{
location.href="/dashboard.html";
})
.catch(()=>alert("Login gagal"));

};