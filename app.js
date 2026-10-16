// ========================================================================
// 📊 GOOGLE SHEETS LOG SİSTEMİ (ANALYTICS & ACTIVITY TRACKER)
// ========================================================================
let logEventDebounce = {};

function logEvent(eventName, detail = "", extra = "") {
  if (!APP_CONFIG.analytics || !APP_CONFIG.analytics.enabled) return;
  const sheetUrl = (APP_CONFIG.analytics.googleSheetsUrl || "").trim();
  if (!sheetUrl || !sheetUrl.startsWith("http")) return;

  const now = Date.now();
  if (logEventDebounce[eventName] && now - logEventDebounce[eventName] < 800) {
    return;
  }
  logEventDebounce[eventName] = now;

  const payload = {
    event: eventName,
    detail: detail,
    extra: extra || navigator.userAgent.slice(0, 60),
    pageTime: new Date().toLocaleTimeString("tr-TR")
  };

  try {
    fetch(sheetUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    }).catch((err) => {
      console.warn("Log gönderilemedi:", err);
    });
  } catch (err) {
    console.warn("Log hatası:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  logEvent("🌐 Site Açıldı", window.location.search || "Ana Sayfa");
  initStarsCanvas();
  initGateScreen();
  initAmbientAudio();
  populateContent();
  initOriginMap();
  initTimelineObserver();
  initBalYanakSection();
  initNostalgiaSection();
  initCinemaSection();
  initRunawayButton();
  initCelebrationModal();
  initLightbox();

  const params = new URLSearchParams(window.location.search);
  const scrollTarget = params.get("scroll");
  if (scrollTarget) {
    const el = document.getElementById(scrollTarget);
    if (el) el.scrollIntoView({ behavior: "instant" });
    setTimeout(() => {
      if (el) el.scrollIntoView({ behavior: "instant" });
    }, 100);
  } else if (window.location.hash) {
    setTimeout(() => {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: "instant" });
    }, 100);
  }

  const lbParam = params.get("lightbox");
  if (lbParam) {
    setTimeout(() => {
      const targetCard = document.querySelector(`[data-video*="${lbParam}"]`) || document.querySelector(`[data-img*="${lbParam}"]`);
      if (targetCard) targetCard.click();
    }, 300);
  }
});

// ========================================================================
// 1. DİNAMİK YILDIZ & PARÇACIK ARKA PLANI
// ========================================================================
function initStarsCanvas() {
  const canvas = document.getElementById("stars-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const starCount = 85;
  const stars = [];

  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1
    });
  }

  function renderStars() {
    ctx.clearRect(0, 0, width, height);

    stars.forEach(star => {
      star.alpha += star.speed * star.direction;
      if (star.alpha > 0.9) {
        star.alpha = 0.9;
        star.direction = -1;
      } else if (star.alpha < 0.2) {
        star.alpha = 0.2;
        star.direction = 1;
      }

      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(renderStars);
  }

  renderStars();
}

// ========================================================================
// 2. KİLİTLİ GİRİŞ EKRANI (ONBOARDING GATE)
// ========================================================================
let currentHintIndex = 0;

function initGateScreen() {
  const form = document.getElementById("gate-form");
  const input = document.getElementById("gate-input");
  const errorMsg = document.getElementById("gate-error-msg");
  const gateScreen = document.getElementById("gate-screen");
  const mainContent = document.getElementById("main-content");
  const gateIcon = document.getElementById("gate-icon");

  document.getElementById("gate-title").textContent = APP_CONFIG.secretGate.title;
  document.getElementById("gate-subtitle").textContent = APP_CONFIG.secretGate.subtitle;
  document.getElementById("bypass-text").textContent = APP_CONFIG.secretGate.bypassPhraseText;

  if (window.location.search.includes("preview=1") || window.location.search.includes("unlocked=1")) {
    gateScreen.classList.add("unlocked");
    gateScreen.style.display = "none";
    mainContent.classList.remove("locked");
    setTimeout(() => {
      initOriginMap();
      document.querySelectorAll(".timeline-item").forEach(item => item.classList.add("visible"));
    }, 200);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    verifyGateInput();
  });

  function normalize(str) {
    return str
      .toLowerCase()
      .replace(/[\s,\.\-_]/g, "")
      .trim();
  }

  function verifyGateInput() {
    const val = input.value.trim();
    if (!val) {
      showError("Lütfen başlangıç noktamızın şifresini gir 🗝️");
      return;
    }

    const normalizedVal = normalize(val);
    const isCorrect = APP_CONFIG.secretGate.acceptedPasswords.some(pass => {
      return normalize(pass) === normalizedVal || val.toLowerCase().includes(pass.toLowerCase());
    });

    if (isCorrect) {
      logEvent("🔓 Kapı Başarıyla Açıldı!", val);
      unlockGate();
    } else {
      logEvent("❌ Hatalı Şifre Denendi", val);
      showError("Bu koordinat kalbimizi bulamadı... İpuçlarına göz atmak ister misin? 🥺");
      input.classList.add("shake");
      setTimeout(() => input.classList.remove("shake"), 600);
    }
  }

  function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.style.opacity = "1";
  }

  function unlockGate() {
    errorMsg.textContent = "";
    gateIcon.textContent = "🔓";
    gateIcon.classList.add("unlocked-pulse");

    if (window.confetti) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.55 }
      });
    }

    if (audioSynth) {
      audioSynth.start();
    }

    setTimeout(() => {
      gateScreen.classList.add("unlocked");
      mainContent.classList.remove("locked");
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Harita unhide olduktan sonra Leaflet boyutunu güncelle
      setTimeout(() => {
        initOriginMap();
      }, 250);
    }, 700);
  }

  // İpuçları
  const hintToggleBtn = document.getElementById("hint-toggle-btn");
  const hintCard = document.getElementById("hint-card");
  const hintContent = document.getElementById("hint-content");
  const hintCloseBtn = document.getElementById("hint-close-btn");
  const hintNextBtn = document.getElementById("hint-next-btn");
  const hintBadge = document.getElementById("hint-counter-badge");

  const hints = APP_CONFIG.secretGate.hints;
  hintBadge.textContent = hints.length;

  hintToggleBtn.addEventListener("click", () => {
    hintCard.classList.remove("hidden");
    displayHint(currentHintIndex);
  });

  hintCloseBtn.addEventListener("click", () => {
    hintCard.classList.add("hidden");
  });

  hintNextBtn.addEventListener("click", () => {
    currentHintIndex = (currentHintIndex + 1) % hints.length;
    displayHint(currentHintIndex);
  });

  function displayHint(index) {
    hintContent.textContent = hints[index] || "İlk baktığımız o yeri hatırla...";
    logEvent("💡 İpucu Açıldı", `İpucu #${index + 1}: ${(hints[index] || "").slice(0, 40)}...`);
  }

  // Bypass
  const bypassBtn = document.getElementById("bypass-btn");
  bypassBtn.addEventListener("click", () => {
    logEvent("🥺 'Şifreyi Hatırlayamadım' Butonuna Bastı");
    const hintFirst = APP_CONFIG.secretGate.acceptedPasswords[6];
    input.value = hintFirst;
    showError("Seni asla kapıda bekletmem... Şifre yazıldı, şimdi 'Aç'a bas! ❤️");
  });
}

