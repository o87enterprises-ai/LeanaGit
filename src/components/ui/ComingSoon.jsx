import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

/** Shared placeholder for the pages that don't have content yet. */
export default function ComingSoon({ titleEn, titleEs, blurbEn, blurbEs }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-warm-ivory">
      <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-rooted-black mb-4">
        {t(titleEn, titleEs)}
      </h1>
      <p className="text-xl text-rooted-black/60 mb-8 max-w-2xl">{t(blurbEn, blurbEs)}</p>
      <Link to="/" className="text-oakland-terracotta font-bold underline hover:text-sierra-sage transition-colors">
        {t('Return Home', 'Volver al Inicio')}
      </Link>
    </div>
  );
}
