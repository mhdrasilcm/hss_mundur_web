'use client';

import { useEffect, useRef, useState } from 'react';

// Counts up once when scrolled into view. The server-rendered HTML already
// contains the final number (good for SEO / no-JS); the count-up is purely
// progressive enhancement and is skipped for `prefers-reduced-motion`.
export default function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const [value, setValue] = useState(to);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      setReady(true);
      return undefined;
    }

    let raf = 0;
    setValue(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setReady(true);
        const start = performance.now();
        const duration = 1400;
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          setValue(Math.round((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref} className={`counter${ready ? ' is-ready' : ''}`}>
      {value}
      {suffix}
    </span>
  );
}
