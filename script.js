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
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  /* ── Mobile menu ── */
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('navMenu');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      nav.classList.toggle('active');
      const icon = btn.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = btn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
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
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
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
      lbImg.src = item.querySelector('img').src;
      lbCap.textContent = item.querySelector('.overlay').textContent.trim();
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
    if (lbPrev) lbPrev.addEventListener('click', () => openLightbox((currentIdx - 1 + visibleItems.length) % visibleItems.length));
    if (lbNext) lbNext.addEventListener('click', () => openLightbox((currentIdx + 1) % visibleItems.length));
    document.addEventListener('keydown', e => {
      if (!modal || modal.style.display !== 'flex') return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lbPrev.click();
      if (e.key === 'ArrowRight') lbNext.click();
    });
  }

  /* ── Marquee: duplicate content for seamless loop ── */
  document.querySelectorAll('.marquee-track').forEach(track => {
    if (track.children.length === 1) {
      track.innerHTML += track.innerHTML;
    }
  });

  /* ── ENHANCED SCROLL-BASED PARALLAX ── */
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
    }
  });

  /* ── ANIMATED STAT COUNTERS WITH GLOW ── */
  const addStatGlow = () => {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(stat => {
      stat.classList.add('animate-in');
    });
  };

  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        addStatGlow();
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statObserver.observe(heroStats);

  /* ── SMOOTH SCROLL VELOCITY ── */
  let lastScrollTop = 0;
  let scrollVelocity = 0;
  const header = document.getElementById('mainHeader');

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    scrollVelocity = currentScroll - lastScrollTop;
    lastScrollTop = currentScroll;

    if (header && scrollVelocity > 20) {
      header.style.transform = 'translateY(-100%)';
    } else if (header) {
      header.style.transform = 'translateY(0)';
    }
  }, false);

  /* ── 3D CARD TILT WITH DEPTH ── */
  const setupCardTilt = () => {
    document.querySelectorAll('[data-tilt]').forEach(element => {
      element.addEventListener('mousemove', e => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angleX = (e.clientY - centerY) / 10;
        const angleY = (centerX - e.clientX) / 10;

        card.style.transform = `perspective(1200px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05) translateZ(40px)`;
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale(1) translateZ(0)';
      });
    });
  };

  setupCardTilt();

  /* ── BACKGROUND GRADIENT SHIFT ── */
  const setupBackgroundShift = () => {
    const colors = [
      ['#0a1526', '#16304d'],
      ['#16304d', '#0a1526'],
      ['#1a2836', '#0a1526']
    ];

    let colorIndex = 0;
    setInterval(() => {
      const body = document.body;
      colorIndex = (colorIndex + 1) % colors.length;
      body.style.transition = 'background 8s ease-in-out';
      body.style.background = `linear-gradient(135deg, ${colors[colorIndex][0]}, ${colors[colorIndex][1]})`;
    }, 8000);
  };

  /* ── TEXT WAVE ANIMATION ── */
  const setupTextWave = () => {
    const waveText = document.querySelectorAll('[data-wave]');
    waveText.forEach(text => {
      const chars = text.textContent.split('');
      text.innerHTML = chars.map((char, i) => 
        `<span style="display:inline-block;animation:wave .6s ease-in-out ${i * 0.05}s infinite;">${char}</span>`
      ).join('');
    });
  };

  if (document.querySelector('[data-wave]')) {
    const waveStyle = document.createElement('style');
    waveStyle.textContent = `
      @keyframes wave {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(waveStyle);
    setupTextWave();
  }

  /* ── MOUSE POSITION-BASED LIGHTING ── */
  const setupDynamicLighting = () => {
    const lightingLayer = document.createElement('div');
    lightingLayer.id = 'dynamic-lighting';
    lightingLayer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      background: radial-gradient(circle 300px at 50% 50%, rgba(27, 122, 120, 0.05), transparent 80%);
    `;
    document.body.insertBefore(lightingLayer, document.body.firstChild);

    document.addEventListener('mousemove', e => {
      lightingLayer.style.background = `radial-gradient(circle 300px at ${e.clientX}px ${e.clientY}px, rgba(27, 122, 120, 0.1), transparent 80%)`;
    });
  };

  setupDynamicLighting();

  /* ── SCROLL PROGRESS BAR ── */
  const addScrollProgress = () => {
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
    });
  };

  addScrollProgress();

  /* ── ELEMENT DEPTH FOG EFFECT ── */
  const addDepthFog = () => {
    const fogStyle = document.createElement('style');
    fogStyle.textContent = `
      .reveal, .fade-in, .feature-card, .g-item {
        position: relative;
      }

      .reveal::after, .fade-in::after, .feature-card::after, .g-item::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, transparent 0%, rgba(255, 243, 235, 0.1) 100%);
        opacity: 0;
        transition: opacity 0.8s ease;
        pointer-events: none;
        border-radius: inherit;
      }

      .reveal.in-view::after, .fade-in.in-view::after {
        opacity: 1;
      }
    `;
    document.head.appendChild(fogStyle);
  };

  addDepthFog();

  /* ── INTERACTIVE CLICK WAVES ── */
  document.addEventListener('click', e => {
    if (e.target.closest('.btn') || e.target.closest('a')) {
      const wave = document.createElement('div');
      wave.style.cssText = `
        position: fixed;
        pointer-events: none;
        width: 20px;
        height: 20px;
        left: ${e.clientX - 10}px;
        top: ${e.clientY - 10}px;
        border: 2px solid rgba(27, 122, 120, 0.6);
        border-radius: 50%;
        animation: clickWave 0.8s ease-out forwards;
        z-index: 9998;
      `;
      document.body.appendChild(wave);

      const clickWaveStyle = document.createElement('style');
      clickWaveStyle.textContent = `
        @keyframes clickWave {
          0% {
            width: 20px;
            height: 20px;
            opacity: 1;
            left: ${e.clientX - 10}px;
            top: ${e.clientY - 10}px;
          }
          100% {
            width: 100px;
            height: 100px;
            opacity: 0;
            left: ${e.clientX - 50}px;
            top: ${e.clientY - 50}px;
          }
        }
      `;
      document.head.appendChild(clickWaveStyle);

      setTimeout(() => wave.remove(), 800);
    }
  });

  /* ── ENHANCED LOADER WITH ROTATION ── */
  const loader = document.getElementById('loader');
  if (loader) {
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
      .loader-lamp {
        animation: lampSpin 3s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
      }

      @keyframes lampSpin {
        0%, 100% { transform: perspective(1200px) rotateX(0) rotateY(0) rotateZ(0); }
        25% { transform: perspective(1200px) rotateX(20deg) rotateY(30deg) rotateZ(0); }
        50% { transform: perspective(1200px) rotateX(-20deg) rotateY(-30deg) rotateZ(0); }
        75% { transform: perspective(1200px) rotateX(10deg) rotateY(20deg) rotateZ(0); }
      }

      #loader {
        animation: loaderGradientShift 3s ease-in-out infinite;
      }

      @keyframes loaderGradientShift {
        0%, 100% { background: radial-gradient(ellipse at 50% 40%, var(--navy-mid) 0%, var(--navy-deep) 75%); }
        50% { background: radial-gradient(ellipse at 50% 60%, var(--navy-deep) 0%, var(--navy-mid) 75%); }
      }
    `;
    document.head.appendChild(loaderStyle);
  }

});
