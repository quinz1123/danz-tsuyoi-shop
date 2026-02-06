export default async function(req,res){

const {username,token,ram}=req.body

if(token!=="Danz123") return res.json({error:"Token salah"})

const PANEL="https://danz-tsuyoi.flixiazone.my.id"
const PTLA="ptla_HDoMsQBrkjxBYtS0ei6h4pV7NwBHPxZfqgmQBMeczbv"

const user=await fetch(PANEL+"/api/application/users",{
method:"POST",
headers:{
Authorization:`Bearer ${PTLA}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
email:`${username}@gmail.com`,
username,
first_name:username,
last_name:"user",
password:username+"001"
})
}).then(r=>r.json())

const uid=user.attributes.id

const server=await fetch(PANEL+"/api/application/servers",{
method:"POST",
headers:{
Authorization:`Bearer ${PTLA}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
name:username,
user:uid,
egg:15,
docker_image:"ghcr.io/pterodactyl/yolks:debian",
startup:"bash",
environment:{},
limits:{memory:Number(ram),disk:0,cpu:0},
feature_limits:{databases:5,backups:5,allocations:1},
deploy:{locations:[1]}
})
}).then(r=>r.json())

res.json({
panel:PANEL,
username,
password:username+"001",
ram,
server:server.attributes.id
})
} 