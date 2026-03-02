// ==== CẤU HÌNH DỄ CHỈNH SỬA ==== //

// Cấu hình sự kiện 8/3 (countdown mở khóa trang)
const EVENT_CONFIG = {
  ENABLE_COUNTDOWN: true, // bật/tắt countdown
  TARGET_DATE: "2026-03-08T00:00:00", // ISO string cho ngày 8/3
  FORCE_OPEN: false, // nếu true thì bỏ qua countdown, vào luôn
};
// Ngày bắt đầu yêu nhau: chỉnh ngày, tháng, năm theo định dạng YYYY-MM-DD
const LOVE_START_DATE_STRING = "2025-06-30"; // Ví dụ: 8/3/2022

// Nội dung lời nhắn có hiệu ứng typing
const TYPING_MESSAGE = `
Em à,

Nếu có một từ để nói về điều anh cảm nhận khi ở cạnh em, có lẽ đó là: "biết ơn".

Biết ơn vì giữa vô số người ngoài kia, anh lại có duyên gặp được em.
Biết ơn vì em đã chọn ở lại, dù có những lúc anh chưa đủ khéo léo, chưa đủ trưởng thành.

Anh thích cách em cười, thích cả những lúc em nhăn mặt hờn dỗi.
Anh nhớ từng tin nhắn đơn giản của em, nhớ những lần mình lặng im mà vẫn thấy lòng bình yên.

Ngày 8/3 này, anh không chỉ chúc em xinh đẹp và hạnh phúc,
mà còn mong em luôn được là chính em – cô gái vừa mạnh mẽ, vừa nhạy cảm, vừa đáng yêu đến lạ.

Nếu những lúc sau này cuộc đời làm em mệt,
hãy nhớ rằng em không phải một mình.
Vì anh vẫn ở đây – nhẹ nhàng đứng phía sau,
để nếu em cần, anh sẽ nắm tay em thật chặt và nói:
"Không sao đâu, có anh rồi."

Chúc em một ngày 8/3 thật dịu dàng, đủ bình yên để mỉm cười,
và đủ ấm áp để tin rằng mình xứng đáng được yêu thương rất nhiều.

Anh thương em.
`;

// ==== XỬ LÝ DOM SAU KHI TẢI ==== //

document.addEventListener("DOMContentLoaded", () => {
  initEventCountdown(() => {
    initLoginIntro();
    initLoveTimer();
    initTypingEffect();
    initMusicControl();
    initGallery();
    initFireworks();
    initHeartsBackground();
    initIntroOverlay();
    initTheme();
    initScrollReveal();
    initParallaxHero();
    initLoadingBar();
    initCustomCursor();
    initShareButton();
    initWishlist();
    initBackToTop();
    initNav();
    initSecret();
  });
});

// ==== COUNTDOWN ĐẾN NGÀY 8/3 ==== //

function initEventCountdown(onReady) {
  const now = new Date();
  const targetDate = new Date(EVENT_CONFIG.TARGET_DATE);

  // Nếu tắt countdown, FORCE_OPEN, ngày lỗi hoặc đã tới/qua 8/3 thì vào luôn
  if (
    !EVENT_CONFIG.ENABLE_COUNTDOWN ||
    EVENT_CONFIG.FORCE_OPEN ||
    Number.isNaN(targetDate.getTime()) ||
    now >= targetDate
  ) {
    if (typeof onReady === "function") onReady();
    return;
  }

  const loginIntro = document.getElementById("login-intro");
  if (loginIntro) {
    loginIntro.style.display = "none";
  }
  const introOverlay = document.getElementById("intro-overlay");
  if (introOverlay) {
    introOverlay.style.display = "none";
  }

  const overlay = document.createElement("div");
  overlay.id = "event-countdown-overlay";
  overlay.className = "event-countdown-overlay";
  overlay.setAttribute("aria-hidden", "false");

  overlay.innerHTML = `
    <div class="event-countdown-inner">
      <h2 class="event-countdown-title">chưa có coi được đâu cốt</h2>
      <div class="event-countdown-timer" aria-live="polite">
        <div class="event-countdown-part">
          <span class="event-countdown-number" id="cd-days">00</span>
          <span class="event-countdown-label">Ngày</span>
        </div>
        <div class="event-countdown-part">
          <span class="event-countdown-number" id="cd-hours">00</span>
          <span class="event-countdown-label">Giờ</span>
        </div>
        <div class="event-countdown-part">
          <span class="event-countdown-number" id="cd-mins">00</span>
          <span class="event-countdown-label">Phút</span>
        </div>
        <div class="event-countdown-part">
          <span class="event-countdown-number" id="cd-secs">00</span>
          <span class="event-countdown-label">Giây</span>
        </div>
      </div>
      <p class="event-countdown-subtext">
        Hãy quay lại vào ngày 8/3 nha bé TRÂN ❤️
      </p>
      <p class="event-countdown-subtext">
        VỚI LẠI TRANG WEB TUI LÀM CHƯA CÓ XONG ĐÂU NÊN KHÓA KHÔNG CHO XEM TRƯỚC
      </p>
    </div>
  `;

  document.body.appendChild(overlay);

  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");

  function updateCountdown() {
    const nowTime = Date.now();
    const diffMs = targetDate.getTime() - nowTime;

    if (diffMs <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return false;
    }

    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    let remaining = totalSeconds % (24 * 3600);
    const hours = Math.floor(remaining / 3600);
    remaining %= 3600;
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minsEl.textContent = String(mins).padStart(2, "0");
    secsEl.textContent = String(secs).padStart(2, "0");
    return true;
  }

  updateCountdown();
  const intervalId = window.setInterval(() => {
    const stillPositive = updateCountdown();
    if (!stillPositive) {
      window.clearInterval(intervalId);

      overlay.classList.add("event-countdown-hide");
      overlay.setAttribute("aria-hidden", "true");

      window.setTimeout(() => {
        overlay.remove();
        if (loginIntro) {
          loginIntro.style.display = "";
        }
        const introOverlay = document.getElementById("intro-overlay");
        if (introOverlay) {
          introOverlay.style.display = "";
        }
        if (typeof onReady === "function") onReady();
      }, 650);
    }
  }, 1000);
}

