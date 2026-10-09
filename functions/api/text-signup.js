// Receives the text-message opt-in form and stores one record per phone number
// in the TEXT_SIGNUPS KV namespace (Cloudflare dashboard > Workers KV).
const CONSENT_VERSION = '2026-10-08';
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export async function onRequestPost({ request, env }) {
  if (!env.TEXT_SIGNUPS) return json({ ok: false, error: 'unavailable' }, 503);

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  if (data.website) return json({ ok: true }); // honeypot: bots fill this in

  const name = String(data.name || '').trim().slice(0, 120);
  const email = String(data.email || '').trim().slice(0, 200);
  const digits = String(data.phone || '').replace(/\D/g, '');
  const phone = digits.length === 11 && digits[0] === '1' ? digits.slice(1) : digits;
  const smsConsent = data.smsConsent === true;

  if (!name) return json({ ok: false, error: 'name' }, 400);
  if (!phone && !email) return json({ ok: false, error: 'contact' }, 400);
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ ok: false, error: 'email' }, 400);
  if (phone && phone.length !== 10) return json({ ok: false, error: 'phone' }, 400);
  if (phone && !smsConsent) return json({ ok: false, error: 'consent' }, 400);

  const record = {
    name,
    email: email || null,
    phone: phone ? `+1${phone}` : null,
    smsConsent: Boolean(phone && smsConsent),
    consentVersion: CONSENT_VERSION,
    language: data.language === 'es' ? 'es' : 'en',
    receivedAt: new Date().toISOString(),
    ip: request.headers.get('CF-Connecting-IP'),
    userAgent: (request.headers.get('User-Agent') || '').slice(0, 300),
  };

  const key = phone ? `phone:+1${phone}` : `email:${email.toLowerCase()}`;
  await env.TEXT_SIGNUPS.put(key, JSON.stringify(record));
  return json({ ok: true });
}