// ========================================================================
// 3. HER ŞEYİN BAŞLADIĞI YER (GERÇEK GOOGLE HARİTALAR KONTROLCÜSÜ)
// ========================================================================
function initOriginMap() {
  const iframe = document.getElementById("origin-map-iframe");
  if (!iframe) return;

  const loc = APP_CONFIG.originLocation;
  const coords = loc.coordinates; // [lat, lng]
  const zoom = loc.zoomLevel || 18;

  const streetUrl = `https://maps.google.com/maps?q=${coords[0]},${coords[1]}&hl=tr&z=${zoom}&output=embed`;
  const satelliteUrl = `https://maps.google.com/maps?q=${coords[0]},${coords[1]}&hl=tr&t=k&z=${zoom}&output=embed`;

  iframe.src = streetUrl;

  const streetBtn = document.getElementById("map-mode-street");
  const satelliteBtn = document.getElementById("map-mode-satellite");

  if (streetBtn && satelliteBtn) {
    streetBtn.addEventListener("click", () => {
      iframe.src = streetUrl;
      streetBtn.classList.add("active");
      satelliteBtn.classList.remove("active");
    });

    satelliteBtn.addEventListener("click", () => {
      iframe.src = satelliteUrl;
      satelliteBtn.classList.add("active");
      streetBtn.classList.remove("active");
    });
  }
}