// ==== FAKE LOGIN INTRO ==== //

function initLoginIntro() {
  const intro = document.getElementById("login-intro");
  const loading = document.getElementById("login-loading");
  const userSpan = document.getElementById("login-username-typed");
  const passSpan = document.getElementById("login-password-typed");
  const loginBtn = document.getElementById("login-intro-btn");
  const statusEl = document.getElementById("login-status");

  if (
    !intro ||
    !loading ||
    !userSpan ||
    !passSpan ||
    !loginBtn ||
    !statusEl
  ) {
    // Nếu không có layout login thì coi như đã hoàn thành
    window.__loginCompleted = true;
    window.dispatchEvent(new Event("loginCompleted"));
    return;
  }

  document.body.classList.add("login-active");

  const USERNAME = "chó Trân Khùng";
  const PASSWORD = "ditmechotran";

  function typeText(target, text, cb) {
    let i = 0;
    (function step() {
      if (i > text.length) {
        if (cb) cb();
        return;
      }
      target.textContent = text.slice(0, i);
      const ch = text.charAt(i);
      let delay = 80;
      if (ch === "." || ch === " ") delay = 140;
      i += 1;
      setTimeout(step, delay);
    })();
  }

  function showLoading() {
    intro.style.display = "none";
    loading.classList.add("active");
    loading.setAttribute("aria-hidden", "false");

    const texts = [
      "Đang mở khóa điều đặc biệt…",
      "Đang chuẩn bị bất ngờ…",
      "Gần xong rồi…",
    ];
    let idx = 0;
    const textEl = document.getElementById("login-loading-text");
    const intervalId = setInterval(() => {
      if (!textEl) return;
      textEl.textContent = texts[idx % texts.length];
      idx += 1;
    }, 900);

    setTimeout(() => {
      clearInterval(intervalId);
      loading.classList.add("fade-out");

      setTimeout(() => {
        loading.classList.remove("active");
        loading.classList.remove("fade-out");
        loading.setAttribute("aria-hidden", "true");
        document.body.classList.remove("login-active");

        window.__loginCompleted = true;
        window.dispatchEvent(new Event("loginCompleted"));
      }, 600);
    }, 2600);
  }

  function autoLogin() {
    loginBtn.disabled = false;
    statusEl.textContent = "Đang xác thực tình yêu…";
    setTimeout(showLoading, 600);
  }

  setTimeout(() => {
    typeText(userSpan, USERNAME, () => {
      setTimeout(() => {
        typeText(passSpan, PASSWORD, autoLogin);
      }, 300);
    });
  }, 1500);
}

// ==== ĐỒNG HỒ ĐẾM THỜI GIAN YÊU NHAU ==== //

