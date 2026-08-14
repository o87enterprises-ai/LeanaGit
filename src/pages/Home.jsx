import { Link } from 'react-router-dom';
import HeroVideo from '../components/ui/HeroVideo';
import Markdown from '../components/ui/Markdown';
import { useLanguage } from '../context/LanguageContext';
import { useDocs } from '../lib/content';
import { upcomingEvents, formatEventDate, localizeEvent, mapUrl } from '../data/events';

const exploreCards = [
  { to: '/endorsements', emoji: '🤝', titleEn: 'Endorsements', titleEs: 'Apoyos', noteEn: '35+ community leaders', noteEs: 'Más de 35 líderes comunitarios' },
  { to: '/bear-necessities', emoji: '🐻', titleEn: 'Bear Necessities', titleEs: 'Necesidades del Oso', noteEn: 'Coming Soon', noteEs: 'Próximamente' },
  { to: '/the-den-live', emoji: '🎙️', titleEn: 'The Den Live!', titleEs: '¡La Guarida en Vivo!', noteEn: 'Coming Soon', noteEs: 'Próximamente' },
  { to: '/events', emoji: '📅', titleEn: 'Events', titleEs: 'Eventos', noteEn: 'Come meet LeAna', noteEs: 'Venga a conocer a LeAna' },
];

