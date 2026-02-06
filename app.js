let isProcessing = false
let lastUsername = null

btn.onclick = async () => {

const currentUsername = username.value.trim()

if(!currentUsername){
alert("Username kosong")
return
}

// BLOCK SAME USERNAME AFTER SUCCESS
if(lastUsername === currentUsername){
alert("Silakan ganti username baru terlebih dahulu.")
return
}

if(isProcessing) return
isProcessing = true

btn.disabled = true
btn.innerText="PROCESS..."

out.innerHTML = `<div class="loader"></div>`

try{

const r = await fetch("/api/create",{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
username:currentUsername,
token:token.value,
ram:ram.value
})
})

const j = await r.json()

if(j.error){
out.innerHTML = `<div style="color:red">${j.error}</div>`
reset()
return
}

// SAVE LAST SUCCESS USERNAME
lastUsername = currentUsername

out.innerHTML = `
<div class="result-card" style="background:#121318;padding:15px;border-radius:16px">

<h3>✅ PANEL BERHASIL DIBUAT</h3>

<p><b>Panel:</b> ${j.panel}</p>
<p><b>Username:</b> ${j.username}</p>
<p><b>Password:</b> ${j.password}</p>
<p><b>Server ID:</b> ${j.server_id}</p>
<p><b>RAM:</b> ${j.ram}</p>

<button onclick="window.open('${j.panel}','_blank')" class="action">BUKA PANEL</button>
<button onclick="navigator.clipboard.writeText('${j.password}')" class="action dark">COPY PASSWORD</button>
<button onclick="navigator.clipboard.writeText('${j.username}')" class="action dark">COPY USERNAME</button>

</div>
`

}catch(e){

out.innerHTML="ERROR CONNECTION"

}

reset()
}

function reset(){
isProcessing=false
btn.disabled=false
btn.innerText="CREATE PANEL"
}