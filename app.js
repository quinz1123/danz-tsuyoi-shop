const $ = s => document.querySelector(s);

// Logika Buka Tutup Menu Garis 3
$("#openMenu").onclick = () => $("#sidebar").classList.add("active");
$("#closeMenu").onclick = () => $("#sidebar").classList.remove("active");

// Perpindahan Halaman (Dashboard & Create)
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    
    $(`#page-${pageId}`).classList.add('active');
    $(`[onclick="showPage('${pageId}')"]`).classList.add('active');
    $("#sidebar").classList.remove("active");
}

// Handler Tombol Create
$("#btnCreate").onclick = async () => {
    const token = $("#token").value;
    const username = $("#username").value;
    const ram = $('input[name="ram"]:checked').value;
    const btn = $("#btnCreate");

    if (!username || !token) return alert("Please fill all fields!");

    btn.disabled = true;
    btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Processing...";
    $("#out").textContent = "> Initializing...\n> Selected RAM: " + (ram == 0 ? "Unlimited" : ram + "MB");

    try {
        const response = await fetch("/api/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, token, ram })
        });
        const data = await response.json();

        if (data.ok) {
            $("#out").textContent = `SUCCESS ✅\n\nUser: ${data.result.username}\nPass: ${data.result.password}\nHost: ${data.result.panel}`;
        } else {
            $("#out").textContent = `FAILED ❌\nError: ${data.message}`;
        }
    } catch (e) {
        $("#out").textContent = "Error connecting to server.";
    } finally {
        btn.disabled = false;
        btn.textContent = "Generate Panel Account";
    }
};