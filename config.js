// ========================================================================
// 🎁 KİŞİSELLEŞTİRME AYARLARI (CONFIG)
// Bu dosyayı kendi anılarınıza, fotoğraflarınıza, harita koordinatlarınıza
// ve TFT esprilerinize göre kolayca özelleştirebilirsiniz!
// ========================================================================

const APP_CONFIG = {
  // 0. GOOGLE SHEETS LOG TAKİP AYARLARI
  // Sevgilinizin hangi butona bastığını canlı takip etmek için:
  analytics: {
    enabled: true,
    // Google Sheets Apps Script Web App URL'nizi buraya tırnakların içine yapıştırın:
    googleSheetsUrl: ""
  },

  // 1. KİŞİSEL BİLGİLER
  recipientName: "Bal Yanaklı",       // Sevgilinizin adı / Hitap
  senderName: "Senin Şapşalın",    // Gönderen / İmza

  // 2. HER ŞEYİN BAŞLADIĞI NOKTA (HARİTA & KOORDİNATLAR)
  originLocation: {
    title: "Her Şeyin Başladığı Yer",
    placeName: "Sultan Pansiyon", // Sizin özel başlangıç noktanız
    description: "Kızkalesi'nde, dalgaların sesinde ve Sultan Pansiyon'un o köşesinde başlayan hikayemiz...",
    // Sultan Pansiyon Koordinatları: [Enlem (Latitude), Boylam (Longitude)]
    coordinates: [36.5007215, 34.1884329],
    zoomLevel: 17, // Harita yakınlık derecesi (pansiyonu net gösterir)
    googleMapsUrl: "https://www.google.com/maps/place/Sultan+Pansiyon/@36.5007215,34.1884329,18z"
  },

  // 3. GİRİŞ & ŞİFRE AYARLARI (Şifreli Kapı)
  secretGate: {
    title: "Her Şeyin Başladığı Nokta",
    subtitle: "Bu kapı sadece kalbimizin koordinatlarını bilen biri için açılır.",

    // Kabul edilecek şifreler (koordinat varyasyonları ve pansiyon ismi)
    acceptedPasswords: [
      "36.5007, 34.1884",
      "36.5007,34.1884",
      "36.5007 34.1884",
      "36.5007215, 34.1884329",
      "36.5007215,34.1884329",
      "haticecik",
      "balyanak",
      "bal yanak",
      "tft",              // TFT şifresi de geçerli
      "özür dilerim"
    ],

    // İpucu butonuna tıklandıkça sırayla açılacak ipuçları
    hints: [
      "💡 1. İpucu: Sana en çok dediğim kelime",
      "💡 2. İpucu: En çok beğendiğim yerin",
      "💡 3. İpucu: ss"
    ],

    bypassPhraseText: "Şifreyi hatırlayamadım 🥺",
    bypassAnswer: "Seni kapıda bekletmeye kıyamam, tıkla ve gir!"
  },

  // 4. TFT (TEAMFIGHT TACTICS) ÖZEL SİNERJİ & STRATEJİ USTALARI
  tftEasterEgg: {
    synergyName: "Sonsuz Aşk Sinerjisi (Heartsteel & Star Guardian)",
    synergyTier: "Seviye 3 / 3 Efsanevi ⭐⭐⭐",
    // Strateji Ustalarımız (Little Legends)
    tacticians: [
      {
        id: "tactician-1",
        name: "Şövalye Pengu",
        role: "Takımın Beyni & Kraliçesi 🐧👑",
        image: "assets/pengu.jpg",
        star: "⭐⭐⭐ (3 Yıldız)",
        dialogue: "Dükkandaki tüm altınları harcasam da bulabileceğim en değerli şampiyon sensin! 💖"
      },
      {
        id: "tactician-2",
        name: "Şapşal Şonk (Choncc)",
        role: "Sadık Duo Partnerin 🐲🍗",
        image: "assets/choncc.jpg",
        star: "⭐⭐⭐ (3 Yıldız)",
        dialogue: "Tavuk butumu bile seninle paylaşırım, lütfen beni affet ve sımsıkı sarılalım 🥺"
      }
    ],
    stats: [
      { label: "Sinerji Bonusu", value: "+9999 Kalp Atışı" },
      { label: "Tahta Durumu", value: "100 Can / Galibiyet Serisi 🔥" },
      { label: "Özel Eşya", value: "Ebedi Özür & Telafi Kılıcı ⚔️" }
    ],
    tacticianQuote: "Birlikte 8. olsak bile o maçı seninle oynamak hayatımın en güzel dakikaları..."
  },

  // 5. ZAMAN TÜNELİ ANILARI (HER ŞEYİN BAŞLADIĞI GÜNDEN BUGÜNE BİZİM HİKAYEMİZ)
  timeline: [
    {
      id: "milestone-1",
      date: "Her Şeyin Başladığı O İlk Gün",
      title: "Benim mutluluğumun başladığı gün..",
      location: "Sultan Pansiyon, Kızkalesi",
      photo: "assets/media/1.jpg",
      badge: "Miladımız 🌊",
      note: "Evrendeki bütün yollar bizi o gün Sultan Pansiyon'da buluşturdu. Hayatımın en güzel en değerli adımı burada yaşandı. Senin beni öpmen (Benim seni öpmem)  ile :)",
      bgAtmosphere: "linear-gradient(135deg, #101c2e 0%, #1c3d52 100%)"
    },
    {
      id: "milestone-2",
      date: "Vazgeçilmezsin",
      title: "Seninle olduğum her an zaman keşke dursa",
      location: "Sultan Pansiyon, Kızkalesi",
      photo: "assets/media/2.jpg",
      badge: "İlk Tebessüm ☀️",
      note: "Gözlerinin içine bakarken ellerimin nasıl titrediğini, kalbimin göğsüme sığmadığını dün gibi hatırlıyorum. O gün anladım ki sen benim bu hayattaki en büyük şansımdın.",
      bgAtmosphere: "linear-gradient(135deg, #132238 0%, #20455c 100%)"
    },
    {
      id: "milestone-3",
      date: "Göz Göze Geldiğimiz Saniye",
      title: "Konuşmadanda anlaşırdık,büyük bir aşk hikayesi",
      location: "Sultan Pansiyon, Kızkalesi",
      photo: "assets/media/3.jpg",
      badge: "Göz Göze ❤️",
      note: "Herhangi bir şey hakkında birbirimizin birşey söylemesine gerek yoktu, her şeyi anlardık, birbirimizi tamamlardık.",
      bgAtmosphere: "linear-gradient(135deg, #0e1e30 0%, #193f54 100%)"
    },
    {
      id: "milestone-4",
      date: "Makyaja gerek yok",
      title: "Her halinle en güzelsin ",
      location: "Sultan Pansiyon, Kızkalesi",
      video: "assets/media/4.mp4",
      photo: "assets/media/1.jpg",
      isVideo: true,
      badge: "Canlı Hatıramız 🎬",
      note: "Bu video senin o günkü sesini, saçlarını ve bana olan o sıcacık gülüşünü canlı tutuyor. Her izlediğimde o ilk güne dönüyor, sana yeniden aşık oluyorum.",
      bgAtmosphere: "linear-gradient(135deg, #0b1c2b 0%, #1d4359 100%)"
    },
    {
      id: "milestone-5",
      date: "En Tatlı Hallerimiz",
      title: "Binbir Halimiz",
      location: "Bizim Küçük Dünyamız",
      photo: "assets/media/5.jpg",
      badge: "Mimiklerimiz 😂",
      note: "Dört kareye sığmayan neşemiz, yaptığımız şapşallıklar ve birlikteyken attığımız o içten kahkahalar... İnsan sadece yanında gerçekten kendisi olabildiği birini böyle sınırsızca sevebilir.",
      bgAtmosphere: "linear-gradient(135deg, #1b162b 0%, #30244f 100%)"
    },
    {
      id: "milestone-6",
      date: "Bu yanak Şaka mı?",
      title: "Senin o bal yanağın bir ömre bedel",
      location: "Bizim Anlarımız",
      video: "assets/media/6.mp4",
      photo: "assets/media/5.jpg",
      isVideo: true,
      badge: "JUST YANAK 🎬",
      note: "Yanağın güzelliğine,tatlığına bakar mısın? çok özlüyorum,çok seviyorum 🥺 Keşke olsan",
      bgAtmosphere: "linear-gradient(135deg, #1f1430 0%, #3a1e4a 100%)"
    },
    {
      id: "milestone-7",
      date: "Birlikte Her An Güzel",
      title: "Gözlerimin İçine Güldüğün O Canlı An (Canlı Video) 🎥",
      location: "Sevginin Başkenti",
      video: "assets/media/7.mp4",
      photo: "assets/media/8.jpg",
      isVideo: true,
      badge: "Aşkın Videosu ✨",
      note: "Bi de yanağını çok sıkınca sonrasında kendi yanağını sıkman vardı hahaha 🤣 her haline bayılıyorum, aşığım..",
      bgAtmosphere: "linear-gradient(135deg, #221235 0%, #441c59 100%)"
    },
    {
      id: "milestone-8",
      date: "Ömrümmmmmm",
      title: "Huzurun Başkenti: Senin olduğun her yer",
      location: "Rüzgarlı Ama Sıcacık Bir Köşe",
      photo: "assets/media/8.jpg",
      badge: "Huzur 🌿",
      note: "Gözlerimi kapatıp başımı omzuna, kokunu içime çektiğim o saniye... Dünyanın bütün karmaşası kapının dışında kalıyor. Bana bu güveni, bu tarifsiz huzuru veren tek insan sensin.",
      bgAtmosphere: "linear-gradient(135deg, #101c24 0%, #1e3644 100%)"
    },
    {
      id: "milestone-9",
      date: "Kalbinin Ritmi",
      title: "Derin Bakışlar & Kalp Kalbe",
      location: "Zamanın Ötesinde",
      photo: "assets/media/9.jpg",
      badge: "Derin Sevgi 🖤",
      note: "Boynuna sokulduğumda kalbimin nasıl çarptığını bir ben biliyorum, bir de sen. Senin o derin bakışların benim hayatımdaki en büyük pusulam.",
      bgAtmosphere: "linear-gradient(135deg, #1a1426 0%, #322144 100%)"
    },
    {
      id: "milestone-10",
      date: "Ata'mızın Huzurunda",
      title: "Aşkımız Başkentte: Anıtkabir Ziyaretimiz",
      location: "Anıtkabir, Ankara",
      photo: "assets/media/10.jpeg",
      badge: "ATATÜRK",
      note: "Ata'mızın huzurunda el ele durduğumuz o an... Yanımda seninle böyle özel bir yerde olmak kalbime kazındı.",
      bgAtmosphere: "linear-gradient(135deg, #1c1d29 0%, #2f344d 100%)"
    },
    {
      id: "milestone-11",
      date: "Unutulmaz Gezimiz",
      title: "Ankara Ayazında Birbirimizi Isıttığımız Anlar",
      location: "Ankara Yolları",
      photo: "assets/media/11.jpeg",
      badge: "Ankara Hatırası 🏛️",
      note: "Merdivenleri tırmanırken, kalabalığın içinde elini sıkıca tuttuğum o anlar... Soğuk havaya inat kalbimizin sıcaklığı bütün şehri ısıtmaya yeterdi.",
      bgAtmosphere: "linear-gradient(135deg, #151b2c 0%, #253352 100%)"
    },
    {
      id: "milestone-12",
      date: "Masalsı Bir Gün",
      title: "Seninle her gün özel",
      location: "Yeşilliklerin Arasında",
      photo: "assets/media/12.jpeg",
      badge: " Sen = Aşk 🌾",
      note: "Dudaklarımın o bal yanağında olduğu o an, hayatımın en güzel anları.",
      bgAtmosphere: "linear-gradient(135deg, #0e1e24 0%, #1b3a42 100%)"
    },
    {
      id: "milestone-13",
      date: "En Şık Randevumuz",
      title: "'LIGHT ON YOU' - Çünkü Dünyamın Işığı Sensin",
      location: "Ot Cafe",
      photo: "assets/media/13.jpg",
      badge: "Bizim Işığımız ✨",
      note: "Aynanın kenarında 'Işık Senin Üzerinde' yazıyordu ama bilmiyorlardı ki benim bütün ışığım yanımda duran kadından geliyordu.",
      bgAtmosphere: "linear-gradient(135deg, #16182c 0%, #2b2e54 100%)"
    },
    {
      id: "milestone-14",
      date: "Menüm : Yanağın",
      title: "Seni öpmenin hissini bilemezsin",
      location: "Ot Cafe",
      photo: "assets/media/14.jpg",
      badge: "Bir Öpücük 💋",
      note: "Seni öperken o saniye zaman dursun istedim. Seni her öptüğümde ilk günkü gibi heyecanlanıyorum ve seni her geçen gün daha çok seviyorum.",
      bgAtmosphere: "linear-gradient(135deg, #221025 0%, #3e1642 100%)"
    },
    {
      id: "milestone-15",
      date: "Geleceğe 🥂",
      title: "Aşkımıza ve Birlikteliğimize Kadeh Kaldırdığımız Gece",
      location: "Han Restaurant",
      photo: "assets/media/15.jpg",
      badge: "Kutlama & Neşe 🍷",
      note: "Burada her şeyi konuştuğumuz , geleceğe dair kurduğumuz hayallerle masayı donattığımız o neşeli akşam. 1 duble ile de sarhoş olurum yanımda sen varsan o kokun varsa..",
      bgAtmosphere: "linear-gradient(135deg, #1f1322 0%, #3a1d3f 100%)"
    },
    {
      id: "milestone-16",
      date: "Sımsıkı Sarıldığımız An",
      title: "Sıcacık Bir Kış Kucaklaşması",
      location: "Gökyüzünün Altında",
      photo: "assets/media/16.jpg",
      badge: "Ebedi Sarılma ❄️",
      note: "Soğuk havada birbirimize böyle sımsıkı kenetlendiğimiz o an... Yanağının sıcaklığı tenime değdiği sürece bana hiçbir mevsim kış olamaz.",
      bgAtmosphere: "linear-gradient(135deg, #141b2a 0%, #233550 100%)"
    },
    {
      id: "milestone-17",
      date: "Gözüm Hep Sende",
      title: "Merdiven Başındaki Kaçamak Bakış & Şıklığımız",
      location: "Martı Otel",
      photo: "assets/media/17.jpg",
      badge: "Asil & Zarif 🖤",
      note: "Nereye gidersek gidelim gözlerimin sadece seni gördüğü o zarif an. Saçlarına sokulup derin bir nefes aldığım her an hayatın bana verdiği en büyük hediyeyi hatırlıyorum.",
      bgAtmosphere: "linear-gradient(135deg, #17122b 0%, #2c1e4c 100%)"
    },
    {
      id: "milestone-18",
      date: "O Meşhur TFT Gecesi",
      title: "Sabaha Karşı TFT Turnuvamız 🎮",
      location: "Discord & Sihirdar Vadisi",
      photo: "assets/pengu.jpg",
      badge: "Duo Sevgilim ⭐⭐⭐",
      note: "Sen 'Bu kompu kesin 1. yapacağım' derken benim dükkanda tüm altınları bitirip sana şampiyon aramam... Canımız 1 kaldığında bile seninle gülmek dünyanın en güzel şeyiydi. Bu hayattaki en iyi takım arkadaşım sensin.",
      bgAtmosphere: "linear-gradient(135deg, #0c1527 0%, #1f2b56 100%)"
    },
    {
      id: "milestone-19",
      date: "Geçen Hafta...",
      title: "O Kırgınlık & Bütün Pişmanlığım",
      location: "Pişmanlığımın Başladığı An",
      photo: "assets/media/2.jpg",
      badge: "Tüm Kalbimle Özür Dilerim 🥺",
      note: "Seni kırmak, dünyada isteyeceğim en son şey bile değil. Sultan Pansiyon'un o ilk gününden beri bana böyle sevgiyle bakan o güzel gözleri soldurduğum her an için kendime kızıyorum. Lütfen beni affet birtanem.",
      bgAtmosphere: "linear-gradient(135deg, #1f1013 0%, #3d141c 100%)"
    },
    {
      id: "milestone-20",
      date: "Bugün, Doğum Günün 🎂",
      title: "İyi ki Doğdun Hayatımın Anlamı",
      location: "Kalbimin Tam Ortası",
      photo: "assets/media/1.jpg",
      badge: "Mutlu Yıllar Birtanem 🎉",
      note: "Bugün senin günün. Sultan Pansiyon'da başlayan bu hikayeyi ömrümün sonuna kadar aynı aşkla, sadakatle ve hürmetle sürdürmek istiyorum. Dünyaya gelişinle hayatıma kattığın her güzellik için sana minnettarım. Seni çok ama çok seviyorum.",
      bgAtmosphere: "linear-gradient(135deg, #180d2c 0%, #321652 100%)"
    }
  ],

  // 6. DUYGUSAL VE SAMİMİ MEKTUP
  letter: {
    tag: "TFT Partnerim & Hayatımın Aşkına ✉️",
    title: "Sana Küçük Bir Mektup...",
    paragraphs: [
      "Bazen hayatta ekonomi yapamazsın, yanlış şampiyonları tahtaya koyarsın ya da en kritik anda yanlış hamle yaparsın... Ben de öyle bir hata yaptım ve seni çok kırdım.",
      "İnan bana seni üzmek, yüzündeki o ışığı söndürmek dünyada isteyeceğim en son şeydi.Senin o güzel kalbini incittiğim için ne kadar pişman olduğumu anlatamam.",
      "Bugün senin doğum günün... İyi ki doğdun, iyi ki varsın ve iyi ki seni bu kadar çok sevmişim. Lütfen beni affet ve seni her şeyden çok seviyorum."
    ],
    signature: "Daima senin TFT Duo'n ve Sevgilin..."
  },

  // 6.5. NOSTALJİ & GÜLME KRİZLERİMİZ (KOMİK VE GÜZEL ANILAR SANDIĞI)
  nostalgia: [
    {
      id: "nostalgia-1",
      type: "photo",
      title: "Seninle ilk buluştuğumuz Gün 🌿",
      date: "O İlk Masum Tanışma",
      badge: "İlk Bakış & Milat 💫",
      sticker: "O İLK GÜN",
      mediaUrl: "assets/nostalgia/ilk_tanidigim_gun.jpeg",
      thumbUrl: "assets/nostalgia/ilk_tanidigim_gun.jpeg",
      desc: "O gün kalbimin ritminin bir ömür değişeceğini ve hayatımın seninle renkleneceğini henüz bilmiyordum."
    },
    {
      id: "nostalgia-2",
      type: "photo",
      title: "Gülme Krizlerimiz Vol. 1 😂",
      date: "Kahkaha Seansı",
      badge: "Şapşallık Modu 🤪",
      sticker: "KOMİK AN",
      mediaUrl: "assets/nostalgia/komik_ani_1.jpg",
      thumbUrl: "assets/nostalgia/komik_ani_1.jpg",
      desc: "Yan yana geldiğimizde normal kalabilmek imkansız! İkimizin de kahkahalara boğulduğu, gözlerimizin içinin güldüğü o tatlı şapşal hallerimiz."
    },
    {
      id: "nostalgia-3",
      type: "photo",
      title: "Tatlı Şapşallıklar & Komik Pozlar 📸",
      date: "Bizim Doğal Halimiz",
      badge: "Neşe Deposu 💖",
      sticker: "100% BİZ",
      mediaUrl: "assets/nostalgia/komik_ani_2.jpeg",
      thumbUrl: "assets/nostalgia/komik_ani_2.jpeg",
      desc: "Hangi kameraya ne komiklik yapsak diye yarıştığımız, en doğal halimiz. Seninle çocuk gibi gülmeyi ve saçmalamayı dünyalara değişmem."
    },
    {
      id: "nostalgia-4",
      type: "photo",
      title: "Hayat Seninle Çizgi Film Gibi 🎨",
      date: "Duo Kaosu",
      badge: "Gülüşünü Sevdiğim 🌟",
      sticker: "KAHKAHA",
      mediaUrl: "assets/nostalgia/komik_ani_3.jpeg",
      thumbUrl: "assets/nostalgia/komik_ani_3.jpeg",
      desc: "En ciddi anı bile tek bir bakışla komediye çevirme yeteneğimiz... Hayatın bütün yorgunluğunu silip atan o sıcacık tebessümün."
    },
    {
      id: "nostalgia-5",
      type: "photo",
      title: "Gözlerinin İçi Güldüğünde... ✨",
      date: "Bal Yanak & Neşe",
      badge: "Bal Yanak 🍯",
      sticker: "EN SEVDİĞİM",
      mediaUrl: "assets/nostalgia/komik_ani_4.webp",
      thumbUrl: "assets/nostalgia/komik_ani_4.webp",
      desc: "İşte bu gülüşe bir ömür verilir! Birlikte geçirdiğimiz her anı karnımıza ağrılar girene kadar gülerek taçlandırdığımız o eşsiz anlar."
    },
    {
      id: "nostalgia-6",
      type: "video",
      title: "Canlı Kahkahalar & Tatlı Anılar 🎥",
      date: "Canlı Kayıt",
      badge: "Canlı Video ▶",
      sticker: "VİDEO KAYDI",
      mediaUrl: "assets/nostalgia/nostalji_video_1.mp4",
      thumbUrl: "assets/nostalgia/nostalji_video_1_thumb.jpg",
      duration: "0:12",
      desc: "Fotoğraflar yetmezdi; sesini, kahkahanı ve aramızdaki o tatlı enerjiyi her dinlediğimde yüzümde kocaman bir tebessüm açıyor."
    },
    {
      id: "nostalgia-7",
      type: "video",
      title: "25 Ağustos 2023 - O Eğlenceli Gün 🎬",
      date: "25 Ağustos 2023",
      badge: "Canlı Video ▶",
      sticker: "NOSTALJİ",
      mediaUrl: "assets/nostalgia/nostalji_video_2.mp4",
      thumbUrl: "assets/nostalgia/nostalji_video_2_thumb.jpg",
      duration: "0:18",
      desc: "Her saniyesinde eğlence ve neşe olan o günün canlı hatırası... Seninle geçen her an bir bayram şenliği gibi."
    },
    {
      id: "nostalgia-8",
      type: "video",
      title: "Bizim Hikayemizin En Komik Sahneleri 🍿",
      date: "Özel Video Kaydı",
      badge: "Canlı Video ▶",
      sticker: "EFSANE AN",
      mediaUrl: "assets/nostalgia/nostalji_video_3.mp4",
      thumbUrl: "assets/nostalgia/nostalji_video_3_thumb.jpg",
      duration: "0:47",
      desc: "Dakikalarca güldüğümüz, birlikte saçmaladığımız ve dünyayı unuttuğumuz o harika video. İyi ki varsın ve iyi ki benimlesin!"
    }
  ],

  // 7. "BENİ AFFETTİN Mİ?" KAÇAN BUTON AYARLARI
  runawaySection: {
    question: "Beni affettin mi? 🥺",
    subtitle: "Dürüst ol ama unutma, bu lobide 'Hayır' şampiyonu yok...",
    yesButtonText: "Evet, Affettim! ❤️",
    noButtonText: "Hayır 💔",
    // "Hayır" butonuna tıklamaya veya dokunmaya çalıştıkça çıkacak esprili laflar:
    noButtonTaunts: [
      "Yakalayamazsın ki! 😜",
      "Hata 404: Hayır seçeneği tahtada satıldı!",
      "D kitleyip rollesen de basamazsın 🎲!",
      "Iı-ıh, bu lobide teslim olmak yasak! 🙅‍♂️",
      "Bir daha dene bakalım 🏃‍♂️💨",
      "Lütfeeeen affet 🥺",
      "Şansını zorluyorsun ama 'Evet' orada parlıyor 👉",
      "Sonsuza kadar kaçabilirim 🚀",
      "Hadi ama, doğum günün hatrına bir 'Evet' ver! 🎂"
    ]
  },

  // 8. EVET'E TIKLAYINCA KUTLAMA MODALI
  celebration: {
    title: "BİLİYORDUM! DÜNYANIN EN GÜZEL DUOSU BİZİZ! 🎉💖",
    message: "Beni affettiğin için ve bana bu şansı verdiğin için sana minnettarım. Söz veriyorum seni bir daha asla böyle üzmeyeceğim. Şimdi gel ve sımsıkı sarılalım!",
    whatsappText: "Affettim seni şapşal! ❤️ Şimdi gel sarılalım.",
    whatsappPhone: "" // İsteğe bağlı: örn "905551234567"
  }
};