// ========================================================================
// 4. İÇERİĞİ DOLDURMA (CONFIG -> DOM)
// ========================================================================
function populateContent() {
  document.getElementById("nav-recipient-name").textContent = `${APP_CONFIG.recipientName}'e Özel`;
  document.getElementById("hero-recipient-name").textContent = APP_CONFIG.recipientName;

  // Harita Başlıkları & Koordinat Bilgileri
  const loc = APP_CONFIG.originLocation;
  document.getElementById("map-place-name").textContent = loc.placeName;
  document.getElementById("map-coords-badge").textContent = `${loc.coordinates[0].toFixed(4)}° K, ${loc.coordinates[1].toFixed(4)}° D`;
  document.getElementById("map-description").textContent = loc.description;
  document.getElementById("map-external-link").href = loc.googleMapsUrl || `https://maps.google.com/?q=${loc.coordinates[0]},${loc.coordinates[1]}`;

  // TFT Easter Egg Bilgileri
  const tft = APP_CONFIG.tftEasterEgg;
  if (tft) {
    document.getElementById("tft-synergy-title").textContent = tft.synergyName;
    // Strateji Ustaları (Little Legends) Render
    const tacticiansGrid = document.getElementById("tft-tacticians-grid");
    const speechBubble = document.getElementById("tactician-speech-bubble");
    const speechText = document.getElementById("tactician-speech-text");

    if (tacticiansGrid && tft.tacticians) {
      tacticiansGrid.innerHTML = "";
      tft.tacticians.forEach((t, idx) => {
        const tCard = document.createElement("div");
        tCard.className = "tactician-card";
        tCard.dataset.dialogue = t.dialogue;
        tCard.innerHTML = `
          <div class="tactician-avatar-ring">
            <img class="tactician-avatar-img" src="${t.image}" alt="${t.name}" loading="lazy" />
            <span class="tactician-star-badge">${t.star}</span>
          </div>
          <div class="tactician-info">
            <span class="tactician-summoner-pill">${t.summoner || ""}</span>
            <h4 class="tactician-name">${t.name}</h4>
            <span class="tactician-role">${t.role}</span>
          </div>
          <button type="button" class="tactician-poke-btn">💬 Dokun</button>
        `;

        // Tıklanınca konuşma balonu aç ve zıplat
        tCard.addEventListener("click", () => {
          logEvent("🎮 TFT Şampiyonuna Dokundu", t.name);
          document.querySelectorAll(".tactician-card").forEach(c => c.classList.remove("active-poke"));
          tCard.classList.add("active-poke");

          speechText.textContent = `${t.name} (${t.summoner || ""}): "${t.dialogue}"`;
          speechBubble.classList.remove("hidden");
          speechBubble.classList.add("pop-bounce");

          setTimeout(() => {
            speechBubble.classList.remove("pop-bounce");
          }, 400);
        });

        tacticiansGrid.appendChild(tCard);

        // İki usta arasına Duo Bağı rozeti koy
        if (idx === 0 && tft.tacticians.length > 1) {
          const linkBadge = document.createElement("div");
          linkBadge.className = "tactician-duo-link";
          linkBadge.innerHTML = `<span class="duo-heart">❤️</span><span class="duo-link-text">DUO BAĞI</span>`;
          tacticiansGrid.appendChild(linkBadge);
        }
      });
    }

    const statsGrid = document.getElementById("tft-stats-grid");
    statsGrid.innerHTML = "";
    tft.stats.forEach(stat => {
      const item = document.createElement("div");
      item.className = "tft-stat-item";
      item.innerHTML = `
        <span class="tft-stat-label">${stat.label}</span>
        <span class="tft-stat-val">${stat.value}</span>
      `;
      statsGrid.appendChild(item);
    });
  }

  // Zaman Tüneli Kartları (Genişletilmiş Anılar)
  const timelineContainer = document.getElementById("timeline-items");
  timelineContainer.innerHTML = "";

  APP_CONFIG.timeline.forEach((item) => {
    const itemEl = document.createElement("div");
    itemEl.className = "timeline-item";
    itemEl.dataset.id = item.id;
    itemEl.dataset.atmosphere = item.bgAtmosphere || "";

    const mediaHtml = item.isVideo
      ? `
        <div class="timeline-photo-wrapper is-video-wrapper" data-video="${item.video}" data-title="${item.title}" data-desc="${item.date} - ${item.location}">
          <video class="timeline-photo timeline-video" src="${item.video}" preload="metadata" loop muted autoplay playsinline></video>
          <div class="timeline-video-badge">
            <span class="play-pulse"></span>
            <span>▶ Canlı Video</span>
          </div>
          <button type="button" class="card-sound-pill" data-role="sound-toggle" title="Sesi Aç / Kapat">
            <span>🔊 Sesi Aç</span>
          </button>
          <div class="photo-overlay">
            <span class="photo-zoom-hint">🎬 Videoyu Büyüt ve Dinle</span>
          </div>
        </div>
      `
      : `
        <div class="timeline-photo-wrapper" data-img="${item.photo}" data-title="${item.title}" data-desc="${item.date} - ${item.location}">
          <img class="timeline-photo" src="${item.photo}" alt="${item.title}" loading="lazy" />
          <div class="photo-overlay">
            <span class="photo-zoom-hint">🔍 Fotoğrafı Büyüt</span>
          </div>
        </div>
      `;

    itemEl.innerHTML = `
      <div class="timeline-node" aria-hidden="true"></div>
      <div class="timeline-content">
        ${mediaHtml}
        <div class="timeline-header-meta">
          <span class="timeline-date">${item.date}</span>
          <span class="timeline-badge">${item.badge}</span>
        </div>
        <h3 class="timeline-item-title">${item.title}</h3>
        <div class="timeline-location">📍 ${item.location}</div>
        <p class="timeline-note">${item.note}</p>
      </div>
    `;

    timelineContainer.appendChild(itemEl);
  });

  // Mektup İçeriği
  document.getElementById("letter-tag").textContent = APP_CONFIG.letter.tag;
  document.getElementById("letter-title").textContent = APP_CONFIG.letter.title;
  document.getElementById("letter-signature").textContent = APP_CONFIG.senderName || APP_CONFIG.letter.signature;

  const letterBody = document.getElementById("letter-body");
  letterBody.innerHTML = "";
  APP_CONFIG.letter.paragraphs.forEach(paragraph => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    letterBody.appendChild(p);
  });

  // Mektup İçi Gelecek Hayali (Belki Bir Gün...)
  const fd = APP_CONFIG.letter ? APP_CONFIG.letter.futureDream : null;
  if (fd) {
    const fdEl = document.getElementById("letter-future-card");
    if (fdEl) {
      fdEl.dataset.img = fd.photo;
      fdEl.dataset.title = fd.title;
      fdEl.dataset.desc = `${fd.subtitle} — ${fd.note}`;
      const img = fdEl.querySelector(".future-card-img");
      if (img) img.src = fd.photo;
      const heading = fdEl.querySelector(".future-card-heading");
      if (heading) heading.textContent = fd.subtitle || fd.title;
      const text = document.getElementById("future-card-text");
      if (text) text.textContent = fd.note;
    }
  }

  // Kaçan Buton Sorusu
  document.getElementById("runaway-question").textContent = APP_CONFIG.runawaySection.question;
  document.getElementById("runaway-subtitle").textContent = APP_CONFIG.runawaySection.subtitle;
  document.getElementById("yes-btn-text").textContent = APP_CONFIG.runawaySection.yesButtonText;
  document.getElementById("no-btn-text").textContent = APP_CONFIG.runawaySection.noButtonText;

  // Kutlama Modalı
  document.getElementById("celebration-title").textContent = APP_CONFIG.celebration.title;
  document.getElementById("celebration-message").textContent = APP_CONFIG.celebration.message;
}

