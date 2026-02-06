// Navigasi Sidebar (Garis 3)
const sidebar = document.querySelector(".sidebar");
const btn = document.querySelector("#btn");

btn.onclick = function() {
    sidebar.classList.toggle("active");
}

// Perpindahan Halaman
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    
    // Auto-close sidebar di HP saat pindah menu
    if(window.innerWidth < 768) {
        sidebar.classList.remove("active");
    }
}

// Logika Create Panel
const $ = s => document.querySelector(s);

$("#btnCreate").onclick = async () => {
    const token = $("#token").value.trim();
    const username = $("#username").value.trim();
    const ram = document.querySelector('input[name="ram"]:checked').value;
    const btnSubmit = $("#btnCreate");

    if(!token || !username) return alert("Harap isi semua field!");

    btnSubmit.disabled = true;
    btnSubmit.textContent = "Deploying...";
    $("#out").textContent = "> Initializing...\n> Connecting to panel API...\n> Setting RAM to: " + (ram == 0 ? "Unlimited" : ram + "MB");

    try {
        const response = await fetch("/api/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, token, ram })
        });
        const data = await response.json();

        if(data.ok) {
            $("#out").textContent = `SUCCESS ✅\n\nPanel: ${data.result.panel}\nUser: ${data.result.username}\nPass: ${data.result.password}`;
        } else {
            $("#out").textContent = `FAILED ❌\n\nError: ${data.message}`;
        }
    } catch (e) {
        $("#out").textContent = "Error: Terjadi kegagalan koneksi.";
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = "Deploy Now";
    }
}