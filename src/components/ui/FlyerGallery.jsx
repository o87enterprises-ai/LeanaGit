import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { flyers } from '../../data/flyers';
import { useLanguage } from '../../context/LanguageContext';

function Thumb({ flyer, onOpen }) {
  const { language, t } = useLanguage();
  const label = (language === 'es' && flyer.nameEs) || flyer.name;
  const canPlay = !!flyer.videoSrc;

  return (
    <motion.button
      layoutId={`flyer-${flyer.slug}`}
      onClick={() => onOpen(flyer)}
      aria-label={
        canPlay
          ? t(`Play ${label}'s endorsement`, `Ver el respaldo de ${label}`)
          : label
      }
      className="group relative block w-full aspect-square rounded-xl overflow-hidden bg-rooted-black/5 shadow-sm hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-california-gold transition-shadow"
    >
      {flyer.imageSrc ? (
        <img
          src={flyer.imageSrc}
          alt={t(`Endorsement flyer for ${label}`, `Cartel de respaldo de ${label}`)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        // Video-only flyer: show the clip's first frame as the poster.
        <video
          src={flyer.videoSrc}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}

      {canPlay && (
        <span className="absolute inset-0 flex items-center justify-center bg-rooted-black/0 group-hover:bg-rooted-black/25 transition-colors">
          <span className="w-14 h-14 rounded-full bg-white/90 text-oakland-terracotta flex items-center justify-center shadow-lg scale-90 group-hover:scale-100 transition-transform">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      )}
    </motion.button>
  );
}

export default function FlyerGallery() {
  const { language, t } = useLanguage();
  const [active, setActive] = useState(null);
  const [show, setShow] = useState(false);

  const open = (flyer) => {
    setActive(flyer);
    setShow(true);
  };
  const close = () => {
    setShow(false);
    setTimeout(() => setActive(null), 250);
  };

  const activeLabel = active && ((language === 'es' && active.nameEs) || active.name);

  return (
    <section className="mt-4">
      <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-rooted-black mb-2">
        {t('Endorsement Flyers', 'Carteles de Respaldo')}
      </h2>
      <p className="text-rooted-black/60 mb-6 max-w-2xl text-sm sm:text-base">
        {t(
          'Tap a flyer to watch the endorsement. Share them anywhere — #MamaBearForOUSD.',
          'Toque un cartel para ver el respaldo. Compártalos donde quiera: #MamaBearForOUSD.'
        )}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {flyers.map((flyer) => (
          <Thumb key={flyer.slug} flyer={flyer} onOpen={open} />
        ))}
      </div>

      <AnimatePresence>
        {show && active && (
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-rooted-black/70 backdrop-blur-sm"
            onClick={close}
          >
            <motion.div
              layoutId={`flyer-${active.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-2xl overflow-hidden bg-rooted-black shadow-2xl"
            >
              {active.videoSrc ? (
                <video
                  src={active.videoSrc}
                  poster={active.imageSrc || undefined}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-auto max-h-[80vh] bg-black"
                />
              ) : (
                <img src={active.imageSrc} alt={activeLabel} className="w-full h-auto max-h-[80vh] object-contain" />
              )}

              <button
                onClick={close}
                aria-label={t('Close', 'Cerrar')}
                className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white/90 text-rooted-black flex items-center justify-center shadow hover:bg-california-gold hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
