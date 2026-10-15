# 🎁 Doğum Günü & Özür Dilerim - Özel Web Sitesi

Bu proje, doğum gününde hem içten bir özür dilemek hem de unutulmaz bir sürpriz yaşatmak için modern HTML5, CSS3, JavaScript ve Leaflet.js ile özel olarak hazırlandı.

---

## ✨ Yeni ve Güncellenmiş Özellikler

1. **🗺️ Her Şeyin Başladığı Yer (İnteraktif Gece Haritası)**
   - Giriş yapıldıktan sonra eski zaman sayacı kaldırıldı; yerine **ilk buluştuğunuz/tanıştığınız koordinatı gösteren özel koyu temalı interaktif harita** yerleştirildi.
   - Harita üzerinde kalbinizin başladığı noktada gül kurusu renginde atan parlayan nabız iğnesi (*pulsing beacon marker*) ve bilgi penceresi yer alır.
   - "🎯 Merkeze Odakla" ve "Google Haritalar'da Aç ↗" butonları bulunur.

2. **🎮 TFT (Teamfight Tactics) Duo & Sinerji Detayları**
   - Birlikte oynadığınız TFT anılarına özel sevimli detaylar ve arayüz:
     - **Sinerji Rozeti:** *"❤️ Sonsuz Aşk (Heartsteel & Star Guardian) - 3/3 Efsanevi ⭐⭐⭐"*
     - **Tahta Durumu:** +9999 Kalp Atışı, 100 Can / Galibiyet Serisi 🔥, Ebedi Telafi Kılıcı ⚔️.
     - **Söz:** *"Birlikte 8. olsak bile o maçı seninle oynamak hayatımın en güzel dakikaları..."*
     - Zaman tünelinde sabaha karşı oynadığınız TFT maçının anısı!
     - "Hayır" butonuna tıklamaya çalışınca TFT esprileri: *"Hata 404: Hayır seçeneği tahtada satıldı!", "D kitleyip rollesen de basamazsın 🎲!"*

3. **📸 Genişletilmiş Fotoğraf ve Anı Zaman Tüneli (8 Farklı Durak)**
   - İlk Karşılaşma & Bakış
   - Sabaha Karşı TFT Turnuvası 🎮
   - İlk Yolculuk & Arabadaki Şarkılar 🌊
   - Yağmurlu Akşam & Sıcak Kahve ☕
   - Sokakta Gülme Krizleri 😂
   - Mutfağı Savaşa Çevirdiğimiz Akşam 🍝
   - O Kırgınlık & Büyük Hata (Özür) 💔
   - Bugün: Doğum Günün & Yeni Sayfamız 🎂
   - *Fotoğrafların üstüne tıklanarak Lightbox tam ekran olarak incelenebilir.*

4. **📱 %100 Mobil ve Tüm Cihazlarla Kusursuz Uyum**
   - iPhone, Android, tablet ve masaüstü ekranlar için optimize edildi.
   - "Hayır" kaçan butonu mobilde parmak dokunur dokunmaz (`touchstart` & `touchmove`) anında kaçar; ekranda kayma veya takılma yapmaz.

---

## 🛠️ Nasıl Özelleştirilir?

Tüm ayarlar [config.js](file:///C:/Users/nartk/.gemini/antigravity-ide/scratch/dogum-gunu-ozur/config.js) dosyasından kolayca değiştirilebilir:

- `originLocation.coordinates`: Haritada gösterilecek enlem ve boylam (Örn: `[40.9856, 29.0264]`).
- `originLocation.placeName`: Harita üstündeki yer ismi (Örn: *"Moda Sahili"*).
- `timeline`: Kendi gerçek fotoğraflarınız (yerel resim yolu veya link).
- `tftEasterEgg`: TFT sinerji ve söz detayları.

---

## 🌐 Ücretsiz Yayına Alma (Hosting Gerektirmez)

En kolay yöntem:
1. **[app.netlify.com/drop](https://app.netlify.com/drop)** adresine gidin.
2. Bu `dogum-gunu-ozur` klasörünü ekrana sürükleyip bırakın.
3. 10 saniyede size özel linkiniz hazır!
