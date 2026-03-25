        // Cihaz ismini daha detaylı yakalama
        let temizCihaz = "Bilinmiyor";
        
        if (cihaz.includes("Android")) {
            // Parantez içindeki marka/model kısmını daha geniş alalım
            const match = cihaz.match(/\(([^)]+)\)/);
            if (match) {
                const parts = match[1].split(';');
                // Genelde son parça model ismidir
                temizCihaz = "Android (" + parts[parts.length - 1].trim() + ")";
            } else {
                temizCihaz = "Android Cihaz";
            }
        } else if (cihaz.includes("iPhone") || cihaz.includes("iPad")) {
            temizCihaz = "iOS Cihaz (Apple)";
        } else if (cihaz.includes("Windows")) {
            temizCihaz = "Windows Bilgisayar";
        } else if (cihaz.includes("Macintosh")) {
            temizCihaz = "Mac Bilgisayar";
        } else {
            // Hiçbiri tutmazsa tarayıcı adını al
            temizCihaz = cihaz.split(' ')[0].replace('Mozilla/5.0', 'Bilinmeyen Tarayıcı');
        }