function initLoveTimer() {
  const loveDurationEl = document.getElementById("love-duration");
  const loveStartDateEl = document.getElementById("love-start-date");

  const startDate = new Date(LOVE_START_DATE_STRING + "T00:00:00");

  if (Number.isNaN(startDate.getTime())) {
    loveDurationEl.textContent = "Vui lòng kiểm tra lại ngày bắt đầu.";
    return;
  }

  if (loveStartDateEl) {
    const d = startDate.getDate().toString().padStart(2, "0");
    const m = (startDate.getMonth() + 1).toString().padStart(2, "0");
    const y = startDate.getFullYear();
    loveStartDateEl.textContent = `${d}/${m}/${y}`;
  }

  function updateTimer() {
    const now = new Date();
    const diffMs = now.getTime() - startDate.getTime();

    if (diffMs < 0) {
      loveDurationEl.textContent =
        "Ngày bắt đầu đang ở tương lai, hãy chỉnh lại nhé.";
      return;
    }

    const diffSeconds = Math.floor(diffMs / 1000);

    const years = Math.floor(diffSeconds / (365 * 24 * 3600));
    let remaining = diffSeconds % (365 * 24 * 3600);

    const months = Math.floor(remaining / (30 * 24 * 3600));
    remaining = remaining % (30 * 24 * 3600);

    const days = Math.floor(remaining / (24 * 3600));
    remaining = remaining % (24 * 3600);

    const hours = Math.floor(remaining / 3600);
    remaining = remaining % 3600;

    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    const parts = [];
    if (years) parts.push(`${years} năm`);
    if (months) parts.push(`${months} tháng`);
    if (days) parts.push(`${days} ngày`);
    parts.push(
      `${hours.toString().padStart(2, "0")} giờ`,
      `${minutes.toString().padStart(2, "0")} phút`,
      `${seconds.toString().padStart(2, "0")} giây`
    );

    loveDurationEl.textContent = parts.join(" • ");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// ==== HIỆU ỨNG TYPING ==== //

function initTypingEffect() {
  const typingEl = document.getElementById("typing-message");
  if (!typingEl) return;

  const text = TYPING_MESSAGE.trim();
  let index = 0;
  const baseSpeed = 36; // ms / ký tự

  function typeNext() {
    if (index <= text.length) {
      typingEl.textContent = text.slice(0, index);

      const currentChar = text.charAt(index);
      let delay = baseSpeed;

      if (currentChar === "." || currentChar === "?" || currentChar === "!") {
        delay = 280;
      } else if (currentChar === "," || currentChar === ";") {
        delay = 160;
      } else if (currentChar === "\n") {
        delay = 220;
      }

      index++;
      setTimeout(typeNext, delay);
    } else {
      typingEl.classList.add("finished");
    }
  }

  const hasIntro = document.getElementById("intro-overlay");

  if (hasIntro) {
    window.addEventListener(
      "introFinished",
      () => {
        setTimeout(typeNext, 600);
      },
      { once: true }
    );
  } else {
    setTimeout(typeNext, 1200);
  }
}

// ==== NHẠC NỀN ==== //

function initMusicControl() {
  const musicEl = document.getElementById("bg-music");
  const musicToggle = document.getElementById("music-toggle");

  if (!musicEl || !musicToggle) return;

  let isPlaying = false;
  const STORAGE_KEY_MUSIC = "wd-music";

  const savedState = window.localStorage.getItem(STORAGE_KEY_MUSIC);
  if (savedState === "on") {
    // Sẽ cố gắng tự phát sau khi user đã từng cho phép
    musicEl.addEventListener(
      "canplay",
      () => {
        musicEl
          .play()
          .then(() => {
            isPlaying = true;
            musicToggle.textContent = "Tạm dừng nhạc";
            musicToggle.classList.add("active");
          })
          .catch(() => {
            // Nếu trình duyệt chặn auto-play thì bỏ qua
          });
      },
      { once: true }
    );
  }

  async function playMusic() {
    if (isPlaying) return;
    try {
      await musicEl.play();
      isPlaying = true;
      musicToggle.textContent = "Tạm dừng nhạc";
      musicToggle.classList.add("active");
      window.localStorage.setItem(STORAGE_KEY_MUSIC, "on");
    } catch (err) {
      console.error("Không thể phát nhạc: ", err);
    }
  }

  function pauseMusic() {
    if (!isPlaying) return;
    musicEl.pause();
    isPlaying = false;
    musicToggle.textContent = "Bật nhạc nền";
    musicToggle.classList.remove("active");
    window.localStorage.setItem(STORAGE_KEY_MUSIC, "off");
  }

  async function toggleMusic() {
    if (!isPlaying) {
      await playMusic();
    } else {
      pauseMusic();
    }
  }

  window.__playBackgroundMusic = playMusic;

  musicToggle.addEventListener("click", toggleMusic);
}

// ==== GALLERY ẢNH KỶ NIỆM ==== //

function initGallery() {
  const items = document.querySelectorAll(".gallery-item");
  const modal = document.getElementById("gallery-modal");
  const modalImg = document.getElementById("modal-image");
  const modalCaption = document.getElementById("modal-caption");
  const modalClose = document.querySelector(".modal-close");

  if (!items.length || !modal || !modalImg || !modalCaption) return;

  function openModal(src, caption) {
    modalImg.src = src;
    modalCaption.textContent = caption || "";
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
  }

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (!img) return;
      const src = img.getAttribute("src");
      const caption = item.getAttribute("data-caption");
      openModal(src, caption);
    });
  });

  modalClose?.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("modal-backdrop")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

// ==== NÚT BẤT NGỜ & PHÁO HOA ==== //

