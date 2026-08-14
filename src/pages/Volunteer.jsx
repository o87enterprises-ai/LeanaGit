import { Link } from 'react-router-dom';
import { SIGNUP_FORM_URL } from '../data/endorsements';

const EMBED_URL = `${SIGNUP_FORM_URL}?embedded=true`;

const waysToHelp = [
  { emoji: '🏡', title: 'Host a gathering', desc: 'A house party, a backyard meet-and-greet, coffee with a few neighbors.' },
  { emoji: '🚪', title: 'Knock on doors', desc: 'Walk your block with us and talk to District 6 families.' },
  { emoji: '📞', title: 'Make calls & texts', desc: 'Reach voters from wherever you are, on your own schedule.' },
  { emoji: '🪧', title: 'Take a lawn sign', desc: 'Put the mama bear on your front lawn or in your window.' },
  { emoji: '✍️', title: 'Endorse LeAna', desc: 'Add your name to the growing list of community leaders.' },
  { emoji: '🐝', title: 'Spread the word', desc: 'Share the campaign with your school community. #MamaBearForOUSD' },
];

export default function Volunteer() {
  return (
    <div className="min-h-screen py-20 px-6 bg-warm-ivory relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <span className="absolute top-12 left-8 text-6xl anim-float-1 text-rooted-black/10">🐾</span>
        <span className="absolute bottom-32 right-10 text-5xl anim-float-2 text-rooted-black/10">🐾</span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-rooted-black mb-3 text-center">
          Join the Sleuth
        </h1>
        <p className="text-center text-rooted-black/60 mb-12 max-w-2xl mx-auto">
          A group of bears is called a sleuth, and ours is growing. Tell us how you would like to
          help and we will be in touch.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {waysToHelp.map((way) => (
            <div key={way.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <span className="text-3xl block mb-3">{way.emoji}</span>
              <h3 className="font-playfair text-lg font-bold text-rooted-black mb-1">{way.title}</h3>
              <p className="text-rooted-black/70 text-sm leading-relaxed">{way.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-gray-100 text-center">
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-rooted-black mb-2">
              Sign up
            </h2>
            <p className="text-rooted-black/70 text-sm">
              Having trouble with the form below?{' '}
              <a
                href={SIGNUP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-oakland-terracotta font-bold underline hover:text-sierra-sage transition-colors"
              >
                Open it in a new tab
              </a>
              .
            </p>
          </div>

          <iframe
            src={EMBED_URL}
            title="Volunteer and endorsement sign-up form"
            className="w-full h-[1100px] sm:h-[1200px] border-0"
            loading="lazy"
          >
            Loading the sign-up form…
          </iframe>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <a
            href="https://secure.actblue.com/donate/leana-powell-1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-oakland-terracotta text-white rounded-2xl p-6 text-center font-bold hover:bg-sierra-sage transition-colors shadow-md"
          >
            Chip in to the campaign &rarr;
          </a>
          <Link
            to="/events"
            className="bg-white text-rooted-black rounded-2xl p-6 text-center font-bold border border-gray-100 hover:border-california-gold shadow-sm transition-colors"
          >
            Come to an upcoming event &rarr;
          </Link>
        </div>

        <p className="text-center text-rooted-black/60 text-sm mt-8">
          Questions? Email{' '}
          <a
            href="mailto:leana@leanaforoaklandschools.com"
            className="text-oakland-terracotta font-bold hover:text-sierra-sage transition-colors"
          >
            leana@leanaforoaklandschools.com
          </a>
        </p>

        <div className="mt-10 text-center">
          <Link to="/" className="text-oakland-terracotta font-bold underline hover:text-sierra-sage transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
