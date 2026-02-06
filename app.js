btn.onclick=async()=>{

btn.innerText="Loading..."

const username=username.value
const token=token.value
const ram=ram.value

const r=await fetch("/api/create",{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({username,token,ram})
})

const j=await r.json()

out.textContent=JSON.stringify(j,null,2)
btn.innerText="CREATE PANEL"
}