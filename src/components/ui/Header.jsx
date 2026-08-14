import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

// `to` is what React Router navigates to. About points at the section that
// already lives on the home page rather than a page of its own.
// `primary` marks the links that fit in the desktop bar; everything still shows
// in the mobile menu, the footer, and the cards on the home page.
// Spanish labels follow the campaign's own wording on leanaforoaklandschools.com/es/
export const navLinks = [
  { nameEn: 'Home', nameEs: 'Inicio', to: '/', primary: true },
  {
    nameEn: 'About',
    nameEs: '¿Quién es LeAna?',
    shortEs: 'Sobre LeAna',
    to: '/#about',
    primary: true,
  },
  { nameEn: 'Issues', nameEs: 'Prioridades', to: '/issues', primary: true },
  { nameEn: 'Endorsements', nameEs: 'Apoyos', to: '/endorsements', primary: true },
  { nameEn: 'Events', nameEs: 'Eventos', to: '/events', primary: true },
  { nameEn: 'Volunteer', nameEs: '¡Apúnteme!', to: '/volunteer', primary: true },
  {
    nameEn: 'Articles & Achievements',
    nameEs: 'Artículos y Logros',
    shortEn: 'Articles',
    shortEs: 'Artículos',
    to: '/achievements',
    primary: true,
  },
  { nameEn: 'Bear Necessities', nameEs: 'Necesidades del Oso', to: '/bear-necessities' },
  { nameEn: 'The Den Live!', nameEs: '¡La Guarida en Vivo!', to: '/the-den-live' },
  { nameEn: 'Cub House', nameEs: 'Casa del Cachorro', to: '/cub-house' },
];

const primaryNav = navLinks.filter((link) => link.primary);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleLanguage, t } = useLanguage();

  return (
    <header className="bg-oakland-terracotta text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        <Link to="/" className="flex-shrink-0">
          <img src="/images/logo.png" alt="LeAna Powell Logo" className="h-10 sm:h-14 object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-base font-medium">
          {primaryNav.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-california-gold transition-colors whitespace-nowrap">
              <span className="xl:hidden">{t(link.shortEn || link.nameEn, link.shortEs || link.nameEs)}</span>
              <span className="hidden xl:inline">{t(link.nameEn, link.nameEs)}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <a
            href="https://secure.actblue.com/donate/leana-powell-1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-oakland-terracotta px-4 py-1.5 rounded-full font-bold text-sm hover:bg-california-gold hover:text-white transition-colors shadow-sm"
          >
            {t('Donate', 'Donar')}
          </a>
          <button
            onClick={toggleLanguage}
            // Shows the language you would switch *to*, matching the campaign's own site.
            lang={t('es', 'en')}
            aria-label={t('Ver el sitio en español', 'View this site in English')}
            className="border border-white/50 px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-white/20 transition-colors whitespace-nowrap"
          >
            {t('Español', 'English')}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden ml-1 focus:outline-none text-white"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-3 bg-oakland-terracotta/95 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded hover:bg-white/20 transition-colors font-medium"
            >
              {t(link.nameEn, link.nameEs)}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
