'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on route change so it doesn't stay open
  // after navigating — the original site reloaded the page on every
  // link click, which reset this for free; a client-side router does not.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header id="mainHeader" className={scrolled ? 'scrolled' : ''}>
      <div className="container header-container">
        <Link href="/" className="logo">
          <div className="logo-icon">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <div className="logo-text">
            <h1>HSS MUNDUR</h1>
            <p>Higher Secondary School, Palakkad</p>
          </div>
        </Link>
        <button
          className="mobile-menu-btn"
          id="mobileMenuBtn"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
        <nav className={`nav-menu${menuOpen ? ' active' : ''}`} id="navMenu">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={pathname === link.href ? 'active' : ''}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="https://lkmundur.pages.dev/blog" target="_blank" rel="noopener noreferrer">
                Blog <i className="fas fa-external-link-alt" style={{ fontSize: '0.7em', marginLeft: '3px' }}></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
