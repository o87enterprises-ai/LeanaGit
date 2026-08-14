import { Link } from 'react-router-dom';
import { SIGNUP_FORM_URL } from '../data/endorsements';
import { useLanguage } from '../context/LanguageContext';

const EMBED_URL = `${SIGNUP_FORM_URL}?embedded=true`;

const waysToHelp = [
  {
    emoji: '🏡',
    titleEn: 'Host a gathering', titleEs: 'Organice una reunión',
    descEn: 'A house party, a backyard meet-and-greet, coffee with a few neighbors.',
    descEs: 'Una fiesta en casa, un encuentro en el patio o un café con algunos vecinos.',
  },
  {
    emoji: '🚪',
    titleEn: 'Knock on doors', titleEs: 'Toque puertas',
    descEn: 'Walk your block with us and talk to District 6 families.',
    descEs: 'Recorra su cuadra con nosotros y converse con las familias del Distrito 6.',
  },
  {
    emoji: '📞',
    titleEn: 'Make calls & texts', titleEs: 'Llame y envíe mensajes',
    descEn: 'Reach voters from wherever you are, on your own schedule.',
    descEs: 'Comuníquese con los votantes desde donde esté y a su propio ritmo.',
  },
  {
    emoji: '🪧',
    titleEn: 'Take a lawn sign', titleEs: 'Lleve un letrero',
    descEn: 'Put the mama bear on your front lawn or in your window.',
    descEs: 'Ponga a la mamá osa en su jardín o en su ventana.',
  },
  {
    emoji: '✍️',
    titleEn: 'Endorse LeAna', titleEs: 'Apoye a LeAna',
    descEn: 'Add your name to the growing list of community leaders.',
    descEs: 'Agregue su nombre a la creciente lista de líderes comunitarios.',
  },
  {
    emoji: '🐝',
    titleEn: 'Spread the word', titleEs: 'Corra la voz',
    descEn: 'Share the campaign with your school community. #MamaBearForOUSD',
    descEs: 'Comparta la campaña con la comunidad de su escuela. #MamaBearForOUSD',
  },
];

export default function Volunteer() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-20 px-6 bg-warm-ivory relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <span className="absolute top-12 left-8 text-6xl anim-float-1 text-rooted-black/10">🐾</span>
        <span className="absolute bottom-32 right-10 text-5xl anim-float-2 text-rooted-black/10">🐾</span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-rooted-black mb-3 text-center">
          {t('Join the Sleuth', 'Únase a la Manada')}
        </h1>
        <p className="text-center text-rooted-black/60 mb-12 max-w-2xl mx-auto">
          {t(
            'A group of bears is called a sleuth, and ours is growing. Tell us how you would like to help and we will be in touch.',
            'A un grupo de osos se le llama manada, y la nuestra está creciendo. Díganos cómo le gustaría ayudar y nos pondremos en contacto.'
          )}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {waysToHelp.map((way) => (
            <div key={way.titleEn} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <span className="text-3xl block mb-3">{way.emoji}</span>
              <h3 className="font-playfair text-lg font-bold text-rooted-black mb-1">
                {t(way.titleEn, way.titleEs)}
              </h3>
              <p className="text-rooted-black/70 text-sm leading-relaxed">{t(way.descEn, way.descEs)}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-gray-100 text-center">
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-rooted-black mb-2">
              {t('Sign up', 'Apúntese')}
            </h2>
            <p className="text-rooted-black/70 text-sm">
              {t('Having trouble with the form below? ', '¿Tiene problemas con el formulario? ')}
              <a
                href={SIGNUP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-oakland-terracotta font-bold underline hover:text-sierra-sage transition-colors"
              >
                {t('Open it in a new tab', 'Ábralo en una pestaña nueva')}
              </a>
              .
            </p>
            <p className="text-rooted-black/50 text-xs mt-2">
              {t('', 'El formulario de la campaña está disponible únicamente en inglés.')}
            </p>
          </div>

          <iframe
            src={EMBED_URL}
            title={t('Volunteer and endorsement sign-up form', 'Formulario para voluntarios y apoyos')}
            className="w-full h-[1100px] sm:h-[1200px] border-0"
            loading="lazy"
          >
            {t('Loading the sign-up form…', 'Cargando el formulario…')}
          </iframe>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <a
            href="https://secure.actblue.com/donate/leana-powell-1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-oakland-terracotta text-white rounded-2xl p-6 text-center font-bold hover:bg-sierra-sage transition-colors shadow-md"
          >
            {t('Chip in to the campaign', 'Contribuya a la campaña')} &rarr;
          </a>
          <Link
            to="/events"
            className="bg-white text-rooted-black rounded-2xl p-6 text-center font-bold border border-gray-100 hover:border-california-gold shadow-sm transition-colors"
          >
            {t('Come to an upcoming event', 'Asista a un próximo evento')} &rarr;
          </Link>
        </div>

        <p className="text-center text-rooted-black/60 text-sm mt-8">
          {t('Questions? Email ', '¿Preguntas? Escriba a ')}
          <a
            href="mailto:leana@leanaforoaklandschools.com"
            className="text-oakland-terracotta font-bold hover:text-sierra-sage transition-colors"
          >
            leana@leanaforoaklandschools.com
          </a>
        </p>

        <div className="mt-10 text-center">
          <Link to="/" className="text-oakland-terracotta font-bold underline hover:text-sierra-sage transition-colors">
            {t('Return Home', 'Volver al Inicio')}
          </Link>
        </div>
      </div>
    </div>
  );
}
