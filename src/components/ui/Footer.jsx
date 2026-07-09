import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-deep-navy text-white/70 py-10 px-6 mt-auto">
      <div className="max-w-6xl mx-auto text-center space-y-4">
        <p className="font-bold text-white text-lg">Paid for by LeAna for Oakland Schools</p>
        <p className="text-sm">PO Box 22746, Oakland, CA 94609 · FPPC #1491564</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm mt-4">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="hover:text-white transition-colors">About</Link>
          <Link to="/issues" className="hover:text-white transition-colors">Issues</Link>
          <Link to="/volunteer" className="hover:text-white transition-colors">Volunteer</Link>
          <a href="mailto:info@leanaforoaklandschools.com" className="hover:text-white transition-colors">Contact</a>
        </div>
        <p className="text-xs text-white/50 mt-6">© {new Date().getFullYear()} LeAna for Oakland Schools</p>
      </div>
    </footer>
  );
}
