import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo" style={{ marginBottom: 0 }}>
              <div className="logo-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className="logo-text">
                <h1>HSS MUNDUR</h1>
                <p>Higher Secondary School, Palakkad</p>
              </div>
            </Link>
            <p className="desc">
              Dedicated to academic excellence and the holistic development of every student
              since 1933. Shaping the future of Mundur, one student at a time.
            </p>
            <div className="social-row">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about/">About Us</Link>
              </li>
              <li>
                <Link href="/contact/">Contact</Link>
              </li>
              <li>
                <a href="https://lkmundur.pages.dev/blog" target="_blank" rel="noopener noreferrer">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>HSS Mundur, Palakkad, Kerala 678592</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>+91 491 2832454</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>hssmundur@gmail.com</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <span>Mon – Fri: 8:30 AM – 4:00 PM</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Higher Secondary School Mundur, Palakkad. All Rights Reserved.</span>
          <span>
            Made with <i className="fas fa-heart" style={{ color: '#ff2a2a' }}></i> by{' '}
            <strong>Ras Devs</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
