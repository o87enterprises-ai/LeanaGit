import { useState, useEffect } from 'react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

export default function Layout({ children }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const updatePos = (e) => {
      const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
      const clientY = e.clientY || e.touches?.[0]?.clientY || 0;
      setPosition({ x: clientX, y: clientY });
    };
    document.addEventListener('pointermove', updatePos);
    document.addEventListener('touchmove', updatePos);
    return () => {
      document.removeEventListener('pointermove', updatePos);
      document.removeEventListener('touchmove', updatePos);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-warm-ivory relative">
      <Header />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <Footer />
      
      {/* Custom Touch/Click Bumblebee Cursor */}
      <div 
        className="pointer-events-none fixed z-50 transition-transform duration-75 ease-linear"
        style={{ left: `${position.x}px`, top: `${position.y}px`, transform: 'translate(-50%, -50%)' }}
      >
        <span className="text-3xl sm:text-4xl select-none drop-shadow-md">🐝</span>
      </div>
    </div>
  );
}
