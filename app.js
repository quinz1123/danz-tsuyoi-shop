const $ = s => document.querySelector(s);

$("#menuBtn").onclick = () => $("#sidebar").classList.add("active");
$("#menuClose").onclick = () => $("#sidebar").classList.remove("active");

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-links li').forEach(l => l.classList.remove('active'));
    
    $(`#page-${pageId}`).classList.add('active');
    $(`#nav-${pageId}`).classList.add('active');
    $("#sidebar").classList.remove("active");
}

function clean(u) {
    return String(u || "").trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
}

$("#btnCreate").onclick = async () => {
    const token = $("#token").value;
    const username = clean($("#username").value);
    const ram = $('input[name="ram"]:checked').value;
    const btn = $("#btnCreate");

    if (!username || !token) return alert("Harap isi Token dan Username!");

    btn.disabled = true;
    btn.textContent = "Processing...";
    $("#out").textContent = "> Initializing request...\n> Config: RAM " + (ram == 0 ? "Unlimited" : ram + "MB");

    try {
        const response = await fetch("/api/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, token, ram })
        });

        const data = await response.json();

        if (data.ok) {
            const res = data.result;
            $("#out").textContent = `SUCCESS ✅\n\nPanel: ${res.panel}\nUser: ${res.username}\nPass: ${res.password}\n\nSpecs:\nRAM: ${res.ram}\nDisk: ${res.disk}\nCPU: ${res.cpu}`;
        } else {
            $("#out").textContent = `FAILED ❌\n\nMessage: ${data.message}`;
        }
    } catch (err) {
        $("#out").textContent = "ERROR: Connection refused or server down.";
    } finally {
        btn.disabled = false;
        btn.textContent = "Generate Panel Now";
    }
};