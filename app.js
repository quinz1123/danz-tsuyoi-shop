btn.onclick=async()=>{

btn.innerText="PROCESS..."

try{

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

out.textContent=JSON.stringify(j,null,2)

}catch(e){

out.textContent="ERROR CONNECTION"

}

btn.innerText="CREATE PANEL"

}