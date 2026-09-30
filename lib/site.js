// Single source of truth for contact details, navigation and social links.
// Social links with an empty `href` are not rendered — fill them in when the
// school's real profile URLs are available.
export const SITE = {
  name: 'HSS Mundur',
  fullName: 'Higher Secondary School Mundur',
  tagline: 'Higher Secondary School, Palakkad',
  address: ['HSS Mundur', 'Mundur, Palakkad', 'Kerala, India — 678592'],
  addressShort: 'HSS Mundur, Palakkad, Kerala 678592',
  phone: '+91 491 2832454',
  phoneHref: 'tel:+914912832454',
  email: 'hssmundur@gmail.com',
  hours: ['Monday – Friday', '8:30 AM – 4:00 PM'],
  hoursShort: 'Mon – Fri: 8:30 AM – 4:00 PM',
  blog: 'https://lkmundur.pages.dev/blog',
  littleKites: 'https://lkmundur.pages.dev',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/about/', label: 'About' },
    { href: '/contact/', label: 'Contact' },
  ],
  socials: [
    { name: 'Facebook', icon: 'facebook', href: '' },
    { name: 'Instagram', icon: 'instagram', href: '' },
    { name: 'YouTube', icon: 'youtube', href: '' },
  ],
};
