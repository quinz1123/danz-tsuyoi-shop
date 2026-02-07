import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import { getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"

const firebaseConfig={
apiKey:"AIzaSyA2Eb7HpVNE7yPKsYxNqdCNs78qCkov62U",
authDomain:"danz-tsuyoi.firebaseapp.com",
projectId:"danz-tsuyoi"
}

const app=initializeApp(firebaseConfig)
const auth=getAuth(app)

onAuthStateChanged(auth,user=>{
if(!user){
location.replace("login.html")
}
})