// ========================================================================
// 4.4. RESMİ BAL YANAK KÖŞESİ (DÜNYANIN EN TATLI YANAĞI)
// ========================================================================
function initBalYanakSection() {
  const sec = APP_CONFIG.balYanakSection;
  if (!sec) return;

  const grid = document.getElementById("balyanak-grid");
  const totalCountEl = document.getElementById("kiss-total-count");
  const kissAllBtn = document.getElementById("balyanak-kiss-all-btn");

  let totalKisses = parseInt(localStorage.getItem("balyanak_total_kisses") || "1000", 10);
  if (totalCountEl) totalCountEl.textContent = totalKisses.toLocaleString("tr-TR");

  if (grid && sec.cards) {
    grid.innerHTML = "";
    sec.cards.forEach((c) => {
      const card = document.createElement("div");
      card.className = `balyanak-card ${c.type === "video" ? "is-video-card" : ""}`;
      card.dataset.title = c.title;
      card.dataset.desc = `${c.badge} — ${c.stat}`;

      if (c.type === "video") {
        card.dataset.video = c.video;
        card.dataset.img = c.photo;
      } else {
        card.dataset.img = c.photo;
      }

      const mediaOverlayHtml = c.type === "video"
        ? `
          <div class="balyanak-video-play-pulse" aria-hidden="true">
            <span class="play-pulse-triangle">▶</span>
          </div>
          <span class="balyanak-badge-pill">${c.badge}</span>
          <span class="balyanak-zoom-pill video-pill">🎬 Canlı İzle (${c.duration || "0:03"})</span>
        `
        : `
          <span class="balyanak-badge-pill">${c.badge}</span>
          <span class="balyanak-zoom-pill">🔍 Büyüt</span>
        `;

      // Stat rozeti: "Öpülme İhtiyacı: Saniyede 1000 Kere 💋" -> Etiket & Değer ayrımı
      let statBadgeHtml = "";
      if (c.stat && c.stat.includes(":")) {
        const colonIdx = c.stat.indexOf(":");
        const label = c.stat.substring(0, colonIdx).trim();
        const val = c.stat.substring(colonIdx + 1).trim();
        statBadgeHtml = `
          <div class="balyanak-stat-pill">
            <span class="stat-pill-label">${label}:</span>
            <span class="stat-pill-val">${val}</span>
          </div>
        `;
      } else {
        statBadgeHtml = `
          <div class="balyanak-stat-pill">
            <span class="stat-pill-val">${c.stat || ""}</span>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="balyanak-card-tape" aria-hidden="true"></div>
        <div class="balyanak-img-frame">
          <img class="balyanak-img" src="${c.photo}" alt="${c.title}" loading="lazy" />
          ${mediaOverlayHtml}
        </div>
        <div class="balyanak-card-body">
          <div class="balyanak-stat-tag">
            ${statBadgeHtml}
          </div>
          <h3 class="balyanak-card-title">${c.title}</h3>
          <p class="balyanak-card-praise">${c.praise}</p>
          <div class="balyanak-quote-box">
            <span class="balyanak-quote-icon">❝</span>
            <span class="balyanak-quote-text">${c.quote}</span>
          </div>
          <div class="balyanak-card-action">
            <button type="button" class="balyanak-kiss-btn" data-id="${c.id}" title="Yanağına Öpücük Kondur">
              <span class="kiss-btn-icon">💋</span>
              <span class="kiss-btn-label">Bu Yanağı Öp</span>
              <span class="kiss-badge-count">+1</span>
            </button>
          </div>
        </div>
      `;

      // Tekil Öpücük Butonu
      const kissBtn = card.querySelector(".balyanak-kiss-btn");
      if (kissBtn) {
        kissBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          e.preventDefault();

          totalKisses += 1;
          localStorage.setItem("balyanak_total_kisses", totalKisses.toString());
          if (totalCountEl) totalCountEl.textContent = totalKisses.toLocaleString("tr-TR");

          logEvent("🍯 Bal Yanağı Öptü", `${c.title} (Toplam: ${totalKisses})`);

          // Buton animasyonu
          kissBtn.classList.add("kissed-pop");
          const label = kissBtn.querySelector(".kiss-btn-label");
          const origText = label.textContent;
          label.textContent = "Öpüldü! 💖";
          setTimeout(() => {
            kissBtn.classList.remove("kissed-pop");
            label.textContent = origText;
          }, 900);

          // Uçuşan öpücük ve bal emojileri
          spawnFloatingKisses(e.clientX || (kissBtn.getBoundingClientRect().left + 40), e.clientY || kissBtn.getBoundingClientRect().top, 6);

          if (window.confetti) {
            window.confetti({
              particleCount: 15,
              spread: 45,
              origin: {
                x: (e.clientX || window.innerWidth / 2) / window.innerWidth,
                y: (e.clientY || window.innerHeight / 2) / window.innerHeight
              },
              colors: ["#f472b6", "#fbbf24", "#fda4af"]
            });
          }
        });
      }

      grid.appendChild(card);
    });
  }

  // Büyük Kocaman Öpücük Butonu
  if (kissAllBtn) {
    kissAllBtn.addEventListener("click", (e) => {
      totalKisses += 100;
      localStorage.setItem("balyanak_total_kisses", totalKisses.toString());
      if (totalCountEl) totalCountEl.textContent = totalKisses.toLocaleString("tr-TR");

      logEvent("🍯 Kocaman Bal Öpücüğü", `+100 Öpücük (Toplam: ${totalKisses})`);

      kissAllBtn.classList.add("kissed-pop");
      setTimeout(() => kissAllBtn.classList.remove("kissed-pop"), 800);

      const rect = kissAllBtn.getBoundingClientRect();
      spawnFloatingKisses(rect.left + rect.width / 2, rect.top, 18);

      if (window.confetti) {
        window.confetti({
          particleCount: 60,
          spread: 80,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: rect.top / window.innerHeight
          },
          colors: ["#f472b6", "#fbbf24", "#f59e0b", "#f43f5e"]
        });
      }
    });
  }

  function spawnFloatingKisses(x, y, count = 6) {
    const emojis = ["💋", "🍯", "💖", "🌸", "✨", "🥰"];
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "floating-kiss-emoji";
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = `${x + (Math.random() * 80 - 40)}px`;
      el.style.top = `${y + (Math.random() * 40 - 20)}px`;
      el.style.fontSize = `${1.4 + Math.random() * 1}rem`;
      el.style.animationDuration = `${1.2 + Math.random() * 0.8}s`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2000);
    }
  }
}

