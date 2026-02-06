
const sidebar = document.querySelector(".sidebar");
const closeBtn = document.querySelector("#btn");

closeBtn.onclick = () => {
    sidebar.classList.toggle("active");
};

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    
    if(window.innerWidth < 768) {
        sidebar.classList.remove("active");
    }
}

const $ = s => document.querySelector(s);

$("#btnCreate").onclick = async () => {
    const token = $("#token").value.trim();
    const username = $("#username").value.trim();
    const ram = document.querySelector('input[name="ram"]:checked').value;
    const btn = $("#btnCreate");

    if(!token || !username) return alert("Harap isi semua kolom!");

    btn.disabled = true;
    btn.textContent = "Deploying...";
    $("#out").textContent = "> Initializing...\n> Selected Memory: " + (ram == 0 ? "UNLIMITED" : ram + "MB");

    try {
        const res = await fetch("/api/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, token, ram })
        });
        const data = await res.json();

        if(data.ok) {
            $("#out").textContent = `SUCCESS ✅\n\nPanel: ${data.result.panel}\nUser: ${data.result.username}\nPass: ${data.result.password}`;
        } else {
            $("#out").textContent = `FAILED ❌\nError: ${data.message}`;
        }
    } catch (e) {
        $("#out").textContent = "Error: Koneksi server gagal.";
    } finally {
        btn.disabled = false;
        btn.textContent = "Generate Panel Account";
    }
};