'use client';

import Link from 'next/link';

const STATS = [
  { count: 90, suffix: '+', label: 'Years of Legacy' },
  { count: 1500, suffix: '+', label: 'Students' },
  { count: 80, suffix: '+', label: 'Dedicated Staff' },
  { count: 100, suffix: '%', label: 'Pass Rate' },
];

const FEATURES = [
  {
    icon: 'fa-flask',
    title: 'Modern Laboratories',
    text: 'Fully equipped science and computer labs enabling hands-on learning and experimentation for every student.',
  },
  {
    icon: 'fa-book-open',
    title: 'Rich Library',
    text: 'A well-stocked library with thousands of volumes, digital resources, and quiet study spaces for focused learning.',
  },
  {
    icon: 'fa-running',
    title: 'Sports & Athletics',
    text: 'Extensive sports facilities fostering physical fitness, teamwork, and competitive spirit at district and state levels.',
  },
  {
    icon: 'fa-palette',
    title: 'Arts & Culture',
    text: "Vibrant arts, music, and cultural programmes that celebrate creativity and Kerala's rich heritage.",
  },
  {
    icon: 'fa-laptop-code',
    title: 'IT Education',
    text: 'Little Kites IT Club and smart classrooms ensure students are prepared for a digital-first world.',
  },
  {
    icon: 'fa-users',
    title: 'Student Clubs',
    text: 'Eco Club, Science Club, and various student bodies developing leadership, teamwork, and social responsibility.',
  },
];

// The original site referenced five gallery images but only ever shipped
// two of them (c1.jpg, lb1.jpg) — the other three (sb.jpg, sd.jpg, lib.jpg)
// don't exist in the repo and rendered as broken images. This swaps in the
// two extra photos that *were* in the repo but unused (c2.jpg, lb2.jpg,
// about-hero.jpg) so every tile shows a real photo.
const GALLERY = [
  { src: '/images/c1.jpg', alt: 'School Building', caption: 'Main Building' },
  { src: '/images/lb1.jpg', alt: 'Computer Lab', caption: 'Computer Lab' },
  { src: '/images/c2.jpg', alt: 'Campus', caption: 'Campus' },
  { src: '/images/lb2.jpg', alt: 'Classroom', caption: 'Classroom' },
  { src: '/images/about-hero.jpg', alt: 'School Grounds', caption: 'School Grounds' },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-pattern"></div>
        <div className="hero-orb o1"></div>
        <div className="hero-orb o2"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fas fa-fire"></i> Est. 1933 — Aksharadeepam, Palakkad
            </div>
            <h2>
              Shaping Minds,
              <br />
              <em className="text-gradient">Building Futures</em>
            </h2>
            <p>
              Higher Secondary School Mundur — a century of academic excellence, character, and
              community in the heart of Palakkad.
            </p>
            <div className="hero-btns">
              <Link href="/about/" className="btn btn-primary">
                <i className="fas fa-compass"></i> Explore Our School
              </Link>
            </div>
            <div className="hero-stats">
              {STATS.map((s) => (
                <div className="stat-item" key={s.label}>
                  <div className="stat-number" data-count={s.count} data-suffix={s.suffix}>
                    0
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <i className="fas fa-chevron-down"></i>
        </div>
      </section>

      <div className="marquee">
        <div className="marquee-track">
          <span>
            <i className="fas fa-circle"></i> Excellence <i className="fas fa-circle"></i>{' '}
            Integrity <i className="fas fa-circle"></i> Community{' '}
            <i className="fas fa-circle"></i> Aksharadeepam — The Light of Knowledge{' '}
            <i className="fas fa-circle"></i> Since 1933 <i className="fas fa-circle"></i>{' '}
            Palakkad, Kerala
          </span>
          <span aria-hidden="true">
            <i className="fas fa-circle"></i> Excellence <i className="fas fa-circle"></i>{' '}
            Integrity <i className="fas fa-circle"></i> Community{' '}
            <i className="fas fa-circle"></i> Aksharadeepam — The Light of Knowledge{' '}
            <i className="fas fa-circle"></i> Since 1933 <i className="fas fa-circle"></i>{' '}
            Palakkad, Kerala
          </span>
        </div>
      </div>

      <section className="about-preview" id="about">
        <div className="container">
          <div className="about-layout">
            <div className="about-visual reveal" data-reveal="left">
              <div className="about-img-placeholder">
                <i className="fas fa-school"></i>
                <span>HSS Mundur Campus</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/c1.jpg"
                alt="HSS Mundur School Building"
                className="about-img-main"
                style={{ position: 'absolute', top: 0, left: 0 }}
                onLoad={(e) => {
                  e.currentTarget.style.position = 'relative';
                  const placeholder = e.currentTarget.previousElementSibling;
                  if (placeholder) placeholder.style.display = 'none';
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="about-badge-float">
                <div className="badge-year">1933</div>
                <div className="badge-text">Founded</div>
              </div>
            </div>
            <div className="about-text reveal" data-reveal="right">
              <div className="section-label">Welcome to HSS Mundur</div>
              <h3>A Legacy of Excellence in Education</h3>
              <p>
                Higher Secondary School Mundur has been a cornerstone of education in Palakkad,
                Kerala for over nine decades. We are committed to providing quality education
                that empowers students to excel academically and develop into responsible,
                compassionate citizens.
              </p>
              <p>
                Our curriculum nurtures critical thinking, creativity, and character development
                — preparing students for the challenges of higher education and the opportunities
                of tomorrow.
              </p>
              <Link href="/about/" className="btn btn-outline-dark" style={{ marginTop: 8 }}>
                <i className="fas fa-arrow-right"></i> Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="section-title centered fade-in">
            <div className="section-label">What Sets Us Apart</div>
            <h2>A Complete Learning Environment</h2>
            <p>
              From state-of-the-art laboratories to vibrant cultural programmes, we offer every
              student the tools to thrive.
            </p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div className="feature-card reveal" data-tilt="true" data-reveal="up" key={f.title}>
                <div className="feature-icon">
                  <i className={`fas ${f.icon}`}></i>
                </div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-preview">
        <div className="container">
          <div
            className="section-title fade-in"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 40,
            }}
          >
            <div>
              <div className="section-label">Campus Life</div>
              <h2 style={{ color: 'white' }}>
                A Glimpse of
                <br />
                School Life
              </h2>
            </div>
          </div>
          <div className="gallery-masonry fade-in">
            {GALLERY.map((g) => (
              <div className="g-item" key={g.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.src}
                  alt={g.alt}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="g-overlay">{g.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container fade-in">
          <div
            className="section-label"
            style={{ justifyContent: 'center', color: 'rgba(255,255,255,.8)' }}
          >
            <span style={{ background: 'rgba(255,255,255,.3)', height: 2 }}></span>Get In Touch
          </div>
          <h2>Ready to Be Part of Our Story?</h2>
          <p>Have questions about admissions, programmes, or events? We'd love to hear from you.</p>
          <Link href="/contact/" className="btn btn-primary">
            Contact Us <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </section>
    </>
  );
}
