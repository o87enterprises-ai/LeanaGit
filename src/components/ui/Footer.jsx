import { Link } from 'react-router-dom';
import { navLinks } from './Header'; // Import the master list from Header

export default function Footer() {
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
              {link.nameEn}
            </Link>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 text-center space-y-3">
          <p className="font-playfair text-california-gold text-lg font-bold">#MamaBearForOUSD</p>

          {/* Notice to Voters — wording required by the City of Oakland */}
          <div className="text-xs max-w-2xl mx-auto space-y-1">
            <p className="font-bold text-white">Notice to Voters (Required by the City of Oakland):</p>
            <p>
              Paid for by LeAna Powell for Oakland School Board 2026, PO Box 22746, Oakland, CA 94609,
              FPPC #1491564.
            </p>
            <p>Funding details are available on the Oakland Public Ethics Commission’s website.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs mt-2">
            <a href="mailto:info@leanaforoaklandschools.com" className="hover:text-white transition-colors">Contact</a>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          </div>
          <p className="text-xs text-white/40 mt-4">© {new Date().getFullYear()} LeAna for Oakland Schools</p>
        </div>

      </div>
    </footer>
  );
}
