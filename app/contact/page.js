import Link from 'next/link';
import Icon from '../../components/Icons';
import { SITE } from '../../lib/site';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Higher Secondary School Mundur, Palakkad.',
};

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.201652911937!2d76.5741568!3d10.8361564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba870e97582c9d3%3A0xd3947f3f01836644!2sHigh%20School%20Mundur!5e1!3m2!1sen!2sin!4v1781250498411!5m2!1sen!2sin';

function Lines({ items }) {
  return items.map((line, i) => (
    <span key={line}>
      {line}
      {i < items.length - 1 && <br />}
    </span>
  ));
}

export default function Contact() {
  const socials = SITE.socials.filter((s) => s.href);
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Icon name="chevron-right" size={14} />
            <span aria-current="page">Contact</span>
          </nav>
          <p className="eyebrow eyebrow--light">Reach out</p>
          <h1>Contact us</h1>
          <p className="lead">
            We&apos;d love to hear from you. Get in touch with any questions, enquiries, or
            feedback.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div data-reveal>
            <p className="eyebrow">Our details</p>
            <h2>How to reach us</h2>
            <p className="muted">
              Our staff are available during school hours to assist with any inquiries about
              admissions, academics, or general information.
            </p>

            <ul className="info-list">
              <li className="info-item">
                <span className="info-icon">
                  <Icon name="pin" size={22} />
                </span>
                <div>
                  <h3>Address</h3>
                  <p>
                    <Lines items={SITE.address} />
                  </p>
                </div>
              </li>
              <li className="info-item">
                <span className="info-icon">
                  <Icon name="phone" size={22} />
                </span>
                <div>
                  <h3>Phone</h3>
                  <a href={SITE.phoneHref}>{SITE.phone}</a>
                </div>
              </li>
              <li className="info-item">
                <span className="info-icon">
                  <Icon name="mail" size={22} />
                </span>
                <div>
                  <h3>Email</h3>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </div>
              </li>
              <li className="info-item">
                <span className="info-icon">
                  <Icon name="clock" size={22} />
                </span>
                <div>
                  <h3>Office hours</h3>
                  <p>
                    <Lines items={SITE.hours} />
                  </p>
                </div>
              </li>
            </ul>

            {socials.length > 0 && (
              <ul className="social-row social-row--dark">
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

          <div className="card lk-card" data-reveal>
            <p className="eyebrow">Coming next</p>
            <h2>Little Kites initiative</h2>
            <p className="muted">
              Get a sneak peek at our upcoming dedicated portal for the Little Kites IT Club.
            </p>
            {/* Embedded only on wide screens: on phones the iframe is heavy and traps scrolling. */}
            <iframe
              className="lk-frame"
              src={SITE.littleKites}
              title="Little Kites website preview"
              loading="lazy"
            />
            <a
              className="btn btn-outline lk-link"
              href={SITE.littleKites}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Little Kites site <Icon name="external" size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Find us</p>
            <h2>Our location</h2>
            <p>We are located in Mundur, Palakkad, Kerala.</p>
          </div>
          <div className="map" data-reveal>
            <iframe
              src={MAP_SRC}
              title="Map showing the location of HSS Mundur"
              width="600"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