// ========================================================================
// 4.5. NOSTALJİ & GÜLME KRİZLERİMİZ (RENDER & FİLTRELEME)
// ========================================================================
function initNostalgiaSection() {
  const grid = document.getElementById("nostalgia-grid");
  if (!grid || !APP_CONFIG.nostalgia) return;

  grid.innerHTML = "";

  APP_CONFIG.nostalgia.forEach((item) => {
    const card = document.createElement("div");
    card.className = `nostalgia-card ${item.type === "video" ? "is-video" : ""}`;
    card.dataset.id = item.id;
    card.dataset.type = item.type;
    card.dataset.title = item.title;
    card.dataset.desc = `${item.date} — ${item.desc}`;

    if (item.type === "video") {
      card.dataset.video = item.mediaUrl;
      card.innerHTML = `
        <div class="nostalgia-tape" aria-hidden="true"></div>
        <div class="nostalgia-media-frame">
          <img class="nostalgia-video-preview" src="${item.thumbUrl}" alt="${item.title}" loading="eager" />
          <span class="nostalgia-badge-pill">${item.badge}</span>
          <span class="nostalgia-sticker">${item.sticker}</span>
          <div class="nostalgia-video-duration">
            <span class="play-pulse-mini"></span>
            <span>▶ ${item.duration || "Video"}</span>
          </div>
        </div>
        <div class="nostalgia-content">
          <div class="nostalgia-meta">
            <span class="nostalgia-date">${item.date}</span>
          </div>
          <h3 class="nostalgia-title">${item.title}</h3>
          <p class="nostalgia-desc">${item.desc}</p>
          <div class="nostalgia-action-hint">
            <span>🎬 Videoyu Büyüt ve Dinle</span>
          </div>
        </div>
      `;
    } else {
      card.dataset.img = item.mediaUrl;
      card.innerHTML = `
        <div class="nostalgia-tape" aria-hidden="true"></div>
        <div class="nostalgia-media-frame">
          <img class="nostalgia-media-img" src="${item.thumbUrl}" alt="${item.title}" loading="eager" />
          <span class="nostalgia-badge-pill">${item.badge}</span>
          <span class="nostalgia-sticker">${item.sticker}</span>
        </div>
        <div class="nostalgia-content">
          <div class="nostalgia-meta">
            <span class="nostalgia-date">${item.date}</span>
          </div>
          <h3 class="nostalgia-title">${item.title}</h3>
          <p class="nostalgia-desc">${item.desc}</p>
          <div class="nostalgia-action-hint">
            <span>🔍 Fotoğrafı Büyüt</span>
          </div>
        </div>
      `;
    }

    grid.appendChild(card);
  });

  // Filtreleme Düğmeleri
  const filterBtns = document.querySelectorAll(".nostalgia-filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      const cards = grid.querySelectorAll(".nostalgia-card");
      cards.forEach((card) => {
        if (filter === "all" || card.dataset.type === filter) {
          card.style.display = "flex";
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transition = "opacity 0.35s ease";
          }, 20);
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// ========================================================================
// 4.8. BİZİM SİNEMAMIZ & ÖZEL DERLEME KLİBİ (CINEMA SECTION)
// ========================================================================
function initCinemaSection() {
  const video = document.getElementById("cinema-video");
  const overlay = document.getElementById("cinema-overlay");
  const playBtn = document.getElementById("cinema-play-btn");
  const theaterBtn = document.getElementById("cinema-theater-mode-btn");
  const theaterText = document.getElementById("theater-mode-text");

  if (!video || !overlay) return;

  function startFilm() {
    overlay.classList.add("hidden");
    video.muted = false;
    video.volume = 1.0;
    logEvent("🎬 47sn Derleme Klibini Başlattı", "Bizim Sinemamız");

    if (audioSynth && audioSynth.isPlaying) {
      audioSynth.wasPlayingBeforeVideo = true;
      audioSynth.stop();
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Sinema videosu sesli oynatılamadı, sessiz başlatılıyor:", err);
        video.muted = true;
        video.play().catch(() => { });
      });
    }
  }

  playBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    startFilm();
  });

  overlay.addEventListener("click", () => {
    startFilm();
  });

  video.addEventListener("ended", () => {
    overlay.classList.remove("hidden");
    if (document.body.classList.contains("theater-mode-on")) {
      toggleTheaterMode();
    }
    if (audioSynth && audioSynth.wasPlayingBeforeVideo) {
      audioSynth.wasPlayingBeforeVideo = false;
      audioSynth.start();
    }
  });

  video.addEventListener("pause", () => {
    if (video.currentTime === 0 || video.ended) {
      overlay.classList.remove("hidden");
    }
  });

  video.addEventListener("play", () => {
    overlay.classList.add("hidden");
    if (audioSynth && audioSynth.isPlaying) {
      audioSynth.wasPlayingBeforeVideo = true;
      audioSynth.stop();
    }
  });

  function toggleTheaterMode() {
    const isOn = document.body.classList.toggle("theater-mode-on");
    logEvent("💡 Sinema Modu (Işıklar)", isOn ? "Işıklar Kapatıldı" : "Işıklar Açıldı");
    if (isOn) {
      theaterText.textContent = "Işıkları Aç (Normal Mod)";
      const cinemaSection = document.getElementById("cinema-section");
      if (cinemaSection) {
        cinemaSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      if (video.paused) {
        startFilm();
      }
    } else {
      theaterText.textContent = "Işıkları Kapat (Sinema Modu)";
    }
  }

  if (theaterBtn) {
    theaterBtn.addEventListener("click", () => {
      toggleTheaterMode();
    });
  }
}

