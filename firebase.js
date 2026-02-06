
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
 apiKey: "AIzaSyA2Eb7HpVNE7yPKsYxNqdCNs78qCkov62U",
 authDomain: "danz-tsuyoi.firebaseapp.com",
 projectId: "danz-tsuyoi"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);