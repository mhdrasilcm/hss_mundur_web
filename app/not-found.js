import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found — HSS Mundur',
};

export default function NotFound() {
  return (
    <main className="error-content fade-in visible">
      <div className="error-lamp">
        <div className="out-flame">
          <svg viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C12 0 3 11 3 20a9 9 0 0018 0C21 11 12 0 12 0z" fill="#8a93a3" />
          </svg>
        </div>
        <div className="smoke"></div>
      </div>
      <h1>404</h1>
      <h2>Class Dismissed!</h2>
      <p>
        The page you are looking for has been moved, removed, or doesn't exist. Let's get you
        back to the main campus.
      </p>
      <Link href="/" className="btn btn-primary">
        <i className="fas fa-home"></i> Return to Homepage
      </Link>
    </main>
  );
}