function initFireworks() {
  const surpriseBtn = document.getElementById("surprise-btn");
  const wrapper = document.getElementById("fireworks-canvas-wrapper");
  const canvas = document.getElementById("fireworks-canvas");
  const closeBtn = document.getElementById("fireworks-close");
  if (!surpriseBtn || !wrapper || !canvas) return;

  const ctx = canvas.getContext("2d");
  let fireworks = [];
  let particles = [];
  let animationId = null;
  let closeTimeoutId = null;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Firework {
    constructor(sx, sy, tx, ty) {
      this.x = sx;
      this.y = sy;
      this.sx = sx;
      this.sy = sy;
      this.tx = tx;
      this.ty = ty;
      this.distanceToTarget = calcDistance(sx, sy, tx, ty);
      this.distanceTraveled = 0;
      this.coordinates = [];
      this.coordinateCount = 3;
      while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
      }
      this.angle = Math.atan2(ty - sy, tx - sx);
      this.speed = 5;
      this.acceleration = 1.05;
      this.brightness = random(50, 80);
    }

    update(index) {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);

      this.speed *= this.acceleration;

      const vx = Math.cos(this.angle) * this.speed;
      const vy = Math.sin(this.angle) * this.speed;
      this.distanceTraveled = calcDistance(
        this.sx,
        this.sy,
        this.x + vx,
        this.y + vy
      );

      if (this.distanceTraveled >= this.distanceToTarget) {
        createParticles(this.tx, this.ty);
        fireworks.splice(index, 1);
      } else {
        this.x += vx;
        this.y += vy;
      }
    }

    draw() {
      ctx.beginPath();
      const lastCoordinate = this.coordinates[this.coordinates.length - 1];
      ctx.moveTo(lastCoordinate[0], lastCoordinate[1]);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = `hsl(${random(330, 360)}, 100%, ${this.brightness}%)`;
      ctx.stroke();
    }
  }

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.coordinates = [];
      this.coordinateCount = 5;
      while (this.coordinateCount--) {
        this.coordinates.push([this.x, this.y]);
      }
      this.angle = random(0, Math.PI * 2);
      this.speed = random(2, 10);
      this.friction = 0.95;
      this.gravity = 0.7;
      this.hue = random(320, 360);
      this.brightness = random(50, 80);
      this.alpha = 1;
      this.decay = random(0.015, 0.025);
    }

    update(index) {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);
      this.speed *= this.friction;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.gravity;
      this.alpha -= this.decay;

      if (this.alpha <= this.decay) {
        particles.splice(index, 1);
      }
    }

    draw() {
      ctx.beginPath();
      const lastCoordinate = this.coordinates[this.coordinates.length - 1];
      ctx.moveTo(lastCoordinate[0], lastCoordinate[1]);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
      ctx.stroke();
    }
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function calcDistance(sx, sy, tx, ty) {
    const xDistance = sx - tx;
    const yDistance = sy - ty;
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  }

  let lastTimestamp = 0;
  const launchInterval = 280;

  function loop(timestamp) {
    animationId = requestAnimationFrame(loop);

    const delta = timestamp - lastTimestamp;
    if (delta >= launchInterval) {
      const startX = canvas.width / 2;
      const startY = canvas.height;
      const targetX = random(canvas.width * 0.1, canvas.width * 0.9);
      const targetY = random(canvas.height * 0.1, canvas.height * 0.45);
      fireworks.push(new Firework(startX, startY, targetX, targetY));
      lastTimestamp = timestamp;
    }

    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(10, 0, 14, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "lighter";

    fireworks.forEach((fw, index) => {
      fw.draw();
      fw.update(index);
    });

    particles.forEach((p, index) => {
      p.draw();
      p.update(index);
    });
  }

  function createParticles(x, y) {
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(x, y));
    }
  }

  function closeFireworks() {
    wrapper.classList.remove("active");
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    fireworks = [];
    particles = [];
    if (closeTimeoutId) {
      clearTimeout(closeTimeoutId);
      closeTimeoutId = null;
    }
  }

  function openFireworks() {
    wrapper.classList.add("active");
    fireworks = [];
    particles = [];
    lastTimestamp = performance.now();
    if (!animationId) {
      animationId = requestAnimationFrame(loop);
    }

    if (closeTimeoutId) {
      clearTimeout(closeTimeoutId);
    }
    closeTimeoutId = setTimeout(() => {
      closeFireworks();
    }, 12000);
  }

  surpriseBtn.addEventListener("click", openFireworks);
  closeBtn?.addEventListener("click", closeFireworks);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && wrapper.classList.contains("active")) {
      closeFireworks();
    }
  });
}

// ==== HIỆU ỨNG TRÁI TIM BAY NỀN ==== //

function initHeartsBackground() {
  const container = document.querySelector(".heart-background");
  if (!container) return;

  const heartSymbols = ["❤", "♡", "❥", "💗"];

  function spawnHeart() {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent =
      heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    const startLeft = Math.random() * 100;
    const duration = 6 + Math.random() * 5;
    const size = 14 + Math.random() * 20;
    const horizontalShift = (Math.random() - 0.5) * 140;

    heart.style.left = `${startLeft}vw`;
    heart.style.bottom = "-40px";
    heart.style.fontSize = `${size}px`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.setProperty("--x-move", `${horizontalShift}px`);

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000 + 500);
  }

  for (let i = 0; i < 35; i++) {
    setTimeout(spawnHeart, Math.random() * 3500);
  }

  setInterval(() => {
    spawnHeart();
    if (Math.random() < 0.4) {
      setTimeout(spawnHeart, 200 + Math.random() * 400);
    }
  }, 420);
}

// ==== INTRO OVERLAY & COUNTDOWN ==== //

function initIntroOverlay() {
  const overlay = document.getElementById("intro-overlay");
  if (!overlay) return;

  // Đã có login intro, nên ẩn luôn cinematic intro cũ để đỡ dài dòng.
  overlay.classList.add("intro-overlay-hidden");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("intro-active");
  window.dispatchEvent(new Event("introFinished"));
}

// ==== THEME (LIGHT / DARK) ==== //

function initTheme() {
  const toggle = document.getElementById("theme-toggle");
  const body = document.body;

  if (!toggle) return;

  const saved = window.localStorage.getItem("wd-theme");
  if (saved === "dark") {
    body.classList.add("dark-theme");
    toggle.textContent = "Chế độ sáng";
  }

  toggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark-theme");
    window.localStorage.setItem("wd-theme", isDark ? "dark" : "light");
    toggle.textContent = isDark ? "Chế độ sáng" : "Chế độ tối";
  });
}

// ==== SCROLL REVEAL ==== //

function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const explicitDelay = el.getAttribute("data-reveal-delay");
          const delaySeconds = explicitDelay
            ? Number.parseFloat(explicitDelay) || 0
            : Math.random() * 0.25;
          el.style.transitionDelay = `${delaySeconds.toFixed(2)}s`;
          el.classList.add("reveal-visible");
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -15% 0px",
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// ==== PARALLAX HERO ==== //

function initParallaxHero() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  let latestScrollY = window.scrollY || window.pageYOffset;
  let ticking = false;

  function update() {
    const offset = latestScrollY * 0.18;
    hero.style.transform = `translate3d(0, ${offset * -0.3}px, 0)`;
    hero.style.willChange = "transform";
    ticking = false;
  }

  function onScroll() {
    latestScrollY = window.scrollY || window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
}

