import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SiteEffects from '../components/SiteEffects';
import { SITE } from '../lib/site';

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
// styles only apply when the script that reveals them will actually run. If the
// app bundle hasn't started within 5 s (flaky network), reveal everything anyway
// so content can never stay invisible.
const JS_FLAG =
  "var d=document.documentElement;d.classList.add('js');" +
  "setTimeout(function(){if(!d.dataset.fx)d.classList.add('fx-fail')},5000)";

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'School',
  name: SITE.fullName,
  alternateName: SITE.name,
  description: DESCRIPTION,
  foundingDate: '1933',
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Mundur',
    addressLocality: 'Palakkad',
    addressRegion: 'Kerala',
    postalCode: '678592',
    addressCountry: 'IN',
  },
  sameAs: SITE.socials.filter((x) => x.href).map((x) => x.href),
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </body>
    </html>
  );
}
