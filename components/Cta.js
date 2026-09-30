import Link from 'next/link';
import Icon from './Icons';

export default function Cta({
  title = 'Ready to be part of our story?',
  text = "Have questions about admissions, programmes, or events? We'd love to hear from you.",
}) {
  return (
    <section className="cta">
      <div className="container" data-reveal>
        <p className="eyebrow eyebrow--light eyebrow--center">Get in touch</p>
        <h2>{title}</h2>
        <p className="cta-text">{text}</p>
        <Link href="/contact/" className="btn btn-gold">
          Contact us <Icon name="arrow-right" size={18} />
        </Link>
      </div>
    </section>
  );
}
