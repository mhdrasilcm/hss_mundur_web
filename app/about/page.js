import Link from 'next/link';

export const metadata = {
  title: 'About — HSS Mundur',
  description:
    'Learn about the history, mission, and vision of Higher Secondary School Mundur, Palakkad.',
};

const TIMELINE = [
  {
    year: '1933',
    title: 'School Founded',
    text: 'Mundoor Higher Elementary School established by the Mundoor Kizhakkewariyat family. Sri Sivadasawaryar becomes the first manager.',
  },
  {
    year: '1940s',
    title: 'New Leadership',
    text: 'Sriman Sundarawaryar takes over management and dedicates himself to expanding facilities and improving education quality.',
  },
  {
    year: '1957',
    title: 'Upgraded to High School',
    text: 'On June 15, 1957, the institution was upgraded to a High School. The inauguration was presided over by Sriman P.S. Kesavan Namboothiri and inaugurated by P.T. Bhaskarapanikar, a key figure in educational reform.',
  },
  {
    year: '1960',
    title: 'A Legacy Continues',
    text: 'Following the passing of Shri Sundara Warrier on October 14, 1960, the school continued its mission of educational excellence under new stewardship.',
  },
  {
    year: '2010',
    title: 'Higher Secondary School',
    text: 'The institution was upgraded to a Higher Secondary School, marking a new era of expanded education and opportunity for students in Palakkad.',
  },
];

const MISSION_VISION = [
  {
    icon: 'fa-bullseye',
    title: 'Our Mission',
    text: 'To provide quality education that fosters intellectual growth, character development, and social responsibility — preparing students to excel in a dynamic global society.',
  },
  {
    icon: 'fa-eye',
    title: 'Our Vision',
    text: 'To be a center of excellence that nurtures innovative thinkers, compassionate leaders, and responsible citizens who contribute positively to society.',
  },
  {
    icon: 'fa-handshake',
    title: 'Our Values',
    text: 'Integrity, excellence, respect, compassion, and lifelong learning form the foundation of everything we do at HSS Mundur.',
  },
];

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <i className="fas fa-chevron-right" style={{ fontSize: '.65rem' }}></i>
            <span>About Us</span>
          </div>
          <div className="section-label" style={{ marginBottom: 14 }}>
            Our Story
          </div>
          <h1>About HSS Mundur</h1>
          <p>Discover the legacy, mission, and vision that have guided us for over nine decades.</p>
        </div>
      </section>

      <section className="about-content-section">
        <div className="container">
          <div className="about-text-block fade-in" style={{ maxWidth: 800 }}>
            <h3>Our History</h3>
            <p>
              Higher Secondary School Mundur has long been at the forefront of educational
              excellence in the Palakkad district. The light of knowledge — <em>Aksharadeepam</em>{' '}
              — was first lit by Sri K.V. Sundarawaryar and Sri Kannath Achuthan Master.
            </p>
            <p>
              In 1933, the Mundoor Higher Elementary School was founded by the Mundoor
              Kizhakkewariyat family, with Sri Sivadasawaryar serving as the first manager. In
              the 1940s, following the retirement of the previous administrator K.V.
              Achuthawaryar, the administration passed to Sri Sivadasawaryar, during which
              Sriman Sundarawaryar took over management and dedicated himself to the school's
              development.
            </p>
            <h3>Key Milestones</h3>
          </div>

          <div className="timeline fade-in" style={{ maxWidth: 720 }}>
            {TIMELINE.map((t) => (
              <div className="timeline-item" key={t.year}>
                <div className="timeline-dot">{t.year}</div>
                <div className="timeline-body">
                  <h4>{t.title}</h4>
                  <p>{t.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="about-text-block fade-in" style={{ maxWidth: 800, marginTop: 24 }}>
            <h3>Our Achievements</h3>
            <p>
              Over the decades, we have consistently produced outstanding results in academics,
              with our students securing top ranks in state board examinations and gaining
              admission to prestigious institutions across India.
            </p>
            <p>
              Beyond academics, our students have excelled in sports, arts, and cultural
              activities at state and national levels. Our alumni have become successful
              professionals in engineering, medicine, arts, civil services, and entrepreneurship.
            </p>
            <h3>Our Philosophy</h3>
            <p>
              At HSS Mundur, we believe education is not just about imparting knowledge but about
              shaping character. Our values of integrity, respect, perseverance, and community
              service are integrated into every aspect of school life.
            </p>
            <p>
              We strive to create an inclusive environment where every student can thrive
              academically, socially, and emotionally — empowering students to become critical
              thinkers, lifelong learners, and responsible global citizens.
            </p>
          </div>
        </div>
      </section>

      <div className="flame-divider" style={{ paddingBottom: 8 }}>
        <span className="line"></span>
        <svg viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fgd" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffe9b0" />
              <stop offset="45%" stopColor="#ffb870" />
              <stop offset="100%" stopColor="#ff6b35" />
            </linearGradient>
          </defs>
          <path d="M12 0C12 0 3 11 3 20a9 9 0 0018 0C21 11 12 0 12 0z" fill="url(#fgd)" />
        </svg>
        <span className="line right"></span>
      </div>

      <section className="mission-vision">
        <div className="container">
          <div className="section-title centered fade-in">
            <div className="section-label">What We Stand For</div>
            <h2>Mission, Vision &amp; Values</h2>
          </div>
          <div className="mv-grid">
            {MISSION_VISION.map((m) => (
              <div className="mv-card reveal" data-reveal="up" key={m.title}>
                <div className="mv-icon">
                  <i className={`fas ${m.icon}`}></i>
                </div>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
