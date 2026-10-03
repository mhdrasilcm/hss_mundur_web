import Link from 'next/link';
import Flame from './Flame';
import Icon from './Icons';
import { SITE } from '../lib/site';

export default function Footer() {
  const socials = SITE.socials.filter((s) => s.href);
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand brand--light">
              <span className="brand-mark">
                <Flame />
              </span>
              <span className="brand-text">
                <span className="brand-name">{SITE.name}</span>
                <span className="brand-sub">{SITE.tagline}</span>
              </span>
            </Link>
            <p>
              Dedicated to academic excellence and the holistic development of every student since
              1933. Shaping the future of Mundur, one student at a time.
            </p>
            {socials.length > 0 && (
              <ul className="social-row">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a href={s.href} aria-label={s.name} target="_blank" rel="noopener noreferrer">
                      <Icon name={s.icon} size={20} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav className="footer-col" aria-label="Quick links">
            <h2>Quick links</h2>
            <ul>
              {SITE.nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
              <li>
                <a href={SITE.blog} target="_blank" rel="noopener noreferrer">
                  Blog
                </a>
              </li>
            </ul>
          </nav>

          <div className="footer-col">
            <h2>Contact</h2>
            <ul className="footer-contact">
              <li>
                <Icon name="pin" size={18} />
                <span>{SITE.addressShort}</span>
              </li>
              <li>
                <Icon name="phone" size={18} />
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </li>
              <li>
                <Icon name="mail" size={18} />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <Icon name="clock" size={18} />
                <span>{SITE.hoursShort}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Higher Secondary School Mundur, Palakkad. All rights reserved.</span>
          <span className="made-by">
            Made with <Icon name="heart" size={14} className="heart" /> by <strong>DiforNet</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
