btn.onclick = async () => {

btn.innerText="PROCESS..."

out.innerHTML = `<div class="loader"></div>`

try{

const r = await fetch("/api/create",{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
username:username.value,
token:token.value,
ram:ram.value
})
})

const j = await r.json()

if(j.error){
out.innerHTML = `<div style="color:red">${j.error}</div>`
btn.innerText="CREATE PANEL"
return
}

out.innerHTML = `
<div class="result-card" style="
background:#121318;
padding:15px;
border-radius:16px;
">

<h3>✅ PANEL BERHASIL DIBUAT</h3>

<p><b>Panel:</b> ${j.panel}</p>
<p><b>Username:</b> ${j.username}</p>
<p><b>Password:</b> ${j.password}</p>
<p><b>Server ID:</b> ${j.server_id}</p>
<p><b>RAM:</b> ${j.ram}</p>

<button onclick="window.open('${j.panel}','_blank')" style="
margin-top:10px;
width:100%;
height:45px;
border:none;
border-radius:14px;
background:linear-gradient(45deg,#6d28d9,#3b82f6);
color:white;
font-weight:bold
">BUKA PANEL</button>

<button onclick="navigator.clipboard.writeText('${j.password}')" style="
margin-top:8px;
width:100%;
height:40px;
border:none;
border-radius:14px;
background:#333;
color:white
">COPY PASSWORD</button>

</div>
`

}catch(e){

out.innerHTML="ERROR CONNECTION"

}

btn.innerText="CREATE PANEL"
}