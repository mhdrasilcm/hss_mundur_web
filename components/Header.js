'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Flame from './Flame';
import Icon from './Icons';
import { SITE } from '../lib/site';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Header shadow — one passive, rAF-throttled listener.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: lock page scroll, close on Esc, and close if the viewport
  // grows into the desktop layout (e.g. device rotation).
  useEffect(() => {
    if (!open) return undefined;
    const root = document.documentElement;
    root.classList.add('nav-open');
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const mq = window.matchMedia('(min-width: 900px)');
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      root.classList.remove('nav-open');
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <Flame />
          </span>
          <span className="brand-text">
            <span className="brand-name">{SITE.name}</span>
            <span className="brand-sub">{SITE.tagline}</span>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={26} />
        </button>

        <nav id="site-nav" className={`nav${open ? ' is-open' : ''}`} aria-label="Main">
          <ul onClick={() => setOpen(false)}>
            {SITE.nav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={SITE.blog} target="_blank" rel="noopener noreferrer">
                Blog <Icon name="external" size={15} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