// ========================================================================
// 5. PARALLAX TIMELINE & DİNAMİK ARKA PLAN
// ========================================================================
function initTimelineObserver() {
  const items = document.querySelectorAll(".timeline-item");
  const progressBar = document.getElementById("timeline-progress");
  const timelineSection = document.getElementById("timeline-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.add("active-milestone");

          const atmosphere = entry.target.dataset.atmosphere;
          if (atmosphere) {
            document.body.style.background = atmosphere;
          }
        } else {
          entry.target.classList.remove("active-milestone");
        }
      });
    },
    { threshold: 0.1 }
  );

  items.forEach((item) => observer.observe(item));

  // Sayfa açıldığında ekranda olan ilk öğeleri hemen göster
  setTimeout(() => {
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        item.classList.add("visible");
      }
    });
  }, 200);

  window.addEventListener("scroll", () => {
    if (!timelineSection) return;
    const rect = timelineSection.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalH = rect.height;

    if (rect.top <= windowH && rect.bottom >= 0) {
      const scrolled = windowH - rect.top;
      const progress = Math.min(100, Math.max(0, (scrolled / totalH) * 100));
      progressBar.style.height = `${progress}%`;
    }
  });
}

// ========================================================================
// 6. "BENİ AFFETTİN Mİ?" KAÇAN BUTON TRICK'İ (%100 MOBİL & MOUSE UYUMLU)
// ========================================================================
function initRunawayButton() {
  const arena = document.getElementById("runaway-arena");
  const noBtn = document.getElementById("no-btn");
  const tauntBubble = document.getElementById("taunt-bubble");
  const taunts = APP_CONFIG.runawaySection.noButtonTaunts;

  let tauntIdx = 0;

  function resetPosition() {
    noBtn.style.position = "absolute";
    if (window.innerWidth <= 768) {
      // Mobilde dikey yerleşim: Evet üstte, Hayır altta (asla üst üste çakışmaz)
      noBtn.style.left = "50%";
      noBtn.style.top = "76%";
      noBtn.style.transform = "translate(-50%, -50%)";
    } else {
      noBtn.style.left = "65%";
      noBtn.style.top = "50%";
      noBtn.style.transform = "translate(-50%, -50%)";
    }
  }

  resetPosition();
  window.addEventListener("resize", resetPosition);

  function dodge() {
    const arenaRect = arena.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const yesBtn = document.getElementById("yes-btn");
    const yesRect = yesBtn ? yesBtn.getBoundingClientRect() : null;

    const pad = 12;
    const maxX = Math.max(pad, arenaRect.width - btnRect.width - pad);
    const maxY = Math.max(pad, arenaRect.height - btnRect.height - pad);

    let randomX = pad;
    let randomY = pad;
    let attempts = 0;

    // Evet butonu ile üst üste çakışmayı önleyen akıllı koordinat seçimi
    do {
      randomX = pad + Math.random() * (maxX - pad);
      randomY = pad + Math.random() * (maxY - pad);
      attempts++;

      if (!yesRect) break;

      const testLeft = arenaRect.left + randomX;
      const testTop = arenaRect.top + randomY;
      const testRight = testLeft + btnRect.width;
      const testBottom = testTop + btnRect.height;

      const overlapsYes = !(
        testRight < yesRect.left - 8 ||
        testLeft > yesRect.right + 8 ||
        testBottom < yesRect.top - 8 ||
        testTop > yesRect.bottom + 8
      );

      if (!overlapsYes || attempts > 12) break;
    } while (attempts <= 12);

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.transform = "none";

    const tauntText = taunts[tauntIdx % taunts.length];
    tauntIdx++;

    logEvent("🏃‍♂️ Hayır'a Basmaya Çalıştı", `Kaçış #${tauntIdx}: "${tauntText}"`);

    tauntBubble.textContent = tauntText;
    tauntBubble.classList.remove("hidden");

    tauntBubble.style.left = `${Math.min(arenaRect.width - 180, Math.max(10, randomX))}px`;
    tauntBubble.style.top = `${Math.max(5, randomY - 45)}px`;

    noBtn.style.filter = "brightness(1.3)";
    setTimeout(() => {
      noBtn.style.filter = "none";
    }, 200);
  }

  // Desktop fare yakınlığı (85px)
  arena.addEventListener("mousemove", (e) => {
    const btnRect = noBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
    if (distance < 85) {
      dodge();
    }
  });

  noBtn.addEventListener("mouseenter", dodge);
  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dodge();
  });

  // %100 Mobil Dokunmatik Koruma (Parmağın değmesi imkansız olsun)
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    dodge();
  }, { passive: false });

  noBtn.addEventListener("touchmove", (e) => {
    e.preventDefault();
    dodge();
  }, { passive: false });

  noBtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    dodge();
  });
}

