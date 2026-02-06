export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Method not allowed' });

    const { username, token, ram } = req.body;

    if (token !== "RIZKY123") {
        return res.status(403).json({ ok: false, message: "Token admin tidak valid!" });
    }

    const PANEL_URL = "https://danz-tsuyoi.flixiazone.my.id"; 
    const PTLA = "ptla_HDoMsQBrkjxBYtS0ei6h4pV7NwBHPxZfqgmQBMeczbv"; 
    const EGG_ID = 15; 
    const LOCATION_ID = 1;

    try {
        const userRes = await fetch(`${PANEL_URL}/api/application/users`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${PTLA}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email: `${username}@gmail.com`,
                username: username,
                first_name: username,
                last_name: "User",
                password: `${username}001`
            })
        });

        const userData = await userRes.json();
        if (!userRes.ok) return res.status(400).json({ ok: false, message: userData.errors?.[0]?.detail || "Gagal membuat user." });

        const userId = userData.attributes.id;

        const serverRes = await fetch(`${PANEL_URL}/api/application/servers`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${PTLA}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: username,
                user: userId,
                egg: EGG_ID,
                docker_image: "ghcr.io/pterodactyl/yolks:debian",
                startup: "bash",
                environment: { BASH_VARIABLE: "value", CMD_RUN: "npm start", MAIN_FILE: "index.js" },
                limits: { memory: parseInt(ram), swap: 0, disk: 0, io: 500, cpu: 0 },
                feature_limits: { databases: 10, backups: 10, allocations: 1 },
                deploy: { locations: [LOCATION_ID], dedicated_ip: false, port_range: [] }
            })
        });

        const serverData = await serverRes.json();
        if (!serverRes.ok) return res.status(400).json({ ok: false, message: serverData.errors?.[0]?.detail || "Gagal membuat server." });

        return res.status(200).json({
            ok: true,
            result: {
                panel: PANEL_URL,
                username: username,
                password: `${username}001`,
                ram: ram == 0 ? "Unlimited" : ram + "MB",
                disk: "Unlimited",
                cpu: "Unlimited"
            }
        });

    } catch (err) {
        return res.status(500).json({ ok: false, message: "Internal Server Error" });
    }
}