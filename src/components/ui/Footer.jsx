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
              key={link.path} 
              to={link.path} 
              className="text-sm hover:text-white transition-colors"
            >
              {link.nameEn}
            </Link>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 text-center space-y-3">
          <p className="font-bold text-white text-md">Paid for by LeAna for Oakland Schools</p>
          <p className="text-xs">PO Box 22746, Oakland, CA 94609 · FPPC #1491564</p>
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