export default function Home() {
  const { language, t } = useLanguage();
  const nextEvents = upcomingEvents().slice(0, 3);
  // About copy lives in public/content/about.md (+ about.es.md), so the campaign
  // can edit it — and its Spanish translation — without touching code.
  const { docs } = useDocs(['/content/about'], language);
  const about = docs[0];

  return (
    <div className="min-h-screen bg-warm-ivory">

      {/* 1. Hero Section (campaign video) */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <HeroVideo />

        <div className="relative z-10 max-w-2xl w-full mx-auto p-6">
          <img src="/images/logo.png" alt="LeAna Powell Logo" className="w-24 h-auto mx-auto mb-4 drop-shadow-lg" />
          <p className="text-white font-bold tracking-wider text-xs sm:text-sm uppercase mb-2 text-shadow-hero">
            {t('Oakland School Board District 6', 'Junta Escolar de Oakland, Distrito 6')}
          </p>
          <h1 className="font-playfair text-5xl sm:text-7xl font-bold text-white mb-4 text-shadow-hero">
            LeAna Powell
          </h1>
          <p className="font-playfair text-2xl sm:text-4xl text-california-gold font-bold text-shadow-hero">
            {t('Mama Bear for Oakland Schools', 'Mamá Osa por las Escuelas de Oakland')}
          </p>
          <p className="mt-3 text-white/90 text-base sm:text-lg font-light text-shadow-hero">
            {t('Rooted in Oakland. Fighting for Kids.', 'Con raíces en Oakland. Luchando por los niños.')}
          </p>
          <p className="mt-4 inline-block bg-oakland-terracotta/90 text-white px-4 py-1.5 rounded-full text-sm sm:text-base font-bold tracking-wide">
            #MamaBearForOUSD
          </p>
        </div>

        <div className="relative z-10 mt-6 flex flex-wrap gap-3 justify-center px-4">
          <a
            href="https://secure.actblue.com/donate/leana-powell-1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-oakland-terracotta text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-sierra-sage transition-colors shadow-lg"
          >
            {t('Fuel the Movement', 'Impulse el Movimiento')} &rarr;
          </a>
          <Link
            to="/events"
            className="inline-block bg-white/95 text-rooted-black px-8 py-4 rounded-full font-bold text-lg hover:bg-california-gold hover:text-white transition-colors shadow-lg"
          >
            {t('Meet LeAna', 'Conozca a LeAna')}
          </Link>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/70 drop-shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 256 256">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-45.17-85.17a8,8,0,0,1,11.31,0L120,156.69V88a8,8,0,0,1,16,0v68.69l25.83-25.83a8,8,0,0,1,11.31,11.31l-40,40a8,8,0,0,1-11.31,0l-40-40A8,8,0,0,1,82.83,130.83Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. Upcoming events strip */}
      {nextEvents.length > 0 && (
        <section className="bg-deep-navy text-white py-14 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold">{t('Come See Us', 'Venga a Vernos')}</h2>
              <Link to="/events" className="text-california-gold font-bold hover:text-white transition-colors">
                {t('Full calendar', 'Calendario completo')} &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nextEvents.map((raw, idx) => {
                const event = localizeEvent(raw, language);
                return (
                  <div key={idx} className="bg-white/10 rounded-2xl p-6 border border-white/10 flex flex-col">
                    <p className="text-california-gold font-bold text-sm uppercase tracking-wide">
                      {formatEventDate(event.date, { weekday: 'short' }, language)}
                    </p>
                    <h3 className="font-playfair text-xl font-bold mt-1">{event.title}</h3>
                    {event.host && <p className="text-white/70 text-sm italic">{event.host}</p>}
                    <p className="text-white/90 text-sm mt-2">{event.time}</p>
                    {(event.location || event.address) && (
                      <a
                        href={mapUrl(event)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 text-sm hover:text-california-gold transition-colors mt-1"
                      >
                        📍 {[event.location, event.address].filter(Boolean).join(' · ')}
                      </a>
                    )}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      {event.rsvpUrl ? (
                        <a
                          href={event.rsvpUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-oakland-terracotta text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-california-gold transition-colors"
                        >
                          {event.rsvpLabel || t('RSVP', 'Confirmar asistencia')} &rarr;
                        </a>
                      ) : (
                        <span className="text-xs uppercase tracking-wide text-white/50">
                          {t('All are welcome', 'Todos son bienvenidos')}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 3. Intro & About Section */}
      <section id="about" className="honeycomb-bg py-20 px-6 relative overflow-hidden scroll-mt-24">

        {/* Floating Paw Prints Background */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
          <span className="absolute top-10 left-5 text-6xl anim-float-1 text-rooted-black/10">🐾</span>
          <span className="absolute bottom-20 right-10 text-4xl anim-float-2 text-rooted-black/10">🐾</span>
          <span className="absolute top-1/2 left-1/4 text-8xl anim-float-3 text-rooted-black/5">🐾</span>
          <span className="absolute top-20 right-1/3 text-3xl anim-float-1 text-oakland-terracotta/10">🐾</span>
          <span className="absolute bottom-10 left-1/3 text-5xl anim-float-2 text-rooted-black/10">🐾</span>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto bg-white/70 backdrop-blur-sm rounded-2xl p-8 sm:p-12 shadow-lg border border-white/50">
          <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-rooted-black mb-4 text-center">
            {t('Hello, I’m', '¡Hola, soy')}<br />
            <span className="text-oakland-terracotta text-5xl sm:text-6xl">LeAna,</span>
          </h2>
          <p className="text-xl sm:text-2xl text-rooted-black/80 text-center font-light mb-8">
            {t(
              'and I’m running for Oakland School Board because every child should get the opportunity to have a quality education!',
              'y me estoy postulando para la Junta Escolar de Oakland porque cada niño merece la oportunidad de una educación de alta calidad!'
            )}
          </p>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-6">
            <div className="w-48 h-48 sm:w-64 sm:h-64 flex-shrink-0 rounded-full overflow-hidden shadow-xl border-4 border-california-gold">
              <img src="/images/headshot.JPG" alt="LeAna Powell" className="w-full h-full object-cover" />
            </div>

            <div className="flex-grow">
              <h3 className="font-playfair text-2xl font-bold text-rooted-black mb-4">
                {t('About LeAna', '¿Quién es LeAna?')}
              </h3>
              <div className="text-base sm:text-lg">
                {about ? (
                  <Markdown>{about.body}</Markdown>
                ) : (
                  <div className="space-y-3" aria-hidden="true">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-4 bg-rooted-black/5 rounded animate-pulse" />
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/issues"
                className="inline-block mt-6 bg-oakland-terracotta text-white px-6 py-3 rounded-full font-bold hover:bg-sierra-sage transition-colors"
              >
                {t('Where LeAna stands', 'La postura de LeAna')} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Links to other pages */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-rooted-black mb-12 text-center">
          {t('Explore Our Community', 'Explore Nuestra Comunidad')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {exploreCards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-california-gold"
            >
              <span className="text-6xl block mb-4 group-hover:scale-110 transition-transform">{card.emoji}</span>
              <h3 className="font-playfair text-xl font-bold text-rooted-black">{t(card.titleEn, card.titleEs)}</h3>
              <p className="text-rooted-black/60 mt-2 text-sm">{t(card.noteEn, card.noteEs)}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
