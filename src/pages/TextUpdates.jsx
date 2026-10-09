import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-oakland-terracotta';

export default function TextUpdates() {
  const { language, t } = useLanguage();
  const [form, setForm] = useState({ name: '', phone: '', email: '', smsConsent: false, website: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [message, setMessage] = useState('');

  const set = (field) => (e) =>
    setForm({ ...form, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.phone.trim() && !form.email.trim()) {
      setStatus('error');
      setMessage(t('Please enter a phone number or an email address.', 'Escriba un número de teléfono o un correo electrónico.'));
      return;
    }
    if (form.phone.trim() && !form.smsConsent) {
      setStatus('error');
      setMessage(
        t(
          'To get text messages, please check the box. If you only want email, clear the phone number.',
          'Para recibir mensajes de texto, marque la casilla. Si solo desea correo electrónico, borre el número de teléfono.'
        )
      );
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/text-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, language }),
      });
      if (!res.ok) throw new Error();
      setStatus('done');
    } catch {
      setStatus('error');
      setMessage(
        t(
          'Sorry, something went wrong. Please try again or email leana@leanaforoaklandschools.com.',
          'Lo sentimos, algo salió mal. Inténtelo de nuevo o escriba a leana@leanaforoaklandschools.com.'
        )
      );
    }
  };

  return (
    <div className="min-h-screen py-16 px-6 bg-warm-ivory">
      <div className="max-w-xl mx-auto">
        <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-rooted-black mb-3 text-center">
          {t('Get Campaign Updates', 'Reciba Noticias de la Campaña')}
        </h1>
        <p className="text-center text-rooted-black/70 mb-8">
          {t(
            'Join LeAna’s list for election reminders, events, and ways to help. Text is optional — you can sign up with just your email.',
            'Únase a la lista de LeAna para recibir recordatorios de la elección, eventos y maneras de ayudar. El texto es opcional: puede registrarse solo con su correo electrónico.'
          )}
        </p>

        {status === 'done' ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-md border border-gray-100" role="status">
            <p className="font-playfair text-2xl font-bold mb-2">{t('Thank you!', '¡Gracias!')}</p>
            <p className="text-rooted-black/70">{t('You’re on the list.', 'Ya está en la lista.')}</p>
          </div>
        ) : (
          <form onSubmit={submit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-100 space-y-5" noValidate>
            <div>
              <label htmlFor="name" className="block font-semibold mb-1">{t('Name', 'Nombre')}</label>
              <input id="name" required autoComplete="name" value={form.name} onChange={set('name')} className={inputClass} />
            </div>
            <div>
              <label htmlFor="phone" className="block font-semibold mb-1">
                {t('Mobile phone', 'Teléfono móvil')} <span className="font-normal text-rooted-black/50">({t('optional', 'opcional')})</span>
              </label>
              <input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} className={inputClass} />
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold mb-1">
                {t('Email', 'Correo electrónico')} <span className="font-normal text-rooted-black/50">({t('optional', 'opcional')})</span>
              </label>
              <input id="email" type="email" autoComplete="email" value={form.email} onChange={set('email')} className={inputClass} />
            </div>

            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={set('website')} className="hidden" />

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={form.smsConsent} onChange={set('smsConsent')} className="mt-1 h-5 w-5 flex-shrink-0 accent-oakland-terracotta" />
              <span className="text-sm">
                {t(
                  'By checking this box you agree to opt-in to receive text messages from LeAna Powell for Oakland School Board.',
                  'Al marcar esta casilla, usted acepta recibir mensajes de texto de LeAna Powell for Oakland School Board.'
                )}
              </span>
            </label>

            <p className="text-xs text-rooted-black/70 leading-relaxed">
              {t(
                'Donations may be solicited. Message and Data rates may apply. Message frequency may vary. Reply HELP for help and reply STOP to stop and no further texts will be sent. See our attached ',
                'Se podrían solicitar donaciones. Pueden aplicarse tarifas de mensajes y datos. La frecuencia de los mensajes puede variar. Responda HELP para obtener ayuda y STOP para cancelar, y no se enviarán más mensajes. Consulte nuestros '
              )}
              <Link to="/terms" className="underline text-oakland-terracotta">{t('Terms and Conditions', 'Términos y Condiciones')}</Link>
              {t(' and our ', ' y nuestra ')}
              <Link to="/privacy" className="underline text-oakland-terracotta">{t('Privacy Policy', 'Política de Privacidad')}</Link>.
            </p>

            <p className="text-xs text-rooted-black/70 leading-relaxed">
              {t(
                'Your information will not be shared with third parties for marketing purposes.',
                'Su información no se compartirá con terceros con fines de mercadeo.'
              )}
            </p>

            {status === 'error' && <p role="alert" className="text-red-700 text-sm font-semibold">{message}</p>}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-oakland-terracotta text-white py-3 rounded-full font-bold hover:bg-sierra-sage transition-colors disabled:opacity-60"
            >
              {status === 'sending' ? t('Sending…', 'Enviando…') : t('Sign me up', 'Inscríbame')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
