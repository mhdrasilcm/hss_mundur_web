import Link from 'next/link';

export const metadata = {
  title: 'Contact — HSS Mundur',
  description: 'Get in touch with Higher Secondary School Mundur, Palakkad.',
};

export default function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <i className="fas fa-chevron-right" style={{ fontSize: '.65rem' }}></i>
            <span>Contact</span>
          </div>
          <div className="section-label" style={{ marginBottom: 14 }}>
            Reach Out
          </div>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with any questions, enquiries, or feedback.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-info-panel reveal" data-reveal="left">
              <div className="section-label">Our Details</div>
              <h3>How to Reach Us</h3>
              <p>
                Our staff are available during school hours to assist with any inquiries about
                admissions, academics, or general information.
              </p>

              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4>Our Address</h4>
                  <p>
                    HSS Mundur
                    <br />
                    Mundur, Palakkad
                    <br />
                    Kerala, India — 678592
                  </p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+914912832454">+91 491 2832454</a>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:hssmundur@gmail.com">hssmundur@gmail.com</a>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <h4>Office Hours</h4>
                  <p>
                    Monday – Friday
                    <br />
                    8:30 AM – 4:00 PM
                  </p>
                </div>
              </div>

              <div className="social-row" style={{ marginTop: 8 }}>
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

            <div
              className="contact-form-panel reveal"
              data-reveal="right"
              style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '32px 32px 16px' }}>
                <div className="section-label">Coming Next</div>
                <h3>Little Kites Initiative</h3>
                <p>Get a sneak peek at our upcoming dedicated portal for the Little Kites IT Club.</p>
              </div>

              <div style={{ flexGrow: 1, padding: '0 32px 32px', height: '100%' }}>
                <iframe
                  src="https://lkmundur.pages.dev"
                  style={{
                    width: '100%',
                    height: 500,
                    border: '2px solid var(--cream-dark)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)',
                  }}
                  title="Little Kites Website Preview"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <div className="section-title fade-in">
            <div className="section-label">Find Us</div>
            <h2>Our Location</h2>
            <p>We are located in Mundur, Palakkad, Kerala.</p>
          </div>
          <div className="map-embed fade-in">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.201652911937!2d76.5741568!3d10.8361564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba870e97582c9d3%3A0xd3947f3f01836644!2sHigh%20School%20Mundur!5e1!3m2!1sen!2sin!4v1781250498411!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
