'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const REVEAL_SELECTOR =
  '.fade-in, .reveal, .timeline, .timeline-item, .feature-card, .g-item';
const HOVER_CURSOR_SELECTOR = 'a, button, .btn, .g-item, .feature-card, .mv-card';
const TILT_SELECTOR = '.feature-card[data-tilt], .g-item';

export default function SiteEffects() {
  const pathname = usePathname();

  /* ── One-time setup: loader, cursor, particle field, progress bar,
     ripple/tilt/glitch/magnetic (all event-delegated so they keep
     working for elements added by later client-side navigations) ── */
  useEffect(() => {
    // Loader
    const loader = document.getElementById('loader');
    const hideLoader = () => {
      if (loader) loader.classList.add('hidden');
    };
    if (document.readyState === 'complete') {
      setTimeout(hideLoader, 400);
    } else {
      window.addEventListener('load', () => setTimeout(hideLoader, 400), { once: true });
    }

    const cleanups = [];

    // Custom cursor (fine pointer only)
    if (window.matchMedia('(pointer: fine)').matches) {
      const dot = document.createElement('div');
      dot.className = 'cursor-dot';
      const ring = document.createElement('div');
      ring.className = 'cursor-ring';
      document.body.appendChild(dot);
      document.body.appendChild(ring);

      let mx = 0,
        my = 0,
        rx = 0,
        ry = 0;
      let raf;
      const onMove = (e) => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
      };
      const animateRing = () => {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        raf = requestAnimationFrame(animateRing);
      };
      window.addEventListener('mousemove', onMove);
      raf = requestAnimationFrame(animateRing);

      const onOver = (e) => {
        if (e.target.closest && e.target.closest(HOVER_CURSOR_SELECTOR)) {
          ring.classList.add('hovering');
        }
      };
      const onOut = (e) => {
        if (e.target.closest && e.target.closest(HOVER_CURSOR_SELECTOR)) {
          ring.classList.remove('hovering');
        }
      };
      document.addEventListener('mouseover', onOver);
      document.addEventListener('mouseout', onOut);

      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseover', onOver);
        document.removeEventListener('mouseout', onOut);
        dot.remove();
        ring.remove();
      });
    }

    // Particle field
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 0; opacity: 0.35;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const colors = ['#1b7a78', '#2aada9', '#c9a84c', '#ff8a3d'];
      const particles = Array.from({ length: 40 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

      let particleRaf;
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.opacity = Math.max(0.1, Math.min(0.5, p.opacity + (Math.random() - 0.5) * 0.02));
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.strokeStyle = particles[i].color;
              ctx.globalAlpha = (1 - dist / 120) * 0.15;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1;
        particleRaf = requestAnimationFrame(animate);
      };
      animate();

      const onResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', onResize);
      cleanups.push(() => {
        cancelAnimationFrame(particleRaf);
        window.removeEventListener('resize', onResize);
        canvas.remove();
      });
    }

    // Scroll progress bar (guarded against divide-by-zero on short pages)
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed; top: 0; left: 0; height: 3px;
      background: linear-gradient(90deg, #1b7a78, #2aada9, #c9a84c, #ff8a3d);
      background-size: 200% 100%; animation: progressGradient 3s ease infinite;
      z-index: 9999; box-shadow: 0 0 15px rgba(27, 122, 120, 0.5);
      width: 0%; transition: width 0.1s linear;
    `;
    document.body.appendChild(progressBar);
    const progressStyle = document.createElement('style');
    progressStyle.textContent = `
      @keyframes progressGradient { 0% { background-position: 0% 0%; } 100% { background-position: 100% 0%; } }
      @keyframes ripple { to { transform: scale(4); opacity: 0; } }
      @keyframes glitch {
        0% { text-shadow: 2px 0 #ff8a3d, -2px 0 #1b7a78; }
        50% { text-shadow: -2px 0 #ff8a3d, 2px 0 #1b7a78; }
        100% { text-shadow: 0 0 rgba(0,0,0,0); }
      }
      .btn { position: relative; overflow: hidden; }
    `;
    document.head.appendChild(progressStyle);
    const onScrollProgress = () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', onScrollProgress, { passive: true });
    onScrollProgress();
    cleanups.push(() => {
      window.removeEventListener('scroll', onScrollProgress);
      progressBar.remove();
      progressStyle.remove();
    });

    // Magnetic buttons (delegated)
    const onBtnMove = (e) => {
      const el = e.target.closest && e.target.closest('.btn');
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.14}px, ${y * 0.28 - 3}px)`;
    };
    const onBtnOut = (e) => {
      const el = e.target.closest && e.target.closest('.btn');
      if (!el) return;
      if (el.contains(e.relatedTarget)) return;
      el.style.transform = '';
    };
    document.addEventListener('mousemove', onBtnMove);
    document.addEventListener('mouseout', onBtnOut);
    cleanups.push(() => {
      document.removeEventListener('mousemove', onBtnMove);
      document.removeEventListener('mouseout', onBtnOut);
    });

    // Card / gallery-item tilt (delegated)
    const onTiltMove = (e) => {
      const el = e.target.closest && e.target.closest(TILT_SELECTOR);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const max = el.classList.contains('g-item') ? 12 : 15;
      const half = max / 2;
      const rotX = (y / rect.height) * max - half;
      const rotY = (x / rect.width) * max - half;
      const perspective = el.classList.contains('g-item') ? 1000 : 1200;
      const scale = el.classList.contains('g-item') ? 1.03 : 1.05;
      el.style.transform = `perspective(${perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
    };
    const onTiltOut = (e) => {
      const el = e.target.closest && e.target.closest(TILT_SELECTOR);
      if (!el) return;
      if (el.contains(e.relatedTarget)) return;
      el.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale(1)';
    };
    document.addEventListener('mousemove', onTiltMove);
    document.addEventListener('mouseout', onTiltOut);
    cleanups.push(() => {
      document.removeEventListener('mousemove', onTiltMove);
      document.removeEventListener('mouseout', onTiltOut);
    });

    // Feature-card glow (delegated)
    const onGlowOver = (e) => {
      const el = e.target.closest && e.target.closest('.feature-card');
      if (!el) return;
      el.style.boxShadow =
        '0 0 20px rgba(27, 122, 120, 0.4), 0 0 40px rgba(255, 138, 61, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.08)';
    };
    const onGlowOut = (e) => {
      const el = e.target.closest && e.target.closest('.feature-card');
      if (!el) return;
      if (el.contains(e.relatedTarget)) return;
      el.style.boxShadow =
        '0 0 20px rgba(27, 122, 120, 0.15), 0 0 40px rgba(255, 138, 61, 0.075), inset 0 0 20px rgba(255, 255, 255, 0.03)';
    };
    document.addEventListener('mouseover', onGlowOver);
    document.addEventListener('mouseout', onGlowOut);
    cleanups.push(() => {
      document.removeEventListener('mouseover', onGlowOver);
      document.removeEventListener('mouseout', onGlowOut);
    });

    // Glitch on heading hover (delegated)
    const onGlitchOver = (e) => {
      const el = e.target.closest && e.target.closest('h1, h2, h3');
      if (!el) return;
      el.style.animation = 'glitch 0.4s ease-in-out';
      setTimeout(() => {
        el.style.animation = 'none';
      }, 400);
    };
    document.addEventListener('mouseover', onGlitchOver);
    cleanups.push(() => document.removeEventListener('mouseover', onGlitchOver));

    // Ripple on .btn click (delegated)
    const onBtnClick = (e) => {
      const btn = e.target.closest && e.target.closest('.btn');
      if (!btn) return;
      const ripple = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.cssText = `
        position: absolute; width: ${size}px; height: ${size}px; left: ${x}px; top: ${y}px;
        background: rgba(255, 255, 255, 0.6); border-radius: 50%; pointer-events: none;
        transform: scale(0); animation: ripple 0.6s ease-out;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };
    document.addEventListener('click', onBtnClick);
    cleanups.push(() => document.removeEventListener('click', onBtnClick));

    // Hero-orb parallax (delegated, only matters where .hero-orb exists)
    const onOrbMove = (e) => {
      const orbs = document.querySelectorAll('.hero-orb');
      if (!orbs.length) return;
      orbs.forEach((orb, idx) => {
        const x = (window.innerWidth / 2 - e.clientX) / 100;
        const y = (window.innerHeight / 2 - e.clientY) / 100;
        orb.style.transform = `translate3d(${x * (idx + 1) * 10}px, ${y * (idx + 1) * 10}px, -${50 + idx * 50}px)`;
      });
    };
    document.addEventListener('mousemove', onOrbMove);
    cleanups.push(() => document.removeEventListener('mousemove', onOrbMove));

    return () => cleanups.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Per-navigation setup: (re)observe reveal-on-scroll targets and
     animated stat counters for whatever page is currently mounted,
     and animate stat counters ── */
  useEffect(() => {
    // Scroll reveal
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible', 'in-view'), i * 70);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => revealObserver.observe(el));

    // Animated stat counters
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1600;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('.stat-number[data-count]').forEach((el) => counterObserver.observe(el));

    // Page-load wipe reveal (brief, on every route change too)
    const wipe = document.createElement('div');
    wipe.className = 'page-wipe out';
    document.body.appendChild(wipe);
    const t = setTimeout(() => wipe.remove(), 700);

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
      clearTimeout(t);
      wipe.remove();
    };
  }, [pathname]);

  return null;
}
