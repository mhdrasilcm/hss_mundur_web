'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Icon from './Icons';

/* Lightweight, GPU-friendly page effects:
   - scroll progress bar (transform only, rAF-throttled)
   - reveal-on-scroll for any element carrying [data-reveal]
   - back-to-top button
   Nothing here touches layout on scroll, and there are no pointer-driven
   effects, so touch devices and low-end phones stay smooth. */
export default function SiteEffects() {
  const pathname = usePathname();
  const barRef = useRef(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = `scaleX(${p})`;
      setShowTop(window.scrollY > 700);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  // Re-runs on every client-side navigation so newly mounted pages animate.
  useEffect(() => {
    document.documentElement.dataset.fx = 'ready';
    const targets = Array.from(document.querySelectorAll('[data-reveal]:not(.is-visible)'));
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }
    const timers = [];
    const io = new IntersectionObserver(
      (entries) => {
        let n = 0;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          const delay = Math.min(n++, 5) * 70;
          timers.push(setTimeout(() => entry.target.classList.add('is-visible'), delay));
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    targets.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <>
      <div className="progress" aria-hidden="true">
        <span ref={barRef} />
      </div>
      <button
        type="button"
        className={`to-top${showTop ? ' is-shown' : ''}`}
        onClick={toTop}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <Icon name="arrow-up" size={22} />
      </button>
    </>
  );
}
