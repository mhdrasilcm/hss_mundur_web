import './globals.css';
import Loader from '../components/Loader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SiteEffects from '../components/SiteEffects';

export const metadata = {
  title: 'HSS Mundur — Higher Secondary School, Palakkad',
  description:
    'Higher Secondary School Mundur — A century of academic excellence in Palakkad, Kerala.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/main.css" />
        <link rel="stylesheet" href="/3d-effects.css" />
      </head>
      <body>
        <Loader />
        <Header />
        {children}
        <Footer />
        <SiteEffects />
      </body>
    </html>
  );
}