// ==== LOADING BAR ==== //

function initLoadingBar() {
  const bar = document.getElementById("loading-bar");
  if (!bar) return;

  let progress = 0;
  let intervalId = null;

  function start() {
    bar.style.width = "0%";
    bar.style.opacity = "1";
    progress = 0;

    intervalId = window.setInterval(() => {
      if (progress < 60) {
        progress += 3;
        bar.style.width = `${progress}%`;
      } else {
        window.clearInterval(intervalId);
      }
    }, 120);
  }

  function finish() {
    if (intervalId) {
      window.clearInterval(intervalId);
    }
    bar.style.width = "100%";
    window.setTimeout(() => {
      bar.style.opacity = "0";
    }, 300);
  }

  start();

  window.addEventListener("load", () => {
    finish();
  });
}

// ==== CUSTOM CURSOR ==== //

function initCustomCursor() {
  const cursor = document.getElementById("cursor-heart");
  if (!cursor) return;

  const finePointer = window.matchMedia("(pointer: fine)");
  if (!finePointer.matches) {
    cursor.style.display = "none";
    return;
  }

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let rafId = null;

  function render() {
    const dx = targetX - currentX;
    const dy = targetY - currentY;

    currentX += dx * 0.18;
    currentY += dy * 0.18;

    cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    rafId = window.requestAnimationFrame(render);
  }

  function handleMove(e) {
    cursor.style.opacity = "1";
    targetX = e.clientX;
    targetY = e.clientY;
    if (!rafId) {
      rafId = window.requestAnimationFrame(render);
    }
  }

  document.body.classList.add("custom-cursor-enabled");
  window.addEventListener("mousemove", handleMove, { passive: true });
}

// ==== SHARE BUTTON ==== //

function initShareButton() {
  const btn = document.getElementById("share-btn");
  if (!btn) return;

  const originalText = btn.textContent || "Chia sẻ trang này";

  async function handleShare() {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          text: "Anh gửi em một trang nhỏ anh làm riêng cho em.",
          url,
        });
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        btn.textContent = "Đã copy link ❤️";
        window.setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      } else {
        window.prompt("Copy đường link này và gửi cho người em thương:", url);
      }
    } catch (err) {
      console.error("Không thể chia sẻ: ", err);
    }
  }

  btn.addEventListener("click", handleShare);
}

// ==== BACK TO TOP ==== //

