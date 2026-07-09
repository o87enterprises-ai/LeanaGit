import { Link } from 'react-router-dom';

export default function Volunteer() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-warm-ivory">
      <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-rooted-black mb-4">Get Involved</h1>
      <p className="text-xl text-rooted-black/60 mb-8 max-w-2xl">We're building the tools to let you sign up for canvassing and phone banking. Hang tight!</p>
      <Link to="/" className="text-oakland-terracotta font-bold underline hover:text-sierra-sage transition-colors">Return Home</Link>
    </div>
  );
}
