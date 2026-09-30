import Link from 'next/link';
import Icon from '../../components/Icons';
import Cta from '../../components/Cta';

export const metadata = {
  title: 'About',
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
    icon: 'target',
    title: 'Our Mission',
    text: 'To provide quality education that fosters intellectual growth, character development, and social responsibility — preparing students to excel in a dynamic global society.',
  },
  {
    icon: 'eye',
    title: 'Our Vision',
    text: 'To be a center of excellence that nurtures innovative thinkers, compassionate leaders, and responsible citizens who contribute positively to society.',
  },
  {
    icon: 'heart',
    title: 'Our Values',
    text: 'Integrity, excellence, respect, compassion, and lifelong learning form the foundation of everything we do at HSS Mundur.',
  },
];

const GLANCE = [
  { label: 'Founded', value: '1933' },
  { label: 'High School', value: '1957' },
  { label: 'Higher Secondary', value: '2010' },
  { label: 'Location', value: 'Mundur, Palakkad' },
];

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Icon name="chevron-right" size={14} />
            <span aria-current="page">About us</span>
          </nav>
          <p className="eyebrow eyebrow--light">Our story</p>
          <h1>About HSS Mundur</h1>
          <p className="lead">
            Discover the legacy, mission, and vision that have guided us for over nine decades.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-layout">
          <div className="prose" data-reveal>
            <h2>Our history</h2>
            <p>
              Higher Secondary School Mundur has long been at the forefront of educational
              excellence in the Palakkad district. The light of knowledge — <em>Aksharadeepam</em>{' '}
              — was first lit by Sri K.V. Sundarawaryar and Sri Kannath Achuthan Master.
            </p>
            <p>
              In 1933, the Mundoor Higher Elementary School was founded by the Mundoor
              Kizhakkewariyat family, with Sri Sivadasawaryar serving as the first manager. In the
              1940s, following the retirement of the previous administrator K.V. Achuthawaryar,
              the administration passed to Sri Sivadasawaryar, during which Sriman Sundarawaryar
              took over management and dedicated himself to the school&apos;s development.
            </p>
          </div>
          <aside className="glance" data-reveal aria-label="School at a glance">
            <h3>At a glance</h3>
            <dl>
              {GLANCE.map((g) => (
                <div key={g.label}>
                  <dt>{g.label}</dt>
                  <dd>{g.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container split-sticky">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Key milestones</p>
            <h2>Ninety years, one flame</h2>
            <p>From a higher elementary school to a higher secondary school for Palakkad.</p>
          </div>
          <ol className="timeline">
            {TIMELINE.map((t) => (
              <li className="timeline-item" data-reveal key={t.year}>
                <span className="timeline-year">{t.year}</span>
                <div className="timeline-card">
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div className="prose" data-reveal>
            <h2>Our achievements</h2>
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
          </div>
          <div className="prose" data-reveal>
            <h2>Our philosophy</h2>
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

      <section className="section section--tint">
        <div className="container">
          <div className="section-head section-head--center" data-reveal>
            <p className="eyebrow eyebrow--center">What we stand for</p>
            <h2>Mission, vision &amp; values</h2>
          </div>
          <div className="grid-cards">
            {MISSION_VISION.map((m) => (
              <article className="card" data-reveal key={m.title}>
                <div className="card-icon">
                  <Icon name={m.icon} size={26} />
                </div>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
