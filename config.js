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
    googleSheetsUrl: "https://script.google.com/macros/s/AKfycbwqYrwcnll449U0YdGciGbhNhi_19gVW62XxscHPPvNxsn5kLruQbvRbJyAgOaZcl6Rxg/exec"
  },

  // 1. KİŞİSEL BİLGİLER
  recipientName: "Bal Yanaklı",       // Sevgilinizin adı / Hitap
  senderName: "Senin Şapşalın",    // Gönderen / İmza

  // 1.1 ARKA PLAN ŞARKISI (PERA - Bal)
  music: {
    title: "PERA - Bal",
    src: "assets/audio/pera_bal.mp3",
    youtubeUrl: "https://www.youtube.com/watch?v=lf9zFEKw9sY",
    defaultVolume: 0.15
  },

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
      "💡 3. İpucu: Şifre: Balyanak"
    ],

    bypassPhraseText: "Şifreyi hatırlayamadım 🥺",
    bypassAnswer: "Seni kapıda bekletmeye kıyamam, tıkla ve gir!"
  },

  // 4. TFT (TEAMFIGHT TACTICS) ÖZEL SİNERJİ & STRATEJİ USTALARI
  tftEasterEgg: {
    synergyName: "Sonsuz Aşk Sinerjisi (Heartsteel & Star Guardian)",
    synergyTier: "Seviye 3 / 3 Efsanevi ⭐⭐⭐",
    matchHighlight: {
      title: "Double Up (Muhteşem İkili) 1.lik Zaferimiz 🏆",
      sub: "PAPAZ (Plat 4) & jMiyavv (Gold 3) — 33:18 Efsanevi Şampiyonluk",
      image: "assets/tft_double_up_win.png"
    },
    // Strateji Ustalarımız (Little Legends)
    tacticians: [
      {
        id: "tactician-1",
        name: "Kanmei Suspus (Hushtail)",
        summoner: "jMiyavv 🌸",
        role: "Takımın Kraliçesi & Şampiyonu 🦊👑",
        image: "assets/kanmei_hushtail.jpg",
        star: "⭐⭐⭐ (3 Yıldız)",
        dialogue: "Seninle oynadığım her el 1. olmak garanti, dükkandaki en değerli şampiyon sensin! 💖"
      },
      {
        id: "tactician-2",
        name: "Chibi Akademi Katarina",
        summoner: "PAPAZ ⚔️",
        role: "Sadık Duo Partnerin & Muhafızın 🗡️🎀",
        image: "assets/chibi_katarina.jpg",
        star: "⭐⭐⭐ (3 Yıldız)",
        dialogue: "Bıçaklarım da tüm altınlarım da senin galibiyetin için... Yeter ki sen gül birtanem 🥺"
      }
    ],
    stats: [
      { label: "Lobi Derecesi", value: "#1 Double Up Şampiyonu 🏆" },
      { label: "Süre / Round", value: "33:18 / Round 6-2 🔥" },
      { label: "Özel Duo Eşyası", value: "Ebedi Özür & Telafi Kılıcı ⚔️" }
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
      note: "Dört kareye sığmayan neşemiz, yaptığımız komiklikler ve birlikteyken eğlendiğimiz o güzel zamanlar... İnsan sadece yanında gerçekten kendisi olabildiği birini böyle sınırsızca sevebilir.",
      bgAtmosphere: "linear-gradient(135deg, #1b162b 0%, #30244f 100%)"
    },
    {
      id: "milestone-6",
      date: "Bu yanak Şaka mı?",
      title: "Senin o bal yanağın bir ömre bedel",
      location: "Starbucks",
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
      location: "Starbucks",
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
      badge: "Mersin Üniversitesi Kantin",
      note: "Gözlerimi kapatıp başımı omzuna, kokunu içime çektiğim o saniye... Dünyanın bütün karmaşası kapının dışında kalıyor. Bana bu güveni, bu tarifsiz huzuru veren tek insan sensin.",
      bgAtmosphere: "linear-gradient(135deg, #101c24 0%, #1e3644 100%)"
    },
    {
      id: "milestone-9",
      date: "Kalbinin Ritmi",
      title: "Kalp Kalbe",
      location: "Starbucks",
      photo: "assets/media/9.jpg",
      badge: "Derin Sevgi 🖤",
      note: "Senin o bakışların,mimiklerin benim için her şeyi ifade ediyor, ellerini tuttuğumda bile kalbim yerinden çıkacak gibi hissediyorum.",
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
      title: "Ata'mızın Huzurunda Sevdiğim Kadınla",
      location: "Ankara Yolları",
      photo: "assets/media/11.jpeg",
      badge: "Ankara Hatırası 🏛️",
      note: "Mustafa Kemal Paşa'nın huzuruna bu hayatta en çok sevdiğim insanla çıkmak çok güzeldi, Onunla beraber tanışmış gibi..",
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
      date: "Yanak Yanağa ",
      title: "Bal İnsan 💛​",
      location: "Sizin Evin Sahilinde",
      photo: "assets/media/16.jpg",
      badge: "Ebedi Aşk 💘​",
      note: "Sizin sitenin bahçesinde bana kahve yapıp getirmiştin yerim seni.. Yanaklarını kopararak sevmeyi özledim.. ",
      bgAtmosphere: "linear-gradient(135deg, #141b2a 0%, #233550 100%)"
    },
    {
      id: "milestone-17",
      date: "Gözüm Hep Sende",
      title: "Bizim Şıklığımız ❤️",
      location: "Martı Otel",
      photo: "assets/media/17.jpg",
      badge: "Asil & Zarif 🖤",
      note: "Beraber birbirimizi tamamlayan, en yakışan iki insan biziz.. Sana hep diyorum benim diğer yanım sen evet gerçekten sen ",
      bgAtmosphere: "linear-gradient(135deg, #17122b 0%, #2c1e4c 100%)"
    },
    {
      id: "milestone-18",
      date: "Bugün, Doğum Günün 🎂",
      title: "Sıcacık Mum Işığında: İyi ki Doğdun Hayatımın Anlamı 🕯️💖",
      location: "Kalbimin Tam Ortası",
      photo: "assets/media/dogum_gunu_mum.png",
      badge: "İyi ki Doğdun Bal Yanaklım 🎉",
      note: "Bugün senin doğum günün... Şu an fiziken yanında olamasam da bilsen ne kadar çok yanında olmak, o pastadaki mumları seninle birlikte üflemek ve o bal yanağını öperek 'İyi ki varsın birtanem' demek isterdim. Bütün kalbim, aklım ve ruhum şu an senin yanında. Bu hayatta başıma gelen en güzel şey sensin. Seni her şeyden ve herkesten çok seviyorum.",
      bgAtmosphere: "linear-gradient(135deg, #2b1118 0%, #521d28 100%)"
    }
  ],

  // 6. DUYGUSAL VE SAMİMİ MEKTUP
  letter: {
    tag: "TFT Partnerim & Hayatımın Aşkına ✉️",
    title: "Sana Küçük Bir Mektup...",
    paragraphs: [
      "Ben bir yanlış yaptım, kritik bir süreçte bu olay yaşandı bana neleri söylersen söyle haklısın.. Ben senin güvenini kırdım,sarstım, benim sana olan sevgimi,aşkımı anlatacak dil edebiyatı, mimikler, miktarlar, sayılar yok, laf olsun diye de söylediğim hiçbir şey yok, hepsini hissederek ve içtenlikle söylüyorum. Senin benim hayatımdaki yerine benim hayatımdan bile önemli bir durumda. Benim hayatımda sen ol ben tüm her şeye karşı savaşırım,mücadele ederim,uğraşırım çünkü ucunda sen varsın, sen benim herşeyimsin. Yanyana olduğumuz hangi süreçte kavga ediyoruz ? Etsek bile ne kadar sürebiliyor ? Sıkılmadan her şeyi yapabilir, saatlerce konuşur, saatlerce dizi izler, saatlerce oyun oynar, seninle saatlerce her şeyi yapabiliyoruz, sıkılmadan.. Gel elimden tut, seni dünyanın en mutlu insanı yapabilmek için canımı vereyim, Yeter ki evet de bana tüm süreçleri atlatalım, geleceğimizi inşa edelim.Senin o güzel kalbini incittiğim için ne kadar pişman olduğumu anlatamam",
      "Bugün senin doğum günün... İyi ki doğdun, iyi ki varsın ve iyi ki seni bu kadar çok sevmişim. Lütfen beni affet, seni her şeyden çok seviyorum bal yanak.İnan bana seni üzmek, yüzündeki o ışığı söndürmek dünyada isteyeceğim en son şeydi.Senin o güzel kalbini incittiğim için ne kadar pişman olduğumu anlatamam.",
    ],
    signature: "Daima senin TFT Duo'n ve Sevgilin...",
    // Belki Bir Gün... (Gelecek Hayalimiz & Düğün Kehaneti)
    futureDream: {
      title: "Belki Bir Gün... 🌅💍",
      subtitle: "Gün Batımında Bir Ömür Boyu 'Evet'...",
      photo: "assets/media/belki_bir_gun_dugun.png",
      badge: "Bizim Geleceğimiz 🕊️✨",
      note: "Dünyanın bütün telaşı ve gürültüsü geride kaldığında, bir gün batımının kızıla boyadığı denize karşı seninle bir ömre 'Evet' diyeceğimiz o gün... Ben seninle sadece bugünü değil, saçlarımızın birlikte beyazlayacağı bütün yarınları hayal ediyorum. Sen benim hem dünüm, hem bugünüm, hem de en güzel geleceğimsin."
    }
  },

  // 6.2. RESMİ BAL YANAK KÖŞESİ (DÜNYANIN EN TATLI YANAĞI)
  balYanakSection: {
    badge: "🍯 RESMİ BAL YANAK KÖŞESİ 🌸",
    title: "Dünyanın En Tatlı, En Öpülesi Bal Yanağı",
    subtitle: "Evrendeki bütün tatlılar, şekerler ve ballar bir araya gelse senin o bir çift yanağının tatlılığına yaklaşamaz... İşte benim bu hayattaki en büyük zaafım, öpmeye doyamadığım o bal yanaklar!",
    cards: [
      {
        id: "balyanak-1",
        photo: "assets/balyanak_1.jpg",
        badge: "Bal Yanak Modu & Haticecikkk 🐼☁️",
        title: "Yanağını Isırarak Sevme İsteği Uyandıran O Bakış",
        praise: "O kapüşonun altından öyle tatlı bir bakışın ve öyle yumuşacık, pofuduk bir yanağın var ki... İnsanın dünyadaki bütün dertlerini unutturup sadece o yanağı saatlerce öpüp koklayası geliyor. Dünyanın en sevimli pandası bile senin bu yanağınla yarışamaz!",
        stat: "Ballık Oranı: %100000000 BAL 🍯💖",
        quote: "Öpmelere doyulmayan en tatlı pofudukluk..."
      },
      {
        id: "balyanak-2",
        photo: "assets/balyanak_2.jpg",
        badge: "Prensesler Prensesi 👑💖",
        title: "O Tacın Bile Kıskandığı Işıltılı Yanak",
        praise: "Başına taktığın o pembe taç sana çok yakışmış ama senin asıl tacın o yanağındaki eşsiz ışıltın ve asil tebessümün. Çeneni eline yasladığında ortaya çıkan o tatlı hatlar... Benim bu hayatta gördüğüm en güzel, en asil manzara sensin birtanem.",
        stat: "Tatlılık: Saf Çiçek Balı 🍯✨",
        quote: "Kraliçemin yanağına bir ömür feda edilir..."
      },
      {
        id: "balyanak-3",
        photo: "assets/balyanak_3.jpg",
        badge: "En Doğal & En Masum Hali 🌸🕊️",
        title: "Öpücük Kondurmadan Durulamayan O Tatlı Duruş",
        praise: "Hiçbir filtreye, hiçbir süse gerek yok... O masum dudak büküşün ve kameraya uzanan o pürüzsüz bal yanağın... Her baktığımda içimi eriten, kalbimi hızlandıran ve beni sana her gün bin defa daha aşık eden o eşsiz güzellik.",
        stat: "Öpülme İhtiyacı: Saniyede 1000 Kere 💋",
        quote: "Beni benden alan o kusursuz doğallık..."
      },
      {
        id: "balyanak-4",
        type: "video",
        video: "assets/balyanak_video.mp4",
        photo: "assets/balyanak_video_thumb.jpg",
        duration: "0:03",
        badge: "Canlı Bal Yanak Hareketi 🎬💖",
        title: "O Paha Biçilmez Canlı Bal Yanak Tebessümü",
        praise: "Kamera karşısında o masum dudak büküşün, yanaklarının hafifçe kıpırdayışı ve gözlerindeki o saf sevgi... Fotoğrafların bile anlatmaya yetmediği o yumuşacık enerjin işte tam olarak bu! Dünyanın en tatlı, en öpülesi canlı manzarası sensin.",
        stat: "Canlılık: %1000 Saf Sevimlilik 🌸✨",
        quote: "Yüzünde açan her tebessüm benim bayramım...",
        kissCount: 0
      }
    ],
    praiseQuote: "Adın gibi, ruhun gibi yanağın da bal... Seni her şeyden çok seviyorum Bal Yanak'ım! 🍯💖"
  },

  // 6.5. NOSTALJİ & GÜLME KRİZLERİMİZ (KOMİK VE GÜZEL ANILAR SANDIĞI)
  nostalgia: [
    {
      id: "nostalgia-1",
      type: "photo",
      title: "Seninle İlk Buluştuğumuz Gün 🌿",
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
      title: "Bitmeyen Anılar 😂",
      date: "Zamanla Sen",
      badge: "Şapşallık Modu 🤪",
      sticker: "KOMİK AN",
      mediaUrl: "assets/nostalgia/komik_ani_1.jpg",
      thumbUrl: "assets/nostalgia/komik_ani_1.jpg",
      desc: "Yan yana geldiğimizde normal kalabilmek imkansız. Saatlerce birçok şeyi konuşabiliyor olmak çok güzeldi."
    },
    {
      id: "nostalgia-3",
      type: "photo",
      title: "En Değerli Hissettiğim Anlardan 📸",
      date: "Bizim Doğal Halimiz",
      badge: "İyi ki Sen 💖",
      sticker: "100% BİZ",
      mediaUrl: "assets/nostalgia/komik_ani_2.jpeg",
      thumbUrl: "assets/nostalgia/komik_ani_2.jpeg",
      desc: "Beraber doğum gününü kutladığımız o gece, sana her zaman aşk ile baktım, sana buradan tekrardan çok teşekkür ederim.."
    },
    {
      id: "nostalgia-4",
      type: "photo",
      title: "Hayat Seninle Güzel",
      date: "Aşk İnsan",
      badge: "Gülüşünü Sevdiğim 🌟",
      sticker: "KAHKAHA",
      mediaUrl: "assets/nostalgia/komik_ani_3.jpeg",
      thumbUrl: "assets/nostalgia/komik_ani_3.jpeg",
      desc: "Seninle bir gece 1 saniye gibi hemen geçip gidiyor, her zaman seninle olmak istiyorum."
    },
    {
      id: "nostalgia-5",
      type: "photo",
      title: "555 Fotoğraf Çekildiğimiz Gün ✨",
      date: "Fotoğraf Günü",
      badge: "Bal Yanak 🍯",
      sticker: "EN SEVDİĞİM",
      mediaUrl: "assets/nostalgia/komik_ani_4.webp",
      thumbUrl: "assets/nostalgia/komik_ani_4.webp",
      desc: "Beraber burada fotoğraf çekilip durmuştuk ve sen beğenmiyordun :D Bu güzelliği nasıl beğenmiyorsun ?"
    },
    {
      id: "nostalgia-behzat",
      type: "photo",
      title: "Dışarıda Beraber Behzat Ç. 🍻🎬",
      date: "O Huzurlu Akşamüstü",
      badge: "Çekiç ve Gül & Biz 🖤",
      sticker: "BİZİM HAVAMIZ",
      mediaUrl: "assets/nostalgia/behzat_c.jpg",
      thumbUrl: "assets/nostalgia/behzat_c.jpg",
      desc: "Telefonu yaslayıp dışarıda seninle Behzat Ç. izlediğimiz o gün... İki soğuk Tuborg, fonda 'Çekiç ve Gül' ve yanımda dünyalara değişmeyeceğim o güzel insan. Dünyanın en lüks restoranı bile seninle paylaştığım şu masadaki samimiyetin, huzurun ve muhabbetin yanından bile geçemez."
    },
    {
      id: "nostalgia-tft",
      type: "photo",
      title: "Muhteşem İkili #1 (33:18) 🏆🎮",
      date: "Unutulmaz TFT Oyunlarımız",
      badge: "Muhteşem İkili Zaferi 🥇",
      sticker: "1. SIRA!",
      mediaUrl: "assets/tft_double_up_win.png",
      thumbUrl: "assets/tft_double_up_win.png",
      desc: "Sen Kanmei Suspus'unla (jMiyavv) 'Bu maçı kesin 1. bitireceğiz' derken benim Chibi Akademi Katarina'mla (PAPAZ) sana şampiyon aramam... Ve işte o efsane 33 dakikalık 1.liğimiz! Canımız 1 kaldığında bile seninle gülmek dünyanın en güzel şeyiydi. Bu hayattaki en iyi takım arkadaşım sensin."
    },
    {
      id: "nostalgia-ders",
      type: "photo",
      title: "Sözde Ders Çalışmaya Gittiğimiz O Gün 📚☕",
      date: "Ders & Kaçamak Gülüşler",
      badge: "Çalışma Arkadaşım 📝💖",
      sticker: "ÇOK ÇALIŞTIK (!)",
      mediaUrl: "assets/nostalgia/ders_calisma.jpg",
      thumbUrl: "assets/nostalgia/ders_calisma.jpg",
      desc: "Sözde ders çalışacaktık ama senin o tatlılığına, mimiklerine ve güzel yüzüne bakmaktan bir satır bile odaklanamadığım o gün... Kitapların, defterlerin arasında bile gözlerimin sadece seni gördüğü; en sıkıcı anı bile dünyanın en tatlı hatırasına dönüştürdüğün o an."
    },
    {
      id: "nostalgia-6",
      type: "video",
      title: "Tatlı Anılar 🎥",
      date: "Masumluk",
      badge: "Canlı Video ▶",
      sticker: "VİDEO KAYDI",
      mediaUrl: "assets/nostalgia/nostalji_video_1.mp4",
      thumbUrl: "assets/nostalgia/nostalji_video_1_thumb.jpg",
      duration: "0:12",
      desc: "Bunlar ne derken o masumluk, o tatlılık.. İzleyince hala gülüyorum ve ağlıyorum, çok güzel bir insansın. "
    },
    {
      id: "nostalgia-7",
      type: "video",
      title: "Bal Yanak Cips Yiyor 🎬",
      date: "Haticecikkk",
      badge: "Canlı Video ▶",
      sticker: "NOSTALJİ",
      mediaUrl: "assets/nostalgia/nostalji_video_2.mp4",
      thumbUrl: "assets/nostalgia/nostalji_video_2_thumb.jpg",
      duration: "0:18",
      desc: "Ankara'da benim salak saçma triplere girdiğim zamanlar.. Ama sen yine her halinle çok güzel ve çok tatlısın haticecikkk, bi de cips yiyor her zamanki gibi :)"
    },
    {
      id: "nostalgia-new1",
      type: "video",
      title: "Belediyenin Yerinde Biz ☀️🌸",
      date: "Güneşli Bir Gün",
      badge: "Canlı Video ▶",
      sticker: "DURU GÜZELLİK",
      mediaUrl: "assets/nostalgia/new1.mp4",
      thumbUrl: "assets/nostalgia/new1_thumb.jpg",
      duration: "0:05",
      desc: "Belediyenin yerine gidip beraber geçirdiğimiz zamanlar, Mersin'in her köşesinde anılarımız var, en kötü yer bile seninleyken en güzel yer."
    },
    {
      id: "nostalgia-new2",
      type: "video",
      title: "Sahilde Parkta Otururken 💖",
      date: "Sahil Yürüyüşümüz",
      badge: "Canlı Video ▶",
      sticker: "İKİMİZİN IŞILTISI",
      mediaUrl: "assets/nostalgia/new2.mp4",
      thumbUrl: "assets/nostalgia/new2_thumb.jpg",
      duration: "0:08",
      desc: "Buradayken kankaydık :) Arkadaşlıktan gelişen bu süreçte hayatımın her yerine dokunuşun var, en çokta kalbime, seni gülerken görmek beni mutlu ediyor."
    },
    {
      id: "nostalgia-new3",
      type: "video",
      title: "Karşımda Dünyanın En Güzel Manzarası 🍟🍻",
      date: "Teknede Balık Ekmek",
      badge: "Canlı Video ▶",
      sticker: "CANLI SOHBET",
      mediaUrl: "assets/nostalgia/new3.mp4",
      thumbUrl: "assets/nostalgia/new3_thumb.jpg",
      duration: "0:14",
      desc: "Senin bu limon aşkın nasıl da döküyor :) İlk günlerden.. İlk zamanlar ne kadar zayıfsın ama ben her halini seviyorum, sen olsan erimişim derdin :D"
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
