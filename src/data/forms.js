/**
 * The campaign's sign-up form (endorsements + volunteers).
 *
 * The questions in this form are already written in both English and Spanish
 * ("First name / Nombre"), so one form serves everyone. For Spanish visitors we
 * add hl=es, which puts Google's own chrome — the Submit button, the required
 * field warnings, the footer — into Spanish too.
 */
export const SIGNUP_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScoq6dBd9UHVqT4tjFUn3uIFEdhA2uvzQv-2D5jLoJRCVGS3A/viewform';

/**
 * If the campaign ever builds a separate Spanish-only form, paste its
 * /viewform URL here and Spanish visitors are sent to it automatically.
 * Leave it null to keep using the bilingual form above.
 */
export const SIGNUP_FORM_URL_ES = null;

function withParams(url, params) {
  const [base, existing = ''] = url.split('?');
  const search = new URLSearchParams(existing);
  for (const [key, value] of Object.entries(params)) search.set(key, value);
  const query = search.toString();
  return query ? `${base}?${query}` : base;
}

/** The form link for the active language. Pass embedded for the iframe version. */
export function signupFormUrl(language, { embedded = false } = {}) {
  const params = embedded ? { embedded: 'true' } : {};

  if (language === 'es') {
    return SIGNUP_FORM_URL_ES
      ? withParams(SIGNUP_FORM_URL_ES, params)
      : withParams(SIGNUP_FORM_URL, { ...params, hl: 'es' });
  }
  return withParams(SIGNUP_FORM_URL, params);
}
