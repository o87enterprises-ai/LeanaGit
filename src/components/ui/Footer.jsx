import { Link } from 'react-router-dom';
import { navLinks, NavLink } from './Header'; // Import the master list from Header
import { useLanguage } from '../../context/LanguageContext';

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/p/LeAna-Powell-for-Oakland-School-Board-D6-61590230594781/',
    icon: (
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/leana4oaklandschools',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="0.9" />
      </>
    ),
  },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-deep-navy text-white/70 py-12 px-6 mt-auto">
      <div className="max-w-6xl mx-auto">

        {/* Grid of all page links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to || link.href}
              link={link}
              className="text-sm hover:text-white transition-colors"
            >
              {t(link.nameEn, link.nameEs)}
            </NavLink>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 text-center space-y-3">
          <p className="font-playfair text-california-gold text-lg font-bold">#MamaBearForOUSD</p>

          {/* Social icons */}
          <div className="flex justify-center gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-california-gold hover:text-california-gold transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>

          {/* Notice to Voters — wording required by the City of Oakland.
              The Spanish text matches the campaign's own site. */}
          <div className="text-xs max-w-2xl mx-auto space-y-1">
            <p className="font-bold text-white">
              {t(
                'Notice to Voters (Required by the City of Oakland):',
                'Noticia para los votantes (requerido por la Ciudad de Oakland):'
              )}
            </p>
            <p>
              {t(
                'Paid for by LeAna Powell for Oakland School Board 2026, PO Box 22746, Oakland, CA 94609, FPPC #1491564.',
                'Pagado por ‘LeAna Powell for Oakland School Board 2026’, PO Box 22746, Oakland, CA 94609, FPPC #1491564.'
              )}
            </p>
            <p>
              {t(
                'Funding details are available on the Oakland Public Ethics Commission’s website.',
                'Los detalles financieros están disponibles en el sitio web del ‘Oakland Public Ethics Commission’.'
              )}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs mt-2">
            {/* leana@ is the address that actually forwards; info@ has no
                routing rule and mail to it is dropped. */}
            <a href="mailto:leana@leanaforoaklandschools.com" className="hover:text-white transition-colors">
              {t('Contact', 'Contacto')}
            </a>
            <Link to="/privacy" className="hover:text-white transition-colors">
              {t('Privacy', 'Privacidad')}
            </Link>
          </div>
          <p className="text-xs text-white/40 mt-4">© {new Date().getFullYear()} LeAna for Oakland Schools</p>

          {/* Site credit — separate from the campaign's own required disclosures above. */}
          <p className="text-xs text-white/30 pt-4 mt-2 border-t border-white/10 max-w-md mx-auto">
            {t('Website by', 'Sitio web por')} Truegle Co. ·{' '}
            <a href="tel:+15416230460" className="hover:text-white/70 transition-colors">(541) 623-0460</a> ·{' '}
            <a href="mailto:truegleai@proton.me" className="hover:text-white/70 transition-colors">truegleai@proton.me</a> ·{' '}
            <a href="https://truegle.info" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">truegle.info</a>
          </p>
        </div>

      </div>
    </footer>
  );
}
