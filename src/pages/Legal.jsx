import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const ORG = 'LeAna Powell for Oakland School Board 2026';
const EMAIL = 'leana@leanaforoaklandschools.com';
const UPDATED = 'October 8, 2026';

function Shell({ title, children }) {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen py-16 px-6 bg-warm-ivory">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-10 shadow-md border border-gray-100 [&_h2]:font-playfair [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-2 [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3">
        <h1 className="font-playfair text-3xl sm:text-4xl font-bold mb-1">{title}</h1>
        <p className="text-sm text-rooted-black/50 mb-6">{t('Last updated', 'Última actualización')}: {UPDATED}</p>
        {children}
        <p className="mt-8"><Link to="/text-updates" className="text-oakland-terracotta font-bold underline">&larr; {t('Back to sign-up', 'Volver al registro')}</Link></p>
      </div>
    </div>
  );
}

export function Terms() {
  const { t } = useLanguage();
  return (
    <Shell title={t('Terms and Conditions', 'Términos y Condiciones')}>
      <p>{t(
        `These terms govern the text-message program run by ${ORG} (“the campaign,” “we”). By opting in you agree to them.`,
        `Estos términos rigen el programa de mensajes de texto de ${ORG} (“la campaña,” “nosotros”). Al registrarse, usted los acepta.`
      )}</p>
      <h2>{t('Program', 'Programa')}</h2>
      <p>{t(
        'By checking the opt-in box on our website you agree to receive recurring text messages from the campaign, such as election reminders, event invitations, volunteer requests, and campaign updates. Donations may be solicited. Consent is not a condition of any purchase or of supporting the campaign.',
        'Al marcar la casilla de registro en nuestro sitio web, usted acepta recibir mensajes de texto periódicos de la campaña, como recordatorios de la elección, invitaciones a eventos, solicitudes de voluntarios y noticias de la campaña. Se podrían solicitar donaciones. El consentimiento no es condición para ninguna compra ni para apoyar a la campaña.'
      )}</p>
      <h2>{t('Message frequency and rates', 'Frecuencia y tarifas')}</h2>
      <p>{t(
        'Message frequency may vary. Message and data rates may apply, according to your mobile plan.',
        'La frecuencia de los mensajes puede variar. Pueden aplicarse tarifas de mensajes y datos según su plan móvil.'
      )}</p>
      <h2>{t('Help and opting out', 'Ayuda y cancelación')}</h2>
      <p>{t(
        `Reply HELP for help, or contact ${EMAIL}. Reply STOP at any time to stop; you will receive one confirmation and no further texts will be sent. You can sign up again at any time.`,
        `Responda HELP para obtener ayuda o escriba a ${EMAIL}. Responda STOP en cualquier momento para cancelar; recibirá una confirmación y no se enviarán más mensajes. Puede volver a registrarse cuando quiera.`
      )}</p>
      <h2>{t('Carriers', 'Operadores')}</h2>
      <p>{t(
        'Wireless carriers are not liable for delayed or undelivered messages. Delivery is subject to your carrier’s coverage and network availability.',
        'Los operadores inalámbricos no son responsables de mensajes retrasados o no entregados. La entrega depende de la cobertura y la disponibilidad de la red de su operador.'
      )}</p>
      <h2>{t('Privacy', 'Privacidad')}</h2>
      <p>{t('See our ', 'Consulte nuestra ')}<Link to="/privacy" className="underline text-oakland-terracotta">{t('Privacy Policy', 'Política de Privacidad')}</Link>{t(' for how we handle your information.', ' para saber cómo manejamos su información.')}</p>
      <h2>{t('Contact', 'Contacto')}</h2>
      <p>{ORG}, PO Box 22746, Oakland, CA 94609 · <a className="underline text-oakland-terracotta" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
    </Shell>
  );
}

export function Privacy() {
  const { t } = useLanguage();
  return (
    <Shell title={t('Privacy Policy', 'Política de Privacidad')}>
      <p>{t(
        `This policy explains how ${ORG} handles information collected through this website.`,
        `Esta política explica cómo ${ORG} maneja la información recopilada en este sitio web.`
      )}</p>
      <h2>{t('What we collect', 'Qué recopilamos')}</h2>
      <p>{t(
        'If you sign up, we collect your name and the phone number and/or email address you provide, along with the date and time of your sign-up and your text-message consent. A phone number is never required; you may sign up with only an email address.',
        'Si se registra, recopilamos su nombre y el número de teléfono o correo electrónico que proporcione, junto con la fecha y hora del registro y su consentimiento para recibir mensajes de texto. Nunca se exige un número de teléfono; puede registrarse solo con un correo electrónico.'
      )}</p>
      <h2>{t('How we use it', 'Cómo la usamos')}</h2>
      <p>{t(
        'We use it to send campaign messages you asked for, such as election reminders, events, and volunteer and donation requests, and to keep a record of your consent.',
        'La usamos para enviar los mensajes de la campaña que usted solicitó, como recordatorios de la elección, eventos y solicitudes de voluntarios y donaciones, y para conservar un registro de su consentimiento.'
      )}</p>
      <h2>{t('Sharing', 'Cómo la compartimos')}</h2>
      <p>{t(
        'We do not sell your information. No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text-messaging opt-in data and consent are never shared with third parties. We share information only with service providers that help us send messages on our behalf (such as our texting platform), who may use it only for that purpose, and when required by law.',
        'No vendemos su información. No se compartirá información móvil con terceros ni afiliados con fines de mercadeo o promoción. Los datos de registro y consentimiento para mensajes de texto nunca se comparten con terceros. Solo la compartimos con proveedores que nos ayudan a enviar mensajes en nuestro nombre (como nuestra plataforma de mensajes de texto), quienes solo pueden usarla para ese fin, y cuando la ley lo exija.'
      )}</p>
      <h2>{t('Your choices', 'Sus opciones')}</h2>
      <p>{t(
        `Reply STOP to any text to stop messages. To ask us to delete your information, email ${EMAIL}.`,
        `Responda STOP a cualquier mensaje para dejar de recibirlos. Para pedir que eliminemos su información, escriba a ${EMAIL}.`
      )}</p>
      <h2>{t('Contact', 'Contacto')}</h2>
      <p>{ORG}, PO Box 22746, Oakland, CA 94609 · <a className="underline text-oakland-terracotta" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
    </Shell>
  );
}
