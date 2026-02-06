
const sidebar = document.querySelector(".sidebar");
const closeBtn = document.querySelector("#btn-menu");

closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

function showPage(pageId) {
    const pages = document.querySelectorAll('.content-page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById('page-' + pageId).classList.add('active');
    
    if(window.innerWidth < 768) {
        sidebar.classList.remove("active");
    }
}

const $ = s => document.querySelector(s);

$("#btn").addEventListener("click", async () => {
    const username = $("#username").value.trim();
    const token = $("#token").value.trim();
    const ram = document.querySelector('input[name="ram"]:checked').value;
    const btn = $("#btn");

    if (!username || !token) return alert("Isi semua data!");

    btn.disabled = true;
    btn.textContent = "Processing...";
    $("#out").textContent = "Sedang membuat panel...";

    try {
        const r = await fetch("/api/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, token, ram })
        });

        const j = await r.json();

        if (j.ok) {
            $("#out").textContent = `BERHASIL ✅\n\nUser: ${j.result.username}\nPass: ${j.result.password}\nRAM: ${ram == 0 ? 'Unlimited' : ram + 'MB'}`;
        } else {
            $("#out").textContent = `GAGAL ❌\n\n${j.message}`;
        }
    } catch (err) {
        $("#out").textContent = "Error koneksi ke server.";
    } finally {
        btn.disabled = false;
        btn.textContent = "Buat Panel";
    }
});