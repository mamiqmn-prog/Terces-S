import fetch from 'node-fetch';

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const language = req.headers['accept-language'];
  const time = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });

  // IP'den konum bilgisi çek
  let location = 'Bilinmiyor';
  try {
    const geo = await fetch(`https://ipapi.co/${ip}/json/`);
    const geoData = await geo.json();
    location = `${geoData.city}, ${geoData.region}, ${geoData.country_name}`;
  } catch (e) {}

  // ProtonMail'e gönder (EmailJS üzerinden)
  await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: 'SENIN_SERVICE_ID',
      template_id: 'SENIN_TEMPLATE_ID',
      user_id: 'SENIN_PUBLIC_KEY',
      template_params: {
        ip: ip,
        location: location,
        user_agent: userAgent,
        language: language,
        time: time,
      }
    })
  });
