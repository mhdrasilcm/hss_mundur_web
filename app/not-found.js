import Link from 'next/link';
import Flame from '../components/Flame';
import Icon from '../components/Icons';

export const metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="container">
        <div className="notfound-lamp" aria-hidden="true">
          <Flame muted />
        </div>
        <p className="notfound-code">404</p>
        <h1>Class dismissed!</h1>
        <p className="lead">
          The page you are looking for has been moved, removed, or doesn&apos;t exist. Let&apos;s
          get you back to the main campus.
        </p>
        <Link href="/" className="btn btn-gold">
          <Icon name="home" size={18} /> Return to homepage
        </Link>
      </div>
    </section>
  );
}
