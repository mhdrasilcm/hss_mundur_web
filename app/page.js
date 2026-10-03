import Link from 'next/link';
import Icon from '../components/Icons';
import Flame from '../components/Flame';
import Photo from '../components/Photo';
import Counter from '../components/Counter';
import Cta from '../components/Cta';
import Gallery from '../components/Gallery';

const STATS = [
  { count: 90, suffix: '+', label: 'Years of legacy' },
  { count: 1500, suffix: '+', label: 'Students' },
  { count: 80, suffix: '+', label: 'Dedicated staff' },
  { count: 100, suffix: '%', label: 'Pass rate' },
];

const VALUES = [
  'Excellence',
  'Integrity',
  'Community',
  'Aksharadeepam — The Light of Knowledge',
  'Since 1933',
  'Palakkad, Kerala',
];

const FEATURES = [
  {
    icon: 'flask',
    title: 'Modern Laboratories',
    text: 'Fully equipped science and computer labs enabling hands-on learning and experimentation for every student.',
  },
  {
    icon: 'book',
    title: 'Rich Library',
    text: 'A well-stocked library with thousands of volumes, digital resources, and quiet study spaces for focused learning.',
  },
  {
    icon: 'activity',
    title: 'Sports & Athletics',
    text: 'Extensive sports facilities fostering physical fitness, teamwork, and competitive spirit at district and state levels.',
  },
  {
    icon: 'palette',
    title: 'Arts & Culture',
    text: "Vibrant arts, music, and cultural programmes that celebrate creativity and Kerala's rich heritage.",
  },
  {
    icon: 'code',
    title: 'IT Education',
    text: 'Little Kites IT Club and smart classrooms ensure students are prepared for a digital-first world.',
  },
  {
    icon: 'users',
    title: 'Student Clubs',
    text: 'Eco Club, Science Club, and various student bodies developing leadership, teamwork, and social responsibility.',
  },
];

const GALLERY = [
  {
    id: 'lab',
    name: 'lb1',
    caption: 'Computer Lab',
    alt: 'Students working on laptops in the computer lab',
    sizes: '(min-width: 900px) 760px, 92vw',
    className: 'tile--wide',
  },
  {
    id: 'classroom',
    name: 'lb2',
    caption: 'Classroom',
    alt: 'A classroom with rows of benches and desks',
    sizes: '(min-width: 900px) 380px, 46vw',
    className: 'tile--tall',
  },
  {
    id: 'building',
    name: 'c1',
    caption: 'Main Building',
    alt: 'The main building of HSS Mundur',
    sizes: '(min-width: 900px) 380px, 46vw',
  },
  {
    id: 'campus',
    name: 'c2',
    caption: 'Campus',
    alt: 'The school campus and playground',
    sizes: '(min-width: 900px) 380px, 92vw',
    className: 'tile--wide-sm',
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow eyebrow--light">
                <Flame className="flame-sm flame--lit" />
                <span className="eyebrow-text">
                  <span>Est. 1933</span>
                  <span className="sep" aria-hidden="true">
                    ·
                  </span>
                  <span>Aksharadeepam, Palakkad</span>
                </span>
              </p>
              <h1>
                Shaping minds, <em>building futures.</em>
              </h1>
              <p className="lead">
                Higher Secondary School Mundur — a century of academic excellence, character, and
                community in the heart of Palakkad.
              </p>
              <div className="btn-row">
                <Link href="/about/" className="btn btn-gold">
                  Explore our school <Icon name="arrow-right" size={18} />
                </Link>
                <Link href="/contact/" className="btn btn-ghost">
                  Contact us
                </Link>
              </div>
            </div>

            <figure className="hero-figure">
              <div className="arch">
                <Photo
                  name="c1"
                  alt="The main building of HSS Mundur"
                  sizes="(min-width: 960px) 440px, 300px"
                  priority
                />
              </div>
              <figcaption className="hero-chip">
                <Flame className="flame-sm" /> The light of knowledge
              </figcaption>
            </figure>
          </div>

          <div className="stats">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <div className="stat-num">
                  <Counter to={s.count} suffix={s.suffix} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="values">
        <ul className="container">
          {VALUES.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </div>

      <section className="section" id="about">
        <div className="container split">
          <div className="split-media" data-reveal>
            <div className="frame">
              <Photo
                name="c2"
                alt="Students on the school grounds in front of the campus buildings"
                sizes="(min-width: 900px) 540px, 92vw"
              />
            </div>
            <div className="badge-float">
              <strong>1933</strong>
              <span>Founded</span>
            </div>
          </div>
          <div className="split-copy" data-reveal>
            <p className="eyebrow">Welcome to HSS Mundur</p>
            <h2>A legacy of excellence in education</h2>
            <p>
              Higher Secondary School Mundur has been a cornerstone of education in Palakkad,
              Kerala for over nine decades. We are committed to providing quality education that
              empowers students to excel academically and develop into responsible, compassionate
              citizens.
            </p>
            <p>
              Our curriculum nurtures critical thinking, creativity, and character development —
              preparing students for the challenges of higher education and the opportunities of
              tomorrow.
            </p>
            <Link href="/about/" className="btn btn-outline">
              Read our story <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head section-head--center" data-reveal>
            <p className="eyebrow eyebrow--center">What sets us apart</p>
            <h2>A complete learning environment</h2>
            <p>
              From state-of-the-art laboratories to vibrant cultural programmes, we offer every
              student the tools to thrive.
            </p>
          </div>
          <div className="grid-cards">
            {FEATURES.map((f) => (
              <article className="card" data-reveal key={f.title}>
                <div className="card-icon">
                  <Icon name={f.icon} size={26} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow eyebrow--light">Campus life</p>
            <h2>A glimpse of school life</h2>
          </div>
          <Gallery items={GALLERY} />
        </div>
      </section>

      <Cta />
    </>
  );
}
