import { useState } from 'react';
import { Link } from 'react-router-dom';
import { endorsements } from '../data/endorsements';
import { signupFormUrl } from '../data/forms';
import { useLanguage } from '../context/LanguageContext';

// Supporters photo at the top of the page. Drop the file in at this path and it
// appears; if it isn't there, the block hides itself rather than leaving a gap.
const GROUP_PHOTO = '/images/endorsements-group.jpg';

function GroupPhoto() {
  const { t } = useLanguage();
  const [missing, setMissing] = useState(false);
  if (missing) return null;

  return (
    <figure className="mb-12 rounded-2xl overflow-hidden shadow-lg border-4 border-california-gold/60">
      <img
        src={GROUP_PHOTO}
        alt={t(
          'LeAna Powell supporters gathered together holding campaign signs',
          'Simpatizantes de LeAna Powell reunidos sosteniendo carteles de la campaña'
        )}
        onError={() => setMissing(true)}
        className="w-full h-auto object-cover"
      />
    </figure>
  );
}

export default function Endorsements() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen py-20 px-6 bg-warm-ivory relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <span className="absolute top-16 right-8 text-6xl anim-float-2 text-rooted-black/10">🐾</span>
        <span className="absolute bottom-24 left-6 text-5xl anim-float-1 text-rooted-black/10">🐾</span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-rooted-black mb-3 text-center">
          {t('Endorsements', 'Apoyos')}
        </h1>
        <p className="text-center text-rooted-black/60 mb-8 max-w-2xl mx-auto">
          {t(
            'Educators, parents, principals, and elected leaders across Oakland are backing this mama bear. Here is who is standing with us.',
            'Educadores, padres de familia, directores de escuela y líderes electos de todo Oakland respaldan a esta mamá osa. Ellos son quienes nos acompañan.'
          )}
        </p>

        <GroupPhoto />

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {endorsements.map((person) => (
              <li
                key={person.name}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 px-6 py-4 hover:bg-warm-ivory/60 transition-colors"
              >
                <span className="font-playfair text-lg font-bold text-rooted-black sm:w-2/5 flex-shrink-0">
                  {person.name}
                </span>
                <span className="text-rooted-black/70 text-sm sm:text-base">{person.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-rooted-black/50 mt-4 text-center italic">
          {t(
            '* Organizational affiliations listed for identification purposes only',
            '* Las afiliaciones organizacionales se indican únicamente con fines de identificación'
          )}
        </p>

        <div className="mt-12 text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="font-playfair text-2xl font-bold text-rooted-black mb-2">
            {t('Add your name to the list', 'Agregue su nombre a la lista')}
          </h2>
          <p className="text-rooted-black/70 mb-6 max-w-xl mx-auto">
            {t(
              'Every name helps. Endorse LeAna and let us know if you would like to volunteer, host an event, or put up a lawn sign.',
              'Cada nombre cuenta. Apoye a LeAna y díganos si le gustaría ser voluntario, organizar un evento o poner un letrero en su jardín.'
            )}
          </p>
          <a
            href={signupFormUrl(language)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-oakland-terracotta text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-sierra-sage transition-colors shadow-md"
          >
            {t('Add your name here!', '¡Agregue su nombre aquí!')} &rarr;
          </a>
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
