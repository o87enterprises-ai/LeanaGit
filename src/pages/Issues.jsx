import { Link } from 'react-router-dom';

export default function Issues() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-warm-ivory">
      <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-rooted-black mb-4">Platform & Issues</h1>
      <p className="text-xl text-rooted-black/60 mb-8 max-w-2xl">Detailed policy breakdowns for Safe Schools, SPED Equity, and Fiscal Transparency are currently in the works.</p>
      <Link to="/" className="text-oakland-terracotta font-bold underline hover:text-sierra-sage transition-colors">Return Home</Link>
    </div>
  );
}
