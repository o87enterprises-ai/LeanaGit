import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-oakland-terracotta text-white px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-2 shadow-md sticky top-0 z-50">
      
      <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
        <Link to="/" className="flex items-center">
          <img src="/images/logo.png" alt="LeAna Powell Logo" className="h-10 sm:h-14 object-contain" />
        </Link>
        
        {/* Added all standard tabs from the original site */}
        <nav className="flex items-center gap-2 sm:gap-6 text-sm sm:text-lg font-medium">
          <Link to="/" className="hover:text-california-gold transition-colors whitespace-nowrap">Home</Link>
          <Link to="/about" className="hover:text-california-gold transition-colors whitespace-nowrap">About</Link>
          <Link to="/issues" className="hover:text-california-gold transition-colors whitespace-nowrap">Issues</Link>
          <Link to="/endorsements" className="hover:text-california-gold transition-colors whitespace-nowrap">Endorsements</Link>
          <Link to="/volunteer" className="hover:text-california-gold transition-colors whitespace-nowrap">Volunteer</Link>
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Updated Donate Button to go directly to ActBlue */}
        <a 
          href="https://secure.actblue.com/donate/leana-powell-1"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-oakland-terracotta px-3 sm:px-5 py-1.5 sm:py-2 rounded-full font-bold text-sm sm:text-base hover:bg-california-gold hover:text-white transition-colors whitespace-nowrap shadow-sm"
        >
          Donate
        </a>
        <button className="border border-white/50 px-2.5 py-1 rounded-full text-xs sm:text-sm hover:bg-white/20 transition-colors">
          ES
        </button>
      </div>
      
    </header>
  );
}
