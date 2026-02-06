import {db} from "/firebase.js"
import {addDoc,collection} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

btn.onclick=async()=>{

const r=await fetch("/api/create",{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
username:username.value,
token:token.value,
ram:ram.value
})
})

const j=await r.json()

await addDoc(collection(db,"servers"),{
username:username.value,
ram:ram.value,
date:new Date().toLocaleString()
})

out.textContent=JSON.stringify(j,null,2)
}