// ========================================================================
// 7. KUTLAMA VE AFFEDİLME MODALI (SUCCESS POPUP)
// ========================================================================
function initCelebrationModal() {
  const yesBtn = document.getElementById("yes-btn");
  const modal = document.getElementById("celebration-modal");
  const closeBtn = document.getElementById("celebration-close-btn");
  const replayBtn = document.getElementById("celebration-replay-confetti-btn");
  const waBtn = document.getElementById("celebration-whatsapp-btn");

  const textMsg = encodeURIComponent(APP_CONFIG.celebration.whatsappText);
  if (APP_CONFIG.celebration.whatsappPhone) {
    waBtn.href = `https://wa.me/${APP_CONFIG.celebration.whatsappPhone}?text=${textMsg}`;
  } else {
    waBtn.href = `https://api.whatsapp.com/send?text=${textMsg}`;
  }

  yesBtn.addEventListener("click", () => {
    openCelebration();
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  replayBtn.addEventListener("click", () => {
    logEvent("🎊 Yeniden Konfeti Yağdırdı");
    triggerConfettiShower();
  });

  function openCelebration() {
    logEvent("🎉 EVET, AFFETTİM! BUTONUNA BASTI ❤️", "Büyük Karar: Affetti!");
    modal.classList.remove("hidden");
    triggerConfettiShower();
  }

  function triggerConfettiShower() {
    if (!window.confetti) return;

    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      window.confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 }
      });
      window.confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    confetti({
      particleCount: 40,
      spread: 100,
      origin: { y: 0.6 },
      shapes: ['star']
    });
  }
}

