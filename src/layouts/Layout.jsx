import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import { seoFor, SITE_URL } from '../seo';

/** Scroll to the #hash target on navigation (the About tab points at /#about),
 *  or back to the top when there is no hash. */
function ScrollToHash() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    // Wait a frame so the target section exists after a cross-page navigation.
    const raf = requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash, key]);

  return null;
}

/** Keep the tab title, description and canonical right as visitors navigate. */
function useSeo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const { title, description } = seoFor(pathname);
    document.title = title;
    const set = (selector, attr, value, make) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = make();
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    const meta = (key, name) => () => {
      const m = document.createElement('meta');
      m.setAttribute(key, name);
      return m;
    };
    set('meta[name="description"]', 'content', description, meta('name', 'description'));
    set('meta[property="og:title"]', 'content', title, meta('property', 'og:title'));
    set('meta[property="og:description"]', 'content', description, meta('property', 'og:description'));
    set('link[rel="canonical"]', 'href', SITE_URL + (pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname), () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    });
  }, [pathname]);
}

export default function Layout({ children }) {
  useSeo();
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
      <ScrollToHash />
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
