import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GROUPS, GROUPS_ES, featured, resourcesByGroup } from '../data/resources';
import { useLanguage } from '../context/LanguageContext';

/** Thumbnail that quietly disappears if the source image ever goes away. */
function Thumb({ src, alt, className }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

function ResourceRow({ item }) {
  const { t } = useLanguage();

  return (
    <li className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-24 h-20 sm:w-32 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-warm-ivory">
        <Thumb src={item.image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex-grow min-w-0">
        <h3 className="font-playfair text-base sm:text-lg font-bold text-rooted-black leading-snug">
          {item.title}
        </h3>
        <p className="text-rooted-black/60 text-sm mt-1">{item.source}</p>
        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-oakland-terracotta font-bold text-sm hover:text-sierra-sage transition-colors"
          >
            {t('Read it', 'Léalo')} &rarr;
          </a>
        ) : (
          <span className="inline-block mt-2 text-xs uppercase tracking-wide text-rooted-black/40">
            {t('Link coming soon', 'Enlace próximamente')}
          </span>
        )}
      </div>
    </li>
  );
}

export default function ArticlesAchievements() {
  const { language, t } = useLanguage();
  const groups = language === 'es' ? GROUPS_ES : GROUPS;

  return (
    <div className="min-h-screen bg-warm-ivory py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-rooted-black mb-3 text-center">
          {t('Articles & Achievements', 'Artículos y Logros')}
        </h1>
        <p className="text-center text-rooted-black/60 mb-3 max-w-2xl mx-auto">
          {t(
            'Coverage of what is happening inside OUSD, the letters and reports behind the headlines, and a look at LeAna’s years of advocacy for Oakland families.',
            'Cobertura de lo que ocurre dentro de OUSD, las cartas e informes detrás de los titulares y un vistazo a los años de trabajo de LeAna por las familias de Oakland.'
          )}
        </p>
        <p className="text-center text-rooted-black/40 text-sm mb-14">
          {t('', 'Los artículos enlazados están en inglés.')}
        </p>

        {/* Featured letters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((article) => (
            <div
              key={article.title}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
            >
              <div className="h-48 bg-gray-100 overflow-hidden">
                <Thumb src={article.image} alt={article.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h2 className="font-playfair text-xl font-bold text-rooted-black mb-2">{article.title}</h2>
                <p className="text-rooted-black/70 text-sm mb-4 flex-grow">{article.source}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-oakland-terracotta text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-sierra-sage transition-colors w-fit"
                >
                  {t('Read Full Article', 'Leer el documento')} &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Resources (folded in from the old Resources tab) */}
        <section id="resources" className="mt-20 scroll-mt-24">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-rooted-black mb-2">
            {t('Resources', 'Recursos')}
          </h2>
          <p className="text-rooted-black/60 mb-10 max-w-2xl">
            {t(
              'Want to dig into the district yourself? Start here.',
              '¿Quiere investigar el distrito por su cuenta? Empiece aquí.'
            )}
          </p>

          <div className="space-y-12">
            {Object.entries(groups).map(([key, label]) => (
              <div key={key}>
                <h3 className="font-playfair text-xl font-bold text-oakland-terracotta mb-4 uppercase tracking-wide">
                  {label}
                </h3>
                <ul className="space-y-4">
                  {resourcesByGroup[key].map((item) => (
                    <ResourceRow key={item.title} item={item} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 text-center bg-deep-navy text-white rounded-2xl p-10">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold mb-3">
            {t(
              'Oakland’s kids need a mama bear in the room',
              'Los niños de Oakland necesitan una mamá osa en la sala'
            )}
          </h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            {t(
              'Read the coverage, then help us change it. #MamaBearForOUSD',
              'Lea la cobertura y ayúdenos a cambiarla. #MamaBearForOUSD'
            )}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/volunteer"
              className="bg-oakland-terracotta text-white px-6 py-3 rounded-full font-bold hover:bg-california-gold transition-colors"
            >
              {t('Get involved', 'Participe')} &rarr;
            </Link>
            <Link
              to="/issues"
              className="bg-white text-rooted-black px-6 py-3 rounded-full font-bold hover:bg-california-gold hover:text-white transition-colors"
            >
              {t('Where LeAna stands', 'La postura de LeAna')}
            </Link>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/" className="text-oakland-terracotta font-bold underline hover:text-sierra-sage transition-colors">
            {t('Return Home', 'Volver al Inicio')}
          </Link>
        </div>
      </div>
    </div>
  );
}
