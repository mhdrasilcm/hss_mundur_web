import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SiteEffects from '../components/SiteEffects';

const DESCRIPTION =
  'Higher Secondary School Mundur — a century of academic excellence in Palakkad, Kerala.';

export const metadata = {
  title: {
    default: 'HSS Mundur — Higher Secondary School, Palakkad',
    template: '%s — HSS Mundur',
  },
  description: DESCRIPTION,
  openGraph: {
    title: 'HSS Mundur — Higher Secondary School, Palakkad',
    description: DESCRIPTION,
    siteName: 'HSS Mundur',
    type: 'website',
    locale: 'en_IN',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#fbf7ef',
};

// Marks the document as JS-enabled *before* first paint so the reveal-on-scroll
// styles only apply when the script that reveals them will actually run.
const JS_FLAG = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&display=swap"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SiteEffects />
      </body>
    </html>
  );
}
