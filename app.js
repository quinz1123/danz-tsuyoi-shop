const btn = document.getElementById("btn")
const out = document.getElementById("out")
const token = document.getElementById("token")
const username = document.getElementById("username")
const ram = document.getElementById("ram")

let isProcessing=false
let lastUsername=null

btn.onclick = async ()=>{

const u=username.value.trim()
const t=token.value.trim()

if(!t) return alert("Token kosong")
if(!u) return alert("Username kosong")

if(lastUsername===u){
alert("Ganti username baru dulu")
return
}

if(isProcessing) return
isProcessing=true

btn.disabled=true
btn.innerText="PROCESS..."

out.innerHTML=`<div class="loader"></div>`

try{

const r=await fetch("/api/create",{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
username:u,
token:t,
ram:ram.value
})
})

const j=await r.json()

if(j.error){
out.innerHTML=`<div style="color:red">${j.error}</div>`
reset()
return
}

lastUsername=u

out.innerHTML=`

<div class="result-card">

<h3>✅ PANEL BERHASIL DIBUAT</h3>

<p><b>Panel:</b> ${j.panel}</p>
<p><b>Username:</b> ${j.username}</p>
<p><b>Password:</b> ${j.password}</p>
<p><b>Server ID:</b> ${j.server_id}</p>
<p><b>RAM:</b> ${j.ram}</p>

<button class="action" onclick="window.open('${j.panel}','_blank')">
BUKA PANEL
</button>

<button class="action dark" onclick="navigator.clipboard.writeText('${j.password}')">
COPY PASSWORD
</button>

<button class="action dark" onclick="navigator.clipboard.writeText('${j.username}')">
COPY USERNAME
</button>

</div>
`

}catch(e){
out.innerHTML="<div style='color:red'>ERROR CONNECTION</div>"
}

reset()
}

function reset(){
isProcessing=false
btn.disabled=false
btn.innerText="CREATE PANEL"
}