// ========================================================================
// 8. FOTOĞRAF BÜYÜTME (LIGHTBOX) & VİDEO SES SİSTEMİ
// ========================================================================
function initLightbox() {
  const modal = document.getElementById("lightbox-modal");
  const closeBtn = document.getElementById("lightbox-close");
  const imgEl = document.getElementById("lightbox-img");
  const videoEl = document.getElementById("lightbox-video");
  const titleEl = document.getElementById("lightbox-title");
  const descEl = document.getElementById("lightbox-desc");
  const soundBanner = document.getElementById("lightbox-sound-banner");
  const unmuteBtn = document.getElementById("lightbox-unmute-btn");

  // Kartlar üzerindeki ses açma butonları (Sayfa üzerinde doğrudan sesli dinleme)
  document.addEventListener("click", (e) => {
    const soundBtn = e.target.closest(".card-sound-pill");
    if (soundBtn) {
      e.stopPropagation();
      e.preventDefault();
      const parent = soundBtn.closest(".timeline-photo-wrapper, .origin-photo-polaroid");
      const video = parent ? parent.querySelector("video") : null;
      if (video) {
        if (video.muted) {
          // Bu videoyu sesli yap, diğerlerini sessize al
          document.querySelectorAll("video").forEach((v) => {
            if (v !== video) v.muted = true;
          });
          document.querySelectorAll(".card-sound-pill").forEach((btn) => {
            if (btn !== soundBtn) {
              btn.classList.remove("active-sound");
              btn.innerHTML = "<span>🔊 Sesi Aç</span>";
            }
          });
          video.muted = false;
          video.volume = 1.0;
          soundBtn.classList.add("active-sound");
          soundBtn.innerHTML = "<span>🔇 Sesi Kapat</span>";

          // Arka plan müziğini duraklat (videonun sesi net duyulsun)
          if (audioSynth && audioSynth.isPlaying) {
            audioSynth.wasPlayingBeforeVideo = true;
            audioSynth.stop();
          }
        } else {
          video.muted = true;
          soundBtn.classList.remove("active-sound");
          soundBtn.innerHTML = "<span>🔊 Sesi Aç</span>";

          // Arka plan müziğini geri başlat
          if (audioSynth && audioSynth.wasPlayingBeforeVideo) {
            audioSynth.wasPlayingBeforeVideo = false;
            audioSynth.start();
          }
        }
      }
    }
  });

  if (unmuteBtn) {
    unmuteBtn.addEventListener("click", () => {
      if (videoEl) {
        videoEl.muted = false;
        videoEl.volume = 1.0;
        if (soundBanner) soundBanner.classList.add("hidden");
        if (audioSynth && audioSynth.isPlaying) {
          audioSynth.wasPlayingBeforeVideo = true;
          audioSynth.stop();
        }
      }
    });
  }

  function closeModal() {
    modal.classList.add("hidden");
    if (soundBanner) soundBanner.classList.add("hidden");
    if (videoEl) {
      videoEl.pause();
      videoEl.removeAttribute("src");
      videoEl.load();
    }
    // Videodan çıkınca arka plan müziğini devam ettir
    if (audioSynth && audioSynth.wasPlayingBeforeVideo) {
      audioSynth.wasPlayingBeforeVideo = false;
      audioSynth.start();
    }
  }

  document.addEventListener("click", (e) => {
    // Ses butonuna tıklandıysa modal açma
    if (e.target.closest(".card-sound-pill")) return;

    const wrapper = e.target.closest(".timeline-photo-wrapper, .nostalgia-card, .origin-photo-polaroid, [data-video], [data-img]");
    if (wrapper) {
      const isVideo = !!wrapper.dataset.video;
      const title = wrapper.dataset.title || "";
      const desc = wrapper.dataset.desc || "";

      logEvent("🔍 Anı Büyütüldü", `${isVideo ? "Video" : "Fotoğraf"}: ${title}`);

      titleEl.textContent = title;
      descEl.textContent = desc;

      if (isVideo) {
        if (imgEl) imgEl.classList.add("hidden");
        if (soundBanner) soundBanner.classList.add("hidden");

        if (videoEl) {
          videoEl.classList.remove("hidden");
          videoEl.src = wrapper.dataset.video;
          videoEl.currentTime = 0;
          videoEl.muted = false; // %100 Sesli Aç
          videoEl.volume = 1.0;
          videoEl.load();

          // Video açılınca arka plan müziğini duraklat
          if (audioSynth && audioSynth.isPlaying) {
            audioSynth.wasPlayingBeforeVideo = true;
            audioSynth.stop();
          }

          const playPromise = videoEl.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              console.warn("Tarayıcı sesli otomatik oynatmayı kısıtladı, sessiz başlatıp buton gösteriliyor:", err);
              videoEl.muted = true;
              videoEl.play().catch(() => { });
              if (soundBanner) soundBanner.classList.remove("hidden");
            });
          }
        }
      } else {
        if (videoEl) {
          videoEl.pause();
          videoEl.classList.add("hidden");
        }
        if (soundBanner) soundBanner.classList.add("hidden");
        if (imgEl) {
          imgEl.classList.remove("hidden");
          imgEl.src = wrapper.dataset.img || "";
        }
      }
      modal.classList.remove("hidden");
    }
  });

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}

// ========================================================================
// 9. WEB AUDIO API AMBİYANS MÜZİK SENTEZLEYİCİSİ
// ========================================================================
let audioSynth = null;

function initAmbientAudio() {
  const toggleBtn = document.getElementById("audio-toggle-btn");
  const audioText = document.getElementById("audio-text");

  class AmbientSynth {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
      this.timer = null;
      this.chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 261.63, 329.63, 349.23], // Fmaj7
        [196.00, 261.63, 293.66, 392.00]  // Gsus4
      ];
      this.currentChord = 0;
    }

    start() {
      if (this.isPlaying) return;
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }

      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      this.isPlaying = true;
      toggleBtn.classList.add("playing");
      audioText.textContent = "Çalıyor";

      this.playLoop();
    }

    stop() {
      this.isPlaying = false;
      if (this.timer) clearTimeout(this.timer);
      toggleBtn.classList.remove("playing");
      audioText.textContent = "Melodi";
    }

    toggle() {
      if (this.isPlaying) {
        this.stop();
      } else {
        this.start();
      }
    }

    playNote(freq, delay, duration) {
      if (!this.ctx || !this.isPlaying) return;

      setTimeout(() => {
        if (!this.isPlaying) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800, this.ctx.currentTime);

        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.045, this.ctx.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      }, delay);
    }

    playLoop() {
      if (!this.isPlaying) return;

      const chord = this.chords[this.currentChord];
      this.currentChord = (this.currentChord + 1) % this.chords.length;

      chord.forEach((freq, idx) => {
        this.playNote(freq, idx * 300, 2.8);
      });

      this.timer = setTimeout(() => {
        this.playLoop();
      }, 2600);
    }
  }

  audioSynth = new AmbientSynth();

  toggleBtn.addEventListener("click", () => {
    audioSynth.toggle();
  });
}
