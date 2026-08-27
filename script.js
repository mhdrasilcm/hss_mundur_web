/* =========================================================
   HSS MUNDUR — SHARED SITE SCRIPT
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {

  /* ── Loader ── */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) loader.classList.add('hidden');
    }, 400);
  });
  // Safety net in case 'load' already fired
  if (document.readyState === 'complete' && loader) {
    setTimeout(() => loader.classList.add('hidden'), 400);
  }

  /* ── Page-load wipe reveal ── */
  const wipe = document.createElement('div');
  wipe.className = 'page-wipe out';
  document.body.appendChild(wipe);
  setTimeout(() => wipe.remove(), 700);

  /* ── Header scroll ── */
  const header = document.getElementById('mainHeader');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile menu ── */
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('navMenu');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      nav.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = btn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  /* ── Custom cursor (fine pointer only) ── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    function animateRing() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();
    const hoverables = 'a, button, .btn, .gallery-item, .g-item, .feature-card, .mv-card, .filter-btn';
    document.querySelectorAll(hoverables).forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
  }

  /* ── Scroll reveal (fade-in + reveal) ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible', 'in-view'), i * 70);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in, .reveal, .timeline, .timeline-item').forEach(el => observer.observe(el));

  /* ── Magnetic buttons ── */
  document.querySelectorAll('.btn').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.14}px, ${y * 0.28 - 3}px)`;
    });
    el.addEventListener('mouseleave', () => { 
      if (el) el.style.transform = ''; 
    });
  });

  /* ── Animated stat counters ── */
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));
  }

  /* ── Smooth scroll for in-page anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.length < 2) return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ── Page transition wipe on internal navigation ── */
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || a.target === '_blank') return;
    a.addEventListener('click', e => {
      e.preventDefault();
      const overlay = document.createElement('div');
      overlay.className = 'page-wipe active';
      document.body.appendChild(overlay);
      setTimeout(() => { window.location.href = href; }, 480);
    });
  });

  /* ── Gallery filtering + lightbox (gallery.html only) ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(fbtn => {
      fbtn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        galleryItems.forEach(item => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.style.opacity = show ? '1' : '0';
          item.style.transform = show ? 'scale(1)' : 'scale(0.9)';
          item.style.pointerEvents = show ? 'auto' : 'none';
          setTimeout(() => { item.style.display = show ? 'block' : 'none'; }, show ? 0 : 300);
          if (show) setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
        });
      });
    });

    const modal = document.getElementById('lightboxModal');
    const lbImg = document.getElementById('lightboxImg');
    const lbCap = document.getElementById('lightboxCaption');
    const lbClose = document.getElementById('lightboxClose');
    const lbPrev = document.getElementById('lightboxPrev');
    const lbNext = document.getElementById('lightboxNext');
    let currentIdx = 0;
    let visibleItems = [];

    function updateVisibleItems() {
      visibleItems = Array.from(document.querySelectorAll('.gallery-item')).filter(el => el.style.display !== 'none');
    }
    function openLightbox(idx) {
      updateVisibleItems();
      currentIdx = idx;
      const item = visibleItems[currentIdx];
      if (!item) return;
      const imgEl = item.querySelector('img');
      const overlayEl = item.querySelector('.overlay');
      if (!imgEl || !overlayEl) return;
      lbImg.src = imgEl.src;
      lbCap.textContent = overlayEl.textContent.trim();
      modal.style.display = 'flex';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      modal.style.display = 'none';
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        updateVisibleItems();
        const visIdx = visibleItems.indexOf(item);
        openLightbox(visIdx >= 0 ? visIdx : 0);
      });
    });
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeLightbox(); });
    if (lbPrev) lbPrev.addEventListener('click', () => {
      if (visibleItems.length > 0) openLightbox((currentIdx - 1 + visibleItems.length) % visibleItems.length);
    });
    if (lbNext) lbNext.addEventListener('click', () => {
      if (visibleItems.length > 0) openLightbox((currentIdx + 1) % visibleItems.length);
    });
    document.addEventListener('keydown', e => {
      if (!modal || modal.style.display !== 'flex') return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && lbPrev) lbPrev.click();
      if (e.key === 'ArrowRight' && lbNext) lbNext.click();
    });
  }

  /* ── Marquee: duplicate content for seamless loop ── */
  document.querySelectorAll('.marquee-track').forEach(track => {
    if (track.children.length === 1) {
      track.innerHTML += track.innerHTML;
    }
  });

  /* ── Scroll Progress Bar ── */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #1b7a78, #2aada9, #c9a84c, #ff8a3d);
    background-size: 200% 100%;
    animation: progressGradient 3s ease infinite;
    z-index: 9999;
    box-shadow: 0 0 15px rgba(27, 122, 120, 0.5);
    width: 0%;
    transition: width 0.1s linear;
  `;
  document.body.appendChild(progressBar);

  const progressStyle = document.createElement('style');
  progressStyle.textContent = `
    @keyframes progressGradient {
      0% { background-position: 0% 0%; }
      100% { background-position: 100% 0%; }
    }
  `;
  document.head.appendChild(progressStyle);

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });

});