function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    if (y > 500) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }

  btn.addEventListener("click", () => {
    const hero = document.getElementById("home");
    const top = hero ? hero.offsetTop : 0;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ==== NAVBAR & DOT NAV ==== //

function initNav() {
  const nav = document.getElementById("top-nav");
  const links = document.querySelectorAll(".main-nav-links a[data-nav-target]");
  const navToggle = document.getElementById("nav-toggle");
  const primaryNav = document.getElementById("primary-nav");
  const sections = [
    "home",
    "message",
    "memories",
    "reasons",
    "timeline",
    "wishlist",
  ]
    .map((id) => {
      const el = document.getElementById(id);
      return el ? { id, el } : null;
    })
    .filter(Boolean);

  if (!nav || !links.length || !sections.length) return;

  // Vertical dot navigation
  let dotsNav = document.querySelector(".section-dots");
  if (!dotsNav) {
    dotsNav = document.createElement("nav");
    dotsNav.className = "section-dots";
    dotsNav.setAttribute("aria-label", "Điều hướng nhanh theo section");
    sections.forEach(({ id }) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "section-dot";
      btn.dataset.target = id;
      btn.title = id;
      dotsNav.appendChild(btn);
    });
    document.body.appendChild(dotsNav);
  }

  function setActive(id) {
    links.forEach((a) => {
      a.classList.toggle(
        "active",
        a.getAttribute("data-nav-target") === id
      );
    });
    document.querySelectorAll(".section-dot").forEach((dot) => {
      dot.classList.toggle("active", dot.dataset.target === id);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id) setActive(id);
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  sections.forEach(({ el }) => observer.observe(el));

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-nav-target");
      if (!targetId) return;
      const section = document.getElementById(targetId);
      if (!section) return;
      const rectTop = section.getBoundingClientRect().top;
      const offset = rectTop + window.scrollY - 72; // account for nav height
      window.scrollTo({ top: offset, behavior: "smooth" });
    });
  });

  document.querySelectorAll(".section-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      const targetId = dot.dataset.target;
      if (!targetId) return;
      const section = document.getElementById(targetId);
      if (!section) return;
      const rectTop = section.getBoundingClientRect().top;
      const offset = rectTop + window.scrollY - 72;
      window.scrollTo({ top: offset, behavior: "smooth" });
    });
  });

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    if (y > 40) {
      nav.classList.add("nav-condensed");
    } else {
      nav.classList.remove("nav-condensed");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && primaryNav) {
    function closeMobileNav() {
      primaryNav.classList.remove("nav-open");
      navToggle.classList.remove("nav-toggle-open");
      navToggle.setAttribute("aria-expanded", "false");
    }

    function toggleNav() {
      const isOpen = primaryNav.classList.toggle("nav-open");
      navToggle.classList.toggle("nav-toggle-open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }

    navToggle.addEventListener("click", toggleNav);

    links.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 800) {
          closeMobileNav();
        }
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        primaryNav.classList.remove("nav-open");
        navToggle.classList.remove("nav-toggle-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
}

// ==== SECRET TYPEWRITER MODAL ==== //

function initSecret() {
  const btn = document.getElementById("secret-btn");
  const modal = document.getElementById("secret-modal");
  const closeBtn = document.getElementById("secret-close");
  const target = document.getElementById("secret-typing");
  if (!btn || !modal || !closeBtn || !target) return;

  const SECRET_TEXT = `
Có những điều anh không nói thành lời mỗi ngày...

Nhưng nếu em đang ở đây, đọc những dòng này,
thì anh chỉ muốn em biết rằng:

Chúc mừng 8/3, người đặc biệt nhất của anh.
`.trim();

  function openModal() {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    startTyping();
  }

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    target.textContent = "";
  }

  function startTyping() {
    target.textContent = "";
    let index = 0;

    (function step() {
      if (index > SECRET_TEXT.length) return;
      target.textContent = SECRET_TEXT.slice(0, index);
      const ch = SECRET_TEXT.charAt(index);
      let delay = 40;
      if (ch === "." || ch === "!" || ch === "?") delay = 220;
      else if (ch === "," || ch === ";") delay = 130;
      else if (ch === "\n") delay = 260;
      index += 1;
      setTimeout(step, delay);
    })();
  }

  btn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

// ==== WISHLIST MINI SHOP ==== //

function initWishlist() {
  const gridEl = document.getElementById("wishlist-grid");
  const filterButtons = document.querySelectorAll(".wishlist-filter-btn");
  const sortSelect = document.getElementById("wishlist-sort-select");
  const cartToggle = document.getElementById("wishlist-cart-toggle");
  const cartOverlay = document.getElementById("wishlist-cart-overlay");
  const cartClose = document.getElementById("wishlist-cart-close");
  const cartItemsEl = document.getElementById("wishlist-cart-items");
  const cartTotalEl = document.getElementById("wishlist-cart-total");
  const cartCountEl = document.getElementById("wishlist-cart-count");
  const sendBtn = document.getElementById("wishlist-send-btn");
  const confirmModal = document.getElementById("wishlist-confirm-modal");
  const confirmClose = document.getElementById("wishlist-confirm-close");
  const adminToggle = document.getElementById("wishlist-admin-toggle");
  const adminForm = document.getElementById("wishlist-admin-form");
  const toastContainerId = "wishlist-toast-container";

  if (!gridEl) return;

  const STORAGE_KEY_PRODUCTS = "wd-wishlist-products";
  const STORAGE_KEY_CART = "wd-wishlist-cart";

  const defaultProducts = [
    {
      id: "p1",
      title: "Một buổi hẹn hò chỉ có hai đứa mình",
      description: "Không điện thoại, không vội vàng, chỉ có em, anh và những câu chuyện nhỏ.",
      price: "1 buổi hẹn riêng tư",
      category: "experience",
      romance: 5,
      image: "",
    },
    {
      id: "p2",
      title: "Album in những tấm hình em thích nhất",
      description: "Anh sẽ chọn, in và sắp xếp từng tấm một cách thật nâng niu.",
      price: "1 cuốn album đầy kỷ niệm",
      category: "gift",
      romance: 4,
      image: "",
    },
    {
      id: "p3",
      title: "Buổi tối nấu ăn cùng nhau",
      description: "Anh phụ bếp cho em, dù có làm bếp hơi bừa, nhưng sẽ rửa bát ngoan ngoãn.",
      price: "1 bữa tối ấm áp",
      category: "experience",
      romance: 4,
      image: "",
    },
    {
      id: "p4",
      title: "Một chuyến đi Đà Lạt mơ mộng",
      description: "Đi dạo dưới trời se lạnh, uống cacao nóng và ôm em thiệt chặt.",
      price: "1 chuyến đi Đà Lạt",
      category: "experience",
      romance: 5,
      image: "",
    },
    {
      id: "p5",
      title: "Hộp quà nhỏ anh tự chuẩn bị",
      description: "Không cần đắt tiền, chỉ cần chứa những điều em thích và anh hiểu về em.",
      price: "1 hộp quà bất ngờ",
      category: "gift",
      romance: 3,
      image: "",
    },
    {
      id: "p6",
      title: "999 nụ hôn rải rác cả năm",
      description: "Không phải nhận hết trong một ngày, mà là từng chút, từng chút một.",
      price: "999 nụ hôn",
      category: "surprise",
      romance: 5,
      image: "",
    },
  ];

  function loadProducts() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (!raw) return defaultProducts;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || !parsed.length) return defaultProducts;
      return parsed;
    } catch {
      return defaultProducts;
    }
  }

  function saveProducts(products) {
    try {
      window.localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch {
      // ignore
    }
  }

  function loadCart() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY_CART);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function saveCart(cart) {
    try {
      window.localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }

  let products = loadProducts();
  let cart = loadCart();
  let activeFilter = "all";
  let activeSort = "romance-desc";

  function getFilteredSortedProducts() {
    let list = products.slice();

    if (activeFilter !== "all") {
      list = list.filter((p) => p.category === activeFilter);
    }

    list.sort((a, b) => {
      if (activeSort === "romance-asc") {
        return (a.romance || 0) - (b.romance || 0);
      }
      return (b.romance || 0) - (a.romance || 0);
    });

    return list;
  }

  function renderProducts() {
    const list = getFilteredSortedProducts();
    gridEl.innerHTML = "";

    list.forEach((p) => {
      const card = document.createElement("article");
      card.className = "wishlist-card";
      card.dataset.id = p.id;

      const imgWrapper = document.createElement("div");
      imgWrapper.className = "wishlist-image-wrapper";
      if (p.image) {
        const img = document.createElement("img");
        img.src = p.image;
        img.alt = p.title;
        imgWrapper.appendChild(img);
      } else {
        const span = document.createElement("span");
        span.textContent = "🎁";
        span.style.fontSize = "1.8rem";
        imgWrapper.appendChild(span);
      }

      const title = document.createElement("h3");
      title.className = "wishlist-title";
      title.textContent = p.title;

      const badgeRow = document.createElement("div");
      badgeRow.className = "wishlist-badges";
      const categoryBadge = document.createElement("span");
      categoryBadge.className = "wishlist-badge";
      const categoryLabelMap = {
        experience: "Trải nghiệm",
        gift: "Quà vật chất",
        surprise: "Bất ngờ dễ thương",
      };
      categoryBadge.textContent =
        categoryLabelMap[p.category] || "Dễ thương";
      badgeRow.appendChild(categoryBadge);

      const desc = document.createElement("p");
      desc.className = "wishlist-description";
      desc.textContent = p.description;

      const meta = document.createElement("div");
      meta.className = "wishlist-meta";

      const price = document.createElement("span");
      price.className = "wishlist-price";
      price.textContent = p.price;

      const romance = document.createElement("div");
      romance.className = "wishlist-romance";
      const label = document.createElement("span");
      label.textContent = `Lãng mạn: ${p.romance || 0}/5`;
      romance.appendChild(label);

      const dotsCount = Math.max(1, Math.min(5, p.romance || 0));
      for (let i = 0; i < dotsCount; i++) {
        const dot = document.createElement("span");
        dot.className = "dot";
        romance.appendChild(dot);
      }

      meta.appendChild(price);
      meta.appendChild(romance);

      const footer = document.createElement("div");
      footer.className = "wishlist-card-footer";

      const addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "btn primary wishlist-add-btn";
      addBtn.textContent = "Thêm vào giỏ";
      if (cart[p.id]) {
        addBtn.classList.add("in-cart");
        addBtn.textContent = "Đã chọn";
      }

      const heartFx = document.createElement("div");
      heartFx.className = "wishlist-card-heart-fx";

      footer.appendChild(addBtn);

      card.appendChild(imgWrapper);
      card.appendChild(title);
      card.appendChild(badgeRow);
      card.appendChild(desc);
      card.appendChild(meta);
      card.appendChild(footer);
      card.appendChild(heartFx);

      addBtn.addEventListener("click", () => {
        addToCart(p.id);
        triggerCardHeart(heartFx);
      });

      gridEl.appendChild(card);
    });
  }

  function triggerCardHeart(container) {
    const heart = document.createElement("span");
    heart.className = "wishlist-heart";
    heart.textContent = "❤";
    const offsetX = (Math.random() - 0.5) * 16;
    heart.style.left = `calc(50% + ${offsetX}px)`;
    heart.style.bottom = "18px";
    container.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 700);
  }

  function updateCartBadge() {
    if (!cartCountEl) return;
    const total = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    cartCountEl.textContent = String(total);
    cartCountEl.classList.remove("pulse");
    void cartCountEl.offsetWidth;
    cartCountEl.classList.add("pulse");
  }

  function renderCart() {
    if (!cartItemsEl || !cartTotalEl) return;

    const entries = Object.entries(cart).filter(([, qty]) => qty > 0);
    const total = entries.reduce((sum, [, qty]) => sum + qty, 0);

    cartTotalEl.textContent = String(total);

    if (!entries.length) {
      cartItemsEl.innerHTML =
        '<p class="wishlist-cart-empty"><span class="wishlist-cart-empty-icon">💌</span>Hiện chưa có món nào. Em chọn vài điều nhỏ xinh ở bên ngoài nhé.</p>';
      return;
    }

    cartItemsEl.innerHTML = "";

    entries.forEach(([id, qty]) => {
      const product = products.find((p) => p.id === id);
      if (!product) return;

      const itemEl = document.createElement("div");
      itemEl.className = "wishlist-cart-item";
      itemEl.dataset.id = id;

      const main = document.createElement("div");
      main.className = "wishlist-cart-item-main";

      const title = document.createElement("div");
      title.className = "wishlist-cart-item-title";
      title.textContent = product.title;

      const meta = document.createElement("div");
      meta.className = "wishlist-cart-item-meta";
      meta.textContent = `${product.price} • Số lượng: ${qty}`;

      main.appendChild(title);
      main.appendChild(meta);

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "wishlist-cart-remove";
      removeBtn.textContent = "Xóa";
      removeBtn.addEventListener("click", () => {
        removeFromCart(id);
      });

      itemEl.appendChild(main);
      itemEl.appendChild(removeBtn);

      cartItemsEl.appendChild(itemEl);
    });
  }

  function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    saveCart(cart);
    updateCartBadge();
    renderCart();

    const card = gridEl.querySelector(`.wishlist-card[data-id="${id}"]`);
    const btn = card?.querySelector(".wishlist-add-btn");
    if (btn) {
      btn.classList.add("in-cart");
      btn.textContent = "Đã chọn";
    }

    const toggle = document.getElementById("wishlist-cart-toggle");
    if (toggle) {
      toggle.classList.add("cart-animate");
      setTimeout(() => toggle.classList.remove("cart-animate"), 400);
    }
  }

  function removeFromCart(id) {
    if (!cart[id]) return;
    delete cart[id];
    saveCart(cart);
    updateCartBadge();
    renderCart();

    const card = gridEl.querySelector(`.wishlist-card[data-id="${id}"]`);
    const btn = card?.querySelector(".wishlist-add-btn");
    if (btn) {
      btn.classList.remove("in-cart");
      btn.textContent = "Thêm vào giỏ";
    }
  }

  function openCart() {
    if (!cartOverlay) return;
    cartOverlay.classList.remove("closing");
    cartOverlay.classList.add("active");
    cartOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("cart-open");
    document.getElementById("wishlist-cart-toggle")?.classList.add("hidden");
  }

  function closeCart() {
    if (!cartOverlay) return;
    cartOverlay.classList.add("closing");
    cartOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cart-open");

    window.setTimeout(() => {
      cartOverlay.classList.remove("active");
      cartOverlay.classList.remove("closing");
      document.getElementById("wishlist-cart-toggle")?.classList.remove("hidden");
    }, 350);
  }

  function openConfirmModal() {
    if (!confirmModal) return;
    confirmModal.classList.add("active");
    confirmModal.setAttribute("aria-hidden", "false");
  }

  function closeConfirmModal() {
    if (!confirmModal) return;
    confirmModal.classList.remove("active");
    confirmModal.setAttribute("aria-hidden", "true");
  }

  function showToast(message) {
    let container = document.getElementById(toastContainerId);
    if (!container) {
      container = document.createElement("div");
      container.id = toastContainerId;
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = message;
    container.appendChild(toast);

    // kích hoạt animation
    void toast.offsetWidth;
    toast.classList.add("visible");

    setTimeout(() => {
      toast.classList.remove("visible");
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 3400);
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-filter") || "all";
      if (value === activeFilter) return;
      activeFilter = value;
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProducts();
    });
  });

  sortSelect?.addEventListener("change", () => {
    activeSort = sortSelect.value;
    renderProducts();
  });

  cartToggle?.addEventListener("click", openCart);
  cartClose?.addEventListener("click", closeCart);

  cartOverlay?.addEventListener("click", (e) => {
    if (e.target === cartOverlay || e.target.classList.contains("wishlist-cart-backdrop")) {
      closeCart();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (cartOverlay?.classList.contains("active")) {
        closeCart();
      }
      if (confirmModal?.classList.contains("active")) {
        closeConfirmModal();
      }
    }
  });

  sendBtn?.addEventListener("click", () => {
    if (!sendBtn) return;

    sendBtn.disabled = true;
    sendBtn.classList.add("loading");
    const originalText = sendBtn.dataset.originalText || sendBtn.textContent;
    if (!sendBtn.dataset.originalText) {
      sendBtn.dataset.originalText = originalText || "";
    }
    sendBtn.textContent = "Đang gửi...";

    const delayMs = 1300;
    window.setTimeout(() => {
      cart = {};
      try {
        window.localStorage.removeItem(STORAGE_KEY_CART);
      } catch {
        // ignore
      }

      renderCart();
      updateCartBadge();
      // reset trạng thái nút "Đã chọn" trên các card wishlist
      gridEl
        ?.querySelectorAll(".wishlist-add-btn.in-cart")
        .forEach((btn) => {
          btn.classList.remove("in-cart");
          btn.textContent = "Thêm vào giỏ";
        });
      closeCart();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      sendBtn.disabled = false;
      sendBtn.classList.remove("loading");
      sendBtn.textContent =
        sendBtn.dataset.originalText || "Gửi yêu cầu cho anh";

      showToast("Anh đã nhận được wishlist của em rồi 💌");
    }, delayMs);
  });

  confirmClose?.addEventListener("click", closeConfirmModal);

  // Admin mini
  if (adminToggle && adminForm) {
    adminToggle.addEventListener("click", () => {
      const isHidden = adminForm.hasAttribute("hidden");
      if (isHidden) {
        adminForm.removeAttribute("hidden");
        adminToggle.textContent = "Ẩn chế độ chỉnh sửa";
      } else {
        adminForm.setAttribute("hidden", "hidden");
        adminToggle.textContent = "Chế độ chỉnh sửa cho anh";
      }
    });

    adminForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const titleInput = document.getElementById("admin-title");
      const categoryInput = document.getElementById("admin-category");
      const descInput = document.getElementById("admin-description");
      const priceInput = document.getElementById("admin-price");
      const romanceInput = document.getElementById("admin-romance");
      const imageInput = document.getElementById("admin-image");

      if (
        !titleInput ||
        !categoryInput ||
        !descInput ||
        !priceInput ||
        !romanceInput ||
        !imageInput
      ) {
        return;
      }

      const newProduct = {
        id: `p-${Date.now()}`,
        title: titleInput.value.trim(),
        description: descInput.value.trim(),
        price: priceInput.value.trim(),
        category: categoryInput.value,
        romance: Math.max(
          1,
          Math.min(5, Number.parseInt(romanceInput.value || "3", 10))
        ),
        image: imageInput.value.trim(),
      };

      if (!newProduct.title || !newProduct.description || !newProduct.price) {
        return;
      }

      products.push(newProduct);
      saveProducts(products);
      renderProducts();

      titleInput.value = "";
      descInput.value = "";
      priceInput.value = "";
      romanceInput.value = "4";
      imageInput.value = "";
    });
  }

  renderProducts();
  renderCart();
  updateCartBadge();
}

