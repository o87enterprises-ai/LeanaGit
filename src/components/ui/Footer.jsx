import { Link } from 'react-router-dom';
import { navLinks } from './Header'; // Import the master list from Header
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-deep-navy text-white/70 py-12 px-6 mt-auto">
      <div className="max-w-6xl mx-auto">

        {/* Grid of all page links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm hover:text-white transition-colors"
            >
              {t(link.nameEn, link.nameEs)}
            </Link>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 text-center space-y-3">
          <p className="font-playfair text-california-gold text-lg font-bold">#MamaBearForOUSD</p>

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
        </div>

      </div>
    </footer>
  );
}
