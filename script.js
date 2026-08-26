/* ==========================================================================
   +200 FOOTBALL DRILLS VAULT - NATIVE AMERICAN ENGLISH INTERACTIVE JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. DYNAMIC TODAY DATE FORMATTED IN US ENGLISH
  (function initDynamicDate() {
    const dateEl = document.getElementById('todayDate');
    if (dateEl) {
      const now = new Date();
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      dateEl.textContent = now.toLocaleDateString('en-US', options);
    }
  })();

  // 2. 15-MINUTE COUNTDOWN TIMER (PERSISTENT VIA SESSIONSTORAGE)
  (function initCountdownTimer() {
    const STORAGE_KEY = 'football_drills_timer_deadline_us';
    let deadline = 0;

    try {
      deadline = parseInt(sessionStorage.getItem(STORAGE_KEY) || '0', 10);
    } catch (e) {
      console.warn('sessionStorage unavailable', e);
    }

    const now = Date.now();
    if (!deadline || deadline < now) {
      deadline = now + 15 * 60 * 1000;
      try {
        sessionStorage.setItem(STORAGE_KEY, deadline);
      } catch (e) {}
    }

    const elH = document.getElementById('t-h');
    const elM = document.getElementById('t-m');
    const elS = document.getElementById('t-s');

    if (!elH || !elM || !elS) return;

    function updateTimer() {
      const remaining = Math.max(0, deadline - Date.now());
      const hours = Math.floor(remaining / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);

      elH.textContent = String(hours).padStart(2, '0');
      elM.textContent = String(minutes).padStart(2, '0');
      elS.textContent = String(seconds).padStart(2, '0');

      if (remaining === 0) {
        deadline = Date.now() + 15 * 60 * 1000;
        try { sessionStorage.setItem(STORAGE_KEY, deadline); } catch (e) {}
      }
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  })();

  // 3. SECTION 2 & SECTION 6 (INFINITE MARQUEE CAROUSELS)
  // Both Section 2 (6 Poster Cards) and Section 6 (5 Tactical Diagrams) are powered
  // by smooth, hardware-accelerated CSS infinite marquee loops with automatic pause-on-hover.

  // 4. LIVE SOCIAL PROOF NOTIFICATIONS (COMPACT & NFL THEMED)
  (function initSocialProof() {
    const names = ['Coach Jason K.', 'Mike T.', 'Coach David L.', 'Chris R.', 'Coach Brian M.', 'Tyler S.', 'Marcus P.', 'Coach Kevin H.'];
    const cities = ['Austin, TX', 'Miami, FL', 'Columbus, OH', 'Atlanta, GA', 'Dallas, TX', 'Los Angeles, CA', 'Chicago, IL', 'Phoenix, AZ'];
    const plans = ['Complete VIP Vault', 'Complete VIP Vault', 'Basic Plan'];

    const container = document.createElement('div');
    container.id = 'socialProofContainer';
    container.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 16px;
      z-index: 998;
      pointer-events: none;
      max-width: 240px;
    `;
    document.body.appendChild(container);

    function showToast() {
      container.innerHTML = '';
      const name = names[Math.floor(Math.random() * names.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const plan = plans[Math.floor(Math.random() * plans.length)];
      const minAgo = Math.floor(Math.random() * 8) + 1;

      const toast = document.createElement('div');
      toast.style.cssText = `
        background: rgba(255, 255, 255, 0.98);
        border: 1px solid rgba(1, 51, 105, 0.2);
        border-left: 3.5px solid #D50A0A;
        border-radius: 10px;
        padding: 7px 11px;
        box-shadow: 0 8px 20px rgba(1, 51, 105, 0.15);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 11px;
        color: #013369;
        transform: translateY(30px);
        opacity: 0;
        transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        display: flex;
        align-items: center;
        gap: 8px;
        backdrop-filter: blur(8px);
      `;

      toast.innerHTML = `
        <div style="width: 26px; height: 26px; border-radius: 50%; background: rgba(213, 10, 10, 0.1); display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0;">🏈</div>
        <div style="line-height: 1.25;">
          <div style="font-weight: 800; color: #013369; font-size: 11.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 170px;">${name} <span style="font-weight: 600; color: #64748b;">(${city})</span></div>
          <div style="color: #475569; font-size: 10.5px; margin-top: 1px;">Purchased <strong>${plan}</strong></div>
          <div style="color: #94a3b8; font-size: 9.5px; margin-top: 1px;">${minAgo}m ago</div>
        </div>
      `;

      container.appendChild(toast);

      setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
      }, 100);

      setTimeout(() => {
        toast.style.transform = 'translateY(30px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 350);
      }, 4500);
    }

    setTimeout(showToast, 4000);
    setInterval(showToast, 20000);
  })();

  // 5. TESTIMONIALS SLIDER WITH CLICKABLE ARROWS & DOTS
  (function initTestimonialsSlider() {
    const viewport = document.getElementById('tViewport');
    const track = document.getElementById('tTrack');
    const prevBtn = document.getElementById('tPrevBtn');
    const nextBtn = document.getElementById('tNextBtn');
    const dots = document.querySelectorAll('.t-dot');

    if (!viewport || !track || !prevBtn || !nextBtn) return;

    const cards = track.querySelectorAll('.t-slide-card');
    if (!cards.length) return;

    function getCardWidth() {
      const card = cards[0];
      const gap = parseInt(window.getComputedStyle(track).gap || '24', 10);
      return card.offsetWidth + gap;
    }

    function updateActiveDot() {
      const scrollLeft = viewport.scrollLeft;
      const cardWidth = getCardWidth();
      const activeIdx = Math.min(
        cards.length - 1,
        Math.round(scrollLeft / cardWidth)
      );

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIdx);
      });
    }

    prevBtn.addEventListener('click', () => {
      const cardWidth = getCardWidth();
      if (viewport.scrollLeft <= 10) {
        viewport.scrollTo({ left: viewport.scrollWidth, behavior: 'smooth' });
      } else {
        viewport.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
    });

    nextBtn.addEventListener('click', () => {
      const cardWidth = getCardWidth();
      const maxScroll = viewport.scrollWidth - viewport.clientWidth - 10;
      if (viewport.scrollLeft >= maxScroll) {
        viewport.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        viewport.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const cardWidth = getCardWidth();
        viewport.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
      });
    });

    viewport.addEventListener('scroll', updateActiveDot, { passive: true });
  })();

  // 6. UPSELL MODAL POPUP ($14.90 SPECIAL UPGRADE OFFER)
  (function initUpsellModal() {
    const modal = document.getElementById('upsellModal');
    const btnBasic = document.getElementById('btnBasic');
    const closeBtn = document.getElementById('closeUpsell');
    const continueBasic = document.getElementById('continueBasic');

    if (!modal || !btnBasic) return;

    function openModal(e) {
      if (e) e.preventDefault();
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }

    btnBasic.addEventListener('click', openModal);

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    if (continueBasic) {
      continueBasic.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    });
  })();

});
