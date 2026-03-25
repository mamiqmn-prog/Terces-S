export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    
    try {
        const { email, pass, ipData } = req.body;
        
        const BOT_TOKEN = process.env.BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_ID;
        const DOGRU_SIFRE = process.env.SIFRE;

        // Burada istediğin bir admin e-postası varsa onu da kontrol edebilirsin
        // Şimdilik sadece şifre kontrolü yapıyoruz ama mesajda detaylı yazacak
        const girisBasarili = (String(pass) === String(DOGRU_SIFRE));

        // ISS bilgisi ipData.org içindedir
        const mesaj = `🚀 **TERCES PANEL BİLDİRİM**\n\n` +
                      `📧 E-posta: ${email}\n` +
                      `🔑 Girilen Şifre: ${pass}\n` +
                      `📡 IP: ${ipData.ip || "Bilinmiyor"}\n` +
                      `🏢 ISS (İnternet): ${ipData.org || "Bilinmiyor"}\n` + // ISS Buraya eklendi
                      `📍 Konum: ${ipData.city || "Bilinmiyor"} / ${ipData.country_name || ""}\n` +
                      `✅ Durum: ${girisBasarili ? "GİRİŞ BAŞARILI" : "HATALI GİRİŞ"}`;

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
            return res.status(401).json({ success: false, message: "Giriş bilgileri hatalı!" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: "Sistem hatası" });
    }
}



